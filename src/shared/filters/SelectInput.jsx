import React from 'react';
import styles from './styles.module.css';

const SelectInput = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  className = '',
  disabled = false,
}) => {
  return (
    <select
      className={`form-select ${styles.select} ${className} rounded-5`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
