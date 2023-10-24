import React from 'react';
import { useState } from "react";
import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { useSelector } from "react-redux";

/**
 * Context for managing chat-related state.
 * @type {React.Context}
 */
export const ChatContext = createContext();

/**
 * Context provider for managing chat-related state.
 * @param {object} props - React component props.
 * @param {React.ReactNode} props.children - The child components that will have access to the chat context.
 */
export const ChatContextProvider = ({ children }) => {
  const { user:currentUser, isAuthenticated, loading } = useSelector(state => state.user)
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  /**
   * Reducer function for managing chat state.
   * @param {object} state - The current chat state.
   * @param {object} action - The action to be performed on the state.
   * @param {string} action.type - The type of action.
   * @param {object} action.payload - The data associated with the action.
   * @returns {object} - The new chat state after performing the action.
   */
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:(currentUser&&action.payload)?
            currentUser?._id > action.payload?._id
              ? currentUser?._id + action.payload?._id
              : action.payload?._id + currentUser?._id:null,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  const [open,setOpen]=useState(false)

  return (
    <ChatContext.Provider value={{ data:state, dispatch,open,setOpen }}>
      {children}
    </ChatContext.Provider>
  );
};
