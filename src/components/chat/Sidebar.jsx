import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  return (
    <div className="sidebar">
      {/* <Search/> */}
      <div style={{textAlign:'center',fontSize:25,color:'white',width:'100%',borderBottom:'1px solid white'}}>Chats</div>
      <Chats/>
    </div>
  );
};

export default Sidebar;
