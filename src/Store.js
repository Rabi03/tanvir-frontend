import { createStore, combineReducers, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducers";

import {
  ProductsReducer,
  ProductDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteOrUpdateProductReducer,
  productReviewsReducer,
  reviewDeleteReducer,
} from "./reducers/ProductReducers";
import {
  UserReducer,
  updateReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/UserReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderDelorUpReducer,
} from "./reducers/OrderReducers";
/**
 * The Redux reducer for the application.
 *
 * @param {State} state The current state of the store.
 * @param {Action} action The action to be dispatched.
 * @returns {State} The new state of the store.
 */
const reducer = combineReducers({
  products: ProductsReducer,
  productDelorUp: deleteOrUpdateProductReducer,
  productDetails: ProductDetailsReducer,
  user: UserReducer,
  allUsers: allUsersReducer,
  profile: updateReducer,
  profileDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  allOrders: allOrdersReducer,
  myOrders: myOrdersReducer,
  orderDelorUp: orderDelorUpReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  productReviews: productReviewsReducer,
  reviewDelete: reviewDeleteReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
