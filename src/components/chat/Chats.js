import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { useSelector } from 'react-redux'

/**
 * Chats component for displaying user chats.
 * @component
 */
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user: currentUser, isAuthenticated, loading } = useSelector(state => state.user)
  const { dispatch } = useContext(ChatContext);

  /**
     * Get user chats when the component mounts or when the user changes.
     */
  useEffect(() => {
    /**
   * Fetch user chats from Firestore and update the state.
   */
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser._id), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser && getChats();
  }, [currentUser]);

  /**
   * Handle the selection of a chat user and dispatch the selected user to the context.
   * @param {Object} u - The user to select.
   */
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(chats)

  return (
    <div className="chats">
      {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.avatar.url} alt="" />
          <div className="userChatInfo">
            <div>
              <span>{chat[1].userInfo.name} , </span>
              <span style={{fontSize:'10px'}}>{chat[1].userInfo.role}</span>
            </div>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
