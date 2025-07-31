"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const UseFetchDetail = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!endpoint) return;

      setLoading(true);
      setError(null);

      try {
        console.log(`Fetching data from: ${endpoint}`);
        const response = await axios.get(endpoint);

        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [endpoint]); 

  return { data, loading, error };
};

export default UseFetchDetail;
