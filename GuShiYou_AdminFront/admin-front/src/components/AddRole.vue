<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>添加角色<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/role_management">角色管理</router-link>
        </li>
        <li class="active">添加角色</li>
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
              <div class="user-management">
                <label class="checkbox checkbox-head" for="user-management">
                <input type="checkbox" id="user-management" data-toggle="checkbox" class="custom-checkbox" @change="onUserManagementChange"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
                用户管理
                </label>
                <div class="user-management checkbox-group">
                  <label v-for="menuHasPrivilege in menuHasPrivileges" v-if="menuHasPrivilege.menuId == 10000" class="checkbox" :for="menuHasPrivilege.privilegeId">
                    <input type="checkbox" :value="menuHasPrivilege.privilegeId" :id="menuHasPrivilege.privilegeId" data-toggle="checkbox" class="custom-checkbox" @change="onUserManagementItemsChange"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>
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
          <button type="submit" class="btn btn-md btn-block btn-success" @click="add">添加</button>
        </div>
        <!--/.boxfooter-->
      </div>
    </section>
  </div>
</template>

<script>
import {getMenuHasPrivileges} from '../api/menu-has-privilege'
import {addRole} from '../api/role'
import alertify from 'alertifyjs'
import router from '../router'

let vm
let isUserManagementCheckAll = false

export default {
  name: 'AddRole',
  data () {
    return {
      role: {},
      menuHasPrivileges: [],
      privileges: []
    }
  },
  created () {
    vm = this
  },
  mounted () {
    getMenuHasPrivileges().then(menuHasPrivileges => {
      vm.menuHasPrivileges = menuHasPrivileges
    })
  },
  methods: {
    add: function () {
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
        alertify.error('描述为5-100字符')
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
      addRole(vm.role.roleName, vm.role.description, vm.privileges).then(() => {
        router.go(-1)
      })
    },
    onUserManagementChange: function () {
      if (isUserManagementCheckAll) {
        window.$('.user-management input[type="checkbox"]').each(function () {
          this.checked = false
        })
        isUserManagementCheckAll = false
      } else {
        window.$('.user-management input[type="checkbox"]').each(function () {
          this.checked = true
        })
        isUserManagementCheckAll = true
      }
    },
    onUserManagementItemsChange: function () {
      isUserManagementCheckAll = true
      let length = window.$('.user-management.checkbox-group input[type="checkbox"]').length
      let uncheckedLength = 0
      window.$('.user-management.checkbox-group input[type="checkbox"]').each(function () {
        if (!window.$(this).is(':checked')) {
          isUserManagementCheckAll = false
          uncheckedLength = uncheckedLength + 1
        }
      })
      if (isUserManagementCheckAll) {
        window.$('#user-management').each(function () {
          this.indeterminate = false
          this.checked = true
        })
      } else {
        window.$('#user-management').each(function () {
          if (uncheckedLength == length) {
            this.indeterminate = false
            this.checked = false
          } else {
            this.indeterminate = true
          }
        })
      }
    }
  }
}

</script>
