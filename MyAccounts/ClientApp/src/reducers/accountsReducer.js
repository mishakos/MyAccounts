import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function accountReducer(state = initialState.accounts, action) {
  switch (action.type) {
    case types.ACCOUNTS_LOAD_SUCCESS:
      return action.accounts;
    case types.ACCOUNTS_ADD_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.account)
      ];
    case types.ACCOUNTS_UPDATE_SUCCESS:
      return [
        ...state.filter(acc => acc.id !== action.account.id),
        Object.assign({}, action.account)
      ]
    default:
      return state;
  }
}