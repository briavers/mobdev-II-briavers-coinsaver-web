import { CATEGORY_CREATION_ERROR, CATEGORY_CREATED } from '../constants';

export function createCategory({ title, description }, history) {
  return async (dispatch) => {
    try {
      const categoryData = new Blob([JSON.stringify({title: title, description: description }, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: categoryData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/categories', options);
      const responseJson = await response.json();

      dispatch({ 
        type: CATEGORY_CREATED,
        payload: responseJson,
        
      });
       window.location.href = '/backoffice/categories-table';
    } catch(error) {
      dispatch({
        type: CATEGORY_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}