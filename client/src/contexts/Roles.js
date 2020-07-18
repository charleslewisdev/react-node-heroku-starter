import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/Roles';

const DispatchContext = createContext();
const StateContext = createContext();

const RolesProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useRolesDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useRolesDispatch must be used within a RolesProvider');
  }
  return context;
};

const useRolesState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useRolesState must be used within a RolesProvider');
  }
  return context;
};

export {RolesProvider, useRolesDispatch, useRolesState};
