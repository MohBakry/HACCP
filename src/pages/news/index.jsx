import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../shared/header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import Img from '../../assets/images/event3.jpg';
import { getPublishedNews } from '../../Redux/news/news.service';

export default function News() {
  const dispatch = useDispatch();
  const { publishedNews, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getPublishedNews());
  }, [dispatch]);

  return (
    <div>
      <Header img={Img} title="News" />

      <div className="container py-5">
        {loading.getPublishedNews ? (
          <LoadingSpinner />
        ) : (
          <div className="row">
            {publishedNews.map((newsItem) => (
              <div key={newsItem._id} className="col-12 col-md-6 col-lg-4 mb-4">
                <Link
                  to={`/news/details/${newsItem._id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'translateY(-5px)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'translateY(0)')
                    }
                  >
                    {newsItem.imageUrl && (
                      <img
                        src={newsItem.imageUrl}
                        className="card-img-top"
                        alt={newsItem.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title text-dark">{newsItem.title}</h5>
                      <p className="card-text text-muted">
                        {newsItem.description}
                      </p>
                      {newsItem.updatedAt && (
                        <small className="text-muted">
                          {new Date(newsItem.updatedAt).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
