import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Payment from '../components/cart/Payment';
import { useHistory } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Store'; // Import your Redux store configuration



// Mock the useHistory hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));
// Mock react-alert and useAlert
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

global.sessionStorage = {
  getItem: jest.fn(() => JSON.stringify({ totalPrice: 100 })), // Replace with your test data
};

describe('Payment Component', () => {
  it('navigates to the success page on successful payment', () => {
    const orderInfo = { totalPrice: 100,itemsPrice:400,shippingPrice:40,taxPrice:12,totalPrice:463 };
    
    render(<Provider store={store}>
      <Payment />
    </Provider>);


    
    const paymentButton = screen.getByText('Ammar Pay');
    fireEvent.click(paymentButton);

    
  });
});
