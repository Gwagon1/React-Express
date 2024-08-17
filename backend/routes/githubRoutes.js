const express = require('express');
const { getUser, getUserRepos, getRepoCommits } = require('../controllers/githubController');
const router = express.Router();

// Routes to interact with GitHub API
router.get('/:username', getUser);
router.get('/:username/repos', getUserRepos);
router.get('/:username/repos/:repo/commits', getRepoCommits);

module.exports = router;
