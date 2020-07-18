import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/Security';

const DispatchContext = createContext();
const StateContext = createContext();

const SecurityProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useSecurityDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useSecurityDispatch must be used within a SecurityProvider'
    );
  }
  return context;
};

const useSecurityState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useSecurityState must be used within a SecurityProvider');
  }
  return context;
};

export {SecurityProvider, useSecurityDispatch, useSecurityState};
