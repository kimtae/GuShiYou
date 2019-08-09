<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>短信接口</h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">产品配置</li>
        <li class="active">短信接口</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-header with-border">
          <div class="table-toolbar">
            <div class="btn-toolbar" role="toolbar">
              <div class="btn-group">
                <button type="button" class="btn btn-success btn-sm" @click="addSmsConfig"><i class="fa fa-plus"></i>  添加</button>
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
                  <th>配置项</th>
                  <th>值</th>
                  <th>描述</th>
                  <th>创建时间</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(config, index) in smsConfigs">
                  <td>{{config.id}}</td>
                  <td>{{config.item}}</td>
                  <td>{{config.value}}</td>
                  <td>{{config.description}}</td>
                  <td>{{config.createTime}}</td>
                  <td>{{config.updateTime}}</td>
                  <td>
                    <div class="tools">
                      <i class="fa fa-edit" @click="modifySmsConfig(config.id)" title="修改"></i>
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
import { getSmsConfigs } from '../../api/app/sms-interface'
import alertify from 'alertifyjs'
import router from '../../router'

let vm

export default {
  name: 'SmsInterface',
  data () {
    return {
      smsConfigs: [],
      loadStatus: false
    }
  },
  computed: {
    showNoDataHint () {
      if (!vm.loadStatus) {
        return false
      }
      return vm.smsConfigs.length == 0
    }
  },
  created () {
    vm = this
    toGetSmsConfigs()
  },
  methods: {
    addSmsConfig: function () {
      router.push('add_sms_config')
    },
    modifySmsConfig: function (configId) {
      router.push({path: 'modify_sms_config', query: {configId: configId}})
    }
  }
}

// 获取短信接口配置列表
let toGetSmsConfigs = function () {
  getSmsConfigs().then(data => {
    if (data.length != 0) {
      vm.smsConfigs = data
    }
    vm.loadStatus = true
  })
}

</script>