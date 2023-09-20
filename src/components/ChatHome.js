import React from 'react'
import Sidebar from './chat/Sidebar'
import Chat from './chat/Chat'

const ChatHome = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default ChatHome