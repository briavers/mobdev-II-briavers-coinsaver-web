import { SUB_CATEGORY_CREATION_ERROR, SUB_CATEGORY_CREATED } from '../constants';

export function createSubCategory({ title, description, category }, history) {
  return async (dispatch) => {
    try {
      const SubCategoryData = new Blob([JSON.stringify({title: title, description: description, _category: category}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: SubCategoryData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/SubCategories', options);
      const responseJson = await response.json();

      dispatch({ 
        type: SUB_CATEGORY_CREATED,
        payload: responseJson,
        
      });
       window.location.href = '/backoffice/sub-categories-table';
    } catch(error) {
      dispatch({
        type: SUB_CATEGORY_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}