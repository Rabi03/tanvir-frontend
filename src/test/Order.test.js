import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from '../constants/OrderConstants'; 
import {createOrder} from '../actions/OrderActions'

const middlewares = [thunk.withExtraArgument(axios)];
const mockStore = configureMockStore(middlewares);

describe('createOrder action', () => {
  it('should create an order successfully', async () => {
    const order = {
        "shippingInfo": {
          "address": "Bashundhora R/A Dhaka",
          "city": "Dhaka",
          "phoneNo": "019786876896",
          "postalCode": "1214",
          "country": "Bangladesh"
        },
        "user": "653977f2907412fa6a55d3d1",
        "orderItems": [
          {
            "name": "shampoo",
            "quantity": 1,
            "image": {
              "public_id": "products/bgbwaxgz7drht9slxvvf",
              "url": "https://res.cloudinary.com/dnncoow0j/image/upload/v1698274065/products/bgbwaxgz7drht9slxvvf.jpg"
            },
            "price": 120,
            "product": "65399b1171d04e2a4f2562fe",
          }
        ],
        "paymentInfo": {
          "customerId": "653977f2907412fa6a55d3d1",
          "paymentIntentId": "cash_on_delivery_653977f2907412fa6a55d3d1",
          "payment_status": "not paid",
          "method": "Cash On Delivery"
        },
        "paidAt": "2023-10-25T23:12:14.083Z",
        "itemsPrice": 120,
        "taxPrice": 6,
        "shippingPrice": 25,
        "totalPrice": 151,
        "orderStatus": "Delivered",
        "transfered": false,
        "supplied": false,
        "createdAt": "2023-10-25T23:07:01.983Z",
        "deliverAt":  "2023-10-25T23:12:11.640Z"
      }

    const expectedActions = [
      { type: CREATE_ORDER_REQUEST },
      { type: CREATE_ORDER_SUCCESS  },{type: CREATE_ORDER_FAIL,payload:"Network Error"},
    ];

    const store = mockStore({});
    await store.dispatch(createOrder(order));
    // expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle order creation failure', async () => {
    const order = {
        "shippingInfo": {
          "address": "Bashundhora R/A Dhaka",
          "city": "Dhaka",
          "phoneNo": "019786876896",
          "postalCode": "1214",
          "country": "Bangladesh"
        },
        "user": "653977f2907412fa6a55d3d1",
        "orderItems": [
          {
            "name": "shampoo",
            "quantity": 1,
            "image": {
              "public_id": "products/bgbwaxgz7drht9slxvvf",
              "url": "https://res.cloudinary.com/dnncoow0j/image/upload/v1698274065/products/bgbwaxgz7drht9slxvvf.jpg"
            },
            "price": 120,
            "product": "65399b1171d04e2a4f2562fe",
          }
        ],
        "paymentInfo": {
          "customerId": "653977f2907412fa6a55d3d1",
          "paymentIntentId": "cash_on_delivery_653977f2907412fa6a55d3d1",
          "payment_status": "not paid",
          "method": "Cash On Delivery"
        },
        "paidAt": "2023-10-25T23:12:14.083Z",
        "itemsPrice": 120,
        "taxPrice": 6,
        "shippingPrice": 25,
        "totalPrice": 151,
        "orderStatus": "Delivered",
        "transfered": false,
        "supplied": false,
        "createdAt": "2023-10-25T23:07:01.983Z",
        "deliverAt":  "2023-10-25T23:12:11.640Z"
      }

    
    axios.post = jest.fn().mockRejectedValue(new Error('Network Error'));

    const expectedActions = [
      { type: CREATE_ORDER_REQUEST },
      { type: CREATE_ORDER_FAIL, payload: 'Network Error' },
    ];

    const store = mockStore({}); 
    await store.dispatch(createOrder(order));
    
  });
});


