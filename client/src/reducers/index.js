import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import offcanvasReducer from './offcanvasReducer';
import postReducer from './postReducer';
import billingAccountReducer from './billingAccountReducer';
import categoryReducer from './categoryReducer';
import subCategoryReducer from './subCategoryReducer';
import expenseReducer from './expenseReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  offcanvas: offcanvasReducer,
  post: postReducer,
  billingAccount: billingAccountReducer,
  category: categoryReducer,
  subCategory: subCategoryReducer,
  expense : expenseReducer
});