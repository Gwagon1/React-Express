const request = require('supertest');
const express = require('express');
const githubRoutes = require('./routes/githubRoutes');


const app = express();
app.use('/api/users', githubRoutes);

test('GET /api/users/:username returns user data', async () => {
  const response = await request(app).get('/api/users/octocat');
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty('login');
});

test('GET /api/users/:username/repos returns repositories', async () => {
  const response = await request(app).get('/api/users/octocat/repos');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test('GET /api/users/:username/repos/:repo/commits returns commits', async () => {
  const response = await request(app).get('/api/users/octocat/repos/hello-world/commits');
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
