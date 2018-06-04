import { AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED } from '../constants';
import { checkAuth } from "../App";


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

    }
      checkAuth();
      //console.log("auth checked")
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
      //console.log(options)
      const responseJson = await response.json();
      const responseStatus = response.status

      //console.log("responseJson", response.status)
      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });

      if(response.json.code == 1100){
        alert('user already exists')
      }else{
        switch (responseStatus) {
          case 500:
            //console.log('something went ')
            alert('wrong identification')
            break;
        
          case 201:
            //console.log('everything went fine  ');
          dispatch({
            type: AUTHENTICATED,
            payload: responseJson
          });
          window.location.href="/billingAccounts"
          localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));
            break;
        
        default:
           alert('woops something went wrong try again later')
            break;
        }
      }
      
      //console.log(responseJson)
      
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