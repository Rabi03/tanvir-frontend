import axios from "axios"
import { ADD_TO_CART, INITIALSTORE, REMOVE_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/CartConstants"

export const initialStore=(items)=>async(dispatch,getState)=>{
   

    dispatch({
        type: INITIALSTORE,
        payload:items
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const addCartItems=(id,quantity)=>async(dispatch,getState)=>{
    const {data}= await axios.get(`https://walmart-backend.vercel.app/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload:{
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0],
            stock: data.product.stock,
            quantity: quantity,
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeCartItem=(id)=>(dispatch,getState)=>{

    dispatch({
        type: REMOVE_ITEM_CART,
        payload:id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeCart=()=>(dispatch,getState)=>{

    dispatch({
        type: REMOVE_CART,
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo=(info)=>(dispatch)=>{

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload:info
    })

    localStorage.setItem('shippingInfo',JSON.stringify(info))
}

