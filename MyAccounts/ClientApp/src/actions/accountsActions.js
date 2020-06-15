import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import accountsApi from '../api/accountsApi';

export function accountsLoadSuccess(accounts) {
  return {
    type: types.ACCOUNTS_LOAD_SUCCESS,
    accounts
  };
}

export function accountAddSuccess(account) {
  return {
    type: types.ACCOUNTS_ADD_SUCCESS,
    account
  };
}

export function accountUpdateSuccess(account) {
  return {
    type: types.ACCOUNTS_UPDATE_SUCCESS,
    account
  };
}

export function loadAccounts() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return accountsApi.getAllAccounts().then(accounts => {
      dispatch(accountsLoadSuccess(accounts));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  }
}

export function addAccount(account) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return accountsApi.addAccount(account).then(data => {
      dispatch(accountAddSuccess(data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    })
  }
}

export function updateAccount(account) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return accountsApi.updateAccount(account).then(data => {
      dispatch(accountUpdateSuccess(data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  }
}