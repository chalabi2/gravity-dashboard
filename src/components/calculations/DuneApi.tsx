import { useState, useEffect } from 'react';

const API_KEY = 'YOUR_API_KEY';
const DUNE_API_URL = 'https://api.dune.com/api/v1/query/1855393/execute';
const UPDATE_TIME = 5000;

export const useDuneData = () => {
  const [duneData, setDuneData] = useState(null);

  useEffect(() => {
    const fetchDuneData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'x-dune-api-key': API_KEY,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(DUNE_API_URL, requestOptions);
      const json = await response.json();
      setDuneData(json);
    };

    fetchDuneData();
    const interval = setInterval(fetchDuneData, UPDATE_TIME);
    return () => clearInterval(interval);
  }, []);

  return duneData;
};
