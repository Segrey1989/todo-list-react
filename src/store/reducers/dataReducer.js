const initialState = {
  filterParam: null,
  sortParam: false, //default desc
  viewMode: 'view_list',
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_DATA':
      return {
        ...state,
        filterParam: action.currentPriority,
      };

    case 'RESET_FILTER_PARAM':
      return {
        ...state,
        filterParam: null,
      };

    case 'SORT_DATA':
      return {
        ...state,
        sortParam: action.sortParam,
      };

    case 'RESET_SORT_PARAM':
      return {
        ...state,
        sortParam: false,
      };

    case 'GET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.mode,
      };

    default:
      return state;
  }
};

export default dataReducer;
