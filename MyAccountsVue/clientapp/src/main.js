import Vue from "vue";
import store from "./store/index";
import AppLayout from "./theme/Layout.vue";
import router from "./router";
import {
  MdApp, 
  MdToolbar, 
  MdDrawer, 
  MdContent, 
  MdList, 
  MdButton, 
  MdCard, 
  MdField,
  MdTable,
  MdRipple,
  MdDatepicker,
  MdDialog
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdDrawer);
Vue.use(MdContent);
Vue.use(MdList);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);
Vue.use(MdTable);
Vue.use(MdRipple);
Vue.use(MdDatepicker);
Vue.use(MdDialog);

Vue.config.productionTip = false
const app = new Vue({
  router,
  ...AppLayout,
  store
});
app.$mount('#app')
