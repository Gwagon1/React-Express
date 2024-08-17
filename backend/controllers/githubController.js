const axios = require('axios');

// Base URL for GitHub API
const GITHUB_API = 'https://api.github.com';

// Fetch user details from GitHub
exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}`);
    res.json(response.data); // Send user data as JSON response
  } catch (error) {
    res.status(404).json({ message: 'User not found' }); // Handle errors
  }
};

// Fetch repositories of a GitHub user
exports.getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`${GITHUB_API}/users/${username}/repos`);
    res.json(response.data); // Send repositories data as JSON response
  } catch (error) {
    res.status(404).json({ message: 'Repositories not found' }); // Handle errors
  }
};

// Fetch commits for a specific repository
exports.getRepoCommits = async (req, res) => {
  try {
    const { username, repo } = req.params;
    const response = await axios.get(`${GITHUB_API}/repos/${username}/${repo}/commits`);
    res.json(response.data.slice(0, 5)); // Send the last 5 commits as JSON response
  } catch (error) {
    res.status(404).json({ message: 'Commits not found' }); // Handle errors
  }
};
