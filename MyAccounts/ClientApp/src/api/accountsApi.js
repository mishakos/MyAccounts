import commonApi from './commonApi';

class accountsApi {
  static getAllAccounts() {
    return commonApi.get('/api/Accounts');
  }

  static addAccount(account) {
    let url = '/api/Accounts';
    return commonApi.post(url, account);
  }

  static updateAccount(account) {
    let url = '/api/Accounts';
    return commonApi.put(url + '/' + account.id, account)
  }
}

export default accountsApi;