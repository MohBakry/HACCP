import React, { createContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, variant = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message, duration) =>
    showToast(message, 'success', duration);
  const showError = (message, duration) =>
    showToast(message, 'danger', duration);
  const showWarning = (message, duration) =>
    showToast(message, 'warning', duration);
  const showInfo = (message, duration) => showToast(message, 'info', duration);

  return (
    <ToastContext.Provider
      value={{ showToast, showSuccess, showError, showWarning, showInfo }}
    >
      {children}
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            show={true}
            onClose={() => removeToast(toast.id)}
            delay={toast.duration}
            autohide
            bg={toast.variant}
          >
            <Toast.Header>
              <strong className="me-auto">
                {toast.variant === 'success'
                  ? 'Success'
                  : toast.variant === 'danger'
                    ? 'Error'
                    : toast.variant === 'warning'
                      ? 'Warning'
                      : 'Info'}
              </strong>
            </Toast.Header>
            <Toast.Body
              className={
                toast.variant === 'success' ||
                toast.variant === 'danger' ||
                toast.variant === 'warning'
                  ? 'text-white'
                  : ''
              }
            >
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
