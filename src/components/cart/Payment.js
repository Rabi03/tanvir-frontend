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
 * A React component that displays the payment page.
 *
 * @param {object} props The component props.
 * @param {object} props.history The history object.
 * @param {Array<object>} props.cartItems The current user's cart items.
 * @param {object} props.shippingInfo The current user's shipping information.
 * @param {object} props.user The current user.
 *
 * @returns {React.Component} A React component that displays the payment page.
 */
export default function Payment({ history }) {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');

    const { user } = useSelector(state => state.user)
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { error } = useSelector(state => state.newOrder)

    console.log("Shipping Info",shippingInfo)

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

    const cardSubmitHandler = async (e) => {
        e.preventDefault();

        
        let token = localStorage.getItem("token")
        await axios.post("https://tanvir-backend.vercel.app/stripe/create-checkout-session", {
            orderItems: cartItems,
            shippingInfo,
            itemsPrice:orderInfo.itemsPrice,
            taxPrice:orderInfo.taxPrice,
            shippingPrice:orderInfo.shippingPrice,
            totalPrice:orderInfo.totalPrice
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
            <h1 style={{margin:'30px 0px'}}>Select Payment method</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between',cursor:'pointer',border:'1px solid gray',padding:'10px 10px',borderRadius:'10px',marginRight:'20px' }} onClick={submitHandler}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        
                        <img src='https://www.aamarpay.com/images/logo/aamarpay_logo.png' />
                    </div>

                    <img src="https://www.aamarpay.com/images/payment-method-web-banner-4.jpg" width={600} height={400} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between',cursor:'pointer',border:'1px solid gray',padding:'10px 10px',borderRadius:'10px' }} onClick={cardSubmitHandler}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        
                        <img src='https://memberpress.com/wp-content/uploads/2017/09/Integrations2-768x432-1.jpg' width={200} height={100} />
                    </div>

                    <img src='https://www.businesscreditworkshop.me/wp-content/uploads/2022/10/Stripe-Corporate-Card-1024x576.png' width={600} height={375} />
                </div>
            </div>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    {/* <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <TextField id="outlined-basic" label="Account Number" value={user?.account} variant="outlined" sx={{ width: '100%' }} />
                        </div>

                        <div className="form-group">
                            <TextField id="outlined-basic" label="Account Secret" variant="outlined" sx={{ width: '100%' }} onChange={e => setPassword(e.target.value)} />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form> */}

                </div>
            </div>

        </Fragment>
    )
}

