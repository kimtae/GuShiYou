import method from './method'
import config from './config'
import alertify from 'alertifyjs'

/**
 * 获取权限列表
 */
export const getPrivileges = (pageSize, pageNumber) => {
  return new Promise((resolve, reject) => {
    let url = config.getPrivilegesUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 根据ID获取权限
 */
export const getPrivilege = (id) => {
  return new Promise((resolve, reject) => {
    let url = config.getPrivilegeUrl + '?id=' + id
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 添加权限
 */
export const addPrivilege = (privilegeName, description) => {
  return new Promise((resolve, reject) => {
    method.post(config.addPrivilegeUrl, { privilegeName, description }, response => {
      alertify.success('添加成功')
      resolve()
    })
  })
}

/**
 * 删除权限
 */
export const deletePrivilege = (id) => {
  return new Promise((resolve, reject) => {
    method.post(config.deletePrivilegeUrl, {id}, response => {
      alertify.success('删除成功')
      resolve()
    })
  })
}

/**
 * 修改权限
 */
export const modifyPrivilege = (privilege) => {
  return new Promise((resolve, reject) => {
    method.post(config.modifyPrivilegeUrl, privilege, response => {
      alertify.success('修改成功')
      resolve()
    })
  })
}

/**
 * 获取没有分配菜单的权限列表
 */
export const getPrivilegesNotInMenu = () => {
  return new Promise((resolve, reject) => {
    let url = config.getPrivilegesNotInMenu
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}
