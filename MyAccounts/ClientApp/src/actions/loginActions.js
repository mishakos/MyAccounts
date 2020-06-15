import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusAction';

export function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, user };
}

export function registrateSuccess(user) {
  return { type: types.REGISTRATE_SUCCESS, user };
}

export function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS };
}

export function login(loginForm) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.login(loginForm).then(token => {
      localStorage.setItem('jwtToken', JSON.stringify(token));
      userApi.meByToken().then(user => {
        dispatch(loginSuccess(user));
      });
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw (error);
    });
  };
}

export function registrate(registerForm) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.registrate(registerForm).then(token => {
      localStorage.setItem('jwtToken', JSON.stringify(token));
      userApi.meByToken().then(user => {
        dispatch(registrateSuccess(user));
      });
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw error;
    });
  };
}

export function logout() {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    localStorage.removeItem('jwtToken');
    return dispatch(logoutSuccess());
  }
}