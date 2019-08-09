<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>修改角色<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/role_management">角色管理</router-link>
        </li>
        <li class="active">修改角色</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body no-box-header">
          <div class="row">
            <div class="form-group col-lg-6">
              <label for="roleName" class="col-sm-2 control-label">角色名*</label>
              <div class="col-sm-9">
                <input type="text" id="roleName" class="form-control" v-model="role.roleName" placeholder="角色名">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="description" class="col-sm-2 control-label">描述*</label>
              <div class="col-sm-9">
                <textarea id="description" class="textarea" v-model="role.description" placeholder="描述" style="height: 84px;"></textarea>
             </div>
            </div>
          </div>
          <!--/.form-group-->
         <div class="form-group col-lg-12">
          <label for="distributePrivilege" class="control-label">分配权限*</label>
            <div id="distributePrivilege">
              <div v-for="menu in menus">
                <label class="checkbox-head" for="user-management">
                  {{menu.menuName}}
                </label>
                <div class="user-management checkbox-group">
                  <label v-for="menuHasPrivilege in menuHasPrivileges" v-if="menuHasPrivilege.menuId == menu.id" class="checkbox" :for="menuHasPrivilege.privilegeId">
                    <input type="checkbox" v-checked="menuHasPrivilege.privilegeId" :value="menuHasPrivilege.privilegeId" :id="menuHasPrivilege.privilegeId" data-toggle="checkbox" class="custom-checkbox"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                    {{menuHasPrivilege.privilegeName}}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <!--/.form-group-->
        </div>
        <!--/.box-body-->
        <div class="box-footer with-border box-footer-with-button">
          <button type="submit" class="btn btn-md btn-block btn-success" @click="confirm">确定修改</button>
        </div>
        <!--/.boxfooter-->
      </div>
    </section>
  </div>
</template>

<script>
import { getMenuHasPrivileges } from '../api/menu-has-privilege'
import { getRoleHasPrivileges } from '../api/role-has-privilege'
import { getRole, modifyRole } from '../api/role'
import { getMenus } from '../api/menu'
import alertify from 'alertifyjs'
import router from '../router'
import { filterObjectChanges } from '../api/utils'
import _ from 'underscore'

let vm

export default {
  name: 'ModifyRole',
  data () {
    return {
      originalRole: {},
      role: {},
      menuHasPrivileges: [],
      menus: [],
      originalPrivileges: [],
      privileges: []
    }
  },
  directives: {
    checked: {
      bind (el, {value}) {
        for (let index in vm.privileges) {
          if (value == vm.privileges[index]) {
            el.checked = true
            return
          }
        }
        el.checked = false
      }
    }
  },
  created () {
    vm = this
  },
  mounted () {
    getRole(vm.$route.query.roleId).then(role => {
      vm.role = role
      vm.originalRole = window.$.extend(true, {}, vm.role)
      return getRoleHasPrivileges(role.id)
    }).then(privileges => {
      vm.privileges = privileges
      vm.originalPrivileges = window.$.extend(true, [], vm.privileges)
      return getMenus()
    }).then(menus => {
      vm.menus = menus
      return getMenuHasPrivileges()
    }).then(menuHasPrivileges => {
      vm.menuHasPrivileges = menuHasPrivileges
    })
  },
  methods: {
    confirm: function () {
      if (!vm.role.roleName) {
        alertify.error('请输入角色名')
        return
      }
      if (vm.role.roleName.length < 1 || vm.role.roleName.length > 20) {
        alertify.error('角色名为1-20个字符')
        return
      }
      if (!vm.role.description) {
        alertify.error('请填写描述')
        return
      }
      if (vm.role.description.length < 5 || vm.role.description.length > 100) {
        alertify.error('描述为5-100个字符')
        return
      }
      // 获取选中项的权限ID
      vm.privileges.splice(0, vm.privileges.length)
      for (let index in vm.menuHasPrivileges) {
        let val = window.$('#' + vm.menuHasPrivileges[index].privilegeId + ':checked').val()
        if (val) {
          vm.privileges.push(val)
        }
      }
      if (vm.privileges.length == 0) {
        alertify.error('请选择权限')
        return
      }
      submitModification()
    }
  }
}

// 提交修改
const submitModification = function () {
  let role = filterObjectChanges(vm.originalRole, vm.role)
  let privileges = null
  if (!_.isEqual(vm.privileges, vm.originalPrivileges)) {
    privileges = vm.privileges
  }
  if (!_.isEmpty(role) || !_.isEmpty(privileges)) {
    role.id = vm.role.id
    modifyRole(role, privileges).then(() => {
      router.go(-1)
    })
  } else {
    alertify.message('内容无修改')
  }
}
</script>