import { CATEGORY_CREATED, CATEGORY_CREATION_ERROR } from '../constants';

const initialState = {
  newCategoryCreated: false,
  newCategory: undefined,
  error: undefined
}

function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_CREATED:
      return Object.assign({}, state, {
        newCategoryCreated: true,
        newCategory: action.payload
      });
    case CATEGORY_CREATION_ERROR:
      return Object.assign({}, state, {
        newCategoryCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default categoryReducer;