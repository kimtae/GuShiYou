<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>帐号管理<small>（系统）</small></h1>
      <ol v-if="!fromUserManagement" class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">帐号管理</li>
      </ol>
      <ol v-if="fromUserManagement" class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/user_management">用户管理</router-link>
        </li>
        <li v-if="fromDeletedUsers">
          <router-link to="/main/deleted_users">已删除用户</router-link>
        </li>
        <li class="active">帐号管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" :class="{'active': profileActive}"><a @click="toProfile">基本资料</a></li>
              <li role="presentation" :class="{'active': passwordActive, 'disabled': disableSaveBtn}"><a @click="toPassword">修改密码</a></li>
              <li role="presentation" class="pull-right">帐号：{{profile.userName}}</li>
            </ul>
          </div>
          <div v-show="profileActive">
            <div class="box-body no-box-header">
              <div class="row">
                <div class="form-group col-lg-6">
                  <label for="avatar" class="control-label col-sm-2">头像</label>
                  <div class="col-sm-3">
                    <img class="profile-user-img img-circle profile-avatar" alt="头像">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label class="col-sm-2 control-label">ID</label>
                  <div class="col-sm-9">
                    <p>{{profile.id}}</p>
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="userName" class="col-sm-2 control-label">用户名*</label>
                  <div class="col-sm-9">
                    <input type="text" id="userName" class="form-control" v-model="profile.userName" placeholder="用户名" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="realName" class="col-sm-2 control-label">姓名*</label>
                  <div class="col-sm-9">
                    <input type="text" id="realName" class="form-control" v-model="profile.realName" placeholder="姓名" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="gender" class="col-sm-2 control-label">性别*</label>
                  <div id="gender" class="radio-group col-sm-9">
                    <label for="gender-boy" class="radio">
                      <input type="radio" name="gender" id="gender-boy" value="男" v-model="profile.gender" :value="true" data-toggle="radio" class="custom-radio" :disabled="disableNecessaryForm">
                      <span class="icons">
                        <span class="icon-unchecked"></span>
                        <span class="icon-checked"></span>
                      </span> 
                    男
                    </label>
                    <!--/.radio-->
                    <label for="gender-girl" class="radio">
                      <input type="radio" name="gender" id="gender-girl" value="女" v-model="profile.gender" :value="false" data-toggle="radio" class="custom-radio" :disabled="disableNecessaryForm">
                      <span class="icons">
                       <span class="icon-unchecked"></span>
                       <span class="icon-checked"></span>
                      </span> 
                    女
                    </label>
                    <!--/.radio-->
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="birthdate" class="col-sm-2 control-label">出生日期*</label>
                  <div class="col-sm-9">
                    <input type="date" class="form-control" v-model="profile.birthdate" id="birthdate" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="occupation" class="col-sm-2 control-label">职位*</label>
                  <div class="col-sm-9">
                    <input type="text" id="occupation" class="form-control" v-model="profile.occupation" placeholder="职位" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="role" class="col-sm-2 control-label">系统角色*</label>
                  <div class="col-sm-9">
                    <select id="role" class="form-control" v-model="profile.roleId" :disabled="disableNecessaryForm">
                  <option v-for="role in roles" :value="role.id" :disabled="role.disableOption">{{role.roleName}}</option>
                </select>
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="id-card" class="col-sm-2 control-label">身份证号*</label>
                  <div class="col-sm-9">
                    <input type="text" id="id-card" class="form-control" v-model="profile.idCard" placeholder="身份证号" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="mobile" class="col-sm-2 control-label">手机号*</label>
                  <div class="col-sm-9">
                    <input type="tel" id="mobile" class="form-control" v-model="profile.mobile" placeholder="手机号" :disabled="disableNecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="address" class="col-sm-2 control-label">住址</label>
                  <div class="col-sm-9">
                    <input type="tel" id="address" class="form-control" v-model="profile.address" placeholder="住址" :disabled="disableUnnecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="email" class="col-sm-2 control-label">电子邮箱</label>
                  <div class="col-sm-9">
                    <input type="email" id="email" class="form-control" v-model="profile.email" placeholder="电子邮箱" :disabled="disableUnnecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="wechat" class="col-sm-2 control-label">微信</label>
                  <div class="col-sm-9">
                    <input type="text" id="wechat" class="form-control" v-model="profile.wechat" placeholder="微信" :disabled="disableUnnecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="qq" class="col-sm-2 control-label">QQ</label>
                  <div class="col-sm-9">
                    <input type="text" id="qq" class="form-control" v-model="profile.qq" placeholder="QQ" :disabled="disableUnnecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="weibo" class="col-sm-2 control-label">微博</label>
                  <div class="col-sm-9">
                    <input type="text" id="weibo" class="form-control" v-model="profile.weibo" placeholder="微博" :disabled="disableUnnecessaryForm">
                  </div>
                </div>
                <!--/.form-group-->
              </div>
            </div>
            <!--/.box-body-->
            <div class="box-footer with-border box-footer-with-button">
              <button type="submit" class="btn btn-md btn-block btn-success" @click="saveProfile" :disabled="disableSaveBtn">保存</button>
            </div>
            <!--/.boxfooter-->
          </div>
          <div v-show="passwordActive">
            <div class="box-body no-box-header">
              <div class="row">
                <div v-if="needCurrentPassword" class="form-group col-lg-6">
                  <label for="currentPassword" class="col-sm-2 control-label">当前密码</label>
                  <div class="col-sm-9">
                    <input type="password" id="currentPassword" class="form-control" v-model="currentPassword" placeholder="当前密码">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6">
                  <label for="newPassword" class="col-sm-2 control-label">新密码</label>
                  <div class="col-sm-9">
                    <input type="password" id="newPassword" class="form-control" v-model="newPassword" placeholder="新密码">
                  </div>
                </div>
                <!--/.form-group-->
                <div class="form-group col-lg-6" :class="{'col-lg-offset-6': needCurrentPassword}">
                  <label for="confirmPassword" class="col-sm-2 control-label">确认密码</label>
                  <div class="col-sm-9">
                    <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" placeholder="再输入一遍新密码">
                  </div>
                </div>
                <!--/.form-group-->
              </div>
            </div>
            <!--/.box-body-->
            <div class="box-footer with-border box-footer-with-button">
              <button type="submit" class="btn btn-block btn-md btn-success" @click="confirm">确认修改</button>
            </div>
            <!--/.boxfooter-->
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </section>
  </div>
