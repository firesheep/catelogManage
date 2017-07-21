import Vue from 'vue'
import { Checkbox, Tabs, TabPane, Cascader, Pagination } from 'element-ui'
import VueRouter from 'vue-router'
import routes from './router'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'

Vue.use(Checkbox)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Cascader)
Vue.use(Pagination)

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	routes
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
