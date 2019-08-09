<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>操作日志</h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li class="active">操作日志</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="table-toolbar">
            <div class="row">
              <div class="col-xs-4">
                <div><label>每页 <select name="pageSize" v-model="pageSize" @change="changePageSize" class="page-size form-control input-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select> 条</label></div>
              </div>
              <div class="col-xs-4">
                <div>
                  <p class="text-center">共{{totalPage}}页 {{totalRow}}条</p>
                </div>
              </div>
              <div class="col-xs-4">
                <div class="pull-right" v-if="showSearch"><label>搜索 <input type="search" class="search-log-field form-control input-sm" @keyup.enter="searchLogByOperatorId(operatorId)" v-model="operatorId" placeholder="操作者ID"></label></div>
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
                  <th class="operator-id">操作者 ID</th>
                  <th>用户名</th>
                  <th class="realname">姓名</th>
                  <th class="operation">操作</th>
                  <th class="params">参数</th>
                  <th class="time">时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in logs">
                  <td>{{log.id}}</td>
                  <td>{{log.operatorId}}</td>
                  <td>{{log.userName}}</td>
                  <td>{{log.realName}}</td>
                  <td>{{log.action}}</td>
                  <td class="params">{{log.params}}</td>
                  <td>{{log.createTime}}</td>
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
import {getOperationLogs} from '../api/operation-log'
import alertify from 'alertifyjs'
import admin from '../vuex/modules/admin'
import bus from '../bus'

let vm

export default {
  name: 'OperationLog',
  data () {
    return {
      totalRow: 0,
      pageNumber: 1,
      lastPage: false,
      firstPage: false,
      totalPage: 0,
      pageSize: 10,
      logs: [],
      operatorId: null,
      showSearch: false,
      loadStatus: false
    }
  },
  computed: {
    showNoDataHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.logs.length == 0
    }
  },
  created () {
    vm = this
    bus.$on('on-page-number-change', vm.onPageNumberChange)
    bus.$on('on-page', vm.onPage)
    // 根据权限来决定搜索框的显示
    let profile = admin.state.profile
    let roleId = profile.roleId
    if (roleId != 10000 && roleId != 10001) {
      vm.showSearch = false
      vm.operatorId = profile.id
    } else {
      vm.showSearch = true
    }
    toGetOperationLogs()
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
      toGetOperationLogs()
    },
    searchLogByOperatorId: function (operatorId) {
      if (!operatorId) {
        toGetOperationLogs()
        return
      }
      let reg = /\d{5,20}/
      if (operatorId.match(reg) && operatorId >= 10000) {
        vm.pageNumber = 1
        toGetOperationLogs()
      } else {
        alertify.error('请输入合法的操作者ID')
      }
    },
    changePageSize: function () {
      vm.pageNumber = 1
      toGetOperationLogs()
    }
  }
}

// 获取操作日志
let toGetOperationLogs = function () {
  getOperationLogs(vm.pageSize, vm.pageNumber, vm.operatorId).then(data => {
    if (data != null && data.list.length != 0) {
      vm.totalRow = data.totalRow
      vm.lastPage = data.lastPage
      vm.firstPage = data.firstPage
      vm.totalPage = data.totalPage
      vm.logs = data.list
    } else {
      resetData()
    }
    vm.loadStatus = true
  })
}

// 重置数据
let resetData = function () {
  vm.totalRow = 0
  vm.pageNumber = 1
  vm.lastPage = false
  vm.firstPage = false
  vm.totalPage = 0
  vm.logs = []
}
</script>

<style lang="less" src='../assets/less/operation-log.less'></style>