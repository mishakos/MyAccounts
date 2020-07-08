import currencyService from '../../api/currencyService';

const state = {
    currencies: []
};

const getters = {
    currencies: state => state.currencies
};

const actions = {
    getCurrencies(context) {
        currencyService.getCurrencies().then(data => {
            context.commit("getCurrencies", { currencies: data });
        });
    },
    addCurrency(context, currency) {
        currencyService.addCurrency(currency).then(data => {
            context.commit("addCurrency", { currency: data });
        })
    }
}

const mutations = {
    getCurrencies(state, data) {
        state.currencies = data.currencies;
    },
    addCurrency(state, data) {
        state.currencies = [...state.currencies, Object.assign({}, data.currency)];
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
