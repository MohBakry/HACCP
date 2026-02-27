import React from 'react';
import { Alert, Button, Badge } from 'react-bootstrap';
import styles from '../styles.module.css';

export default function ModuleItem({
  module,
  moduleProgress,
  moduleStatus,
  isExpanded,
  isLast,
  onToggleExpand,
  onOpenMaterial,
  onOpenAssessment,
}) {
  return (
    <div className={styles.modulePathItem}>
      {/* Module Row */}
      <div className={styles.moduleRow}>
        {/* Order Circle */}
        <div
          className={styles.orderCircle}
          style={{ border: `2px solid ${moduleStatus.color}` }}
        >
          <div className={styles.moduleStatusIcon}>
            <i
              className={`fas ${moduleStatus.icon}`}
              style={{ color: moduleStatus.color }}
            ></i>
          </div>
        </div>

        {/* Module Card */}
        <div
          className={`${styles.moduleCard} ${isExpanded ? styles.expanded : ''}`}
        >
          <div
            className={styles.moduleCardHeader}
            onClick={() => onToggleExpand(module._id)}
          >
            <div className={styles.moduleStatusIcon}>
              <i
                className={`fas ${moduleStatus.icon}`}
                style={{ color: moduleStatus.color }}
              ></i>
            </div>
            <div className={styles.moduleInfo}>
              <h5>{module.title}</h5>
              {moduleProgress && moduleProgress.status === 'passed' && (
                <div className="small text-muted">
                  <i
                    className="fas fa-check me-1"
                    style={{ color: moduleStatus.color }}
                  ></i>
                  {moduleProgress.assessmentGrade?.replace(/_/g, ' ')} (
                  {moduleProgress.assessmentScore}%)
                </div>
              )}
              <div className={styles.moduleMeta}>
                {module.moduleVideoUrl && (
                  <span>
                    <i className="fas fa-video me-1"></i>
                    Video
                  </span>
                )}
                {module.materials?.length > 0 && (
                  <span>
                    <i className="fas fa-file me-1"></i>
                    {module.materials.length} Material
                    {module.materials.length > 1 ? 's' : ''}
                  </span>
                )}
                {module.assessments.length > 0 && (
                  <span>
                    <i className="fas fa-clipboard-check me-1"></i>
                    {module.assessments.length} Assessment
                    {module.assessments.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            <div className={styles.expandIcon}>
              <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
            </div>
          </div>

          {/* Expanded Module Details */}
          {isExpanded && (
            <div className={styles.moduleDetails}>
              {/* Video Section */}
              {module.moduleVideoUrl && (
                <div className={styles.moduleSection}>
                  <h6 className={styles.sectionTitle}>
                    <i className="fas fa-video me-2"></i>Video Content
                  </h6>
                  <div className={styles.videoContainer}>
                    <iframe
                      width="100%"
                      height="400"
                      src={module.moduleVideoUrl}
                      title={module.title}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Module Content/Description */}
              {module.content && (
                <div className={styles.moduleSection}>
                  <h6 className={styles.sectionTitle}>
                    <i className="fas fa-align-left me-2"></i>
                    Content
                  </h6>
                  <div
                    className={styles.moduleContent}
                    dangerouslySetInnerHTML={{
                      __html: module.content,
                    }}
                  />
                </div>
              )}

              {/* Materials Section */}
              {module.materials && module.materials.length > 0 && (
                <div className={styles.moduleSection}>
                  <h6 className={styles.sectionTitle}>
                    <i className="fas fa-folder-open me-2"></i>
                    Materials ({module.materials.length})
                  </h6>
                  <div className={styles.materialsList}>
                    {module.materials.map((material) => (
                      <div key={material._id} className={styles.materialItem}>
                        <div className={styles.materialInfo}>
                          <i className="fas fa-file me-2"></i>
                          <span>{material.fileName}</span>
                        </div>
                        <button
                          className={`btn btn-sm ${styles.viewButton}`}
                          onClick={() => onOpenMaterial(material)}
                        >
                          <i className="fas fa-eye me-1"></i>
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Assessment Section */}
              {module.assessments && module.assessments.length > 0 && (
                <div className={styles.moduleSection}>
                  <h6 className={styles.sectionTitle}>
                    <i className="fas fa-clipboard-check me-2"></i>
                    Assessments ({module.assessments.length})
                  </h6>
                  <div className={styles.assessmentsList}>
                    {module.assessments.map((assessment) => {
                      const studentSubmission = assessment.studentSubmission;
                      const getStatusVariant = () => {
                        if (!studentSubmission) return 'secondary';
                        if (
                          studentSubmission.status === 'approved' ||
                          studentSubmission.status === 'passed'
                        )
                          return 'success';
                        if (
                          studentSubmission.status === 'submitted' ||
                          studentSubmission.status === 'underReview'
                        )
                          return 'warning';
                        return 'danger';
                      };

                      return (
                        <Alert
                          key={assessment._id}
                          variant={getStatusVariant()}
                          className={styles.assessmentAlert}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className="mb-2">
                                <i className="fas fa-file-alt me-2"></i>
                                {assessment.title}
                              </h6>
                              {assessment.description && (
                                <div
                                  className="text-muted small mb-2"
                                  dangerouslySetInnerHTML={{
                                    __html: assessment.description,
                                  }}
                                />
                              )}

                              {studentSubmission ? (
                                <>
                                  <div className="mt-2">
                                    <strong>Status:</strong>{' '}
                                    <Badge bg={getStatusVariant()}>
                                      {studentSubmission.status}
                                    </Badge>
                                  </div>
                                  {studentSubmission.score !== null &&
                                    studentSubmission.score !== undefined && (
                                      <div className="mt-2">
                                        <strong>Score:</strong>{' '}
                                        <span
                                          className="fw-bold"
                                          style={{
                                            color:
                                              studentSubmission.score >= 80
                                                ? '#28a745'
                                                : studentSubmission.score >= 60
                                                  ? '#17a2b8'
                                                  : '#dc3545',
                                          }}
                                        >
                                          {studentSubmission.score}%
                                        </span>
                                      </div>
                                    )}
                                  {studentSubmission.feedback && (
                                    <div className="mt-2">
                                      <strong>Feedback:</strong>
                                      <p
                                        className="mb-0 mt-1 small"
                                        dangerouslySetInnerHTML={{
                                          __html: studentSubmission.feedback,
                                        }}
                                      ></p>
                                    </div>
                                  )}
                                  {studentSubmission.submittedAt && (
                                    <div className="mt-2">
                                      <small className="text-muted">
                                        Submitted:{' '}
                                        {new Date(
                                          studentSubmission.submittedAt
                                        ).toLocaleString()}
                                      </small>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className="text-muted small mb-0 mt-2">
                                  Complete this assessment to progress in the
                                  course.
                                </p>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant={
                                studentSubmission?.status === 'rejected' ||
                                studentSubmission?.status === 'failed'
                                  ? 'warning'
                                  : studentSubmission
                                    ? 'outline-primary d-none'
                                    : 'primary'
                              }
                              onClick={() =>
                                onOpenAssessment(module, assessment)
                              }
                              className="ms-3"
                            >
                              {studentSubmission?.status === 'rejected' ||
                              studentSubmission?.status === 'failed' ? (
                                <>
                                  <i className="fas fa-redo me-1"></i>
                                  Resubmit
                                </>
                              ) : studentSubmission ? (
                                <div className="d-none">
                                  <i className="fas fa-eye me-1"></i>
                                  View
                                </div>
                              ) : (
                                <>
                                  <i className="fas fa-upload me-1"></i>
                                  Submit
                                </>
                              )}
                            </Button>
                          </div>
                        </Alert>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Connecting Line */}
      {!isLast && <div className={styles.connectingLine}></div>}
    </div>
  );
}
