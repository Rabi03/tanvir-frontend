import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

/**
 * A React component that renders a route if the user is authenticated.
 *
 * @param {object} props The component props.
 * @param {boolean} props.isAdmin Whether the route is restricted to administrators.
 * @param {boolean} props.isSupply Whether the route is restricted to sellers.
 * @param {React.Component} props.component The component to render if the user is authenticated.
 * @param {object} props.others Other props to pass to the component.
 *
 * @returns {React.Component} A React component that renders a route if the user is authenticated.
 */
export default function PrivateRoute({ isAdmin, isSupply, component: Component, ...others }) {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    return (
        <>
            {!loading && (
                <Route
                    {...others}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }
                        if (isAdmin === true && user?.role !== 'admin') {
                            return <Redirect to='/' />
                        }
                        if (isSupply === true && user?.role !== 'seller') {
                            return <Redirect to='/' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}
