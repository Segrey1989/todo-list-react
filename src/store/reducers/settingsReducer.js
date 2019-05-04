const initialState = {
  settingsError: null,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SETTINGS_SUCCESS':
      return {
        ...state,
        settings: action.settings,
        settingsError: null,
      };

    case 'ADD_SETTINGS_ERROR':
      return {
        ...state,
        settings: action.settings,
        settingsError: action.err.message,
      };
    default:
      return state;
  }
};

export default settingsReducer;
