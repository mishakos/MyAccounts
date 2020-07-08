<template>
  <div class="md-toolbar-row">
    <h3 class="md-title" style="flex: 1"><router-link class="md-title" to='/home' exact>My Accounts</router-link></h3>
    <md-button to="/login">
      <span v-if="isAuthenticated">Sign Out</span>
      <span v-else>Sign In</span>
    </md-button>
    <md-button v-if="!isAuthenticated" to="/signup">
      <span >Sign Up</span>
    </md-button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
