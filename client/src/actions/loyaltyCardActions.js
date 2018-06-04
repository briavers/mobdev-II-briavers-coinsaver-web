import { LOYALTY_CARD_CREATION_ERROR, LOYALTY_CARD_CREATED } from '../constants';

export function createLoyaltyCard({ storeImg, code, user }, history) {
  return async (dispatch) => {
    try {
      const LoyaltyCardData = new Blob([JSON.stringify({
        storeImg: storeImg,
        code: code,
        user: user
      }, null, 2)], {
        type: 'application/json'
      });
      const options = {
          method: 'POST',
          body: LoyaltyCardData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/loyaltyCards', options);
      const responseJson = await response.json();

      dispatch({ 
        type: LOYALTY_CARD_CREATED,
        payload: responseJson,
        
      });
      window.location.href = '/loyaltyCards';
    } catch(error) {
      dispatch({
        type: LOYALTY_CARD_CREATION_ERROR,
        payload: {
          message: 'Invalid email or password',
          exception: error
        }
      });
    }
  };
}