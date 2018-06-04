import { BILLING_ACCOUNT_CREATION_ERROR, BILLING_ACCOUNT_CREATED } from '../constants';

export function createBillingAccount({ title, savings, expenses, type, user }, history) {
  return async (dispatch) => {
    try {
      const billingAccountData = new Blob([JSON.stringify({title: title, savings: savings, expenses: expenses, _type: type, user: user }, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: billingAccountData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/billingAccounts', options);
      const responseJson = await response.json();

      dispatch({ 
        type: BILLING_ACCOUNT_CREATED,
        payload: responseJson,
        
      });
       window.location.href = '/billingAccounts';
    } catch(error) {
      dispatch({
        type: BILLING_ACCOUNT_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}