import React from 'react';
import './Loading.scss'; // Import your custom styles for the spinner

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
