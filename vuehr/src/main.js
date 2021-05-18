import Vue from 'vue'
import App from './App.vue'
import router from './router'


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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
