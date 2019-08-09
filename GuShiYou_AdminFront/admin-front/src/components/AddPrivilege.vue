<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>添加权限<small>（系统）</small></h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">系统设置</li>
        <li>
          <router-link to="/main/privilege_management">权限管理</router-link>
        </li>
        <li class="active">添加权限</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body no-box-header">
          <div class="row">
            <div class="form-group col-lg-6">
              <label for="privilegeName" class="col-sm-2 control-label">权限名*</label>
              <div class="col-sm-9">
                <input type="text" id="privilegeName" class="form-control" v-model="privilege.privilegeName" placeholder="权限名">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="description" class="col-sm-2 control-label">描述*</label>
              <div class="col-sm-9">
                <textarea id="description" class="textarea" v-model="privilege.description" placeholder="描述" style="height: 84px;"></textarea>
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
import {addPrivilege} from '../api/privilege'
import alertify from 'alertifyjs'
import router from '../router'

let vm

export default {
  name: 'AddPrivilege',
  data () {
    return {
      privilege: {}
    }
  },
  created () {
    vm = this
  },
  methods: {
    add: function () {
      if (!vm.privilege.privilegeName) {
        alertify.error('请输入权限名')
        return
      }
      if (vm.privilege.privilegeName.length < 1 || vm.privilege.privilegeName.length > 20) {
        alertify.error('权限名为1-20个字符')
        return
      }
      if (!vm.privilege.description) {
        alertify.error('请填写描述')
        return
      }
      if (vm.privilege.description.length < 5 || vm.privilege.description.length > 100) {
        alertify.error('描述为5-100个字符')
        return
      }
      addPrivilege(vm.privilege.privilegeName, vm.privilege.description).then(() => {
        router.go(-1)
      })
    }
  }
}

</script>
