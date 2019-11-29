import Vue from 'vue';
import ElementUI from 'element-ui';
import './element-variables.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import apolloProvider from './vue-apollo';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router,
  store,
  apolloProvider
}).$mount('#app')
