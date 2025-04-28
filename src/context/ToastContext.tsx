import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'info' | 'success' | 'warning' | 'error';
type HorizontalPlacement = 'start' | 'center' | 'end';
type VerticalPlacement = 'top' | 'middle' | 'bottom';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  horizontal?: HorizontalPlacement;
  vertical?: VerticalPlacement;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7); // Generate a unique ID
    const { message, type, horizontal = 'center', vertical = 'bottom' } = toast; // Default values
    setToasts((prev) => [...prev, { id, message, type, horizontal, vertical }]);

    // Remove toast after 5 seconds
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
