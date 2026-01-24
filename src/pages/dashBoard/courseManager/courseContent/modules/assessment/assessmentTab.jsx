// assessments/AssessmentsTab.jsx
import { useState } from 'react';
import AssessmentFormModal from './assessmentForm';

const AssessmentsTab = ({ module }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setShow(true)}
      >
        + Add Assessment
      </button>

      {module.assessments.map((a) => (
        <div key={a._id}>{a.title}</div>
      ))}

      <AssessmentFormModal show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default AssessmentsTab;
