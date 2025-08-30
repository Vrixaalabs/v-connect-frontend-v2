import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast component
const ToastComponent: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  const icons = {
    success: <CheckCircle className='h-5 w-5 text-green-500' />,
    error: <AlertCircle className='h-5 w-5 text-red-500' />,
    warning: <AlertTriangle className='h-5 w-5 text-yellow-500' />,
    info: <Info className='h-5 w-5 text-blue-500' />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration ?? 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out
        transform translate-x-0 opacity-100 max-w-sm w-full
        ${bgColors[toast.type]}
      `}
    >
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>{icons[toast.type]}</div>
        <div className='flex-1 min-w-0'>
          <h4 className='text-sm font-semibold text-gray-900'>{toast.title}</h4>
          {toast.description && <p className='mt-1 text-sm text-gray-600'>{toast.description}</p>}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className='flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className='fixed top-4 right-4 z-50 space-y-2'>
        {toasts.map(toast => (
          <ToastComponent key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Convenience hook for common toast types
export const useToastHelpers = () => {
  const { addToast } = useToast();

  const success = useCallback(
    (title: string, description?: string): void => {
      addToast({ title, description, type: 'success' });
    },
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: string): void => {
      addToast({ title, description, type: 'error' });
    },
    [addToast]
  );

  const warning = useCallback(
    (title: string, description?: string): void => {
      addToast({ title, description, type: 'warning' });
    },
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: string): void => {
      addToast({ title, description, type: 'info' });
    },
    [addToast]
  );

  return {
    success,
    error,
    warning,
    info,
  };
};
