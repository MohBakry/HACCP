import React from 'react';
import { useField } from 'formik';

const SwitchInput = ({
  name,
  label,
  disabled = false,
  readOnly = false,
  onChange,
}) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  const handleChange = (e) => {
    const checked = e.target.checked;
    helpers.setValue(checked);

    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="mb-3 d-flex">
      <label className="form-check-label me-2" htmlFor={name}>
        {label}
      </label>
      <div className="form-check form-switch">
        <input
          type="checkbox"
          className={`form-check-input ${
            meta.touched && meta.error ? 'is-invalid' : ''
          }`}
          id={name}
          checked={!!field.value}
          onChange={handleChange}
          disabled={disabled || readOnly}
        />
      </div>

      {meta.touched && meta.error && (
        <div className="invalid-feedback d-block">{meta.error}</div>
      )}
    </div>
  );
};

export default SwitchInput;
