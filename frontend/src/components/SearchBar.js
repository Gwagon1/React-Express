import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null); // Error state for invalid input or search errors

  // Handle search submission
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError('Please enter a valid username'); // Set error message if username is empty
      return;
    }

    setError(null); // Reset error if validation passes
    onSearch(username);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default SearchBar;
