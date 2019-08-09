<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>添加菜单<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/menu_management">菜单管理</router-link>
        </li>
        <li class="active">添加菜单</li>
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
                <label v-for="privilege in privilegesNotInMenu" class="checkbox" :for="privilege.id">
                  <input type="checkbox" :value="privilege.id" :id="privilege.id" data-toggle="checkbox" class="custom-checkbox" ><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                  {{privilege.privilegeName}}
                </label>
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
    </section>
  </div>
</template>

<script>
import {getPrivilegesNotInMenu} from '../api/privilege'
import {addMenu} from '../api/menu'
import alertify from 'alertifyjs'
import router from '../router'

let vm
let isUserManagementCheckAll = false

export default {
  name: 'Addmenu',
  data () {
    return {
      menu: {},
      privilegesNotInMenu: [],
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
      return vm.privilegesNotInMenu.length == 0
    }
  },
  mounted () {
    getPrivilegesNotInMenu().then(privilegesNotInMenu => {
      vm.privilegesNotInMenu = privilegesNotInMenu
      vm.loadStatus = true
    })
  },
  methods: {
    add: function () {
      if (!vm.menu.menuName) {
        alertify.error('请输入菜单名')
        return
      }
      if (vm.menu.menuName.length < 1 || vm.menu.menuName.length > 20) {
        alertify.error('菜单名的字符长度为1-16')
        return
      }
      // 获取选中项的权限ID
      vm.privileges.splice(0, vm.privileges.length)
      for (let index in vm.privilegesNotInMenu) {
        let val = window.$('#' + vm.privilegesNotInMenu[index].id + ':checked').val()
        if (val) {
          vm.privileges.push(val)
        }
      }
      if (vm.privileges.length == 0) {
        alertify.error('请选择权限')
        return
      }
      addMenu(vm.menu.menuName, vm.privileges).then(() => {
        router.go(-1)
      })
    }
  }
}

</script>
