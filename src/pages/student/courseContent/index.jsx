import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import CourseOverview from './components/CourseOverview';
import ModuleItem from './components/ModuleItem';
import MaterialPreviewModal from './components/MaterialPreviewModal';
import AssessmentSubmissionModal from './components/AssessmentSubmissionModal';
import FinalExamSection from './components/FinalExamSection';
import {
  getStudentCourseContent,
  submitAssessment,
} from '../../../Redux/courseContent/courseContent.service';
import { useToast } from '../../../shared/toast/useToast';
import styles from './styles.module.css';

export default function StudentCourseContent() {
  const { courseId, groupId } = useParams();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialPreview, setShowMaterialPreview] = useState(false);
  const [assessmentText, setAssessmentText] = useState('');
  const [assessmentFile, setAssessmentFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { courseContent, loading, error } = useSelector(
    (state) => state.courseContent
  );

  useEffect(() => {
    if (courseId && groupId) {
      dispatch(getStudentCourseContent({ courseId, groupId }));
    }
  }, [courseId, groupId, dispatch]);

  // Handle API errors with toast
  useEffect(() => {
    if (error.getStudentCourseContent) {
      showError(error.getStudentCourseContent);
    }
  }, [error.getStudentCourseContent, showError]);

  const getModuleIcon = (module, moduleProgress) => {
    // If we have moduleProgress data, use it
    if (moduleProgress) {
      const { status, assessmentScore } = moduleProgress;

      // Determine color based on status
      let color = '#6c757d'; // default gray
      let icon = 'fa-file-alt';

      if (status === 'passed') {
        icon = 'fa-check-circle';
        // Color based on assessment score
        if (assessmentScore >= 80) {
          color = '#28a745'; // green for 80+
        } else if (assessmentScore >= 60) {
          color = '#17a2b8'; // blue for 60-79
        } else {
          color = '#ffc107'; // yellow for below 60
        }
      } else if (status === 'failed') {
        icon = 'fa-times-circle';
        color = '#dc3545'; // red
      } else if (status === 'in-progress') {
        icon = 'fa-hourglass-start';
        color = '#ffc107'; // yellow
      }

      return {
        icon,
        color,
        status,
        assessmentScore: assessmentScore?.toFixed(1),
      };
    }

    // Fallback to old logic for backward compatibility
    if (!module.assessments || module.assessments.length === 0) {
      // Module without assessment - just materials
      return {
        icon: 'fa-file-alt',
        color: module.isCompleted ? '#28a745' : '#6c757d',
        status: module.isCompleted ? 'completed' : 'available',
      };
    }

    // Module with assessments - check all assessments
    const assessments = module.assessments || [];
    if (assessments.length === 0) {
      return {
        icon: 'fa-file-alt',
        color: '#6c757d',
        status: 'not-submitted',
      };
    }

    // Get all submitted assessments
    const submittedAssessments = assessments.filter((a) => a.studentSubmission);

    // If no assessments submitted yet
    if (submittedAssessments.length === 0) {
      return {
        icon: 'fa-file-alt',
        color: '#6c757d',
        status: 'not-submitted',
      };
    }

    // Check if all assessments are submitted
    const allSubmitted = submittedAssessments.length === assessments.length;

    // Check overall submission status
    const pendingReview = submittedAssessments.some(
      (a) =>
        a.studentSubmission.status === 'submitted' ||
        a.studentSubmission.status === 'underReview'
    );
    const hasFailed = submittedAssessments.some(
      (a) =>
        a.studentSubmission.status === 'rejected' ||
        a.studentSubmission.status === 'failed'
    );
    const allPassed = submittedAssessments.every(
      (a) =>
        a.studentSubmission.status === 'approved' ||
        a.studentSubmission.status === 'passed'
    );

    // Calculate average score from submitted assessments
    const scores = submittedAssessments
      .filter(
        (a) =>
          a.studentSubmission.score !== null &&
          a.studentSubmission.score !== undefined
      )
      .map((a) => a.studentSubmission.score);

    const averageScore =
      scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    // Determine status based on submissions and average score
    if (pendingReview && allSubmitted) {
      return {
        icon: 'fa-clock',
        color: '#ffc107',
        status: 'pending-review',
      };
    }

    if (allPassed && allSubmitted) {
      // Passed - color based on average score
      let color = '#28a745'; // green for 80+
      if (averageScore < 60) {
        color = '#dc3545'; // red for below 60
      } else if (averageScore < 80) {
        color = '#17a2b8'; // blue for 60-79
      }
      return {
        icon: 'fa-check-circle',
        color: color,
        status: 'passed',
        averageScore: averageScore.toFixed(1),
      };
    }

    if (hasFailed) {
      return {
        icon: 'fa-times-circle',
        color: '#dc3545',
        status: 'needs-resubmit',
      };
    }

    if (!allSubmitted) {
      return {
        icon: 'fa-file-alt',
        color: '#ffc107',
        status: 'partially-submitted',
      };
    }

    return {
      icon: 'fa-file-alt',
      color: '#6c757d',
      status: 'available',
    };
  };

  const toggleModuleExpand = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleOpenMaterial = (material) => {
    setSelectedMaterial(material);
    setShowMaterialPreview(true);
  };

  const handleOpenAssessment = (module, assessment) => {
    setSelectedModule(module);
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  };

  const handleSubmitAssessment = async () => {
    if (!assessmentFile && !assessmentText) {
      showError('Please provide either a file or text for your assessment');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      if (assessmentFile) {
        formData.append('file', assessmentFile);
      }
      if (assessmentText) {
        formData.append('text', assessmentText);
      }

      await dispatch(
        submitAssessment({
          courseId,
          groupId,
          moduleId: selectedModule._id,
          assessmentId: selectedAssessment._id,
          formData,
        })
      ).unwrap();

      showSuccess(
        'Assessment submitted successfully! Waiting for instructor review.'
      );

      setShowAssessmentModal(false);
      setAssessmentFile(null);
      setAssessmentText('');
      setSelectedAssessment(null);

      // Refresh course content
      dispatch(getStudentCourseContent({ courseId, groupId }));
    } catch (error) {
      // Handle specific error messages
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || 'Failed to submit assessment. Please try again.';

      // Check if it's a duplicate submission (400 status)
      if (
        errorMessage.includes('Assessment already submitted') ||
        errorMessage.includes('already submitted')
      ) {
        showError(
          'This assessment has already been submitted. You cannot submit it again.'
        );
        // Still close modal and refresh to show current state
        setShowAssessmentModal(false);
        setAssessmentFile(null);
        setAssessmentText('');
        setSelectedAssessment(null);
        dispatch(getStudentCourseContent({ courseId, groupId }));
      } else {
        showError(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const canTakeExam = () => {
    if (!courseContent?.progress?.moduleProgress) return false;

    // Check if all modules have passed status
    return courseContent.progress.moduleProgress.every(
      (moduleProgress) => moduleProgress.status === 'passed'
    );
  };

  const allModulesCompleted = canTakeExam();
  const hasFinalExamAttempt = Boolean(courseContent?.finalExam);
  const hasPassedFinalExam = Boolean(courseContent?.finalExam?.passed);
  const hasFailedFinalExam = hasFinalExamAttempt && !hasPassedFinalExam;

  if (loading.getStudentCourseContent) {
    return <LoadingSpinner />;
  }

  if (!courseContent) {
    return (
      <div className="container py-5 text-center">
        <p>Course content not found</p>
      </div>
    );
  }

  return (
    <div>
      <Header
        img={courseContent.course?.imageUrl}
        title={courseContent.courseTitle || 'Course Content'}
      />

      <div className="container py-5">
        {/* Course Overview */}
        <CourseOverview courseContent={courseContent} />

        {/* Learning Path Section */}
        <div className="row">
          <div className="col-12">
            <h4 className="mb-4">Learning Path</h4>
            <div className={styles.modulePath}>
              {courseContent.modules?.map((module, index) => {
                // Find corresponding module progress from progress array
                const moduleProgress =
                  courseContent.progress?.moduleProgress?.find(
                    (mp) => mp.moduleId === module._id
                  );
                const moduleStatus = getModuleIcon(module, moduleProgress);
                const isExpanded = expandedModule === module._id;
                const isLast =
                  index === (courseContent.modules?.length || 0) - 1;

                return (
                  <ModuleItem
                    key={module._id}
                    module={module}
                    moduleProgress={moduleProgress}
                    moduleStatus={moduleStatus}
                    isExpanded={isExpanded}
                    isLast={isLast}
                    onToggleExpand={toggleModuleExpand}
                    onOpenMaterial={handleOpenMaterial}
                    onOpenAssessment={handleOpenAssessment}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Final Exam / Certificate Section */}
        <FinalExamSection
          allModulesCompleted={allModulesCompleted}
          hasPassedFinalExam={hasPassedFinalExam}
          hasFailedFinalExam={hasFailedFinalExam}
          courseId={courseId}
          groupId={groupId}
          modulesLength={courseContent.modules?.length}
          courseName={courseContent.courseName}
        />
      </div>

      {/* Material Preview Modal */}
      <MaterialPreviewModal
        show={showMaterialPreview}
        onHide={() => setShowMaterialPreview(false)}
        selectedMaterial={selectedMaterial}
      />

      {/* Assessment Submission Modal */}
      <AssessmentSubmissionModal
        show={showAssessmentModal}
        onHide={() => setShowAssessmentModal(false)}
        selectedModule={selectedModule}
        selectedAssessment={selectedAssessment}
        assessmentText={assessmentText}
        setAssessmentText={setAssessmentText}
        assessmentFile={assessmentFile}
        setAssessmentFile={setAssessmentFile}
        submitting={submitting}
        onSubmit={handleSubmitAssessment}
      />
    </div>
  );
}
