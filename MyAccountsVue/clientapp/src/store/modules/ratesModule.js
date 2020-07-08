import currencyService from '../../api/currencyService';

const state = {
    rates:[],
    currencyId: 0
};

const getters = {
    rates: state => state.rates,
    currencyId: state => state.currencyId
};

const actions = {
    getRates(context, currencyId) {
        currencyService.getRates(currencyId).then(data => {
            context.commit("getRates", { rates: data, currencyId: currencyId });
        });
    },
    addRate(context, rate) {
        currencyService.addRate(rate).then(data => {
            context.commit("addRate", { rate: data });
        });
    },
    importRates(context, params) {
        currencyService.importRates(params.currencyId, params.fromDate, params.toDate).then(data => {
            context.commit("importRates", { rates: data });
        })
    }

};

const mutations = {
    getRates(state, data) {
        state.rates = data.rates;
    },
    addRate(state, data) {
        state.rates = [...state.rates, Object.assign({}, data.rates)];
    },
    importRates(state, data) {
        state.rates = data.rates
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
