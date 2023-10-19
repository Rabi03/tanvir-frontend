import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import { useSelector } from 'react-redux'

/**
 * A React component that renders a single message in a chat conversation.
 *
 * @param {object} message - The message object to render.
 * @param {string} message.senderId - The ID of the message sender.
 * @param {string} message.text - The text of the message.
 * @param {string} message.img - The URL of an image to be attached to the message.
 * @returns {React.Component} A React component that renders the message.
 */
const Message = ({ message }) => {
  const { user:currentUser, isAuthenticated, loading } = useSelector(state => state.user)
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser._id && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser._id
              ? currentUser.avatar.url
              : data.user.avatar.url
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
