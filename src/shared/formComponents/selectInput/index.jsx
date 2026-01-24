import React from 'react';
import { useField } from 'formik';

const SelectInput = ({
  name,
  label,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  readOnly = false,
  required = false,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    const value = e.target.value;
    helpers.setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="mb-3">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        id={name}
        className={`form-select ${
          meta.touched && meta.error ? 'is-invalid' : ''
        }`}
        value={field.value ?? ''}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
        disabled={disabled || readOnly}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && (
        <div className="invalid-feedback">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectInput;
