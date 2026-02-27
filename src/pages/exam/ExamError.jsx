import React from 'react';

export default function ExamError({ error, onGoBack }) {
  return (
    <div className="container my-5">
      <div className="alert alert-danger" role="alert">
        <h5>Error</h5>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={onGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
}
