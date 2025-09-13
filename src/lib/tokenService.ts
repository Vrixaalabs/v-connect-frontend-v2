import { config } from './config';

export interface TokenData {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export type UserRole = 'super_admin' | 'admin' | 'member';

export interface DecodedToken {
  userId: string;
  type: string;
  role: UserRole;
  instituteId?: string;
  iat: number;
  exp: number;
  isVerified: boolean;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshErrorResponse {
  message: string;
  code?: string;
}

class TokenService {
  private static instance: TokenService;
  private refreshPromise: Promise<TokenData> | null = null;

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  // Store tokens securely
  setTokens(accessToken: string, refreshToken?: string): void {
    try {
      const decoded = this.decodeToken(accessToken);
      console.log('decoded', decoded);
      const expiresAt = decoded.exp * 1000; // Convert to milliseconds

      const tokenData: TokenData = {
        accessToken,
        refreshToken,
        expiresAt,
      };

      // Store in localStorage (you could also use sessionStorage for session-only tokens)
      localStorage.setItem('auth_tokens', JSON.stringify(tokenData));

      // Also store access token separately for easy access
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('is_verified', decoded.isVerified.toString());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to store tokens:', error);
      this.clearTokens();
    }
  }

  // Get stored tokens
  getTokens(): TokenData | null {
    try {
      const stored = localStorage.getItem('auth_tokens');
      if (!stored) {
        return null;
      }

      const tokenData = JSON.parse(stored) as TokenData;

      // Check if access token is expired
      if (Date.now() >= tokenData.expiresAt) {
        this.clearTokens();
        return null;
      }

      return tokenData;
    } catch {
      // eslint-disable-next-line no-console
      console.error('Failed to get tokens');
      this.clearTokens();
      return null;
    }
  }

  // Get access token
  getAccessToken(): string | null {
    const tokens = this.getTokens();
    return tokens?.accessToken ?? null;
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const tokens = this.getTokens();
    if (!tokens) {
      return true;
    }

    // Add 30 second buffer to prevent edge cases
    return Date.now() >= tokens.expiresAt - 30000;
  }

  // Check if token will expire soon (within 5 minutes)
  isTokenExpiringSoon(): boolean {
    const tokens = this.getTokens();
    if (!tokens) {
      return true;
    }

    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() >= tokens.expiresAt - fiveMinutes;
  }

  // Decode JWT token
  decodeToken(token: string): DecodedToken {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload) as DecodedToken;
    } catch {
      throw new Error('Invalid token format');
    }
  }

  // Validate token structure and expiration
  validateToken(token: string): boolean {
    try {
      const decoded = this.decodeToken(token);
      const now = Math.floor(Date.now() / 1000);

      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  // Refresh token with automatic retry and deduplication
  async refreshToken(): Promise<TokenData> {
    // If already refreshing, return the existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<TokenData> {
    try {
      const tokens = this.getTokens();
      if (!tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${config.apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for refresh token
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as RefreshErrorResponse;

        // Handle specific error cases
        if (errorData.code === 'TOKEN_REUSE_DETECTED') {
          this.clearTokens();
          throw new Error('Security compromised - please login again');
        }

        throw new Error(errorData.message ?? 'Token refresh failed');
      }

      const data = (await response.json()) as RefreshResponse;

      // Store new tokens
      this.setTokens(data.accessToken, data.refreshToken);

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: this.decodeToken(data.accessToken).exp * 1000,
      };
    } catch {
      // Clear tokens on refresh failure
      this.clearTokens();
      throw new Error('Token refresh failed');
    }
  }

  // Clear all stored tokens
  clearTokens(): void {
    localStorage.removeItem('auth_tokens');
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_verified');
  }

  // Get user ID from token
  getUserId(): string | null {
    try {
      const token = this.getAccessToken();
      if (!token) {
        return null;
      }

      const decoded = this.decodeToken(token);
      return decoded.userId;
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const tokens = this.getTokens();
    console.log('tokens from token service');
    console.log(tokens);
    if (!tokens) {
      return false;
    }

    return this.validateToken(tokens.accessToken) && !this.isTokenExpired();
  }
}

export default TokenService;
