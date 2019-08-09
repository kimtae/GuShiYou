<template>
  <div class="container">
    <div class="icon visible-xs-block">
      <img class="login-logo" src="../assets/img/login/icon.png" alt="Welcome to Mail App">
      <p>故事友<br>运营管理系统</p>
    </div>
    <div class="login">
      <div class="login-screen">
        <div class="login-center">
          <div class="icon hidden-xs">
            <img class="login-logo" src="../assets/img/login/icon.png" alt="Welcome to Mail App">
            <h4>故事友<br>运营管理系统</h4>
          </div>
          <div class="login-form">
            <div class="form-group">
              <input type="text" class="form-control login-field" v-model="userName" placeholder="用户名" @keyup.enter="toLogin">
              <label class="login-field-icon fui-user" for="login-name"></label>
            </div>
            <div class="form-group">
              <input type="text" class="password-field form-control login-field" v-model="password" placeholder="密码" @keyup.enter="toLogin" @focus="changeInputType">
              <label class="login-field-icon fui-lock" for="login-pass"></label>
            </div>
            <a class="btn btn-primary btn-md btn-block" @click="toLogin">登录</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, checkLogin} from '../api/admin'
import alertify from 'alertifyjs'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    // 动态改变<input>类型，防止浏览器弹出记住密码提示，以提高安全性
    changeInputType: function () {
      window.$('.password-field').attr('type', 'password')
    },
    toLogin: function () {
      var userName = this.userName
      var password = this.password
      if (userName.length === 0) {
        alertify.error('请输入用户名')
        return
      }
      if (password.length === 0) {
        alertify.error('请输入密码')
        return
      }

      login(userName, password)
    }
  },
  created () {
    checkLogin()
  }
}
</script>

<style lang="less" src='../assets/less/login.less'></style>