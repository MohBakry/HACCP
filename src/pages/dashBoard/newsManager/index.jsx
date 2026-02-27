import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../../../shared/table';
import Filters from '../../../shared/filters/Filters';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import styles from './styles.module.css';
import { getNews, deleteNews } from '../../../Redux/news/news.service';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

export default function NewsManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { news, loading } = useSelector((state) => state.news);

  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

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
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    if (loading.getNews) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [loading.getNews, dispatch]);

  const handleDeleteNews = async (newsItem) => {
    setNewsToDelete(newsItem);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!newsToDelete) return;

    try {
      await dispatch(deleteNews(newsToDelete._id)).unwrap();
      alert('News deleted successfully');
      dispatch(getNews());
    } catch (err) {
      alert(err?.message || 'Failed to delete news');
    } finally {
      setShowDeleteModal(false);
      setNewsToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setNewsToDelete(null);
  };

  const handleEditNews = (newsItem) => {
    navigate(`/dashboard/manage-news/edit/${newsItem._id}`);
  };

  const exportPDF = () => {
    // Implement PDF export logic
  };

  const exportExcel = () => {
    // Implement Excel export logic
  };

  // Filter news based on filters
  const filteredNews = news.filter((newsItem) => {
    const matchesSearch =
      !filters.search ||
      newsItem.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      newsItem.description
        ?.toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesStatus =
      !filters.status || newsItem.published?.toString() === filters.status;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'published',
      label: 'Status',
      component: (newsItem) => (
        <span
          className={`badge ${newsItem.published ? 'bg-success' : 'bg-secondary'}`}
        >
          {newsItem.published ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'highlighted',
      label: 'Highlighted',
      component: (newsItem) => (
        <span
          className={`badge ${
            newsItem.highlighted ? 'bg-warning' : 'bg-light text-dark'
          }`}
        >
          {newsItem.highlighted ? 'Yes' : 'No'}
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
            onClick={() => navigate('/dashboard/manage-news/add')}
          >
            <i className="fa fa-plus me-1"></i> Add News
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

      {filteredNews.length > 0 ? (
        <Table
          data={filteredNews}
          columns={columns}
          onEdit={isAdmin ? handleEditNews : null}
          onDelete={isAdmin ? handleDeleteNews : null}
        />
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No news found</p>
        </div>
      )}

      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete News"
        message={`Are you sure you want to delete the news "${newsToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading.deleteNews}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
