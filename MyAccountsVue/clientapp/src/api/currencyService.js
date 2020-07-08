import commonService from './commonService';

const currencyService = {
    getCurrencies() {
        return commonService.get('/api/Currencies');
    },
    saveCurrency(currency) {
        return commonService.put('/api/Currencies' + '/', currency);
    },
    addCurrency(currency) {
        return commonService.post('/api/Currencies', currency);
    },
    getRates(currencyId) {
        return commonService.get(`/api/Currencies/${currencyId}/rates`);
    },
    addRate(currencyId, rate) {
        return commonService.post('/api/Currencies/' + currencyId + '/rates', rate);
    },
    importRates(currencyId, fromDate, toDate) {
        return commonService.post(`/api/Currencies/${currencyId}/rates/import`, { fromDate: fromDate, toDate: toDate });
    }
}

export default currencyService;
