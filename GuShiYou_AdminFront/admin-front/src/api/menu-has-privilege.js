import method from './method'
import config from './config'

/**
 * 获取菜单权限列表
 */
export const getMenuHasPrivileges = (menuId) => {
  return new Promise((resolve, reject) => {
    let url = config.getMenuHasPrivilegesUrl
    if (menuId) {
      url = url + '?menuId=' + menuId
    }
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}
