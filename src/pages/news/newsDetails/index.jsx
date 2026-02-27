import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { getPublishedNewsDetails } from '../../../Redux/news/news.service';

const NewsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { newsDetails, loading } = useSelector((state) => state.news);

  useEffect(() => {
    if (id) {
      dispatch(getPublishedNewsDetails(id));
    }
  }, [id, dispatch]);

  if (loading.getPublishedNewsDetails) {
    return <LoadingSpinner />;
  }

  if (!newsDetails) {
    return <div className="container py-5">News article not found.</div>;
  }

  return (
    <div>
      {/* Header with news image and title */}
      <Header img={newsDetails.imageUrl} title={newsDetails.title} />

      <div className="container py-5">
        <div className="row">
          {/* Main Content - Left Side */}
          <div className="col-lg-8 mb-4">
            <h2 className="mb-4">{newsDetails.title}</h2>
            {newsDetails.content && (
              <div
                className="news-description"
                dangerouslySetInnerHTML={{ __html: newsDetails.content }}
              />
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title mb-4">Article Details</h5>

                {newsDetails.createdAt && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-calendar me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">
                          Published Date
                        </small>
                        <strong>
                          {new Date(newsDetails.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {newsDetails.updatedAt &&
                  newsDetails.updatedAt !== newsDetails.createdAt && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <i
                          className="fas fa-edit me-3"
                          style={{ fontSize: '1.2rem', color: '#012F5A' }}
                        ></i>
                        <div>
                          <small className="text-muted d-block">
                            Last Updated
                          </small>
                          <strong>
                            {new Date(newsDetails.updatedAt).toLocaleDateString(
                              'en-US',
                              {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  )}

                {newsDetails.author && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-user me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Author</small>
                        <strong>{newsDetails.author}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {newsDetails.category && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-tag me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Category</small>
                        <strong>{newsDetails.category}</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
