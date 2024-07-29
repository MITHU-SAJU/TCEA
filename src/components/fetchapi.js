import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  // State variables
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to call the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a network request to the server and retrieve data
        const response = await fetch('https://api.sampleapis.com/coffee/hot');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // Update the state variable with the data returned by the API
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render based on the state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Render your fetched data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetchingComponent;
