import method from './method'
import config from './config'

/**
 * 获取角色权限列表
 */
export const getRoleHasPrivileges = (roleId) => {
  return new Promise((resolve, reject) => {
    let url = config.roleHasPrivilegesUrl + '?roleId=' + roleId
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 获取角色所拥有的菜单
 */
export const getRoleHasMenus = (roleId) => {
  return new Promise((resolve, reject) => {
    let url = config.getRoleHasMenusUrl + '?roleId=' + roleId
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}
