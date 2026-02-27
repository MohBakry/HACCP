import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Badge,
  Card,
  Form,
  Alert,
  Spinner,
  Modal,
} from 'react-bootstrap';
import {
  getGroupModules,
  publishModuleForGroup,
  unpublishModuleForGroup,
  bulkUpdateModuleStatus,
  getEnrolledUsers,
} from '../../../Redux/groupModules/groupModules.service';
import ModuleCard from './moduleCard';
import EnrolledUsersModal from './enrolledUsersModal';
import Filters from '../../../shared/filters/Filters';
import { useToast } from '../../../shared/toast/useToast';
import styles from './styles.module.css';

export default function GroupModulesManager() {
  const { courseId, groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess, showError, showWarning } = useToast();

  const [selectedModules, setSelectedModules] = useState([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [moduleToUnpublish, setModuleToUnpublish] = useState(null);
  const [bulkUnpublish, setBulkUnpublish] = useState(false);

  const { modules, enrolledUsers, groupName, courseTitle, loading, error } =
    useSelector((state) => state.groupModules);

  useEffect(() => {
    if (groupId) {
      dispatch(getGroupModules({ courseId, groupId }));
      dispatch(getEnrolledUsers({ courseId, groupId }));
    }
  }, [dispatch, courseId, groupId]);

  const handlePublish = async (moduleId) => {
    try {
      await dispatch(
        publishModuleForGroup({ courseId, groupId, moduleId })
      ).unwrap();
      showSuccess('Module published successfully!');
      await dispatch(getGroupModules({ courseId, groupId }));
    } catch (err) {
      showError(`Failed to publish module: ${err}`);
    }
  };

  const handleUnpublish = async (moduleId) => {
    setModuleToUnpublish(moduleId);
    setBulkUnpublish(false);
    setShowConfirmModal(true);
  };

  const confirmUnpublish = async () => {
    try {
      if (bulkUnpublish) {
        await dispatch(
          bulkUpdateModuleStatus({
            courseId,
            groupId,
            moduleIds: selectedModules,
            action: 'unpublish',
          })
        ).unwrap();
        showSuccess('Modules unpublished successfully!');
        setSelectedModules([]);
      } else {
        await dispatch(
          unpublishModuleForGroup({
            courseId,
            groupId,
            moduleId: moduleToUnpublish,
          })
        ).unwrap();
        showSuccess('Module unpublished successfully!');
      }
      await dispatch(getGroupModules({ courseId, groupId }));
    } catch (err) {
      showError(`Failed to unpublish: ${err}`);
    } finally {
      setShowConfirmModal(false);
      setModuleToUnpublish(null);
    }
  };

  const handleBulkPublish = async () => {
    if (selectedModules.length === 0) {
      showWarning('Please select at least one module');
      return;
    }
    try {
      await dispatch(
        bulkUpdateModuleStatus({
          courseId,
          groupId,
          moduleIds: selectedModules,
          action: 'publish',
        })
      ).unwrap();
      showSuccess('Modules published successfully!');
      setSelectedModules([]);
      await dispatch(getGroupModules({ courseId, groupId }));
    } catch (err) {
      showError(`Failed to publish modules: ${err}`);
    }
  };

  const handleBulkUnpublish = async () => {
    if (selectedModules.length === 0) {
      showWarning('Please select at least one module');
      return;
    }
    setBulkUnpublish(true);
    setShowConfirmModal(true);
  };

  const toggleModuleSelection = (moduleId) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectAllModules = () => {
    const filteredModuleIds = filteredModules.map((m) => m._id);
    setSelectedModules(filteredModuleIds);
  };

  const deselectAllModules = () => {
    setSelectedModules([]);
  };

  // Filter modules based on status and search query
  const filteredModules = modules.filter((module) => {
    const matchesStatus =
      filters.status === 'all' ||
      (filters.status === 'published' && module.isPublished) ||
      (filters.status === 'unpublished' && !module.isPublished);

    const matchesSearch =
      filters.search === '' ||
      module.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      module.content?.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const publishedCount = modules.filter((m) => m.isPublished).length;
  const unpublishedCount = modules.filter((m) => !m.isPublished).length;

  if (loading.getGroupModules) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error.getGroupModules) {
    return (
      <Alert variant="danger" className="m-4">
        <Alert.Heading>Error Loading Modules</Alert.Heading>
        <p>{error.getGroupModules}</p>
        <Button variant="outline-danger" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Alert>
    );
  }

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          {/* <Button
            variant="link"
            className="p-0 mb-2"
            onClick={() => navigate(-1)}
          >
            <i className="fa fa-arrow-left me-2"></i>Back to Groups
          </Button> */}
          {/* <h3 className={styles.pageTitle}>Manage Course Modules</h3> */}
          <p className="text-muted mb-0">
            <strong>Course:</strong> {courseTitle || 'N/A'} |{' '}
            <strong>Group:</strong> {groupName || 'N/A'}
          </p>
        </div>
        <Button
          variant="info"
          onClick={() => setShowUsersModal(true)}
          className={styles.enrolledBtn}
        >
          <i className="fa fa-users me-2"></i>
          View Enrolled Users ({enrolledUsers.length})
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <Card className={styles.statCard}>
            <Card.Body>
              <h6 className="text-muted">Total Modules</h6>
              <h2>{modules.length}</h2>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className={`${styles.statCard} ${styles.published}`}>
            <Card.Body>
              <h6 className="text-muted">Published</h6>
              <h2 className="text-success">{publishedCount}</h2>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className={`${styles.statCard} ${styles.unpublished}`}>
            <Card.Body>
              <h6 className="text-muted">Unpublished</h6>
              <h2 className="text-warning">{unpublishedCount}</h2>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedModules.length > 0 && (
        <Alert
          variant="info"
          className="d-flex justify-content-between align-items-center"
        >
          <span>
            <strong>{selectedModules.length}</strong> module(s) selected
          </span>
          <div className="d-flex gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={handleBulkPublish}
              disabled={loading.bulkUpdate}
            >
              {loading.bulkUpdate ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <i className="fa fa-check me-1"></i>Publish Selected
                </>
              )}
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={handleBulkUnpublish}
              disabled={loading.bulkUpdate}
            >
              <i className="fa fa-times me-1"></i>Unpublish Selected
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={deselectAllModules}
            >
              Clear Selection
            </Button>
          </div>
        </Alert>
      )}

      {/* Filters and Search */}
      <div className="mb-3">
        <Filters
          filters={filters}
          onChange={setFilters}
          selects={[
            {
              key: 'status',
              placeholder: 'All Status',
              options: [
                { label: 'Published', value: 'published' },
                { label: 'Unpublished', value: 'unpublished' },
              ],
            },
          ]}
          onReset={() => setFilters({ search: '', status: 'all' })}
        />
        <div className="d-flex gap-2 mt-2 justify-content-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={selectAllModules}
          >
            <i className="fa fa-check-double me-1"></i>Select All
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={deselectAllModules}
          >
            <i className="fa fa-times me-1"></i>Deselect All
          </Button>
        </div>
      </div>

      {/* Modules List */}
      {filteredModules.length === 0 ? (
        <Alert variant="info">
          <i className="fa fa-info-circle me-2"></i>
          {modules.length === 0
            ? 'No modules available for this course.'
            : 'No modules match your current filters.'}
        </Alert>
      ) : (
        <div className="row g-3">
          {filteredModules.map((module) => (
            <div key={module._id} className="col-md-6 col-lg-4">
              <ModuleCard
                module={module}
                isSelected={selectedModules.includes(module._id)}
                onToggleSelect={() => toggleModuleSelection(module._id)}
                onPublish={() => handlePublish(module._id)}
                onUnpublish={() => handleUnpublish(module._id)}
                loading={loading}
              />
            </div>
          ))}
        </div>
      )}

      {/* Enrolled Users Modal */}
      <EnrolledUsersModal
        show={showUsersModal}
        onHide={() => setShowUsersModal(false)}
        users={enrolledUsers}
        groupName={groupName}
        groupId={groupId}
        courseId={courseId}
      />

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Unpublish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to unpublish{' '}
            {bulkUnpublish ? 'the selected modules' : 'this module'}?
          </p>
          <p className="text-muted small">
            This will make {bulkUnpublish ? 'them' : 'it'} unavailable to
            enrolled users.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="warning" onClick={confirmUnpublish}>
            <i className="fa fa-times me-1"></i>Unpublish
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
