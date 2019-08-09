<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>菜单管理<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li class="active">菜单管理</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="table-toolbar">
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group">
                <button type="button" class="btn btn-success btn-sm" @click="addMenu"><i class="fa fa-plus"></i>  添加</button>
              </div>
               <div>
                <div>
                  <p class="text-center">共{{totalPage}}页 {{totalRow}}条</p>
                </div>
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
                  <th>菜单名</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(menu, index) in menus">
                  <td>{{menu.id}}</td>
                  <td>{{menu.menuName}}</td>
                  <td>{{menu.createTime}}</td>
                  <td>
                    <div class="tools">
                      <i class="fa fa-edit" @click="editMenu(menu.id)" title="编辑"></i>
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
import {getMenus} from '../api/menu'
import alertify from 'alertifyjs'
import router from '../router'
import bus from '../bus'

let vm

export default {
  name: 'MenuManagement',
  data () {
    return {
      totalRow: 0,
      pageNumber: 1,
      lastPage: false,
      firstPage: false,
      totalPage: 0,
      pageSize: 10,
      menus: [],
      loadStatus: false
    }
  },
  computed: {
    showNoDataHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.menus.length == 0
    }
  },
  created () {
    vm = this
    bus.$on('on-page-number-change', vm.onPageNumberChange)
    bus.$on('on-page', vm.onPage)
    toGetMenus()
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
      toGetMenus()
    },
    editMenu (id) {
      router.push({path: 'modify_menu', query: {menuId: id}})
    },
    addMenu: function () {
      router.push({path: 'add_menu'})
    }
  }
}

// 获取菜单列表
let toGetMenus = function () {
  getMenus(vm.pageSize, vm.pageNumber, 0).then(data => {
    if (data.list.length != 0) {
      vm.totalRow = data.totalRow
      vm.lastPage = data.lastPage
      vm.firstPage = data.firstPage
      vm.totalPage = data.totalPage
      vm.menus = data.list
    }
    vm.loadStatus = true
  })
}

</script>
