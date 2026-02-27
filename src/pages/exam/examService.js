/**
 * Exam Service
 * Handles exam-related utilities, localStorage management, and device tracking
 */

const EXAM_STORAGE_KEY = 'exam_attempt_';
const DEVICE_INFO_KEY = 'exam_device_info';

/**
 * Generate a device fingerprint based on browser and device info
 */
export const generateDeviceFingerprint = () => {
  const browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Create a simple hash of device info
  const fingerprint = btoa(JSON.stringify(browserInfo));
  return fingerprint;
};

/**
 * Check if exam is being accessed from a different device/browser
 */
export const isDeviceChanged = () => {
  const storedFingerprint = localStorage.getItem(DEVICE_INFO_KEY);
  const currentFingerprint = generateDeviceFingerprint();

  if (!storedFingerprint) {
    // First time - store the fingerprint
    localStorage.setItem(DEVICE_INFO_KEY, currentFingerprint);
    return false;
  }

  return storedFingerprint !== currentFingerprint;
};

/**
 * Update device fingerprint
 */
export const updateDeviceFingerprint = () => {
  const currentFingerprint = generateDeviceFingerprint();
  localStorage.setItem(DEVICE_INFO_KEY, currentFingerprint);
};

/**
 * Save exam attempt locally (for offline support)
 */
export const saveExamAttemptLocally = (attemptId, attempt) => {
  localStorage.setItem(EXAM_STORAGE_KEY + attemptId, JSON.stringify(attempt));
};

/**
 * Get exam attempt from local storage
 */
export const getExamAttemptLocally = (attemptId) => {
  const data = localStorage.getItem(EXAM_STORAGE_KEY + attemptId);
  return data ? JSON.parse(data) : null;
};

/**
 * Clear local exam attempt
 */
export const clearExamAttemptLocally = (attemptId) => {
  localStorage.removeItem(EXAM_STORAGE_KEY + attemptId);
};

/**
 * Save answers locally (for auto-save feature)
 * Expects answers as array: [{ questionId, selectedOptionId }, ...]
 */
export const saveAnswersLocally = (attemptId, answers) => {
  const attempt = getExamAttemptLocally(attemptId) || {};
  // Validate and normalize answers structure
  attempt.answers = Array.isArray(answers) ? answers : [];
  attempt.lastSavedAt = new Date().toISOString();
  saveExamAttemptLocally(attemptId, attempt);
};

/**
 * Get answers from local storage with validation
 * Returns array of { questionId, selectedOptionId } or empty array if not found
 */
export const getAnswersLocally = (attemptId) => {
  const attempt = getExamAttemptLocally(attemptId);
  const answers = attempt?.answers;
  
  // Validate structure: must be an array
  if (!Array.isArray(answers)) {
    return [];
  }
  
  // Validate each answer has required fields
  return answers.filter(
    (ans) => ans && ans.questionId !== undefined && ans.selectedOptionId !== undefined
  );
};

/**
 * Get flagged questions from local storage with validation
 * Returns array of questionIds that are flagged
 */
export const getFlaggedQuestionsLocally = (attemptId) => {
  const attempt = getExamAttemptLocally(attemptId);
  const flagged = attempt?.flaggedQuestions;
  
  // Validate structure: must be an array or convert from object
  if (Array.isArray(flagged)) {
    return flagged;
  }
  
  if (flagged && typeof flagged === 'object') {
    // Convert from object { questionId: true/false } to array of questionIds
    return Object.keys(flagged)
      .filter((key) => flagged[key])
      .map((key) => parseInt(key));
  }
  
  return [];
};

/**
 * Save flagged questions locally
 * Accepts array of questionIds or object mapping
 */
export const saveFlaggedQuestionsLocally = (attemptId, flaggedQuestions) => {
  const attempt = getExamAttemptLocally(attemptId) || {};
  
  if (Array.isArray(flaggedQuestions)) {
    attempt.flaggedQuestions = flaggedQuestions;
  } else if (typeof flaggedQuestions === 'object') {
    // Convert object to array of ids where value is true
    attempt.flaggedQuestions = Object.keys(flaggedQuestions)
      .filter((key) => flaggedQuestions[key])
      .map((key) => parseInt(key));
  } else {
    attempt.flaggedQuestions = [];
  }
  
  saveExamAttemptLocally(attemptId, attempt);
};

/**
 * Calculate exam progress
 */
export const calculateProgress = (currentQuestion, totalQuestions) => {
  return Math.round((currentQuestion / totalQuestions) * 100);
};

/**
 * Format time remaining
 */
export const formatTimeRemaining = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  }
  return `${minutes}m ${secs}s`;
};

/**
 * Check if time is running out (less than 5 minutes)
 */
export const isTimeRunningOut = (timeLeft) => {
  return timeLeft < 300; // Less than 5 minutes
};

/**
 * Check if critical time (less than 1 minute)
 */
export const isCriticalTime = (timeLeft) => {
  return timeLeft < 60; // Less than 1 minute
};

/**
 * Validate all answers are present
 */
export const validateAnswers = (answers, totalQuestions) => {
  const answeredCount = Object.keys(answers).length;
  return {
    isComplete: answeredCount === totalQuestions,
    answeredCount,
    unansweredCount: totalQuestions - answeredCount,
  };
};

/**
 * Get unanswered questions
 */
export const getUnansweredQuestions = (answers, questions) => {
  return questions.filter((q) => !answers[q.id]).map((q) => q.id);
};
