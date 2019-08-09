import method from './method'
import config from './config'
import alertify from 'alertifyjs'

/**
 * 获取角色列表
 * @param isDetailed 1:详细，0：不详细
 */
export const getRoles = (isDetailed) => {
  return new Promise((resolve, reject) => {
    let url = config.getRolesUrl
    if (isDetailed) {
      url = url + '?isDetailed=' + isDetailed
    }
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 根据ID获取角色
 */
export const getRole = (id) => {
  return new Promise((resolve, reject) => {
    let url = config.getRoleUrl + '?id=' + id
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 添加角色
 */
export const addRole = (roleName, description, privileges) => {
  return new Promise((resolve, reject) => {
    method.post(config.addRoleUrl, { roleName, description, privileges }, response => {
      alertify.success('添加成功')
      resolve()
    })
  })
}

/**
 * 删除角色
 */
export const deleteRole = (id) => {
  return new Promise((resolve, reject) => {
    method.post(config.deleteRoleUrl, {id}, response => {
      alertify.success('删除成功')
      resolve()
    })
  })
}

/**
 * 修改角色
 */
export const modifyRole = (role, privileges) => {
  if (privileges) {
    role.privileges = privileges
  }
  return new Promise((resolve, reject) => {
    method.post(config.modifyRoleUrl, role, response => {
      alertify.success('修改成功')
      resolve()
    })
  })
}
