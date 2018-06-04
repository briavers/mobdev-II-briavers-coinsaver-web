import { SUB_CATEGORY_CREATED, SUB_CATEGORY_CREATION_ERROR } from '../constants';

const initialState = {
  newSubCategoryCreated: false,
  newSubCategory: undefined,
  error: undefined
}

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case SUB_CATEGORY_CREATED:
      return Object.assign({}, state, {
        newSubCategoryCreated: true,
        newSubCategory: action.payload
      });
    case SUB_CATEGORY_CREATION_ERROR:
      return Object.assign({}, state, {
        newSubCategoryCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default categoryReducer;