<template>
  <div>
    <md-table v-model="currencies" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Currencies</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
        <md-table-cell md-label="Code" md-sort-by="code">{{item.code}}</md-table-cell>
        <md-table-cell md-label="Short Code" md-sort-by="shortCode">{{item.shortCode}}</md-table-cell>
        <md-table-cell md-label="Symbol" md-sort-by="symbol">{{item.symbol}}</md-table-cell>
        <md-table-cell md-label="">
          <router-link :to="{path: '/rates/' + item.id}">Rates</router-link>
         </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CurrencyList",
  computed: {
    ...mapGetters("currencyModule", ["currencies"])
  },
  methods: {
    loadCurrencies() {
      this.$store.dispatch("currencyModule/getCurrencies");
    }
  },
  watch: {
    $route() {
      this.loadCurrencies();
    }
  },
  created() {
    this.loadCurrencies();
  }
};
</script>