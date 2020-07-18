import {isAuthenticated} from 'utils/auth';

const initialState = {
  isDrawerOpen: isAuthenticated(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_DRAWER_OPEN':
      return {
        ...state,
        isDrawerOpen: action.isDrawerOpen,
      };
    default:
      return state;
  }
};

export {initialState, reducer};
