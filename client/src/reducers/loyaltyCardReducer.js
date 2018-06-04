import { LOYALTY_CARD_CREATED, LOYALTY_CARD_CREATION_ERROR } from '../constants';

const initialState = {
  newLoyaltyCardCreated: false,
  newLoyaltyCard: undefined,
  error: undefined
}

function loyaltyCardReducer(state = initialState, action) {
  switch (action.type) {
    case LOYALTY_CARD_CREATED:
      return Object.assign({}, state, {
        newLoyaltyCardCreated: true,
        newLoyaltyCard: action.payload
      });
    case LOYALTY_CARD_CREATION_ERROR:
      return Object.assign({}, state, {
        newLoyaltyCardCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default loyaltyCardReducer;