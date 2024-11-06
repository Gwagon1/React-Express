const express = require('express');
const { getUser, getUserRepos, getRepoCommits } = require('../controllers/githubController');
const router = express.Router();

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
    res.json(repoData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching repo data', error });
  }
});
router.get('/:username/repos/:repo/commits', getRepoCommits);

module.exports = router;
