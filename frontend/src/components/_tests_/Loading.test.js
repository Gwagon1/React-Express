import { render, screen } from '@testing-library/react';
import Loading from './Loading';

test('renders loading spinner', () => {
  render(<Loading />);
  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  expect(screen.getByRole('status')).toBeInTheDocument();
});