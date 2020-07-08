<template>
  <div>
    <md-table v-model="rates" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Rates</h1>
        </div>
        <div class="md-toolbar">
          <md-datepicker name="fromDateDP" v-model="fromDate">
            <label>From date</label>
          </md-datepicker>
          <md-datepicker name="toDateDP" v-model="toDate">
            <label>To date</label>
          </md-datepicker>
          <md-button class="md-primary" v-on:click="importRates">Import from NBU</md-button>
        </div>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Currency Code" md-sort-by="currencyCode">{{item.currencyCode}}</md-table-cell>
        <md-table-cell md-label="Date" md-sort-by="date">{{item.date | date}}</md-table-cell>
        <md-table-cell md-label="Koef" md-sort-by="koef">{{item.koef}}</md-table-cell>
        <md-table-cell md-label="Rate" md-sort-by="rate">{{item.rate}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

export default {
  name: "RateList",
  data() {
    return {
      currencyId: this.$route.params.id,
      fromDate: null,
      toDate: null
    };
  },
  computed: {
    ...mapGetters("ratesModule", ["rates"])
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      let date = new Date(value);
      return date.toLocaleDateString("en-EN", options);
    }
  },
  methods: {
    loadRates() {
      this.$store.dispatch("ratesModule/getRates", this.currencyId);
    },
    importRates() {
     
      this.$store.dispatch("ratesModule/importRates", {
        currencyId: this.currencyId,
        fromDate: this.fromDate,
        toDate: this.toDate
      });
    }
  },
  watch: {
    $route() {
      this.loadRates();
    }
  },
  created() {
    this.loadRates();
  }
};
</script>