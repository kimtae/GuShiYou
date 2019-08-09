<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>用户管理<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li class="active">用户管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="table-toolbar">
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group">
                <button type="button" class="btn btn-success btn-sm" @click="addUser"><i class="fa fa-user-plus"></i>  添加</button>
              </div>
              <div class="btn-group">
                <button type="button" class="btn btn-default btn-sm" @click="deletedUsers"><i class="fa fa-user-times"></i>  已删除</button>
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
                  <th>用户名</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>手机号</th>
                  <th>最近登录</th>
                  <th>登录IP</th>
                  <th>系统角色</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users">
                  <td>{{user.id}}</td>
                  <td>{{user.userName}}</td>
                  <td>{{user.realName}}</td>
                  <td>{{user.gender ? '男' : '女'}}</td>
                  <td>{{user.mobile}}</td>
                  <td>{{user.loginTime}}</td>
                  <td>{{user.loginIP}}</td>
                  <td>{{user.roleName}}</td>
                  <td>
                    <div class="tools">
                      <i class="fa fa-edit" title="管理帐号" @click="manageAccount(user.id, user.roleId)"></i>
                      <i class="fa fa-trash-o" v-showDeleteBtn="user.roleId" @click="deleteUser(index, user.id, user.userName)" title="删除"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="no-data-hint"><p v-if="showNoDataHint" class="text-muted text-center">暂无数据</p></div>
          <div>
            <div class="pull-right">
              <pagination :pageNumber="pageNumber" :firstPage="firstPage" :lastPage="lastPage" :totalPage="totalPage"></pagination>
            </div>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
    </section>
  </div>
</template>

<script>
import {getUsers, deleteUser} from '../api/admin'
import alertify from 'alertifyjs'
import admin from '../vuex/modules/admin'
import router from '../router'
import bus from '../bus'

let vm

export default {
  name: 'UserManagement',
  data () {
    return {
      totalRow: 0,
      pageNumber: 1,
      lastPage: false,
      firstPage: false,
      totalPage: 0,
      pageSize: 10,
      users: [],
      loadStatus: false
    }
  },
  directives: {
    showDeleteBtn: {
      bind (el, {value}) {
        controlDeleteBtn(el, value)
      },
      update (el, valueObj) {
        controlDeleteBtn(el, valueObj.value)
      }
    }
  },
  computed: {
    showNoDataHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.users.length == 0
    }
  },
  created () {
    vm = this
    bus.$on('on-page-number-change', vm.onPageNumberChange)
    bus.$on('on-page', vm.onPage)
    toGetUsers()
  },
  destroyed () {
    bus.$off('on-page-number-change', vm.onPageNumberChange)
    bus.$off('on-page', vm.onPage)
  },
  methods: {
    onPageNumberChange (val) {
      vm.pageNumber = val
    },
    onPage (pageNumber) {
      vm.pageNumber = pageNumber
      toGetUsers()
    },
    addUser: function () {
      router.push({path: 'add_user'})
    },
    manageAccount (profileId, profileRoleId) {
      router.push({path: 'user_account_management', query: {profileId: profileId, profileRoleId: profileRoleId, fromUserManagement: true}})
    },
    deleteUser: function (index, userId, username) {
      alertify.confirm('确定删除"' + username + '"用户？',
      () => {
        deleteUser(userId).then(() => {
          vm.users.splice(index, 1)
          vm.pageNumber = Math.ceil((vm.totalRow - 1) / vm.pageSize)
          if (vm.pageNumber == 0) {
            vm.pageNumber = 1
          }
          toGetUsers()
        })
      })
    },
    deletedUsers: function () {
      router.push({path: 'deleted_users'})
    }
  }
}

// 获取用户列表
let toGetUsers = function () {
  getUsers(vm.pageSize, vm.pageNumber, 0).then(data => {
    if (data.list.length != 0) {
      vm.totalRow = data.totalRow
      vm.lastPage = data.lastPage
      vm.firstPage = data.firstPage
      vm.totalPage = data.totalPage
      vm.users = data.list
    }
    vm.loadStatus = true
  })
}

// 控制删除按钮的显示
let controlDeleteBtn = function (el, value) {
  if (value == 10000) {
    window.$(el).hide()
    return
  }
  if (value == 10001 && admin.state.profile.roleId == 10001) {
    window.$(el).hide()
    return
  }
  window.$(el).show()
}

</script>
