<template>
  <div class="wrapper sidebar-mini skin-yellow fixed">

    <header class="main-header">
      <!-- Logo -->
      <div class="logo shadow-bottom">
        <router-link to="/main">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>故事友-运营管理系统</b></span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>故事友-运营管理系统</b></span>
        </router-link>
      </div>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top shadow-bottom">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">切换导航</span>
        </a>

        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li>
              <div v-if="user.lastLoginTime">
                <span class="last-login-time"><span class="last-login-time-label">上次登录时间：</span>{{user.lastLoginTime}}</span>
              </div>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img class="user-image user-avatar">
                <span class="hidden-xs">{{user.realName}}</span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header">
                  <img class="img-circle user-avatar">
                  <p>
                    {{user.realName}}
                  </p>
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <router-link class="btn btn-default btn-flat" :to="{ path: '/main/user_account_management', query: {profileId: user.id, fromUserManagement: false}}">帐号管理</router-link>
                  </div>
                  <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat" @click="toLogout">安全退出</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar shadow-Right">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
          <li class="treeview" hidden="hidden">
            <a href="#">
              <i class="fa fa-users"></i> <span>用户中心</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li v-showMenu="10000"><a><i class="fa fa-user"></i>用户管理</a></li>
            </ul>
          </li>
          <li class="treeview" hidden="hidden">
            <a href="#">
              <i class="fa fa-book"></i> <span>内容中心</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li v-showMenu="10001"><a><i class="fa fa-commenting-o"></i>即时消息</a></li>
              <li v-showMenu="10002"><a><i class="fa fa-commenting-o"></i>故事圈内容</a></li>
            </ul>
          </li>
          <li class="treeview" hidden="hidden">
            <a href="#">
              <i class="fa fa-cog"></i> <span>产品配置</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li v-showMenu="10003">
                <router-link :to="{path: '/main/sms_interface'}"><i class="fa fa-envelope-o"></i> 短信接口</router-link>
              </li>
            </ul>
          </li>
          <li class="treeview">
            <a href="#">
              <i class="fa fa-cogs"></i> <span>系统设置</span>
              <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li v-if="showSysUserManagement">
                <router-link :to="{path: '/main/user_management'}"><i class="fa fa-user"></i> 用户管理</router-link>
              </li>
              <li v-if="showSysUserManagement">
                <router-link :to="{path: '/main/role_management'}"><i class="fa fa-user-secret"></i> 角色管理</router-link>
              </li>
              <li v-if="showSysUserManagement">
                <router-link :to="{path: '/main/privilege_management'}"><i class="fa fa-key"></i> 权限管理</router-link>
              </li>
              <li v-if="showSysUserManagement">
                <router-link :to="{path: '/main/menu_management'}"><i class="fa fa-file-text"></i> 菜单管理</router-link>
              </li>
              <li v-if="showSysUserManagement">
                <router-link :to="{path: '/main/unlock_account'}"><i class="fa fa-unlock"></i> 解锁帐号</router-link>
              </li>
              <li>
                <router-link :to="{path: '/main/operation_log'}"><i class="fa fa-file-text-o"></i> 操作日志</router-link>
              </li>
            </ul>
          </li>
          <li class="header">LABELS</li>
          <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
          <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
          <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <router-view></router-view>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
      <div class="pull-right hidden-xs">
        <b>Version</b> 1.0
      </div>
      <strong>Copyright &copy; 2016 <a href="#">故事友</a>.</strong> All rights reserved.
    </footer>

    <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>

</template>

<script>
import { getProfile, logout } from '../api/admin'
import { getRoleHasMenus } from '../api/role-has-privilege'
import { SET_PROFILE } from '../vuex/mutation_types'
import store from '../vuex/store'
import alertify from 'alertifyjs'

let vm

export default {
  name: 'Main',
  data () {
    return {
      user: {},
      menus: [],
      showSysUserManagement: false
    }
  },
  created () {
    vm = this
    getProfile().then(user => {
      vm.user = user
      store.commit(SET_PROFILE, vm.user)
      // 处理系统设置相关模块的显示
      vm.showSysUserManagement = checkSysUserManagementPrivilege(user.roleId)
      // 处理头像
      window.$('.user-avatar').attr('data-name', this.user.realName.charAt(this.user.realName.length - 1))
      window.$('.user-avatar').initial()
      return getRoleHasMenus(vm.user.roleId)
    }).then(menus => {
      vm.menus = menus
    })
  },
  mounted () {
    window.$(window).resize(() => {
      window.$('.sidebar').slimScroll({
        height: window.$(window).height() - 100
      })
    })
  },
  directives: {
    showMenu: {
      update (el, {value}) {
        if (vm.user.roleId == 10000 || vm.user.roleId == 10001) {
          window.$(el).parent().parent().show()
          return
        }
        if (vm.menus.length == 0) {
          window.$(el).hide()
          return
        }
        for (let index in vm.menus) {
          if (vm.menus[index] == value.toString()) {
            window.$(el).show()
            window.$(el).attr('visible', true)
            showParentMenu(el)
            return
          }
        }
        window.$(el).hide()
        window.$(el).attr('visible', false)
        showParentMenu(el)
      }
    }
  },
  methods: {
    toLogout: () => {
      logout().then(() => {
        alertify.success('成功退出')
      })
    }
  }
}

// 检查系统用户管理权限
const checkSysUserManagementPrivilege = function (roleId) {
  if (roleId == 10000 || roleId == 10001) {
    return true
  } else {
    return false
  }
}

// 控制父菜单的显示
const showParentMenu = (el) => {
  window.$(el).parent().parent().each(function () {
    const parentEl = window.$(this)
    window.$(this).children('ul').children('li').each(function () {
      let val = window.$(this).attr('visible')
      if (val == 'true') {
        parentEl.show()
        return
      }
    })
  })
}
</script>

<style lang="less" src='../assets/less/main.less'></style>