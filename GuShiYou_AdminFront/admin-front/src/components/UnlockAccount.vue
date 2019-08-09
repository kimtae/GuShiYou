<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>解锁帐号<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li class="active">解锁帐号</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <div class="row">
            <div class="form-group col-md-6 col-md-offset-3">
              <label for="account" class="col-sm-2 control-label">帐号*</label>
              <div class="col-sm-9">
                <input type="text" id="account" class="form-control" v-model="userName" placeholder="填写需要解锁的帐号（用户名）">
              </div>
            </div>
            <!--/.form-group-->
          </div>
        </div>
        <!-- /.box-body -->
        <div class="box-footer with-border box-footer-with-button">
          <button type="submit" class="btn btn-block btn-md btn-success" @click="unlock">解锁</button>
        </div>
        <!--/.boxfooter-->
      </div>
    </section>
  </div>
</template>

<script>
import {unlockAccount} from '../api/admin'
import {checkUserName} from '../api/utils'
import alertify from 'alertifyjs'
import router from '../router'

let vm

export default {
  name: 'UnlockAccount',
  data () {
    return {
      userName: ''
    }
  },
  created () {
    vm = this
  },
  methods: {
    unlock: function () {
      if (!vm.userName) {
        alertify.error('请填写帐号')
        return
      }
      if (!checkUserName(vm.userName)) {
        alertify.error('帐号不存在')
        return
      }
      unlockAccount(vm.userName).then(() => {
        vm.userName = ''
      })
    }
  }
}

</script>