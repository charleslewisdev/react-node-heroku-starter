const initialState = {
  permissions: [],
  role: '',
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_PERMISSIONS':
      return {
        ...state,
        permissions: action.permissions,
      };
    case 'SET_ROLE':
      return {
        ...state,
        role: action.role,
      };
    default: {
      return state;
    }
  }
};

export {initialState, reducer};
