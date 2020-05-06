import Vue from 'vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 全局组件注册
const cps = require.context('./components/', true, /\.vue$/);
cps.keys().forEach((key) => {
    const componentConfig = cps(key)
    const componentName = key
    .replace(/^\.\/_/, '')
    .replace(/\.\w+$/, '')
    .split('./')
    .join('');
    Vue.component(componentName, componentConfig.default);
});

Vue.use(ViewUI);

window.vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
