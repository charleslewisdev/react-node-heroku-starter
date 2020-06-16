import React, {createContext, useContext, useReducer} from 'react';
import {initialState, reducer} from 'reducers/MenuDrawer';

const DispatchContext = createContext();
const StateContext = createContext();

const MenuProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useMenuDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error('useMenuDispatch must be used within a MenuProvider');
  }
  return context;
};

const useMenuState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useMenuState must be used within a MenuProvider');
  }
  return context;
};

export {MenuProvider, useMenuDispatch, useMenuState};
