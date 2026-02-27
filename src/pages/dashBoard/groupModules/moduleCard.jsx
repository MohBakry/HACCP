import React from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';
import styles from './styles.module.css';

export default function ModuleCard({
  module,
  isSelected,
  onToggleSelect,
  onPublish,
  onUnpublish,
  loading,
}) {
  const isPublished = module.isPublished;

  return (
    <Card
      className={`${styles.moduleCard} ${isSelected ? styles.selected : ''}`}
    >
      <Card.Body>
        {/* Selection Checkbox */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Form.Check
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            label={<span className="fw-bold">{module.title}</span>}
          />
          <Badge bg={isPublished ? 'success' : 'secondary'}>
            {isPublished ? 'Published' : 'Unpublished'}
          </Badge>
        </div>

        {/* Module Info */}
        <div
          className={`${styles.moduleDescription} text-muted mb-2`}
          dangerouslySetInnerHTML={{
            __html: module.content || '<em>No content available</em>',
          }}
        />

        {/* Module Details */}
        <div className={styles.moduleDetails}>
          {module.video && (
            <small className="text-muted d-block">
              <i className="fa fa-video me-1"></i>Video included
            </small>
          )}
          {module.materials && module.materials.length > 0 && (
            <small className="text-muted d-block">
              <i className="fa fa-file me-1"></i>
              {module.materials.length} Material(s)
            </small>
          )}
          {module.assessments && module.assessments.length > 0 && (
            <small className="text-muted d-block">
              <i className="fa fa-clipboard-check me-1"></i>
              {module.assessments.length} Assessment(s)
            </small>
          )}
          {module.publishedAt && (
            <small className="text-muted d-block">
              <i className="fa fa-clock me-1"></i>
              Published: {new Date(module.publishedAt).toLocaleDateString()}
            </small>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-3">
          {isPublished ? (
            <Button
              variant="warning"
              size="sm"
              onClick={onUnpublish}
              disabled={loading.unpublishModule}
              className="flex-fill"
            >
              <i className="fa fa-times me-1"></i>Unpublish
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={onPublish}
              disabled={loading.publishModule}
              className="flex-fill"
            >
              <i className="fa fa-check me-1"></i>Publish
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
