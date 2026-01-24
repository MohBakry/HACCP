import React from 'react';
import SearchInput from '../searchInput';
import SelectInput from './SelectInput';
import styles from './styles.module.css';

const Filters = ({
  filters,
  onChange,
  onReset,
  selects = [],
  showSearch = true,
}) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className={'w-100'}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <div className="d-flex">
          <div className="d-flex">
            {showSearch && (
              <SearchInput
                value={filters.search || ''}
                onChange={(value) => handleChange('search', value)}
                placeholder="Search..."
              />
            )}
            <div className="mx-3">
              {selects.map((select) => (
                <SelectInput
                  key={select.key}
                  value={filters[select.key] || ''}
                  onChange={(value) => handleChange(select.key, value)}
                  options={select.options}
                  placeholder={select.placeholder}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <button
            className="text-secondary btn btn-link px-2"
            onClick={onReset}
          >
            <i className="fa fa-undo me-1"></i> Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
