import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, type AuthContextType } from '../contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import HttpClient from '../lib/httpClient';
import TokenService from '../lib/tokenService';
import BranchService from '../lib/branchService';
import {
  clearError,
  clearTokens,
  clearUser,
  setTokens,
  setUser,
  updateLastActivity,
  clearCurrentBranchId,
} from '../store/slices/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  accessToken: string;
  branchId: string;
}

interface RegisterResponse {
  accessToken: string;
}

interface UserResponse {
  user: {
    userId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    role?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

// Constants
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes - check more frequently
const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const AUTH_CHECK_DEBOUNCE = 1000; // 1 second debounce for auth checks

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error, user, lastActivity } = useAppSelector(state => state.auth);
  const [isInitializing, setIsInitializing] = useState(true);
  const [intendedDestination, setIntendedDestination] = useState<string | null>(null);

  // Refs for managing intervals and timeouts
  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activityTimeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const eventListenersRef = useRef<Array<{ event: string; handler: () => void }>>([]);
  const initializedRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const tokenService = TokenService.getInstance();
  const httpClient = HttpClient.getInstance();

  // Get intended destination from state or sessionStorage
  const getIntendedDestination = useCallback(() => {
    if (intendedDestination) {
      return intendedDestination;
    }
    // Check sessionStorage for destination stored during page refresh
    const stored = sessionStorage.getItem('intendedDestination');
    if (stored) {
      sessionStorage.removeItem('intendedDestination'); // Clean up
      return stored;
    }
    return '/'; // Default fallback
  }, [intendedDestination]);

  // Clear intended destination after successful navigation
  const clearIntendedDestination = useCallback(() => {
    setIntendedDestination(null);
    sessionStorage.removeItem('intendedDestination');
  }, []);

  // Check authentication status
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    // Prevent multiple simultaneous auth checks
    if (isRefreshingRef.current) {
      return false;
    }

