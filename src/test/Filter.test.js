import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import store from '../Store';
import { Provider } from 'react-redux';
import Home from '../components/Home';
import { getProducts } from '../actions/ProductActions';





jest.mock('react-alert', () => ({
    useAlert: () => ({
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      show: jest.fn(),
    }),
    transitions: {
      SCALE: 'scale',
    },
    positions: {
      TOP_RIGHT: 'top-right',
    },
  }));





describe('Home Component', () => {
  it('should filter products by price', () => {
    render(
      <Provider store={store}>
        <Home match={{ params: {} }} history={{ push: jest.fn() }} />
      </Provider>
    );

    // Replace these selectors with actual ones from your component
    const minPriceInput = screen.getByPlaceholderText('Min');
    const maxPriceInput = screen.getByPlaceholderText('Max');
    const filterButton = screen.getByText('Filter');

    // Set the price range and trigger the filter
    fireEvent.change(minPriceInput, { target: { value: '10' } });
    fireEvent.change(maxPriceInput, { target: { value: '100' } });
    fireEvent.click(filterButton);
    expect(getProducts).toHaveBeenCalledWith('', 1, [10, 100], '', 0);

    // Now you can assert that the filter function has been called and that products are displayed correctly
    // Add your assertions here
  });

  // Add more test cases for other filters, e.g., category, ratings, etc.
});
