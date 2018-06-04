import { EXPENSE_CREATION_ERROR, EXPENSE_CREATED } from '../constants';

export function createExpense({ title, description, amount, billingAccount,subCategory, user }, history) {
  return async (dispatch) => {
    try {
      const expenseData = new Blob([JSON.stringify({
        title: title,
        description: description,
        amount: amount,
        _billingAccount: billingAccount,
        _subCategory: subCategory,
        user: user

      }, null, 2)], {
        type: 'application/json'
      });
      const options = {
          method: 'POST',
          body: expenseData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/expenses', options);
      const responseJson = await response.json();

      dispatch({ 
        type: EXPENSE_CREATED,
        payload: responseJson,
        
      });
      window.location.href = '/expenses';
    } catch(error) {
      dispatch({
        type: EXPENSE_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}