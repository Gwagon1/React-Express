import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '../SearchBar';

test('SearchBar renders correctly', () => {
  const { asFragment } = render(<SearchBar />);
  expect(asFragment()).toMatchSnapshot();
});
