import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {initMenu} from './utils/menus'
import 'font-awesome/css/font-awesome.css'


import {postRequest} from './utils/api'
import {postKeyValueRequest} from './utils/api'
import {putRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {getRequest} from './utils/api'

/* ########## 引入 Element-UI ########## */
/**
 * 引入 Element-UI
 * STEP1: npm i element-ui -S
 * STEP2: 加入下面的代码
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* #########* 引入 Element-UI *######### */

/* ########## 插件 ########## */
Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
/* #########* 插件 *######### */


Vue.config.productionTip = false


// 路由导航守卫(类似于后台的拦截器)
router.beforeEach((to , from, next) => {
  if (to.path == '/') {
    next();
  } else {
    initMenu(router, store);
    next();
  }
  

});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
