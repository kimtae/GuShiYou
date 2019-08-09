import alertify from 'alertifyjs'
import _ from 'underscore'

// 检查表单
export const checkForm = profile => {
  // 去掉表单项值前后的空格
  for (let index in profile) {
    if (profile[index] && _.isString(profile[index])) {
      profile[index] = profile[index].trim()
    }
  }

  // 检查用户名
  if (!profile.userName) {
    alertify.error('请填写用户名')
    return false
  }
  if (!checkUserName(profile.userName)) {
    alertify.error('用户名为6-20个字母、数字、下划线，并以字母开头')
    return false
  }

  // 检查姓名
  if (!profile.realName) {
    alertify.error('请填写姓名')
    return false
  }
  if (!checkSpecial(profile.realName)) {
    alertify.error('姓名不能包含特殊字符')
    return false
  }
  if (profile.realName.length < 2 || profile.realName.length > 20) {
    alertify.error('姓名为2-20个字符')
    return false
  }
  // 检查出生日期
  if (!profile.birthdate) {
    alertify.error('请填写出生日期')
    return false
  }
  // 检查职位
  if (!profile.occupation) {
    alertify.error('请填写职位')
    return false
  }
  if (!checkSpecial(profile.occupation)) {
    alertify.error('职位不能包含特殊字符')
    return false
  }
  if (profile.occupation.length < 2 || profile.occupation.length > 15) {
    alertify.error('职位为2-15个字符')
    return false
  }
  // 检查系统角色
  if (!profile.roleId) {
    alertify.error('请选择系统角色')
    return false
  }
  // 检查身份证号
  if (!profile.idCard) {
    alertify.error('请填写身份证号')
    return false
  }
  if (!profile.idCard.match(/^\w*$/) || !(profile.idCard.length == 15 || profile.idCard.length == 18)) {
    alertify.error('身份证号填写有问题，请检查')
    return false
  }
  // 检查手机号
  if (!profile.mobile) {
    alertify.error('请填写手机号')
    return false
  }
  if (!checkMobile(profile.mobile)) {
    alertify.error('手机号填写有问题，请检查')
    return false
  }
  // 检查住址
  if (profile.address && profile.address.length > 30) {
    alertify.error('住址的字符长度须小于30')
    return false
  }
  // 检查电子邮箱
  if (profile.email && !checkEmail(profile.email)) {
    alertify.error('电子邮箱填写有问题，请检查')
    return false
  }
  // 检查微信号
  if (profile.wechat && !checkWechat(profile.wechat)) {
    alertify.error('微信号填写有问题，请检查')
    return false
  }
  // 检查QQ号
  if (profile.qq && !checkQQ(profile.qq)) {
    alertify.error('QQ号填写有问题，请检查')
    return false
  }
  // 检查微博账号
  if (profile.weibo && !checkWeibo(profile.weibo)) {
    alertify.error('微博账号填写有问题，请检查')
    return false
  }
  return true
}

// 检查特殊字符
export const checkSpecial = str => {
  let reg = /^([a-zA-Z0-9]|[\u4E00-\u9FA5])*$/
  return str.match(reg)
}

// 检查用户名
export const checkUserName = userName => {
  let reg = /^[a-zA-Z](\w){5,19}$/
  return userName.match(reg)
}

// 检查手机号
export const checkMobile = mobile => {
  let reg = /^(13[0-9]{9})|(15[89][0-9]{8})$/
  return mobile.match(reg)
}

// 检查电子邮箱
export const checkEmail = email => {
  let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return email.match(reg)
}

// 检查微信号
export const checkWechat = wechat => {
  let reg = /^[a-zA-Z](\w|-){5,19}$/
  return wechat.match(reg)
}

// 检查QQ号
export const checkQQ = qq => {
  let reg = /^\d{5,11}$/
  return qq.match(reg)
}

// 检查微博账号
export const checkWeibo = weibo => {
  let reg = /^(\w|[\u4E00-\u9FA5]|-){4,24}$/
  return weibo.match(reg)
}

// 检查密码
export const checkPassword = password => {
  if (!password) {
    alertify.error('请输入密码')
    return false
  }
  if (!(password.match(/.{8,20}/) && password.match(/^\S*$/) && password.match(/\d/) && password.match(/[a-zA-Z]/))) {
    alertify.error('密码为8-20个字符，必须包含数字和字母，且不包含空格')
    return false
  }
  return true
}

// 对比两个对象，过滤发生有效修改的属性
export const filterObjectChanges = (originalObject, object) => {
  let objectCopy = window.$.extend(true, {}, object)
  for (let index in originalObject) {
    if (_.isEqual(objectCopy[index], originalObject[index])) {
      delete objectCopy[index]
    }
  }
  return objectCopy
}

// 字符串转布尔值
export const stringToBoolean = function (str) {
  if (str == 'false') {
    return false
  }
  return Boolean(str)
}
