import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { useSelector } from "react-redux";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { user:currentUser, isAuthenticated, loading } = useSelector(state => state.user)
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser._id > action.payload._id
              ? currentUser._id + action.payload._id
              : action.payload._id + currentUser._id,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
