import { useState, useEffect, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';

// Simple in-memory cache (can be replaced with localStorage/IndexedDB)
const cache = new Map();

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const cacheKey = url + JSON.stringify(options.params); // Unique cache key
  const isMounted = useRef(true);

  // Stale-while-revalidate logic
  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!isMounted.current) return;

    // Check cache
    if (cache.has(cacheKey) && !forceRefresh) {
      setData(cache.get(cacheKey));
      setLoading(false);
      // Background re-fetch
      setTimeout(() => fetchData(true), 1000); // Re-fetch in background after 1s
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: {
          ...options.headers,
          // Add auth headers if needed
          // Authorization: `Bearer ${token}`,
        },
        params: options.params,
      });

      if (isMounted.current) {
        setData(response.data);
        cache.set(cacheKey, response.data); // Cache response
        setLoading(false);

        // Store in localStorage for persistence
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchData(true); // Retry on error
          }, 2000);
        }
      }
    }
  }, [url, cacheKey, options.method, options.params, options.headers, retryCount]);

  // Debounced fetch to avoid rapid API calls
  const debouncedFetch = useCallback(
    debounce((forceRefresh) => fetchData(forceRefresh), 300),
    [fetchData]
  );

  // Initial fetch and load from localStorage
  useEffect(() => {
    isMounted.current = true;

    // Load from localStorage if available
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
    }

    debouncedFetch(false);

    return () => {
      isMounted.current = false;
    };
  }, [cacheKey, debouncedFetch]);

  // Manual retry
  const retry = () => {
    setRetryCount(0);
    setError(null);
    debouncedFetch(true);
  };

  return { data, loading, error, retry };
};