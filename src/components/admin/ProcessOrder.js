import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder, clearErrors, updateOrderPayInfo } from '../../actions/OrderActions'
import { UPDATE_ORDER_RESET } from '../../constants/OrderConstants'

/**
 * A React component that renders a form to process an order.
 *
 * @param {{ match: { params: { id: string } } }} props The props of the component.
 *
 * @returns {React.Component} A React component that renders a form to process an order.
 */
export default function ProcessOrder({ match }) {
    /**
       * The state of the component.
       *
       * @typedef {{
    *   status: string
    * }} ProcessOrderState
    */
    const [status, setStatus] = useState('Processing');
    

    /**
   * The useAlert hook to display alerts to the user.
   */
    const alert = useAlert();

    /**
     * The useDispatch hook to dispatch actions to the Redux store.
     */
    const dispatch = useDispatch();


    const { loading, order = {} } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order
    const { error, isUpdated } = useSelector(state => state.orderDelorUp)
    const [paystatus, setPayStatus] = useState(paymentInfo ? paymentInfo.payment_status.toLowerCase():'Not Paid');
    /**
   * The ID of the order to process.
   *
   * @type {string}
   */
    const orderId = match.params.id;

    /**
     * An effect hook that fetches the order details from the Redux store and displays an alert
     * if there is an error.
     */

    useEffect(() => {

        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({ type: UPDATE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isUpdated, orderId])

    /**
       * A function that updates the order status.
       *
       * @param {string} id The ID of the order to update.
       */
    const handleUpdateOrder = (id) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrder(id, formData))
    }
    const handleUpdatePayStatus = (id,status) => {

        const formData = new FormData();
        formData.set('status', status);

        dispatch(updateOrderPayInfo(id, formData))
    }
    /**
   * A function that formats the shipping information for display.
   *
   * @returns {string} The formatted shipping information.
   */
    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    /**
   * A function that determines if the order has been paid for.
   *
   * @returns {boolean} True if the order has been paid for, false otherwise.
   */
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    /**
   * Renders the form to process the order.
   *
   * @returns {React.Component} A React component that renders the form to process the order.
   */
    return (
        <>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        {loading ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                    <p><b>Amount:</b> ${totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment Info</h4>
                                    <p><b>Customer: {paymentInfo && paymentInfo.customerId}</b></p>
                                    <p><b>Payment ID: {paymentInfo && paymentInfo.paymentIntentId}</b></p>
                                    <p><b>Payment Status: {paymentInfo && paymentInfo.payment_status}</b></p>
                                    <p><b>Payment Method: {paymentInfo && paymentInfo.method}</b></p>

                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>



                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        {orderItems && orderItems.map(item => (
                                            <div key={item.product} className="row my-5">
                                                <div className="col-4 col-lg-2">
                                                    <img src={item.image.url} alt={item.name} height="45" width="65" />
                                                </div>

                                                <div className="col-5 col-lg-5">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>


                                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                    <p>${item.price}</p>
                                                </div>

                                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                    <p>{item.quantity} Piece(s)</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Order Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => handleUpdateOrder(order._id)}>
                                        Update Order Status
                                    </button>
                                    <h4 className="my-4">Payment Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={paystatus}
                                            onChange={(e) => setPayStatus(e.target.value)}
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="not paid">Not Paid</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary btn-block" onClick={() => handleUpdatePayStatus(order._id,paystatus)}>
                                        Update Payment Status
                                    </button>
                                </div>

                            </div>
                        )}
                    </>
                </div>
            </div>

        </>
    )
}
