import Vue from 'vue';
import ElementUI from 'element-ui';
import './element-variables.scss';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);

window.vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
