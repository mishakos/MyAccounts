import commonApi from './commonApi';

class currencyApi {
    static getAllCurrencies() {
        return commonApi.get('/api/Currencies');
    }

    static saveCurrency(currency) {
        let url = '/api/Currencies';
        if (currency.id !== 0) {
            return commonApi.put(url + '/' + currency.id, currency);
        }
        return commonApi.post(url, currency);
    }

    static getRates(currencyId) {
        return commonApi.get('/api/Currencies/' + currencyId + '/rates');
    }

    static addRate(currencyId, rate) {
        return commonApi.post('/api/currencies/' + currencyId + '/rates', rate);
    }
    static importRates(currencyId, fromDate, toDate) {
        return commonApi.post('/api/currencies/' + currencyId + '/rates/import', {
            fromDate: fromDate,
            toDate: toDate
        });
    }
}

export default currencyApi;
