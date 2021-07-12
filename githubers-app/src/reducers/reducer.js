import { REQUEST_API, GET_QUERY, GET_INFO, GET_REPO, CLEAN } from '../actions';

const INITIAL_STATE = {
  isLoading: false,
  queryResults: null,
  userInfo: [],
  userRepos: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
    };
  case GET_QUERY:
    return {
      ...state,
      isLoading: false,
      queryResults: action.data,
    };
  case GET_INFO:
    return {
      ...state,
      isLoading: false,
      userInfo: action.data
    }
  case GET_REPO:
    return {
      ...state,
      isLoading: false,
      userRepos: action.data
    }
  case CLEAN:
    return INITIAL_STATE;
  default:
    return state;
  }
}

export default reducer;
