import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function rateReducer(state = initialState.rates, action) {
  switch (action.type) {
      case types.CURRENCY_RATE_LOAD_SUCCESS:
          {
              return action.rates;
          }
      
    case types.CURRENCY_RATE_ADD_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.rate)
      ];
    default:
      return state;
  }
}