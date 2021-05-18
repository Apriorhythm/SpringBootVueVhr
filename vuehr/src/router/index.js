import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'

Vue.use(VueRouter)

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home', 
    name: 'Home',
    component: Home,
    hidden: true
  },
  {
    path: '/home', 
    name: '测试菜单',
    component: Home,
    children: [
      {
        path: '/test1', 
        name: '选项1',
        component: Test1,
      },
      {
        path: '/test2', 
        name: '选项2',
        component: Test2,
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
