import {SET_TOKEN, SET_PROFILE} from '../mutation_types.js'
import CryptoJS from 'crypto-js'

const KEY = 'G^_^Y'
const TOKEN = 'token'
const PROFILE = 'profile'
const localStorage = window.localStorage

const state = {
  token: '',
  profile: {}
}

let token = localStorage.getItem(TOKEN)
state.token = token

let encryptedProfile = localStorage.getItem(PROFILE)
// 解密
if (encryptedProfile) {
  let profile = CryptoJS.AES.decrypt(encryptedProfile, KEY)
  state.profile = JSON.parse(profile.toString(CryptoJS.enc.Utf8))
}

const getters = {
  getToken: () => {
    return state.token
  },
  getProfile: () => {
    return window.$.extend(true, {}, state.profile) // 深度复制
  }
}

const mutations = {
  [SET_TOKEN] (state, token) {
    state.token = token
    localStorage.setItem(TOKEN, token)
  },
  [SET_PROFILE] (state, user) {
    state.profile = user
    // 加密存储
    let encryptedProfile = CryptoJS.AES.encrypt(JSON.stringify(user), KEY)
    localStorage.setItem(PROFILE, encryptedProfile.toString())
  }
}

export default {
  state,
  getters,
  mutations
}
