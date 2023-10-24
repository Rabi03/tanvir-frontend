import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing

import Search from '../components/layout/Search';

test('Search component renders correctly', () => {
  render(
    <Router>
      <Search history={{ push: jest.fn() }} />
    </Router>
  );

  const searchInput = screen.getByPlaceholderText('Enter Product Name ...');
  const searchButton = screen.getByTestId('search_btn');

  expect(searchInput).toBeInTheDocument;
  expect(searchButton).toBeInTheDocument;
});

test('Search input change updates keyword state', () => {
  const history = { push: jest.fn() };
  render(
    <Router>
      <Search history={history} />
    </Router>
  );

  const searchInput = screen.getByPlaceholderText('Enter Product Name ...');

  fireEvent.change(searchInput, { target: { value: 'sample keyword' } });

  expect(searchInput.value).toBe('sample keyword');
});

test('Search with non-empty keyword navigates to search page', () => {
  const history = { push: jest.fn() };
  render(
    <Router>
      <Search history={history} />
    </Router>
  );

  const searchInput = screen.getByPlaceholderText('Enter Product Name ...');
  const searchButton = screen.getByTestId('search_btn');

  fireEvent.change(searchInput, { target: { value: 'shirt' } });
  fireEvent.click(searchButton);

  expect(history.push).toHaveBeenCalledWith('/search/shirt');
});

test('Search with empty keyword navigates to home page', () => {
  const history = { push: jest.fn() };
  render(
    <Router>
      <Search history={history} />
    </Router>
  );

  const searchButton = screen.getByTestId('search_btn');

  fireEvent.click(searchButton);

  expect(history.push).toHaveBeenCalledWith('/');
});
