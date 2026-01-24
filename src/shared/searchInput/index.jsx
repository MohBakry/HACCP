import React from 'react';
import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`${styles.wrapper} ${className} `}>
      <FaSearch className={styles.icon} />
      <input
        type="text"
        className={`form-control ${styles.input} rounded-5`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
