import React from 'react'
import { useSelector } from 'react-redux'

/**
 * A React component that renders the application's navbar.
 *
 * @returns {React.Component} A React component that renders the navbar.
 */
const Navbar = () => {
  const { user:currentUser, isAuthenticated, loading } = useSelector(state => state.user)

  return (
    <div className='navbar'>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser.avatar.url} alt="" />
        <span>{currentUser.name}</span>
        
      </div>
    </div>
  )
}

export default Navbar