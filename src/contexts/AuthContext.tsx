import { createContext } from 'react';
import type { User } from '../store/slices/authSlice';

export interface AuthContextType {
  register: (email: string, password: string, username: string, firstName: string, lastName: string, type: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