    try {
      isRefreshingRef.current = true;
      const response = await httpClient.get<UserResponse>('/api/auth/me');
      if (response.user) {
        dispatch(setUser(response.user));
        return true;
      }
      return false;
    } catch {
      // If auth check fails, clear tokens and return false
      tokenService.clearTokens();
      dispatch(clearUser());
      return false;
    } finally {
      isRefreshingRef.current = false;
    }
  }, [dispatch, httpClient, tokenService]);

  // Debounced auth check to prevent multiple simultaneous calls
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const checkAuthStatusDebounced = useCallback(async () => {
    if (isCheckingAuth) {
      return false;
    }
    setIsCheckingAuth(true);
    try {
      const result = await checkAuthStatus();
      return result;
    } finally {
      // Add a small delay before allowing the next check
      setTimeout(() => {
        setIsCheckingAuth(false);
      }, AUTH_CHECK_DEBOUNCE);
    }
  }, [checkAuthStatus, isCheckingAuth]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      // Call logout endpoint
      await httpClient.post('/api/auth/logout');
    } catch {
      // Continue with logout even if server call fails
    } finally {
      // Clear tokens, user data, and branch ID
      tokenService.clearTokens();
      const branchService = BranchService.getInstance();
      branchService.clearCurrentBranchId();
      dispatch(clearUser());
      dispatch(clearTokens());
      dispatch(clearCurrentBranchId());

      // Stop monitoring
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }

      // Clean up event listeners
      eventListenersRef.current.forEach(({ event, handler }) => {
        document.removeEventListener(event, handler, true);
      });
      eventListenersRef.current = [];

      // Clean up activity interval
      if (activityTimeoutRef.current) {
        clearInterval(activityTimeoutRef.current);
        activityTimeoutRef.current = null;
      }

      // Navigate to login
      await navigate('/login');
    }
  }, [dispatch, navigate, httpClient, tokenService]);

  // Start token refresh interval
  const startTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    refreshIntervalRef.current = setInterval(() => {
      // Prevent multiple simultaneous refresh attempts
      if (isRefreshingRef.current) {
        return;
      }

      // Wrap the async operations in an IIFE
      void (async () => {
        try {
          isRefreshingRef.current = true;
          // Check if token is expiring soon (within 5 minutes)
          if (tokenService.isTokenExpiringSoon()) {
            await tokenService.refreshToken();
            // Update Redux state with new tokens
            const tokens = tokenService.getTokens();
            if (tokens) {
              dispatch(
                setTokens({
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken ?? '',
                })
              );
            }
          }
        } catch {
          // If refresh fails, logout the user
          void handleLogout();
        } finally {
          isRefreshingRef.current = false;
        }
      })();
    }, REFRESH_INTERVAL);
  }, [dispatch, tokenService, handleLogout]);

  // Stop token refresh interval
  const stopTokenRefresh = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  }, []);

  // Start activity monitoring
  const startActivityMonitoring = useCallback(() => {
    // First, clean up any existing listeners
    eventListenersRef.current.forEach(({ event, handler }) => {
      document.removeEventListener(event, handler, true);
    });
    eventListenersRef.current = [];

    const updateActivity = () => {
      dispatch(updateLastActivity());
    };

    // Update activity on user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
      // Store reference for cleanup
      eventListenersRef.current.push({ event, handler: updateActivity });
    });

    // Check for inactivity
    activityTimeoutRef.current = setInterval(() => {
      if (lastActivity && Date.now() - lastActivity > ACTIVITY_TIMEOUT) {
        // User inactive, logging out
        void handleLogout();
      }
    }, 60000); // Check every minute
  }, [dispatch, lastActivity, handleLogout]);

  // Stop activity monitoring
  const stopActivityMonitoring = useCallback(() => {
    // Clean up event listeners
    eventListenersRef.current.forEach(({ event, handler }) => {
      document.removeEventListener(event, handler, true);
    });
    eventListenersRef.current = [];

    // Clean up interval
    if (activityTimeoutRef.current) {
      clearInterval(activityTimeoutRef.current);
      activityTimeoutRef.current = null;
    }
  }, []);

  // Initialize authentication on mount
  useEffect(() => {
    if (initializedRef.current) {
      return;
    }

    const initializeAuth = async () => {
      setIsInitializing(true);

      // Check if we have valid tokens
      if (tokenService.isAuthenticated()) {
        // Try to get user info
        const isAuthenticated = await checkAuthStatusDebounced();
        if (isAuthenticated) {
          startTokenRefresh();
          startActivityMonitoring();
        }
      }

      setIsInitializing(false);
      initializedRef.current = true;
    };

    void initializeAuth();

    // Cleanup function
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      stopActivityMonitoring();
    };
  }, [checkAuthStatusDebounced, startTokenRefresh, startActivityMonitoring, stopActivityMonitoring, tokenService]);

  // Login function
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const branchService = BranchService.getInstance();
        const storedBranchId = branchService.getStoredOrDefaultBranchId();

        const response = await httpClient.post<LoginResponse>(
          '/api/auth/login',
          { email, password, branchId: storedBranchId },
          { skipAuth: true }
        );

        if (response.accessToken) {
          // Store tokens and branch ID
          tokenService.setTokens(response.accessToken);

          // Update Redux state
          dispatch(
            setTokens({
              accessToken: response.accessToken,
              refreshToken: '',
            })
          );

          // Get user info
          await checkAuthStatusDebounced();

          // Start monitoring
          startTokenRefresh();
          startActivityMonitoring();

          // Navigate to intended destination
          const destination = getIntendedDestination();
          await navigate(destination);
          clearIntendedDestination(); // Clear intended destination after successful navigation
        }
      } catch (error) {
        // Re-throw error for handling in UI
        throw error instanceof Error ? error : new Error('Login failed');
      }
    },
    [
      dispatch,
      navigate,
      httpClient,
      tokenService,
      checkAuthStatusDebounced,
      startTokenRefresh,
      startActivityMonitoring,
      getIntendedDestination,
      clearIntendedDestination,
    ]
  );

  const register = useCallback(
    async (email: string, password: string, username: string, firstName: string, lastName: string, type: string) => {
      const response = await httpClient.post<RegisterResponse>('/api/auth/register', {
        email,
        password,
        username,
        firstName,
        lastName,
        type,
      });
      if (response.accessToken) {
        tokenService.setTokens(response.accessToken);
        dispatch(setTokens({ accessToken: response.accessToken, refreshToken: '' }));

        // Get user info
        await checkAuthStatusDebounced();

        // Start monitoring
        startTokenRefresh();
        startActivityMonitoring();

        // Navigate to intended destination
        const destination = getIntendedDestination();
        await navigate(destination);
        clearIntendedDestination(); // Clear intended destination after successful navigation
      }
    },
    [httpClient, tokenService, checkAuthStatusDebounced, startTokenRefresh, startActivityMonitoring]
  );

  // Logout function
  const logout = useCallback(async () => {
    await handleLogout();
  }, [handleLogout]);

  // Clear error function
  const clearAuthError = () => {
    dispatch(clearError());
  };

  // Handle authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      startTokenRefresh();
      startActivityMonitoring();
    } else {
      stopTokenRefresh();
      stopActivityMonitoring();
    }
  }, [isAuthenticated, startTokenRefresh, startActivityMonitoring, stopTokenRefresh, stopActivityMonitoring]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTokenRefresh();
      stopActivityMonitoring();
    };
  }, [stopTokenRefresh, stopActivityMonitoring]);

  // Context value
  const contextValue: AuthContextType = {
    register,
    login,
    logout,
    isAuthenticated,
    isLoading: isLoading || isInitializing,
    error,
    user,
    clearError: clearAuthError,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
