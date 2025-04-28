import React from 'react';
import { useToast } from 'context/ToastContext';

const Toast: React.FC = () => {
  const { toasts } = useToast();

  return (
    <>
      {toasts.map(({ id, message, type, horizontal = 'center', vertical = 'bottom' }) => {
        const placementClass = `toast toast-${horizontal} toast-${vertical}`;
        const alertClass = `alert alert-${type}`;

        return (
          <div key={id} className={placementClass}>
            <div className={alertClass}>
              <span>{message}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Toast;
