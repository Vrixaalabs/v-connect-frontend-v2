import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { config } from '../../lib/config';
import type { Organization } from '@/types/organization';

// Types
export interface User {
  userId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Computed properties
export interface UserWithComputed extends User {
  id: string; // Alias for userId
  name: string; // Computed from firstName + lastName
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isRefreshing: boolean;
  lastActivity: number | null;
  currentBranchId: string | null;
  organizations: Organization[] | null;
  currentOrganization: Organization | null;
}

// API Response types
interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthStatusResponse {
  user: User;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  isRefreshing: false,
  lastActivity: null,
  currentBranchId: null,
  organizations: null,
  currentOrganization: null,
};

// Async thunks
export const loginUser = createAsyncThunk('auth/login', async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      throw new Error(errorData.message ?? 'Login failed');
    }

    const data = (await response.json()) as LoginResponse;
    return data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
  }
});

export const refreshToken = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = (await response.json()) as RefreshResponse;
    return data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Token refresh failed');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  try {
    await fetch(`${config.apiUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // Even if logout fails on server, we clear local state
    return true;
  } catch {
    // Return true to clear local state even if server logout fails
    return true;
  }
});

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${config.apiUrl}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Authentication check failed');
    }

    const data = (await response.json()) as AuthStatusResponse;
    return data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Authentication check failed');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    updateLastActivity: state => {
      state.lastActivity = Date.now();
    },
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.lastActivity = Date.now();
    },
    clearTokens: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.lastActivity = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentBranchId = null;
    },
    setCurrentBranchId: (state, action: PayloadAction<string>) => {
      state.currentBranchId = action.payload;
    },
    clearCurrentBranchId: state => {
      state.currentBranchId = null;
    },
    setCurrentOrganization: (state, action: PayloadAction<Organization>) => {
      state.currentOrganization = action.payload;
    },
    clearCurrentOrganization: state => {
      state.currentOrganization = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.lastActivity = Date.now();
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      });

    // Refresh token
    builder
      .addCase(refreshToken.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.lastActivity = Date.now();
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
        // Don't clear user immediately, let the auth provider handle it
      });

    // Logout
    builder
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.lastActivity = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, state => {
        state.isLoading = false;

        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.lastActivity = null;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.lastActivity = Date.now();
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoading,
  setError,
  clearError,
  updateLastActivity,
  setTokens,
  clearTokens,
  setUser,
  clearUser,
  setCurrentBranchId,
  clearCurrentBranchId,
  setCurrentOrganization,
  clearCurrentOrganization,
} = authSlice.actions;

export default authSlice.reducer;
