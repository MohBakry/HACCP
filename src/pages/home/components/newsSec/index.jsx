import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.css';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../../shared/LoadingSpinner';
import { getHighlightedNews } from '../../../../Redux/news/news.service';

export default function NewsSec() {
  const dispatch = useDispatch();
  const { highlightedNews, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getHighlightedNews());
  }, [dispatch]);

  return (
    <>
      <div className={`${style.newssec} container-fluid p-5`}>
        <div className="row">
          <h1 className={`${style.newsh1}`}>Latest News</h1>
          {loading.getHighlightedNews ? (
            <div className="col-12">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {highlightedNews.slice(0, 4).map((newsItem) => (
                <div key={newsItem._id} className="col-lg-3 col-md-6 p-3">
                  <div className={`div bg-white rounded-2 ${style.newsCard}`}>
                    <img
                      className="rounded-top-2"
                      src={newsItem.imageUrl}
                      style={{ width: '100%', height: 'auto' }}
                      alt={newsItem.title}
                    />
                    <h5 className={`${style.newsh5} p-2`}>{newsItem.title}</h5>
                    <div className="link text-center py-3">
                      <Link
                        className={`${style.newsa}`}
                        to={`/news/details/${newsItem._id}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="p-1 my-3">
          <Link to="/news" className={`${style.newsbtn} btn`}>
            MORE NEWS <i className="mx-1 fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </>
  );
}
