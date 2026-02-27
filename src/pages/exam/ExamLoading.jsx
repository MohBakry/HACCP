import React from 'react';
import LoadingSpinner from '../../shared/LoadingSpinner';

export default function ExamLoading() {
  return (
    <div className="container my-5 text-center">
      <LoadingSpinner />
      <p>Loading exam...</p>
    </div>
  );
}
