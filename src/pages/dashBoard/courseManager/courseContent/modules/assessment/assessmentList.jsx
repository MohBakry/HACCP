// assessments/AssessmentList.jsx
import AssessmentItem from './assessmentItem';

const AssessmentList = ({ assessments = [], onDelete }) => {
  if (!assessments.length) {
    return <p className="text-muted">No assessments yet</p>;
  }

  return (
    <>
      {assessments.map((assessment) => (
        <AssessmentItem
          key={assessment._id}
          assessment={assessment}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default AssessmentList;
