import React, { useContext, useReducer, createContext } from "react";

const MessagesStateContext = createContext();
const MessagesDispatchContext = createContext();

const messagesReducer = (state, action) => {
  let usersCopy;

  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_USER_MESSAGES":
      const { username, messages } = action.payload;
      usersCopy = [...state.users];
      const userIndex = usersCopy.findIndex((u) => u.username === username);

      usersCopy[userIndex] = { ...usersCopy[userIndex], messages };

      return {
        ...state,
        users: usersCopy,
      };

    case "SET_SELECTED_USER":
      usersCopy = state.users.map((user) => ({
        ...user,
        selected: user.username === action.payload,
      }));

      return {
        ...state,
        users: usersCopy,
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
