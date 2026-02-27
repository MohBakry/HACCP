// AssessmentSubmissionsManagement.jsx - Refactored with shared Table and Filters
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Table from '../../../../shared/table/';
import Filters from '../../../../shared/filters/Filters';
import StudentAnswerViewerModal from './assessment/StudentAnswerViewerModal';
import FeedbackGradeModal from './assessment/FeedbackGradeModal';
import LoadingOverlay from '../../../../shared/overlay/loadingOverlay';
import { useToast } from '../../../../shared/toast/useToast';
import { FaEye, FaComment } from 'react-icons/fa';
import {
  getAssessmentSubmissions,
  submitAssessmentFeedback,
} from '../../../../Redux/courseContent/courseContent.service';
import styles from './assessment/styles.module.css';

const AssessmentSubmissionsManagement = () => {
  const dispatch = useDispatch();
  const { courseId, groupId, studentId } = useParams();
  const { showSuccess, showError } = useToast();

  const { loading } = useSelector((state) => state.courseContent);
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',
    module: 'all',
    assessment: 'all',
  });

  // Modal states
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Fetch submissions on component mount
  useEffect(() => {
    if (courseId && groupId && submissions.length === 0) {
      dispatch(getAssessmentSubmissions({ courseId, groupId, studentId }))
        .unwrap()
        .then((data) => {
          setSubmissions(data);
          setFilteredSubmissions(data);
        })
        .catch((err) => {
          showError(err || 'Failed to load submissions');
        });
    }
  }, [courseId, groupId, studentId, dispatch, submissions.length]);

  // Filter submissions based on selected filters
  useEffect(() => {
    let filtered = submissions.slice();

    if (filters.status === 'pending') {
      filtered = filtered.filter((s) => !s.feedback);
    } else if (filters.status === 'graded') {
      filtered = filtered.filter((s) => s.feedback);
    }

    if (filters.module !== 'all') {
      filtered = filtered.filter((s) => s.moduleId === filters.module);
    }

    if (filters.assessment !== 'all') {
      filtered = filtered.filter((s) => s.assessmentId === filters.assessment);
    }

    setFilteredSubmissions(filtered);
  }, [submissions, filters]);

  // Handle view answer
  const handleViewAnswer = (submission) => {
    setSelectedSubmission(submission);
    setShowAnswerModal(true);
  };

  // Handle add/edit feedback
  const handleAddFeedback = (submission) => {
    setSelectedSubmission(submission);
    setShowFeedbackModal(true);
  };

  // Handle submit feedback
  const handleSubmitFeedback = async (values) => {
    try {
      await dispatch(
        submitAssessmentFeedback({
          id: selectedSubmission._id,
          score: parseInt(values.score),
          feedback: values.feedback,
        })
      ).unwrap();

      showSuccess('Feedback submitted successfully!');
      setShowFeedbackModal(false);

      // Refresh submissions
      dispatch(getAssessmentSubmissions({ courseId, groupId, studentId }))
        .unwrap()
        .then((data) => {
          setSubmissions(data);
        });
    } catch (err) {
      showError(err || 'Failed to submit feedback');
    }
  };

  // Calculate statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => !s.feedback).length,
    graded: submissions.filter((s) => s.feedback).length,
    avgScore:
      submissions.filter((s) => s.feedback).length > 0
        ? (
            submissions
              .filter((s) => s.feedback)
              .reduce((sum, s) => sum + s.feedback.score, 0) /
            submissions.filter((s) => s.feedback).length
          ).toFixed(1)
        : 0,
  };

  // Get unique modules and assessments for filter dropdowns
  const uniqueModules = [...new Set(submissions.map((s) => s.moduleId))].map(
    (id) => {
      const submission = submissions.find((s) => s.moduleId === id);
      return { value: id, label: submission?.moduleName || id };
    }
  );

  const uniqueAssessments = [
    ...new Set(submissions.map((s) => s.assessmentId)),
  ].map((id) => {
    const submission = submissions.find((s) => s.assessmentId === id);
    return { value: id, label: submission?.assessmentTitle || id };
  });

  // Prepare filter options for shared Filters component
  const filterOptions = [
    {
      key: 'status',
      placeholder: 'Filter by Status',
      options: [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending Review' },
        { value: 'graded', label: 'Graded' },
      ],
    },
    ...(uniqueModules.length > 0
      ? [
          {
            key: 'module',
            placeholder: 'Filter by Module',
            options: [{ value: 'all', label: 'All Modules' }, ...uniqueModules],
          },
        ]
      : []),
    ...(uniqueAssessments.length > 0
      ? [
          {
            key: 'assessment',
            placeholder: 'Filter by Assessment',
            options: [
              { value: 'all', label: 'All Assessments' },
              ...uniqueAssessments,
            ],
          },
        ]
      : []),
  ];

  // Prepare table data - Badge components
  const getStatusBadge = (submission) => {
    if (submission.feedback) {
      return <span className="badge bg-success">Graded</span>;
    }
    return <span className="badge bg-warning">Pending Review</span>;
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return <span className="badge bg-success">{score}</span>;
    if (score >= 60) return <span className="badge bg-info">{score}</span>;
    return <span className="badge bg-danger">{score}</span>;
  };

  // Table columns definition
  const tableColumns = [
    {
      key: 'studentName',
      label: 'Student Name',
      component: (item) => (
        <div>
          <strong>{item.studentName}</strong>
          <br />
          <small className="text-muted">{item.studentEmail}</small>
        </div>
      ),
    },
    {
      key: 'moduleName',
      label: 'Module',
    },
    {
      key: 'assessmentName',
      label: 'Assessment',
    },
    {
      key: 'submittedAt',
      label: 'Submitted Date',
      component: (item) => (
        <small>{new Date(item.submittedAt).toLocaleString()}</small>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      component: (item) => getStatusBadge(item),
    },
    {
      key: 'score',
      label: 'Score',
      render: (item) =>
        item.feedback ? (
          getScoreBadge(item.feedback.score)
        ) : (
          <span className="text-muted">-</span>
        ),
    },
  ];

  // Custom actions for table - View & Grade icons
  const customActions = (submission) => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <FaEye
        onClick={() => handleViewAnswer(submission)}
        style={{
          cursor: 'pointer',
          color: '#0d6efd',
          fontSize: '16px',
        }}
        title="View student answer"
      />
      <FaComment
        onClick={() => handleAddFeedback(submission)}
        style={{
          cursor: 'pointer',
          color: submission.feedback ? '#ffc107' : '#28a745',
          fontSize: '16px',
        }}
        title={submission.feedback ? 'Edit feedback' : 'Add feedback'}
      />
    </div>
  );

  return (
    <div className={styles.submissionsContainer}>
      <h2 className="mb-4">
        <i className="fas fa-tasks me-2"></i> Assessment Submissions
      </h2>

      {/* Statistics Cards */}
      <Row className={styles.statsCards}>
        <Col>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Submissions</div>
          </div>
        </Col>
        <Col>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#ffc107' }}>
              {stats.pending}
            </div>
            <div className={styles.statLabel}>Pending Review</div>
          </div>
        </Col>
        <Col>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#28a745' }}>
              {stats.graded}
            </div>
            <div className={styles.statLabel}>Graded</div>
          </div>
        </Col>
        <Col>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#17a2b8' }}>
              {stats.avgScore}
            </div>
            <div className={styles.statLabel}>Average Score</div>
          </div>
        </Col>
      </Row>

      {/* Filters - Using Shared Filters Component */}
      <div style={{ marginBottom: '20px' }}>
        <Filters
          filters={filters}
          onChange={setFilters}
          onReset={() =>
            setFilters({ status: 'all', module: 'all', assessment: 'all' })
          }
          selects={filterOptions}
          showSearch={false}
        />
      </div>

      {/* Submissions Table - Using Shared Table Component */}
      {/* <div className={styles.tableContainer}> */}
      <LoadingOverlay
        show={loading.getAssessmentSubmissions}
        text="Loading submissions..."
      />
      {filteredSubmissions.length > 0 ? (
        <Table
          data={filteredSubmissions.map((s) => ({ ...s, id: s._id }))}
          columns={tableColumns}
          customActions={customActions}
        />
      ) : (
        <div className={styles.noData}>
          <i className="fas fa-inbox fa-2x mb-3" style={{ color: '#ccc' }}></i>
          <p>No submissions found matching your filters</p>
        </div>
      )}
      {/* </div> */}

      {/* Modals */}
      <StudentAnswerViewerModal
        show={showAnswerModal}
        onHide={() => setShowAnswerModal(false)}
        submission={selectedSubmission}
      />

      <FeedbackGradeModal
        show={showFeedbackModal}
        onHide={() => setShowFeedbackModal(false)}
        submission={selectedSubmission}
        onSubmit={handleSubmitFeedback}
        loading={loading.submitAssessmentFeedback}
      />
    </div>
  );
};

export default AssessmentSubmissionsManagement;
