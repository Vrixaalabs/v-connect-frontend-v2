import { config } from './config';

interface ApiError {
  message: string;
  status?: number;
}

interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error = (await response.json().catch(() => ({ message: 'An error occurred' }))) as ApiError;
    throw new Error(error.message ?? 'An error occurred');
  }

  const data = (await response.json()) as T;
  return { data };
}

export async function apiGet<T>(endpoint: string, headers = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    method: 'GET',
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
  });
  return handleResponse<T>(response);
}

export async function apiPost<T>(endpoint: string, body: unknown, headers = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    method: 'POST',
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function apiPut<T>(endpoint: string, body: unknown, headers = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    method: 'PUT',
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function apiDelete<T>(endpoint: string, headers = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    method: 'DELETE',
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
  });
  return handleResponse<T>(response);
}
