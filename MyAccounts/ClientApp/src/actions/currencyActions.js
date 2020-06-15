import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import currencyApi from '../api/currencyApi';

export function currencyLoadSuccess(currencies) {
  return {
    type: types.CURRENCY_ALL_LOAD_SUCCESS,
    currencies
  }
}

export function currencyAddSuccess(currency) {
  return {
    type: types.CURRENCY_ADD_SUCCESS,
    currency
  };
}
export function currencyUpdateSuccess(currency) {
  return {
    type: types.CURRENCY_UPDATE_SUCCESS,
    currency
  };
}

export function loadCurrencies() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return currencyApi.getAllCurrencies().then(currencies => {
      dispatch(currencyLoadSuccess(currencies));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  }
}

export function saveCurrency(currency) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return currencyApi.saveCurrency(currency).then(savedCurrency => {
      dispatch(currencyAddSuccess(currency));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    })
  }
}

export function updateCurrency(currency) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return currencyApi.saveCurrency(currency).then(savedCurrency => {
      dispatch(currencyUpdateSuccess(currency));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    })
  }
}