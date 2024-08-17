// Import necessary modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
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
