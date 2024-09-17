import React, { useState, useEffect } from 'react';

const ExportPage = () => {
  const [loading, setLoading] = useState(true); // State to track loading
  const [data, setData] = useState(null); // State to store fetched data
  const [error, setError] = useState(null); // State to handle errors

  const exportdata = async () => {
    try {
      const response = await fetch(`https://minexx-api.vercel.app/exportnoauth/16`);
      const responsejson = await response.json();
      
      if (responsejson.success) {
        setData(responsejson); // Store the data
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error occurred while fetching data", error);
      setError("Error occurred while fetching data");
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Call exportdata on component mount
  useEffect(() => {
    exportdata();
  }, []);

  return (
    <div>
      {loading ? ( // Show loading spinner while data is being fetched
        <p>Loading...</p>
      ) : error ? ( // Show error message if there was an error
        <p>{error}</p>
      ) : ( // Show fetched data when loading is complete
        <div>
          <h1>Data Loaded:</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExportPage;
