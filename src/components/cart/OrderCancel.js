import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

/**
 * A React component that displays the order cancellation page.
 *
 * @returns {React.Component} A React component that displays the order cancellation page.
 */
const OrderCancel = () => {
    return (
        <>

            <MetaData title={'Order Cancel'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_cancel.png" alt="Order Cancel" width="200" height="200" />

                    <h2>Your Order has been cancelled.</h2>

                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>

        </>
    )
}

export default OrderCancel