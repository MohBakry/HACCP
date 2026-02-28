import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from './ReviewPromptModal.module.css';

export default function ReviewPromptModal({
  show,
  onHide,
  onSubmit,
  submitting,
  courseId,
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!reviewText || reviewText.trim().length < 10) {
      newErrors.reviewText = 'Review must be at least 10 characters';
    }

    if (reviewText && reviewText.length > 1000) {
      newErrors.reviewText = 'Review must not exceed 1000 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ rating, reviewText: reviewText.trim(), courseId });
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setReviewText('');
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-star text-warning me-2"></i>
          Rate Your Experience
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <h5 className="mb-2">How would you rate this course?</h5>
          <p className="text-muted">
            Your feedback helps us improve and helps other students make
            informed decisions.
          </p>
        </div>

        {/* Star Rating */}
        <div className="mb-4">
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fas fa-star ${styles.star} ${
                  star <= (hoveredRating || rating) ? styles.starFilled : ''
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              ></i>
            ))}
          </div>
          {rating > 0 && (
            <div className="text-center mt-2">
              <span className="text-muted">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </span>
            </div>
          )}
          {errors.rating && (
            <div className="text-danger text-center small mt-2">
              {errors.rating}
            </div>
          )}
        </div>

        {/* Review Text */}
        <Form.Group className="mb-3">
          <Form.Label>
            <strong>Share your experience</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Tell us what you liked, what could be improved, and why you would recommend this course..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            isInvalid={!!errors.reviewText}
          />
          <Form.Text className="text-muted">
            {reviewText.length}/1000 characters (minimum 10)
          </Form.Text>
          {errors.reviewText && (
            <Form.Control.Feedback type="invalid">
              {errors.reviewText}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="alert alert-info small mb-0">
          <i className="fas fa-info-circle me-2"></i>
          Your review will be visible to other students considering this course.
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={submitting}>
          Maybe Later
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane me-2"></i>
              Submit Review
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
