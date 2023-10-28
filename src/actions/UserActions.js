import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    INITIALSTORE
} from '../constants/UserConstants'

import axios from 'axios'

//LoginUser
export const initialStore=(items)=>async(dispatch,getState)=>{
   

    dispatch({
        type: INITIALSTORE,
        payload:items
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({ type: LOGIN_REQUEST })
        const config = {
            'Content-Type': 'application/json'
        }

        const { data } = await axios.post('https://walmart-backend.vercel.app/api/v1/login', { email, password }, config)
        localStorage.setItem("token",data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.error
        })
    }
}

export const register = (name, email, password, avatar,role) => async (dispatch) => {

    try {

        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            'Content-Type': 'application/json'
        }



        const { data } = await axios.post('https://walmart-backend.vercel.app/api/v1/register', { name, email, password, avatar,role }, config)
        
        console.log(data.user)
        localStorage.setItem("token",data.token)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })





    } catch (error) {
        console.log(error)
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const loadedUser = () => async (dispatch) => {

    try {

        dispatch({ type: LOAD_USER_REQUEST })
        let token=localStorage.getItem("token")

        const { data } = await axios.get('https://walmart-backend.vercel.app/api/v1/me',{headers:{token}})
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.error
        })
    }
}

export const logout = () => async (dispatch) => {

    try {


        await axios.get('https://walmart-backend.vercel.app/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS
        })
        localStorage.removeItem("token")
        localStorage.removeItem("cartItems")

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.error
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

export const updateProfile = (name, email, avatar) => async (dispatch) => {

    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })
        
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put('https://walmart-backend.vercel.app/api/v1/me/update', { name, email, avatar }, config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.error
        })
    }
}

export const updatePassword = (passwords) => async (dispatch) => {

    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put('https://walmart-backend.vercel.app/api/v1/password/update', passwords, config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.post('https://walmart-backend.vercel.app/api/v1/password/forgot', { email }, config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/password/reset/${token}`, passwords, config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.error
        })
    }
}

export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.get('https://walmart-backend.vercel.app/api/v1/admin/users',config)

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.put(`https://walmart-backend.vercel.app/api/v1/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }


        const { data } = await axios.get(`https://walmart-backend.vercel.app/api/v1/admin/user/${id}`,config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })
        let token=localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }

        const { data } = await axios.delete(`https://walmart-backend.vercel.app/api/v1/admin/user/${id}`,config)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error?.response?.data?.message
        })
    }
}