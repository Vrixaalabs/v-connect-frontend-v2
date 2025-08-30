import { config } from './config';
import TokenService from './tokenService';

export interface RequestConfig extends RequestInit {
  skipAuth?: boolean;
  retryCount?: number;
}

class HttpClient {
  private static instance: HttpClient;
  private baseURL: string;
  private tokenService: TokenService;

  private constructor() {
    this.baseURL = config.apiUrl;
    this.tokenService = TokenService.getInstance();
  }

  static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  // Generic request method with automatic token handling
  async request<T = unknown>(endpoint: string, options: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, retryCount = 0, ...requestOptions } = options;

    try {
      // Add authentication header if not skipped
      if (!skipAuth) {
        const token = this.tokenService.getAccessToken();
        if (token) {
          requestOptions.headers = {
            ...requestOptions.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      // Add default headers
      const headers = {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...requestOptions,
        headers,
        credentials: 'include', // Always include cookies for refresh tokens
      });

      // Handle authentication errors
      if (response.status === 401 && !skipAuth && retryCount === 0) {
        // Try to refresh token
        try {
          await this.tokenService.refreshToken();
          // Retry the request with new token
          return this.request(endpoint, { ...options, retryCount: retryCount + 1 });
        } catch {
          // Refresh failed, redirect to login
          this.handleAuthFailure();
          throw new Error('Authentication failed');
        }
      }

      // Handle other errors
      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(errorData.message ?? `HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse response
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return response.json() as Promise<T>;
      }

      return response.text() as Promise<T>;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  // GET request
  async get<T = unknown>(endpoint: string, options: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  async post<T = unknown>(endpoint: string, data?: unknown, options: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T = unknown>(endpoint: string, data?: unknown, options: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T = unknown>(endpoint: string, options: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // PATCH request
  async patch<T = unknown>(endpoint: string, data?: unknown, options: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // Handle authentication failure
  private handleAuthFailure(): void {
    this.tokenService.clearTokens();

    // Dispatch custom event for auth failure
    window.dispatchEvent(
      new CustomEvent('auth:failed', {
        detail: { reason: 'token_expired' },
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  // Get current access token
  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  // Clear all tokens
  clearTokens(): void {
    this.tokenService.clearTokens();
  }
}

export default HttpClient;
