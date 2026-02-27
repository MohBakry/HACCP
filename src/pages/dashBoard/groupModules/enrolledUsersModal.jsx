import React, { useState } from 'react';
import { Modal, Button, Form, Badge, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';

export default function EnrolledUsersModal({
  show,
  onHide,
  users,
  groupName,
  courseId,
  groupId,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Enrolled Users - {groupName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <p className="text-muted mb-3">
          Total Enrolled: <strong>{users.length}</strong> users
        </p>

        {filteredUsers.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="fa fa-users fa-3x mb-3"></i>
            <p>
              {users.length === 0
                ? 'No users enrolled in this group yet.'
                : 'No users match your search.'}
            </p>
          </div>
        ) : (
          <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {filteredUsers.map((user) => (
              <ListGroup.Item
                key={user._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-bold">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <div className="d-flex flex-column align-items-end gap-1">
                    {user.enrollmentDate && (
                      <small className="text-muted">
                        Enrolled:{' '}
                        {new Date(user.enrollmentDate).toLocaleDateString()}
                      </small>
                    )}
                    {user.progress !== undefined && (
                      <Badge bg="info">
                        {user.progress?.overallProgress || 0}% Complete
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() =>
                      navigate(
                        `/courses/${courseId}/groups/${groupId}/students/${user._id}/assessments`
                      )
                    }
                    className="d-flex align-items-center gap-1"
                  >
                    <FaFileAlt size={14} />
                    Assessments
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
