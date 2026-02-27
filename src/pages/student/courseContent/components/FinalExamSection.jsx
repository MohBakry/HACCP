import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function FinalExamSection({
  allModulesCompleted,
  hasPassedFinalExam,
  hasFailedFinalExam,
  courseId,
  groupId,
  modulesLength,
  courseName = 'Course',
}) {
  const navigate = useNavigate();

  if (allModulesCompleted) {
    return (
      <div className="text-center mt-5">
        <div
          className={`alert ${hasFailedFinalExam ? 'alert-warning' : 'alert-success'} d-inline-block`}
        >
          <i
            className={`fa ${hasFailedFinalExam ? 'fa-info-circle' : 'fa-check-circle'} me-2`}
          ></i>
          {hasFailedFinalExam
            ? 'Good luck next time!'
            : "Congratulations! You've completed all modules."}
        </div>
        <div>
          {hasPassedFinalExam ? (
            <Button
              variant="success"
              size="lg"
              onClick={() =>
                navigate('/certificate', {
                  state: {
                    courseName: courseName,
                    completedDate: new Date().toISOString(),
                    certificateId: `CERT-${courseId}-${Date.now()}`,
                  },
                })
              }
            >
              <i className="fa fa-certificate me-2"></i>
              Generate Certificate
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/exam/${courseId}/${groupId}`)}
            >
              <i className="fa fa-clipboard-check me-2"></i>
              Take Final Exam
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (modulesLength > 0) {
    return (
      <div className="text-center mt-5">
        <div className="alert alert-info d-inline-block">
          <i className="fa fa-info-circle me-2"></i>
          Complete all modules and pass assessments to unlock the final exam
        </div>
      </div>
    );
  }

  return null;
}
