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

const Chat = () => {
  const { user, isAuthenticated, loading } = useSelector(state => state.user)
  const [admin,setAdmin]=useState(null)
  const { data,dispatch } = useContext(ChatContext);


  const getAdminInfo = async () => {

    const resadmin = await axios.get("https://tanvir-backend.vercel.app/api/v1/getAdmin")
    if (resadmin.data && resadmin.data.success === true&&user.role!=='admin') {

      console.log(resadmin.data)

      const currentUser = resadmin.data.admin
      setAdmin(currentUser)
      dispatch({ type: "CHANGE_USER", payload: currentUser });

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
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", user._id), {
            [combinedId + ".userInfo"]: {
              _id: currentUser._id,
              name: currentUser.name,
              avatar: currentUser.avatar
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          
        }
      } catch (err) { }
    }

  }

  useEffect(() => {
    if (user) {
      getAdminInfo()
    }
  },[user])

  console.log(data.user)

  return (
    <>
    {data.user?
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.name}</span>
        {/* <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div> */}
      </div>
      <Messages />
      <Input />
    </div>
    :
    <div>
      <div>Hello {user?.name}. No Admin found.Please wait..</div>
      <img src="images/robot.gif" />
    </div>
}
    </>
  );
};

export default Chat;
