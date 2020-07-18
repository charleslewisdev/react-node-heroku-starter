import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/Users';

const DispatchContext = createContext();
const StateContext = createContext();

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useUsersDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider');
  }
  return context;
};

const useUsersState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }
  return context;
};

export {UsersProvider, useUsersDispatch, useUsersState};
