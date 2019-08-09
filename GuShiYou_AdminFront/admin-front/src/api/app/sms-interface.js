import method from '../method'
import config from '../config'
import alertify from 'alertifyjs'

/**
 * 获取短信接口配置列表
 */
export const getSmsConfigs = () => {
  return new Promise((resolve, reject) => {
    let url = config.app.getSmsConfigsUrl
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 添加短信接口配置
 */
export const addSmsConfig = (paraConfig) => {
  return new Promise((resolve, reject) => {
    method.post(config.app.addSmsConfigUrl, paraConfig, response => {
      alertify.success('添加成功')
      resolve()
    })
  })
}

/**
 * 根据ID获取短信接口配置
 */
export const getSmsConfig = (id) => {
  return new Promise((resolve, reject) => {
    let url = config.app.getSmsConfigUrl + '?id=' + id
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 修改短信接口配置
 */
export const modifySmsConfig = (paraConfig) => {
  return new Promise((resolve, reject) => {
    method.post(config.app.modifySmsConfigUrl, paraConfig, response => {
      alertify.success('修改成功')
      resolve()
    })
  })
}
