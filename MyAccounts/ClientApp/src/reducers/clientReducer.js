import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function ClientReducer(state = initialState.clients, action) {
  switch (action.type) {
    case types.CLIENT_LOAD_SUCCESS:
      return action.clients;
    case types.CLIENT_ADDED_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.client)
      ];
    default:
      return state;
  }
}