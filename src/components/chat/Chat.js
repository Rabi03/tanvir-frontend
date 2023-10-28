import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { useSelector } from 'react-redux'
import { useEffect } from "react";
import axios from "axios";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { ChatContext } from "../context/ChatContext";
import anime from '../../imgs/robot.gif'

/**
 * Chat component for handling user chats.
 * @component
 */

const Chat = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  const [admin,setAdmin]=useState(null)
  const { data,dispatch } = useContext(ChatContext);

  /**
   * Fetches information about the admin user and initializes the chat.
   * @async
   */
  const getAdminInfo = async () => {

    const resadmin = await axios.get("https://walmart-backend.vercel.app/api/v1/getAdmin")
    if (resadmin.data && resadmin.data.success === true&&user.role!=='admin') {

      console.log(resadmin.data)

      const currentUser = resadmin.data.admin
      setAdmin(currentUser)
      // dispatch({ type: "CHANGE_USER", payload: currentUser });

      const combinedId =
        currentUser._id > user._id
          ? currentUser._id + user._id
          : user._id + currentUser._id;
      try {
        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, "userChats", currentUser._id), {
            [combinedId + ".userInfo"]: {
              _id: user._id,
              name: user.name,
              avatar: user.avatar,
              role:user.role
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", user._id), {
            [combinedId + ".userInfo"]: {
              _id: currentUser._id,
              name: currentUser.name,
              avatar: currentUser.avatar,
              role:currentUser.role
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          
        }
      } catch (err) { }
    }

  }

  /**
   * useEffect hook to get admin information when the user is available.
   */
  useEffect(() => {
    if (user) {
      getAdminInfo()
    }
  },[user])

  console.log(data.user)

  return (
    <>
    {(data.user&&data.user._id)?
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.name}</span>
        <div className="chatIcons">
        <span>{data.user?.role}</span>
          
        </div>
      </div>
      <Messages />
      <Input />
    </div>
    :
    <div>
      <img src={anime} />
      {user===null?<div style={{fontSize:'20px',padding:'10px 30px'}}>Please <a href="/login">Login/Register</a> to see conversation.</div>:
      <div style={{fontSize:'20px',padding:'10px 30px'}}>Hello {user?.name}. Select user to start chat..</div>
    }
    </div>
}
    </>
  );
};

export default Chat;