</template>

<script>
import {getProfile, updateProfile, modifyPassword, logout} from '../api/admin'
import {getRoles} from '../api/role'
import admin from '../vuex/modules/admin'
import {checkForm, filterObjectChanges, checkPassword} from '../api/utils'
import _ from 'underscore'
import {SET_PROFILE} from '../vuex/mutation_types'
import store from '../vuex/store'
import alertify from 'alertifyjs'
import router from '../router'

let vm

export default {
  name: 'UserAccountManagement',
  data () {
    return {
      user: {},
      fromUserManagement: false,
      fromDeletedUsers: false,
      profileActive: true,
      passwordActive: false,
      originalProfile: {},
      profile: {},
      roles: [],
      disableNecessaryForm: false,
      disableUnnecessaryForm: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    disableSaveBtn: function () {
      // 为空返回默认值
      if (!vm.originalProfile.id || vm.fromDeletedUsers) {
        return true
      }
      if (vm.user.id == vm.originalProfile.id) {
        return false
      }
      if (vm.user.roleId == 10000) {
        return false
      }
      if (vm.user.roleId == 10001 && vm.originalProfile.roleId != 10000 && vm.originalProfile.roleId != 10001) {
        return false
      }
      return true
    },
    needCurrentPassword: function () {
      if (vm.user.roleId == 10000) {
        return false
      }
      if (vm.user.roleId == 10001 && vm.profile.roleId != 10000 && vm.profile.roleId != 10001) {
        return false
      }
      return true
    }
  },
  created () {
    vm = this
    vm.user = admin.getters.getProfile()
    vm.fromUserManagement = vm.$route.query.fromUserManagement
    vm.fromDeletedUsers = vm.$route.query.fromDeletedUsers
  },
  watch: {
    '$route' (to, from) {
      vm.profileActive = true
      vm.passwordActive = false
      vm.fromUserManagement = vm.$route.query.fromUserManagement
      toGetProfile()
    }
  },
  mounted () {
    vm.user = admin.getters.getProfile()
    toGetProfile()
    getRoles().then(roles => {
      vm.profile.roleId = vm.originalProfile.roleId
      vm.roles = roles
      controlSysRoleSelect(roles)
    })
  },
  methods: {
    toProfile: function () {
      if (!vm.profileActive) {
        resetTabs()
        vm.profileActive = true
      }
    },
    toPassword: function () {
      if (!vm.passwordActive && !vm.disableSaveBtn) {
        resetTabs()
        vm.passwordActive = true
      }
    },
     // 保存个人资料
    saveProfile: function () {
      if (checkForm(vm.profile)) {
        let profileChanges = filterObjectChanges(vm.originalProfile, vm.profile)
        if (!_.isEmpty(profileChanges)) {
          profileChanges.id = vm.profile.id
          updateProfile(profileChanges).then(profileChanges => {
            if (vm.user.id == vm.profile.id) {
              vm.originalProfile = window.$.extend(true, {}, vm.profile)
              store.commit(SET_PROFILE, vm.originalProfile)
            }
          })
        } else {
          alertify.message('已保存')
        }
      }
    },
     // 确认
    confirm: function () {
      if (vm.needCurrentPassword) {
        if (!vm.currentPassword) {
          alertify.error('请输入当前密码')
          return
        }
        if (!checkPassword(vm.currentPassword)) {
          alertify.error('当前密码错误')
          return
        }
      }
      if (!vm.newPassword) {
        alertify.error('请输入新密码')
        return
      }
      if (!checkPassword(vm.newPassword)) {
        return
      }
      if (!vm.confirmPassword) {
        alertify.error('请再输入一遍新密码')
        return
      }
      if (vm.newPassword != vm.confirmPassword) {
        alertify.error('两次新密码输入不一致')
        return
      }
      modifyPassword(vm.profile.id, vm.currentPassword, vm.newPassword).then(() => {
        vm.currentPassword = ''
        vm.newPassword = ''
        vm.confirmPassword = ''
        if (vm.needCurrentPassword) {
          alertify.success('修改成功，请用新密码重新登录')
          logout()
        }
      })
    }
  }
}

// 重置Tabs状态
const resetTabs = function () {
  vm.profileActive = false
  vm.passwordActive = false
}

// 获取个人资料
const toGetProfile = function () {
  if (vm.$route.query.profileId == vm.user.id) {
    vm.profile = vm.user
    vm.originalProfile = window.$.extend(true, {}, vm.user)
    createAvatar()
    controlModify()
  } else {
    getProfile(vm.$route.query.profileId).then(profile => {
      vm.profile = profile
      vm.originalProfile = window.$.extend(true, {}, profile)
      createAvatar()
      controlModify()
    })
  }
}

// 创建头像
const createAvatar = function () {
  window.$('.profile-avatar').attr('data-name', vm.profile.realName.charAt(vm.profile.realName.length - 1))
  window.$('.profile-avatar').initial()
}

// 控制表单项的修改
const controlModify = function () {
  if (vm.fromDeletedUsers) {
    vm.disableNecessaryForm = true
    vm.disableUnnecessaryForm = true
    return
  }
  if (vm.user.roleId == 10000 || (vm.user.roleId == 10001 && vm.originalProfile.roleId != 10000 && vm.originalProfile.roleId != 10001)) {
    vm.disableNecessaryForm = false
    return
  }
  if (vm.user.roleId == 10001 && vm.user.id != vm.originalProfile.id && vm.originalProfile.roleId == 10001) {
    vm.disableUnnecessaryForm = true
  }
  vm.disableNecessaryForm = true
}

// 控制系统角色的选择
const controlSysRoleSelect = function (roles) {
  if (vm.user.roleId == vm.originalProfile.roleId) {
    for (let i = 0; i < roles.length; i++) {
      roles[i].disableOption = true
    }
    return
  }
  if (vm.user.roleId == 10000) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id == 10000) {
        roles[i].disableOption = true
      } else {
        roles[i].disableOption = false
      }
    }
    return
  }
  if (vm.user.roleId == 10001) {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].id == 10000 || roles[i].id == 10001) {
        roles[i].disableOption = true
      } else {
        roles[i].disableOption = false
      }
    }
    return
  }
}
</script>
