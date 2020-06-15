import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import bankApi from '../api/bankApi';

export function banksLoadSuccess(banks) {
  return {
    type: types.BANK_LOAD_SUCCESS,
    banks
  };
}

export function bankAddedSuccess(bank) {
  return {
    type: types.BANK_ADDED_SUCCESS,
    bank
  };
}

export function bankUpdateSuccess(bank) {
  return {
    type: types.BANK_UPDATE_SUCCESS,
    bank
  };
}

export function bankDeleteSuccess(bank) {
  return {
    type: types.BANK_DELETE_SUCCESS,
    bank
  };
}

export function loadBanks() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return bankApi.getAllBanks().then(banks => {
      dispatch(banksLoadSuccess(banks))
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}

export function addBank(newBank) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return bankApi.addBank(newBank).then(savedBank => {
      dispatch(bankAddedSuccess(savedBank));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}

export function updateBank(id, bank) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return bankApi.updateBank(id, bank).then(updatedBank => {
      dispatch(bankUpdateSuccess(updatedBank));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}

export function deleteBank(id, bank) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return bankApi.deleteBank(id, bank).then(data => {
      dispatch(bankDeleteSuccess(bank));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}