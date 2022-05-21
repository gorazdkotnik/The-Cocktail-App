import { useState, useEffect } from 'react';

import { request } from '../utils/functions';

const useRequest = (url: string, method: string = 'GET', body = null) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request(url, method, body)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url, method, body]);

  return { data, error, loading };
};

export default useRequest;
