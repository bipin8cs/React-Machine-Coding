import React, { useState, useEffect, useRef } from 'react';
import { useFetch } from './useFetch';
import './FetchinApiData.css';

const FetchinApiData = () => {
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const loader = useRef(null);

  // Fetch posts with pagination (limit=10 per page)
  const { data, loading, error, retry } = useFetch(
    'https://jsonplaceholder.typicode.com/posts',
    {
      params: {
        _page: page,
        _limit: 10,
      },
    }
  );

  // Update posts list when new data is fetched
  useEffect(() => {
    if (data) {
      setAllPosts(prev => [...prev, ...data]);
    }
  }, [data]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && data?.length === 10) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, data]);

  // Reset posts when retrying
  const handleRetry = () => {
    setAllPosts([]);
    setPage(1);
    retry();
  };

  // Pagination controls
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
      setAllPosts(prev => prev.slice(0, (page - 2) * 10));
    }
  };

  const handleNext = () => {
    if (data?.length === 10) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="FetchinApiData">
      <h1>Posts</h1>

      {/* Error State */}
      {error && (
        <div className="error">
          {error}
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {/* Success State */}
      <div className="posts">
        {allPosts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="skeleton">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-item">
              <div className="skeleton-title"></div>
              <div className="skeleton-body"></div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={loader} className="loader" />

      {/* Pagination Controls */}
      {!loading && (
        <div className="pagination">
          <button onClick={handlePrevious} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={handleNext} disabled={data?.length < 10}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FetchinApiData;