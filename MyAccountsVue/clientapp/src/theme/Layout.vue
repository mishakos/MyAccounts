<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <app-header></app-header>
      </md-app-toolbar>
      <md-app-content>
        <div>
          <router-view></router-view>
        </div>
      </md-app-content>
      <md-app-drawer md-permanent="full">
        <app-footer></app-footer>
      </md-app-drawer>
    </md-app>
  </div>
</template>
<script>
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";

export default {
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter
  }
};
</script>
<style>
a.card-footer-item {
  color: #287ab1;
}
.columns {
  flex-wrap: wrap;
}
</style>
