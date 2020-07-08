import Vue from "vue";
import Vuex from "vuex";
import authService from "../api/authService";
import toastr from 'toastr';
import currencyModule from './modules/currencyModule';
import ratesModule from './modules/ratesModule';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      currencyModule,
      ratesModule
    },
    state: {
      isAuthenticated: false
    },
    getters: {
      isAuthenticated: state => {
        return state.isAuthenticated;
      }
    },
    actions: {
      logout(context) {
        context.commit("logout");
      },
      login(context, credentials) {
        return new Promise(resolve => {
            authService
            .login(credentials)
            .then(data => {
              context.commit("login", data);
              resolve();
            })
            .catch((error) => toastr.error(error));
        });
      },
      registrate(context, credentials) {
          return new Promise(resolve => {
              authService.registrate(credentials)
              .then(data => {
                  context.commit("login", data);
                  resolve();
              })
              .catch(error => toastr.error(error));
          });
      }
    },
    mutations: {
      logout(state) {
        if (window !== "undefined") {
          window.localStorage.setItem("token", null);
          //window.localStorage.setItem("tokenExpiration", null);
        }
        state.isAuthenticated = false;
      },
      login(state, token) {
        if (window !== "undefined") {
          window.localStorage.setItem("token", token.token);
          //window.localStorage.setItem("tokenExpiration", token.expiration);
        }
        state.isAuthenticated = true;
      }
    }
  });
  
//   if (typeof window !== "undefined") {
//     document.addEventListener("DOMContentLoaded", function(event) {
//       let expiration = window.localStorage.getItem("tokenExpiration");
//       event.target;
//       var unixTimestamp = new Date().getTime() / 1000;
//       if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
//         store.state.isAuthenticated = true;
//       }
//     });
//   }
  
  export default store;
  