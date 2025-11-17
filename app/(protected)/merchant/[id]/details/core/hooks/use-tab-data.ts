'use client';

import { useState, useEffect } from 'react';

export function useTabData<T>(
  initialData: T | undefined,
  fetchFunction: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    if (!initialData) {
      setLoading(true);
      fetchFunction()
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [initialData, fetchFunction]);

  return { data, loading };
}

export function useTabDataWithError<T>(
  initialData: T | undefined,
  fetchFunction: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialData) {
      setLoading(true);
      setError(null);
      fetchFunction()
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
        });
    }
  }, [initialData, fetchFunction]);

  return { data, loading, error };
}
