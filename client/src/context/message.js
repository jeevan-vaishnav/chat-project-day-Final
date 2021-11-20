import React, { useContext, useReducer, createContext } from "react";

const MessagesStateContext = createContext();
const MessagesDispatchContext = createContext();

const messagesReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    default:
      throw new Error(`Unknown action type :${action.type}`);
  }
};

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, { users: null });

  return (
    <MessagesDispatchContext.Provider value={dispatch}>
      <MessagesStateContext.Provider value={state}>
        {children}
      </MessagesStateContext.Provider>
    </MessagesDispatchContext.Provider>
  );
};

export const useMessagesState = () => useContext(MessagesStateContext);
export const useMessagesDispatch = () => useContext(MessagesDispatchContext);
