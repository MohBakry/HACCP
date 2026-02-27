import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="text-center py-5">
      <Spinner
        animation="grow"
        style={{ color: '#83c7d0', width: '7rem', height: '7rem' }}
      />
      <span
        className="mt-2 d-block"
        style={{ fontSize: '1.5rem', fontWeight: 300 }}
      >
        {message}
      </span>
    </div>
  );
};

export default LoadingSpinner;
