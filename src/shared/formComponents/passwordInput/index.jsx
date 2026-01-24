import React, { useState } from 'react';
import { useField } from 'formik';
import styles from './styles.module.css';

const PasswordInput = ({
  name,
  label,
  placeholder = 'Password',
  disabled = false,
  labelClassName,
  required,
}) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = meta.touched && meta.error;

  return (
    <div className="mb-3">
      {label && (
        <label
          htmlFor={name}
          className={`form-label ${labelClassName} ${
            required && styles.required
          }`}
        >
          {label}
        </label>
      )}

      <div className="input-group">
        <input
          {...field}
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-control ${hasError ? 'is-invalid' : ''}`}
        />

        <span
          className="input-group-text"
          role="button"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
        </span>

        {hasError && <div className="invalid-feedback">{meta.error}</div>}
      </div>
    </div>
  );
};

export default PasswordInput;
