import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bankReducer(state = initialState.banks, action) {
  switch (action.type) {
    case types.BANK_LOAD_SUCCESS:
      return action.banks;
    case types.BANK_ADDED_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.bank)
      ];
    case types.BANK_UPDATE_SUCCESS:
      return [
        ...state.filter(bank => bank.id != action.bank.id),
        action.bank
      ];
    case types.BANK_DELETE_SUCCESS:
      return [
        ...state.filter(bank => bank.id != action.bank.id)
      ];
    default:
      return state;
  }
}