const express = require('express');
const { getUser, getUserRepos, getRepoCommits } = require('../controllers/githubController');
const router = express.Router();
const fetch = require('node-fetch');

// Routes to interact with GitHub API
router.get('/:username', getUser);
router.get('/:username/repos', getUserRepos);
router.get('/:username/repos/:repo', async (req, res) => {
  const { username, repo } = req.params;
  const githubApiUrl = `https://api.github.com/repos/${username}/${repo}`;

  try {
    const response = await fetch(githubApiUrl);
    if (!response.ok) {
      return res.status(404).json({ message: 'Repository not found' });
    }
    const repoData = await response.json();
    const { created_at, pushed_at } = repoData;
    res.json({ ...repoData, created_at, pushed_at });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repo data', error });
  }
});

module.exports = router;

