import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/Organizations';

const DispatchContext = createContext();
const StateContext = createContext();

const OrganizationsProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useOrganizationsDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useOrganizationsDispatch must be used within a OrganizationsProvider'
    );
  }
  return context;
};

const useOrganizationsState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      'useOrganizationsState must be used within a OrganizationsProvider'
    );
  }
  return context;
};

export {OrganizationsProvider, useOrganizationsDispatch, useOrganizationsState};
