import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './config-router'

Vue.use(VueRouter)

export default new VueRouter({
  base: __dirname,
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes
})
