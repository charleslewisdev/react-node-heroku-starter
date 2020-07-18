import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/Permissions';

const DispatchContext = createContext();
const StateContext = createContext();

const PermissionsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const usePermissionsDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'usePermissionsDispatch must be used within a PermissionsProvider'
    );
  }
  return context;
};

const usePermissionsState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      'usePermissionsState must be used within a PermissionsProvider'
    );
  }
  return context;
};

export {PermissionsProvider, usePermissionsDispatch, usePermissionsState};
