import {SET_PROFILE, SET_TOKEN} from '../vuex/mutation_types'
import method from './method'
import alertify from 'alertifyjs'
import config from './config'
import router from '../router'
import store from '../vuex/store'
import admin from '../vuex/modules/admin'
import CryptoJS from 'crypto-js'

/**
 * 获取个人资料
 */
export const getProfile = (userId) => {
  return new Promise((resolve, reject) => {
    let url = config.getProfileUrl
    if (userId) {
      url += '?id=' + userId
    }
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 登录
 */
export const login = (userName, password) => {
  let encrypted = CryptoJS.SHA256(password).toString()
  method.post(config.loginUrl, {userName, password: encrypted}, response => {
    alertify.success('登录成功')
    router.replace('/main')
  })
}

/**
 * 检查登录状态
 */
export const checkLogin = () => {
  if (admin.getters.getToken()) {
    method.get(config.checkLoginUrl, response => {
      router.replace('/main')
    })
  }
}

/**
 * 退出
 */
export const logout = () => {
  return new Promise((resolve, reject) => {
    method.post(config.logoutUrl, {}, response => {
      resolve()
    })
    router.replace('/login')
    store.commit(SET_TOKEN, '')
    window.localStorage.clear()
  })
}

/**
 * 更新个人资料
 */
export const updateProfile = (profileChanges) => {
  return new Promise((resolve, reject) => {
    method.post(config.updateProfileUrl, profileChanges, response => {
      alertify.success('保存成功')
      resolve(profileChanges)
    })
  })
}

/**
 * 获取用户列表
 * isDeleted 1:已删除，0:未删除
 */
export const getUsers = (pageSize, pageNumber, isDeleted) => {
  return new Promise((resolve, reject) => {
    let url = config.getUsersUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&isDeleted=' + isDeleted
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 修改密码
 */
export const modifyPassword = (id, currentPassword, newPassword) => {
  let encryptedCurrentPassword = CryptoJS.SHA256(currentPassword).toString()
  let encryptedNewPassword = CryptoJS.SHA256(newPassword).toString()
  return new Promise((resolve, reject) => {
    method.post(config.modifyPasswordUrl, {id, currentPassword: encryptedCurrentPassword, newPassword: encryptedNewPassword}, response => {
      if (!currentPassword) {
        alertify.success('修改成功')
      }
      resolve()
    })
  })
}

/**
 * 添加用户
 */
export const addUser = (profile) => {
  let profile1 = window.$.extend(true, {}, profile)
  let encryptedPassword = CryptoJS.SHA256(profile1.password).toString()
  profile1.password = encryptedPassword
  return new Promise((resolve, reject) => {
    method.post(config.addUserUrl, profile1, response => {
      alertify.success('添加成功')
      resolve()
    })
  })
}

/**
 * 删除用户
 */
export const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    method.post(config.deleteUserUrl, {id}, response => {
      alertify.success('删除成功')
      resolve()
    })
  })
}

/**
 * 恢复用户
 */
export const restoreUser = (id) => {
  return new Promise((resolve, reject) => {
    method.post(config.restoreUserUrl, {id}, response => {
      alertify.success('恢复成功')
      resolve()
    })
  })
}

/**
 * 获取Token
 */
export const getToken = () => {
  return new Promise((resolve, reject) => {
    method.get(config.getTokenUrl, response => {
      resolve()
    })
  })
}

/**
 * 解锁账号
 */
export const unlockAccount = (userName) => {
  return new Promise((resolve, reject) => {
    method.post(config.unlockAccountUrl, {userName}, response => {
      alertify.success('解锁成功')
      resolve()
    })
  })
}
