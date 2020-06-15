import commonApi from './commonApi';

class clientApi {
  static getAllClient() {
    return commonApi.get('/api/clients');
  }

  static addClient(client) {
    return commonApi.post('/api/clients', client);
  }
}

export default clientApi;
