import { combineReducers } from 'redux';
import offcanvasReducer from './offcanvasReducer';

export default combineReducers({
  offcanvas: offcanvasReducer
});