import Vue from 'vue';
import ViewUI from 'view-design';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'view-design/dist/styles/iview.css';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api/request'

Vue.config.productionTip = false;

Vue.use(ViewUI);
// Vue.use(ElementUI);
Vue.use(api)

window.vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
