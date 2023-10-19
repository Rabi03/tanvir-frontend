import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
/**
 * A React component that displays the order fail page.
 *
 * @returns {React.Component} A React component that displays the order fail page.
 */
const OrderFail = () => {
    return (
        <>

            <MetaData title={'Payment Fail'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_fail.png" alt="Order Fail" width="200" height="200" />

                    <h2>Payment Fail.</h2>

                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>

        </>
    )
}

export default OrderFail