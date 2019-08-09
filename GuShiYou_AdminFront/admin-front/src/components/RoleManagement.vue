<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>角色管理<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li class="active">角色管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="table-toolbar">
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group">
                <button type="button" class="btn btn-success btn-sm" @click="addRole"><i class="fa fa-plus"></i>  添加</button>
              </div>
            </div>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <table id="col-xs-12" class="table table-bordered table-striped table-hover table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>角色名</th>
                  <th>描述</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(role, index) in roles">
                  <td>{{role.id}}</td>
                  <td>{{role.roleName}}</td>
                  <td>{{role.description}}</td>
                  <td>{{role.createTime}}</td>
                  <td>
                    <div class="tools">
                      <i class="fa fa-edit" v-showInfoBtn="role.id" @click="modifyRole(role.id)" title="编辑"></i>
                      <i class="fa fa-trash-o" v-showDeleteBtn="role.id" @click="deleteRole(index, role.id, role.roleName)" title="删除"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="no-data-hint"><p v-if="showNoDataHint" class="text-muted text-center">暂无数据</p></div>
        </div>
        <!-- /.box-body -->
      </div>
    </section>
  </div>
</template>

<script>
import {getRoles, deleteRole} from '../api/role'
import alertify from 'alertifyjs'
import router from '../router'

let vm

export default {
  name: 'RoleManagement',
  data () {
    return {
      roles: [],
      loadStatus: false
    }
  },
  computed: {
    showNoDataHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.roles.length == 0
    }
  },
  created () {
    vm = this
    toGetRoles()
  },
  directives: {
    showInfoBtn: {
      bind (el, {value}) {
        if (value == 10000 || value == 10001) {
          window.$(el).hide()
        } else {
          window.$(el).show()
        }
      }
    },
    showDeleteBtn: {
      bind (el, {value}) {
        controlDeleteBtn(el, value)
      },
      update (el, {value}) {
        controlDeleteBtn(el, value)
      }
    }
  },
  methods: {
    addRole: function () {
      router.push('add_role')
    },
    deleteRole: function (index, roleId, roleName) {
      alertify.confirm('确定删除"' + roleName + '"角色？',
      () => {
        deleteRole(roleId).then(() => {
          vm.roles.splice(index, 1)
          toGetRoles()
        })
      })
    },
    modifyRole: function (roleId) {
      router.push({path: 'modify_role', query: {roleId: roleId}})
    }
  }
}

// 获取角色列表
let toGetRoles = function () {
  getRoles(1).then(data => {
    if (data.length != 0) {
      vm.roles = data
    }
    vm.loadStatus = true
  })
}

// 控制删除按钮的显示
let controlDeleteBtn = function (el, value) {
  if (value == 10000 || value == 10001) {
    window.$(el).hide()
    return
  }
  window.$(el).show()
}

</script>