<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>修改菜单<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/menu_management">菜单管理</router-link>
        </li>
        <li class="active">修改菜单</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body no-box-header">
          <div class="row">
            <div class="form-group col-lg-6">
              <label for="menuName" class="col-sm-2 control-label">菜单名*</label>
              <div class="col-sm-9">
                <input type="text" id="menuName" class="form-control" v-model="menu.menuName" placeholder="菜单名">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-12">
              <label for="distributePrivilege" class="col-sm-2 control-label">分配权限*</label>
              <div class="checkbox-group col-sm-12">
                <p v-if="showNoPrivilegeHint" class="text-muted">暂无权限可分配</p>
                <label v-for="privilege in menuHasPrivileges" class="menu-has-privilege checkbox" :for="privilege.privilegeId">
                  <input type="checkbox" :value="privilege.privilegeId" :id="privilege.privilegeId" checked data-toggle="checkbox" class="custom-checkbox" ><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                  {{privilege.privilegeName}}
                </label>
                <label v-for="privilegeNotInMenu in privilegesNotInMenu" class="checkbox" :for="privilegeNotInMenu.id">
                  <input type="checkbox" :value="privilegeNotInMenu.id" :id="privilegeNotInMenu.id" data-toggle="checkbox" class="custom-checkbox" ><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                  {{privilegeNotInMenu.privilegeName}}
                </label>
              </div>
            </div>
            <!--/.form-group-->
          </div>
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
import { getPrivilegesNotInMenu } from '../api/privilege'
import { getMenuHasPrivileges } from '../api/menu-has-privilege'
import { getMenu, modifyMenu } from '../api/menu'
import alertify from 'alertifyjs'
import router from '../router'
import { filterObjectChanges } from '../api/utils'
import _ from 'underscore'

let vm

export default {
  name: 'ModifyMenu',
  data () {
    return {
      originalMenu: {},
      menu: {},
      menuHasPrivileges: [],
      privilegesNotInMenu: [],
      originalPrivileges: [],
      privileges: [],
      loadStatus: false
    }
  },
  created () {
    vm = this
  },
  computed: {
    showNoPrivilegeHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.menuHasPrivileges.length == 0 && vm.privilegesNotInMenu.length == 0
    }
  },
  mounted () {
    getMenu(vm.$route.query.menuId).then(menu => {
      vm.menu = menu
      vm.originalMenu = window.$.extend(true, {}, vm.menu)
      return getMenuHasPrivileges(menu.id)
    }).then(privileges => {
      vm.menuHasPrivileges = privileges
      for (let index in vm.menuHasPrivileges) {
        vm.privileges.push(vm.menuHasPrivileges[index].privilegeId)
        vm.originalPrivileges = window.$.extend(true, [], vm.privileges)
      }
      return getPrivilegesNotInMenu()
    }).then(privileges => {
      vm.privilegesNotInMenu = privileges
      vm.loadStatus = true
    })
  },
  methods: {
    confirm: function () {
      if (!vm.menu.menuName) {
        alertify.error('请输入菜单名')
        return
      }
      if (vm.menu.menuName.length < 1 || vm.menu.menuName.length > 16) {
        alertify.error('菜单名为1-16个字符')
        return
      }
      // 获取选中项的权限ID
      vm.privileges.splice(0, vm.privileges.length)
      let val
      window.$('.checkbox-group input[type="checkbox"]:checked').each(function () {
        vm.privileges.push(parseInt(this.value))
      })
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
  let menu = filterObjectChanges(vm.originalMenu, vm.menu)
  let privileges = null
  if (!_.isEqual(vm.privileges, vm.originalPrivileges)) {
    privileges = vm.privileges
  }
  if (!_.isEmpty(menu) || !_.isEmpty(privileges)) {
    menu.id = vm.menu.id
    modifyMenu(menu, privileges).then(() => {
      router.go(-1)
    })
  } else {
    alertify.message('内容无修改')
  }
}
</script>