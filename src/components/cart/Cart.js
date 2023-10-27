import React from "react";
import { Link } from 'react-router-dom'
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItem } from "../../actions/CartActions";


/**
 * A React component that displays the current user's cart.
 * @param {object} props The component props.
 * @param {object} props.history The history object.
 * @param {Array<object>} props.cartItems The current user's cart items.
 *
 * @returns {React.Component} A React component that displays the current user's cart.
 */
/**
   * Increases the quantity of a cart item.
   *
   * @param {string} id The ID of the cart item.
   * @param {number} quantity The current quantity of the cart item.
   * @param {number} stock The stock of the product.
   */
export default function Cart({ history }) {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1

    if (newQuantity > stock) return

    dispatch(addCartItems(id, newQuantity))
  }

  /**
   * Removes a cart item.
   *
   * @param {string} id The ID of the cart item.
   */
  const handleCartRemove = id => {
    dispatch(removeCartItem(id))
  }

  /**
   * Decreases the quantity of a cart item.
   *
   * @param {string} id The ID of the cart item.
   * @param {number} quantity The current quantity of the cart item.
   */
  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1

    if (newQuantity <= 0) return

    dispatch(addCartItems(id, newQuantity))
  }
  /**
     * Handles the checkout process.
     */
  const handleCheckOut = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
      ) : (
        <>
          <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map(item => (
               
                  <div key={item.product} className="cart-item" style={{ border: '1px solid #ccc' }}>
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.image?.url}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span className="btn btn-danger minus" onClick={() => decreaseQuantity(item.product, item.quantity)}>-</span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span className="btn btn-primary plus" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          data-testid="delete_cart_item"
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleCartRemove(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
               
              ))}


            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleCheckOut}>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
