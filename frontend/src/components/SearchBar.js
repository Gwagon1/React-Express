import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [username, setUsername] = useState(''); // State to hold the username input
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle search button click
  const handleSearch = () => {
    navigate(`/user/${username}`); // Navigate to the user details page
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub user..."
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update state on input change
      />
      <button onClick={handleSearch}>Search</button> {/* Trigger search */}
    </div>
  );
};

export default SearchBar;
