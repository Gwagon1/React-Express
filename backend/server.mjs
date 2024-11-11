// server.mjs

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
const githubRoutes = require('./routes/githubRoutes');

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

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
