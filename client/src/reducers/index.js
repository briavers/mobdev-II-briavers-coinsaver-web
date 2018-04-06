import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import offcanvasReducer from './offcanvasReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  offcanvas: offcanvasReducer
});