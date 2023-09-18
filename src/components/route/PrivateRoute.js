import { Route,Redirect } from 'react-router-dom'
import React from 'react'
import {useSelector} from 'react-redux'

export default function PrivateRoute({isAdmin,isSupply,component:Component,...others}) {
    const {loading,isAuthenticated,user}= useSelector(state=>state.user)
    return (
        <>
           {!loading&&(
               <Route 
                {...others}
                render={props=>{
                    if(isAuthenticated===false){
                        return <Redirect to='/login' />
                    }
                    if(isAdmin===true && user?.role !== 'admin'){
                        return <Redirect to='/' />
                    }
                    if(isSupply===true && user?.role !== 'supply'){
                        return <Redirect to='/' />
                    }
                    return <Component {...props} />
                }}
               />
           )} 
        </>
    )
}
