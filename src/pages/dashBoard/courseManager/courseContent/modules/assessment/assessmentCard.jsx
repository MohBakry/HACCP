// assessments/AssessmentCard.jsx
const AssessmentCard = ({ assessment, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-2 mb-2">
      <h6>{assessment.title}</h6>
      <div dangerouslySetInnerHTML={{ __html: assessment.description }} />
      <div className="mt-2">
        <button onClick={onEdit} className="btn btn-sm btn-link">
          Edit
        </button>
        <button onClick={onDelete} className="btn btn-sm btn-link text-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default AssessmentCard;
