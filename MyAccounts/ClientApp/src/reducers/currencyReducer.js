import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currencyReducer(state = initialState.currencies, action) {
  switch (action.type) {
    case types.CURRENCY_ALL_LOAD_SUCCESS:
      return action.currencies;
    case types.CURRENCY_ADD_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.currency)
      ];
    case types.CURRENCY_UPDATE_SUCCESS:
      return [
        ...state.filter(curr => curr.id !== action.currency.id),
        Object.assign({}, action.currency)
      ];
    default:
      return state;
  }
}