<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>添加用户<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/user_management">用户管理</router-link>
        </li>
        <li class="active">添加用户</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body no-box-header">
          <div class="row">
            <div class="form-group col-lg-6">
              <label for="userName" class="col-sm-2 control-label">用户名*</label>
              <div class="col-sm-9">
                <input type="text" id="userName" class="form-control" v-model="profile.userName" placeholder="用户名">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="realName" class="col-sm-2 control-label">姓名*</label>
              <div class="col-sm-9">
                <input type="text" id="realName" class="form-control" v-model="profile.realName" placeholder="姓名">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="birthdate" class="col-sm-2 control-label">出生日期*</label>
              <div class="col-sm-9">
                <input id="birthdate" type="date" class="form-control" v-model="profile.birthdate">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="gender" class="col-sm-2 control-label">性别*</label>
              <div id="gender" class="radio-group col-sm-9">
                <label for="gender-boy" class="radio">
                  <input type="radio" name="gender" id="gender-boy" value="男" v-model="profile.gender" :value="true" data-toggle="radio" class="custom-radio">
                  <span class="icons">
                    <span class="icon-unchecked"></span>
                    <span class="icon-checked"></span>
                  </span> 
                男
                </label>
                <!--/.radio-->
                <label for="gender-girl" class="radio">
                  <input type="radio" name="gender" id="gender-girl" value="女" v-model="profile.gender" :value="false" data-toggle="radio" class="custom-radio">
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
              <label for="occupation" class="col-sm-2 control-label">职位*</label>
              <div class="col-sm-9">
                <input type="text" id="occupation" class="form-control" v-model="profile.occupation" placeholder="职位">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="role" class="col-sm-2 control-label">系统角色*</label>
              <div class="col-sm-9">
                <select id="role" class="form-control" v-model="profile.roleId">
                  <option v-for="role in roles" :value="role.id" :disabled="role.disableOption">{{role.roleName}}</option>
                </select>
              </div>
            </div>
             <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="id-card" class="col-sm-2 control-label">身份证号*</label>
              <div class="col-sm-9">
                <input type="text" id="id-card" class="form-control" v-model="profile.idCard" placeholder="身份证号">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="mobile" class="col-sm-2 control-label">手机号*</label>
              <div class="col-sm-9">
                <input type="tel" id="mobile" class="form-control" v-model="profile.mobile" placeholder="手机号">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="password" class="col-sm-2 control-label">密码*</label>
              <div class="col-sm-9">
                <input type="password" id="password" class="form-control" v-model="profile.password" placeholder="密码">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="confirmPassword" class="col-sm-2 control-label">确认密码*</label>
              <div class="col-sm-9">
                <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" placeholder="再输入一遍密码">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="address" class="col-sm-2 control-label">住址</label>
              <div class="col-sm-9">
                <input type="tel" id="address" class="form-control" v-model="profile.address" placeholder="住址">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="email" class="col-sm-2 control-label">电子邮箱</label>
              <div class="col-sm-9">
                <input type="email" id="email" class="form-control" v-model="profile.email" placeholder="电子邮箱">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="wechat" class="col-sm-2 control-label">微信</label>
              <div class="col-sm-9">
                <input type="text" id="wechat" class="form-control" v-model="profile.wechat" placeholder="微信">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="qq" class="col-sm-2 control-label">QQ</label>
              <div class="col-sm-9">
                <input type="text" id="qq" class="form-control" v-model="profile.qq" placeholder="QQ">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="weibo" class="col-sm-2 control-label">微博</label>
              <div class="col-sm-9">
                <input type="text" id="weibo" class="form-control" v-model="profile.weibo" placeholder="微博">
              </div>
            </div>
            <!--/.form-group-->
          </div>
        </div>
        <!--/.box-body-->
        <div class="box-footer with-border box-footer-with-button">
          <button type="submit" class="btn btn-md btn-block btn-success" @click="add">添加</button>
        </div>
        <!--/.boxfooter-->
      </div>
      <!-- /.box-body -->
    </section>
  </div>
</template>

<script>
import {getRoles} from '../api/role'
import admin from '../vuex/modules/admin'
import alertify from 'alertifyjs'
import {checkForm, checkPassword} from '../api/utils'
import {addUser} from '../api/admin'
import router from '../router'

let vm

export default {
  name: 'AddUser',
  data () {
    return {
      user: {},
      profile: {},
      roles: [],
      confirmPassword: ''
    }
  },
  created () {
    vm = this
    vm.profile.gender = 1
    vm.user = admin.getters.getProfile()
  },
  mounted () {
    getRoles().then(roles => {
      vm.roles = roles
      controlSysRoleSelect(roles)
    })
  },
  methods: {
    add: function () {
      if (checkForm(vm.profile)) {
        if (!checkPassword(vm.profile.password)) {
          return
        }
        if (!vm.confirmPassword) {
          alertify.error('请再输入一遍密码')
          return
        }
        if (vm.profile.password != vm.confirmPassword) {
          alertify.error('两次密码输入不一致')
          return
        }
        addUser(vm.profile).then(() => {
          router.go(-1)
        })
      }
    }
  }
}

// 控制系统角色的选择
const controlSysRoleSelect = function (roles) {
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
