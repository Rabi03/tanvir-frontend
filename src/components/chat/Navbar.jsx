import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { user:currentUser, isAuthenticated, loading } = useSelector(state => state.user)

  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src={currentUser.avatar.url} alt="" />
        <span>{currentUser.name}</span>
        
      </div>
    </div>
  )
}

export default Navbar