import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import clientApi from '../api/clientApi';

export function loadClientSuccess(clients) {
  return {
    type: types.CLIENT_LOAD_SUCCESS,
    clients
  };
}


export function addClientSuccess(client) {
  return {
    type: types.CLIENT_ADDED_SUCCESS,
    client
  };
}

export function loadClients() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return clientApi.getAllClient().then(clients => {
      dispatch(loadClientSuccess(clients));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}

export function addClient(data) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return clientApi.addClient(data).then(client => {
      dispatch(addClientSuccess(client));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}
