import Vue from 'vue'
import VueResource from 'vue-resource'
import alertify from 'alertifyjs'
import fastclick from 'fastclick'
import router from './router'
import Pagination from 'components/Pagination'

fastclick.attach(document.body)

alertify.defaults.transition = 'zoom'
alertify.defaults.theme.ok = 'ui positive button'
alertify.defaults.theme.cancel = 'ui black button'
alertify.defaults.notifier.delay = 5
alertify.defaults.glossary = {
  title: '注意',
  ok: '确定',
  cancel: '取消'
}

Vue.use(VueResource)

// 注册组件
Vue.component('pagination', Pagination)

new Vue({
  router
}).$mount('#app')
