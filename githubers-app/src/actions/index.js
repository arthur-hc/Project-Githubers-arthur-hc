export const REQUEST_API = 'REQUEST_API';
export const GET_QUERY = 'GET_QUERY';
export const CLEAN = 'CLEAN';
export const GET_INFO = 'GET_INFO';
export const GET_REPO = 'GET_REPO';


export const requestApiAction = () => ({type: REQUEST_API});

export const getUsersAction = (data) => ({type: GET_QUERY, data});

export const getUserInfoAction = (data) => ({type: GET_INFO, data});

export const getUserRepoAction = (data) => ({type: GET_REPO, data});

export const cleanAction = () => ({type: CLEAN})

export const fetchAPIbyQuery = (query) => {
  return async (dispatch) => {
    dispatch(requestApiAction());
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}`)
      const json = await response.json()
      console.log(json)
      dispatch(getUsersAction(json))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchAPIbyUser = (user) => {
  return async (dispatch) => {
    dispatch(requestApiAction());
    try {
      const infoResponse = await fetch(`https://api.github.com/users/${user}`);
      const repoResponse = await fetch(`https://api.github.com/users/${user}/repos`);
      const infoJson = await infoResponse.json();
      const repoJson = await repoResponse.json();
      console.log(infoJson);
      console.log(repoJson);
      dispatch(getUserInfoAction(infoJson));
      dispatch(getUserRepoAction(repoJson));
    } catch (error) {
      console.log(error);
    }
  }
}