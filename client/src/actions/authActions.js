import { AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../constants';

export function signInActionLocalStrategy({ email, password }, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({email: email, password: password}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/local', options);
      const responseJson = await response.json();

      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));

    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
}

export function signInActionFacebookStrategy(accessToken, history) {
  return async (dispatch) => {
    try {
      console.log(accessToken);
      const postData = new Blob([JSON.stringify({access_token: accessToken}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/facebook', options);
      const responseJson = await response.json();
      console.log(responseJson);

      /*
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
        if (token) {
          this.setState({isAuthenticated: true, user, token})
        }
      });
      */

      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));

    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid access token'
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}