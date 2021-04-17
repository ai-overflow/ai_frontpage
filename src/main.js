import Vue from 'vue'
import App from './App.vue';
import router from './router';
import axios from 'axios';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API || 'http://localhost:5000/';

console.log(process.env.VUE_APP_ROOT_API);

new Vue({
  render: h => h(App),
}).$mount('#app');

Vue.use(router);
Vue.use(vuetify);
