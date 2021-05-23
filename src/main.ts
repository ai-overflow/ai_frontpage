import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import vuetify from '@/plugins/vuetify';
import VueCodemirror from 'vue-codemirror';


import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/mode/yaml/yaml.js';

Vue.config.productionTip = false;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
axios.defaults.timeout = 10000;
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API || 'http://localhost:5000/';

console.log(process.env.VUE_APP_ROOT_API);

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app');

Vue.use(vuetify);
Vue.use(VueCodemirror, {
  options: {
    tabSize: 4,
    mode: 'text/x-yaml',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true,
    // more CodeMirror options...
  }
});