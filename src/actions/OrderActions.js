import axios from 'axios'

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/OrderConstants'

export const mockCreateOrder=(order)=>async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        

        const data=await axios.post.mockResolvedValue({ data: order});
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response?error.response.data?.message:"Network Error"
        })
    }
}

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        

        let token=localStorage.getItem("token")

        const { data } = await axios.post('https://walmart-backend.vercel.app/api/v1/order/new', order, {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error?.response?.data?.message
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try {

        dispatch({ type: MY_ORDERS_REQUEST });
        let token=localStorage.getItem("token")
        const { data } = await axios.get('https://walmart-backend.vercel.app/api/v1/orders/me',{
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });
        let token=localStorage.getItem("token")
        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/order/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_ORDERS_REQUEST });
        let token=localStorage.getItem("token")
        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/admin/orders`,{
            headers: {
                'Content-Type': 'application/json',
                token
            }
        })

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDER_REQUEST })
        let token=localStorage.getItem("token")
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/admin/order/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrderPayInfo = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDER_REQUEST })
        let token=localStorage.getItem("token")
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/admin/order/pay/${id}`, orderData, config)

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDER_REQUEST })
        let token=localStorage.getItem("token")
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }
        const { data } = await axios.delete(`https://walmart-backend.vercel.app/api/v1/admin/order/${id}`,config)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}