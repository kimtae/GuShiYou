import Vue from 'vue'
import VueResource from 'vue-resource'
import { SET_TOKEN } from '../vuex/mutation_types'
import admin from '../vuex/modules/admin'
import store from '../vuex/store'
import alertify from 'alertifyjs'
import router from '../router'
import { getToken } from './admin'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  if (request.method == 'POST') {
    let token = admin.getters.getToken()
    if (token) {
      Vue.http.headers.common['Token'] = token
    }
  }
  next((response) => {
    // 服务器在Linux平台运行,是大写字母开头的Token
    if (response.headers.map.Token) {
      store.commit(SET_TOKEN, response.headers.map.Token[0])
    }
    // 服务器在Windows平台运行,是小写字母开头的token
    if (response.headers.map.token) {
      store.commit(SET_TOKEN, response.headers.map.token[0])
    }
    return response
  })
})

let handleResponse = (success, error, response) => {
  if (response.data.code === 1) {
    if (success) {
      success(response)
    }
  } else if (response.data.code === 4002) {
    getToken()
  } else if (response.data.code === 4001 || response.data.code === 4144) {
    router.push('/login')
  } else if (response.data.code !== 4000) {
    alertify.error(response.data.msg)
    if (error) {
      error(response)
    }
  }
  if (error) {
    error(response)
  }
}

let handleError = response => alertify.error(response.status + ' ' + response.statusText)

export default {
  get (url, success, error) {
    Vue.http.get(url)
    .then(response => handleResponse(success, error, response))
    .catch(handleError)
  },
  post (url, data, success, error) {
    Vue.http.post(url, data, { emulateJSON: true })
    .then(response => handleResponse(success, error, response))
    .catch(handleError)
  }
}
