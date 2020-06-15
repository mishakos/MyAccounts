import * as types from './actionTypes';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';
import currencyApi from '../api/currencyApi';

export function ratesLoadSuccess(rates) {
  return {
    type: types.CURRENCY_RATE_LOAD_SUCCESS,
    rates
  };
}

export function ratesAddedSuccess(rate) {
  return {
    type: types.CURRENCY_RATE_ADD_SUCCESS,
    rate
  };
}

export function ratesImportSuccess(rates) {
    return {
        type: types.CURRENCY_RATE_IMPORT_SUCCESS,
        rates
    };
}

export function loadRates(currencyId) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return currencyApi.getRates(currencyId).then(rates => {
      dispatch(ratesLoadSuccess(rates));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    })
  }
}

export function addRate(currencyId, rate) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return currencyApi.addRate(currencyId, rate).then(rate => {
      dispatch(ratesAddedSuccess(rate));
    }).catch(error => {
      dispatch(ajaxCallError(error));
    });
  }
}

export function importRates(currencyId, fromDate, toDate) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return currencyApi.importRates(currencyId, fromDate, toDate).then(rates => {
            dispatch(ratesImportSuccess(rates));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}