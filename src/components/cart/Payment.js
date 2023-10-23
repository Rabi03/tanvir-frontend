import React, { Fragment, useEffect, useState } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { TextField } from '@mui/material'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, clearErrors } from '../../actions/OrderActions'

import axios, { Axios } from 'axios'
import { removeCart } from '../../actions/CartActions'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

/**
 * Payment component for handling payment methods and order submission.
 *
 * @param {Object} props - The component's props.
 * @param {object} props.history - The history object for navigation.
 * @returns {JSX.Element} - React component for Payment.
 */
export default function Payment({ history }) {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [paytype, setPaytype] = useState('Online');


    const { user } = useSelector(state => state.user)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    console.log("Shipping Info", shippingInfo)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    /**
     * Handles the form submission for payment processing.
     *
     * @param {Event} e - The event object.
     */
    const submitHandler = async (e) => {
        e.preventDefault();


        let token = localStorage.getItem("token")
        try {
            const res = await axios.post("https://tanvir-backend.vercel.app/api/v1/payment/process", { user, order, shippingInfo, totalPrice: orderInfo.totalPrice }, {
                headers: {
                    'Content-Type': 'application/json',
                    token
                }
            })

            console.log(res)
            window.location.replace(res.data.url)

        } catch (error) {

        }
    }

    const cashOnDelivery = async (e) => {
        e.preventDefault();
        

        let token = localStorage.getItem("token")
        try {
            const res = await axios.post("https://tanvir-backend.vercel.app/api/v1/order/new", {
                ...order, paymentInfo: {
                    customerId: user?._id,
                    paymentIntentId: "cash_on_delivery_" + user?._id,
                    payment_status: "not paid",
                    method: "Cash On Delivery"
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    token
                }
            })

            if(res.data.success&&res.data.success===true){
                window.location.replace("https://walmart12.vercel.app/success")
            }
            else{
                
                window.location.replace("https://walmart12.vercel.app/fail")
            }

        } catch (error) {

        }
    }
    /**
         * Handles the form submission for card payment processing.
         *
         * @param {Event} e - The event object.
         */
    const cardSubmitHandler = async (e) => {
        e.preventDefault();


        let token = localStorage.getItem("token")
        await axios.post("https://tanvir-backend.vercel.app/stripe/create-checkout-session", {
            orderItems: cartItems,
            shippingInfo,
            itemsPrice: orderInfo.itemsPrice,
            taxPrice: orderInfo.taxPrice,
            shippingPrice: orderInfo.shippingPrice,
            totalPrice: orderInfo.totalPrice
        }, {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err));
    }



    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps state={2} />
            <h1 style={{ margin: '30px 0px', textAlign: 'center' }}>Select Payment method</h1>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: "0px 50px", margin: '0px auto', width: '50%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }} >
                    <input type='radio' checked={paytype === 'Online'} onChange={() => setPaytype("Online")}></input>
                    <h5 style={{ marginTop: '5px' }}>Online Payment</h5>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <input type='radio' checked={paytype === 'Offline'} onChange={() => setPaytype("Offline")}></input>
                    <h5 style={{ marginTop: '5px' }}>Cash On Delivery</h5>
                </div>
            </div>
            {paytype === 'Online' &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between', cursor: 'pointer', border: '1px solid gray', padding: '10px 10px', borderRadius: '10px', marginRight: '20px' }} onClick={submitHandler}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <img src='https://www.aamarpay.com/images/logo/aamarpay_logo.png' />
                        </div>

                        <img src="https://www.aamarpay.com/images/payment-method-web-banner-4.jpg" width={600} height={400} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between', cursor: 'pointer', border: '1px solid gray', padding: '10px 10px', borderRadius: '10px' }} onClick={cardSubmitHandler}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <img src='https://memberpress.com/wp-content/uploads/2017/09/Integrations2-768x432-1.jpg' width={200} height={100} />
                        </div>

                        <img src='https://www.businesscreditworkshop.me/wp-content/uploads/2022/10/Stripe-Corporate-Card-1024x576.png' width={600} height={375} />
                    </div>
                </div>
            }
            {paytype === 'Offline' && <div style={{ width: '50%', margin: '0px auto', marginTop: '50px' }}>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={cashOnDelivery}>Order Now</button>
            </div>}


        </Fragment>
    )
}

