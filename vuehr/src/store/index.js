import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    // 从后台读取的菜单项
    routes: []
  },
  getters: {

  },
  mutations: {
    initRoutes(state, data) {
        state.routes = data;
    }
  },
  actions: {

  }
    
})