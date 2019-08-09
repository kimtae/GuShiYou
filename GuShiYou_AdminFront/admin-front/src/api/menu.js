import method from './method'
import config from './config'
import alertify from 'alertifyjs'

/**
 * 获取菜单列表
 */
export const getMenus = (pageSize, pageNumber) => {
  return new Promise((resolve, reject) => {
    let url
    if (pageSize && pageNumber) {
      url = config.getMenusUrl + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber
    } else {
      url = config.getMenusUrl
    }
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 添加菜单
 */
export const addMenu = (menuName, privileges) => {
  return new Promise((resolve, reject) => {
    method.post(config.addMenuUrl, { menuName, privileges }, response => {
      alertify.success('添加成功')
      resolve()
    })
  })
}

/**
 * 根据ID获取菜单
 */
export const getMenu = (id) => {
  return new Promise((resolve, reject) => {
    let url = config.getMenuUrl + '?id=' + id
    method.get(url, response => {
      resolve(response.data.data)
    })
  })
}

/**
 * 修改菜单
 */
export const modifyMenu = (menu, privileges) => {
  if (privileges) {
    menu.privileges = privileges
  }
  return new Promise((resolve, reject) => {
    method.post(config.modifyMenuUrl, menu, response => {
      alertify.success('修改成功')
      resolve()
    })
  })
}
