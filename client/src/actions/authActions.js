import { AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../constants';
import { checkAuth } from "../App";
import swal from 'sweetalert'

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
      window.location.href = '/billingAccounts';
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
        swal("Oops!", "wrong email or password!", "error")
    }
      checkAuth();
  };
}

export function signUpActionLocalStrategy({ email, password, }, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({email: email, localProvider: {password: password}}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/signup', options);
      const responseJson = await response.json();
      const responseStatus = response.status
      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      if(response.json.code == 1100){
        swal("Oops!", "user already exists!", "error")
      }else{
        switch (responseStatus) {
          case 500:
           swal("Oops!", "wrong identification", "error")
            break;
          case 201:
          dispatch({
            type: AUTHENTICATED,
            payload: responseJson
          });
          window.location.href="/billingAccounts"
          localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));
            break;
        default:
           swal("Oops!", "something went terribly wrong, try again later", "error")
            break;
        }
      }
    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}

export function signInActionFacebookStrategy(accessToken, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({access_token: accessToken}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/facebook', options);
      const responseJson = await response.json();

      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson))
      window.location.href = '/';

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
  window.location.href = '/';
  return {
    type: UNAUTHENTICATED
  };
}