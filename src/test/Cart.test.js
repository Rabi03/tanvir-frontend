import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux'; // If you're using Redux
import Cart from '../components/cart/Cart';
import { useHistory } from 'react-router-dom';
import store from '../Store';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { initialStore } from '../actions/CartActions';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: jest.fn(),
    }),
}));

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



describe('Cart Component', () => {
    it('displays an empty cart message', () => {
        
        render(
            <Provider store={store}>
                <Cart history={{ push: jest.fn() }} />
            </Provider>
        );

        
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('displays cart items and handles actions', () => {
        const cartItems = [
            
            { product: 'product1', name: 'Item 1', price: 10, quantity: 2, stock: 5 },
            { product: 'product2', name: 'Item 2', price: 15, quantity: 1, stock: 10 },
        ];

        store.dispatch(initialStore(cartItems))



        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Cart history={{ push: jest.fn() }} />
                </MemoryRouter>
            </Provider>
        );

        
        cartItems.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
            expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
        });

        
        // fireEvent.click(screen.getAllByText('+')[0]); 
        // fireEvent.click(screen.getAllByText('-')[0]); 
        // fireEvent.click(screen.getAllByTestId('delete_cart_item')[0]); 

       
    });

    it('handles checkout', () => {
        const historyPushMock = jest.fn();


        
        render(
            <Provider store={store}>
                <MemoryRouter> 
                    <Cart history={{ push: historyPushMock }} />
                </MemoryRouter>
            </Provider>
        );

        
        fireEvent.click(screen.getByText('Check out'));

        
        expect(historyPushMock).toHaveBeenCalledWith('/login?redirect=shipping');
    });
});
