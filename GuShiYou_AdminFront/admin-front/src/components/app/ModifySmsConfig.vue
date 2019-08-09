<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>修改短信接口配置</h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/main"><i class="fa fa-dashboard"></i> 主页</router-link>
        </li>
        <li class="active">产品配置</li>
        <li>
          <router-link to="/main/sms_interface">短信接口</router-link>
        </li>
        <li class="active">修改短信接口配置</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="box box-primary">
        <div class="box-body no-box-header">
          <div class="row">
            <div class="form-group col-lg-6">
              <label for="item" class="col-sm-2 control-label">配置项*</label>
              <div class="col-sm-9">
                <input type="text" id="item" class="form-control" v-model="config.item" placeholder="配置项">
              </div>
            </div>
            <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="value" class="col-sm-2 control-label">值*</label>
              <div class="col-sm-9">
                <textarea id="value" class="textarea" v-model="config.value" placeholder="值" style="height: 84px;"></textarea>
              </div>
            </div>
           <!--/.form-group-->
            <div class="form-group col-lg-6">
              <label for="description" class="col-sm-2 control-label">描述*</label>
              <div class="col-sm-9">
                <textarea id="description" class="textarea" v-model="config.description" placeholder="描述" style="height: 84px;"></textarea>
              </div>
            </div>
           <!--/.form-group-->
          </div>
        </div>
        <!--/.box-body-->
        <div class="box-footer with-border box-footer-with-button">
          <button type="submit" class="btn btn-md btn-block btn-success" @click="confirm">确定修改</button>
        </div>
        <!--/.boxfooter-->
      </div>
    </section>
  </div>
</template>

<script>
import { getSmsConfig, modifySmsConfig } from '../../api/app/sms-interface'
import alertify from 'alertifyjs'
import router from '../../router'
import _ from 'underscore'
import { filterObjectChanges } from '../../api/utils'

let vm

export default {
  name: 'ModifySmsConfig',
  data () {
    return {
      originalConfig: {},
      config: {}
    }
  },
  created () {
    vm = this
    getSmsConfig(vm.$route.query.configId).then(config => {
      vm.config = config
      vm.originalConfig = window.$.extend(true, {}, config)
    })
  },
  methods: {
    confirm: function () {
      if (!vm.config.item) {
        alertify.error('请输入配置项')
        return
      }
      let regex = /^\w{2,30}$/
      if (!vm.config.item.match(regex)) {
        alertify.error('配置项为2-30个字符，可以使用字母、数字、下划线')
        return
      }
      if (!vm.config.value) {
        alertify.error('请输入值')
        return
      }
      if (vm.config.value.length < 1 || vm.config.value.length > 1024) {
        alertify.error('值为1-1024个字符')
        return
      }
      if (!vm.config.description) {
        alertify.error('请填写描述')
        return
      }
      if (vm.config.description.length < 5 || vm.config.description.length > 100) {
        alertify.error('描述为5-100个字符')
        return
      }
      let config = filterObjectChanges(vm.originalConfig, vm.config)
      if (!_.isEmpty(config)) {
        config.id = vm.config.id
        modifySmsConfig(config).then(() => {
          router.go(-1)
        })
      } else {
        alertify.message('内容无修改')
      }
    }
  }
}

</script>
