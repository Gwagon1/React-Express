// Import necessary modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');
const { default: fetch } = await import('node-fetch');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Route for GitHub API interactions
app.use('/api/users', githubRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// API routes
app.get('/api/repos/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}`;

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

// Fallback to serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});