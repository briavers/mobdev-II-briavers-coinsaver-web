import { EXPENSE_CREATED, EXPENSE_CREATION_ERROR } from '../constants';

const initialState = {
  newExpenseCreated: false,
  newExpense: undefined,
  error: undefined
}

function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case EXPENSE_CREATED:
      return Object.assign({}, state, {
        newExpenseCreated: true,
        newExpense: action.payload
      });
    case EXPENSE_CREATION_ERROR:
      return Object.assign({}, state, {
        newExpenseCreated: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export default expenseReducer;