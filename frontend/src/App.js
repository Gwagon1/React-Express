import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import UserDetails from './components/UserDetails';
import RepoDetails from './components/RepoDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route to search for GitHub users */}
          <Route path="/" element={<SearchBar />} />
          {/* Route to view user details */}
          <Route path="/user/:username" element={<UserDetails />} />
          {/* Route to view repository details */}
          <Route path="/user/:username/repos/:repo" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
