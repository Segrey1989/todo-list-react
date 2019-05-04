const initialState = {
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCES':
      return {
        ...state,
        authError: null,
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.err,
      };

    case 'SIGNOUT':
      return state;

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: null,
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err,
      };

    default:
      return state;
  }
};

export default authReducer;
