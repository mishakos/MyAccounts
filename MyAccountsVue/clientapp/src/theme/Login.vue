<template>
  <div>
    <md-card class="login-card" md-with-hover>
      <md-card-header>
        <div v-if="!isAuthenticated" class="md-title">Sign In</div>
        <div v-if="isAuthenticated" class="md-title">Sign Out</div>
      </md-card-header>
      <md-card-content>
        <div v-if="isAuthenticated">Do you really want to quit?</div>
        <div v-if="!isAuthenticated">
          <md-field md-clearable>
            <label>Login</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button v-if="!isAuthenticated" v-on:click="login">Sign In</md-button>
        <md-button v-if="isAuthenticated" v-on:click="logout">Sign Out</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<style scoped>
.login-card {
  width: 800px;
  margin: auto;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    login() {
      this.$store
        .dispatch("login", { username: this.username, password: this.password })
        .then(() => {
          this.username = "";
          this.password = "";
          this.$router.replace('/');
        });
    }
  }
};
</script>
