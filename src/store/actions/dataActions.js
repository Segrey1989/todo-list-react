export const getFilterParam = currentPriority => {
  return dispatch => {
    dispatch({ type: 'FILTER_DATA', currentPriority });
  };
};

export const resetFilterParam = () => {
  return dispatch => {
    dispatch({ type: 'RESET_FILTER_PARAM' });
  };
};

export const getSortParam = sortParam => {
  return dispatch => {
    dispatch({ type: 'SORT_DATA', sortParam });
  };
};

export const resetSortParam = () => {
  return dispatch => {
    dispatch({ type: 'RESET_SORT_PARAM' });
  };
};

export const getViewMode = mode => {
  return dispatch => {
    dispatch({ type: 'GET_VIEW_MODE', mode });
  };
};
