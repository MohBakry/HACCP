import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../../shared/table';
import Filters from '../../../shared/filters/Filters';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import styles from './styles.module.css';
import { getEvents, deleteEvent } from '../../../Redux/events/events.service';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

export default function EventManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, loading } = useSelector((state) => state.events);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const isAdmin = user?.role === 'admin';

  const selectsConfig = [
    {
      key: 'status',
      placeholder: 'All Status',
      options: [
        { label: 'Published', value: 'true' },
        { label: 'Draft', value: 'false' },
      ],
    },
  ];

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
    });
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    if (loading.getEvents) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [loading.getEvents, dispatch]);

  const handleDeleteEvent = async (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await dispatch(deleteEvent(eventToDelete._id)).unwrap();
      alert('Event deleted successfully');
      dispatch(getEvents());
    } catch (err) {
      alert(err?.message || 'Failed to delete event');
    } finally {
      setShowDeleteModal(false);
      setEventToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEventToDelete(null);
  };

  const handleEditEvent = (event) => {
    navigate(`/dashboard/manage-events/edit/${event._id}`);
  };

  const exportPDF = () => {
    // Implement PDF export logic
  };

  const exportExcel = () => {
    // Implement Excel export logic
  };

  // Filter events based on filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !filters.search ||
      event.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.location?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      !filters.status || event.published?.toString() === filters.status;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'title',
      label: 'Title',
      styles: {
        maxWidth: '200px',
      },
    },
    {
      key: 'date',
      label: 'Date',
      component: (event) => {
        return event.date ? new Date(event.date).toLocaleDateString() : 'N/A';
      },
    },
    {
      key: 'startTime',
      label: 'Start Time',
    },
    {
      key: 'endTime',
      label: 'End Time',
    },
    {
      key: 'location',
      label: 'Location',
    },
    {
      key: 'published',
      label: 'Status',
      component: (event) => (
        <span
          className={`badge ${event.published ? 'bg-success' : 'bg-secondary'}`}
        >
          {event.published ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'highlighted',
      label: 'Highlighted',
      component: (event) => (
        <span
          className={`badge ${
            event.highlighted ? 'bg-warning' : 'bg-light text-dark'
          }`}
        >
          {event.highlighted ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            className={`${styles.addButton}`}
            onClick={() => navigate('/dashboard/manage-events/add')}
          >
            <i className="fa fa-plus me-1"></i> Add Event
          </Button>
          <Button
            className="btn btn-outline-danger bg-light"
            onClick={exportPDF}
          >
            <i className="fa fa-file-pdf me-1"></i> Export PDF
          </Button>
          <Button
            className="btn btn-outline-success bg-light"
            onClick={exportExcel}
          >
            <i className="fa fa-file-excel me-1"></i> Export Excel
          </Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Filters
          filters={filters}
          onChange={setFilters}
          selects={selectsConfig}
          onReset={resetFilters}
        />
      </div>

      {filteredEvents.length > 0 ? (
        <Table
          data={filteredEvents}
          columns={columns}
          onEdit={isAdmin ? handleEditEvent : null}
          onDelete={isAdmin ? handleDeleteEvent : null}
        />
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No events found</p>
        </div>
      )}

      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Event"
        message={`Are you sure you want to delete the event "${eventToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading.deleteEvent}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
