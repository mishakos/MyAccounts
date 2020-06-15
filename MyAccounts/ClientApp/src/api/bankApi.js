import commonApi from './commonApi';

class bankApi {
  static getAllBanks() {
    return commonApi.get('/api/Banks');
  }

  static addBank(bank) {
    return commonApi.post('/api/banks', bank);
  }

  static updateBank(id, bank) {
    return commonApi.put(`/api/banks/${id}`, bank);
  }

  static deleteBank(id, bank) {
    return commonApi.delete(`/api/banks/${id}`, bank);
  }
}
export default bankApi;