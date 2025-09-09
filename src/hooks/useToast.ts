import { useToast as useToastContext, type ToastType } from '../components/ui/toast';

/**
 * Custom hook for easy toast usage throughout the app
 * Provides simple methods for showing different types of toasts
 */
export const useToast = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { addToast } = useToastContext() as any;

  const showToast = (title: string, description?: string, type: ToastType = 'info', duration?: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    addToast({ title, description, type, duration });
  };

  const success = (title: string, description?: string, duration?: number) => {
    showToast(title, description, 'success', duration);
  };

  const error = (title: string, description?: string, duration?: number) => {
    showToast(title, description, 'error', duration);
  };

  const warning = (title: string, description?: string, duration?: number) => {
    showToast(title, description, 'warning', duration);
  };

  const info = (title: string, description?: string, duration?: number) => {
    showToast(title, description, 'info', duration);
  };

  return {
    showToast,
    success,
    error,
    warning,
    info,
  };
};
