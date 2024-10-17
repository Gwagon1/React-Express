import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserDetails from '../UserDetails.js';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'Test User', avatar_url: 'test.jpg', bio: 'Test Bio' }),
  })
);

test('renders user details', async () => {
  render(<UserDetails />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText("Test User's avatar")).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByText('Test Bio')).toBeInTheDocument();
  });
});
