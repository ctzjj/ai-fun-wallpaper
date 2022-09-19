import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import { InfiniteScroll, Loading } from 'element-ui';
Vue.use(InfiniteScroll);
Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
