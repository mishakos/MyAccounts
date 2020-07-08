<template>
  <div>
    <md-card class="signup-card">
      <md-card-header>
        <div class="md-title">Sign Up</div>
      </md-card-header>
      <md-card-content>
        <div>
          <md-field md-clearable>
            <label>Login</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <md-field>
            <label>Password</label>
            <md-input v-model="password" type="password"></md-input>
          </md-field>
          <md-field>
            <label>Confirm Password</label>
            <md-input v-model="passwordConfirm" type="password"></md-input>
          </md-field>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button v-on:click="signup">Sign Up</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>
<style scoped>
.signup-card {
  width: 900px;
  margin: auto;
}
</style>
<script>

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    signup() {
      this.$store
        .dispatch("registrate", { username: this.username, password: this.password, passwordConfirm: this.passwordConfirm })
        .then(() => {
          this.username = "";
          this.password = "";
          this.passwordConfirm = "";
          this.$router.replace("/");
        });
    }
  }
};
</script>