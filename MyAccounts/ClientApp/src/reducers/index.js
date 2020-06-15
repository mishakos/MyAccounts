import { combineReducers } from 'redux';
import user from './userReducer';
import currencies from './currencyReducer';
import rates from './rateReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import accounts from './accountsReducer';
import banks from './bankReducer';
import clients from './clientReducer';

const rootReducer = combineReducers({
  user,
  currencies,
  rates,
  accounts,
  banks,
  clients,
  ajaxCallsInProgress
});

export default rootReducer;
