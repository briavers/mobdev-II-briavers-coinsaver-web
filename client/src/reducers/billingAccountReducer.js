import { BILLING_ACCOUNT_CREATED, BILLING_ACCOUNT_CREATION_ERROR } from '../constants';

const initialState = {
  newBillingAccountCreated: false,
  newBillingAccount: undefined,
  error: undefined
}

function billingAccountReducer(state = initialState, action) {
  switch (action.type) {
    case BILLING_ACCOUNT_CREATED:
      return Object.assign({}, state, {
        newBillingAccountCreated: true,
        newBillingAccount: action.payload
      });
    case BILLING_ACCOUNT_CREATION_ERROR:
      return Object.assign({}, state, {
        newBillingAccountCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default billingAccountReducer;