<template>
  <el-container>
    <el-main class="content">
      <div class="title">
          <p>注册</p>
      </div>
      <el-card v-loading="loading" class="box-card form">
        <el-form>
          <div>
            <el-input @keyup.enter.native="register" @focus="onLoginNameFocus" v-model="loginName" placeholder="输入登录名">
              <template slot="prepend">帐&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp号:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:loginNameNoticeShow}">
              <label>请输入帐号</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="register" @focus="onNameFocus" v-model="name" placeholder="输入姓名">
              <template slot="prepend">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:nameNoticeShow}">
              <label>请输入姓名</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="register" v-on:focus="onPwdFocus" v-model="password" type="password" placeholder="输入密码">
              <template slot="prepend">密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:pwdNoticeShow}">
              <label>请输入密码</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="register" v-on:focus="onPwdAgainFocus" v-model="passwordAgain" type="password" placeholder="再次输入密码">
              <template slot="prepend">确认密码:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:pwdAgainNoticeShow}">
              <label>两次密码不一致</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="register" v-model="email" placeholder="请输入邮箱">
              <template slot="prepend">邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱:</template>
            </el-input>
                 <div class="notice" v-bind:style="{visibility:'hidden'}">
              <label>点位不显示</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="register" v-model="mobilePhone" placeholder="请输入手机号">
              <template slot="prepend">手&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp机:</template>
            </el-input>
          </div>
          <div class="notice" v-bind:style="{visibility:resultNoticeShow}">
            <label>{{resultNotice}}</label>
          </div>
          <el-button class="rgBt" type="button" @click="register">提交</el-button>
        </el-form>
        <router-link to="login">已有账号，去登录</router-link>
      </el-card>
    </el-main>
    <el-footer>
      <span class="bottom-left">
          TZEC 版权所有 Copyright © 2003-2018 GRGBanking, All Rights Reserved
      </span>
      <span class="bottom-right">我们爱学习，我们搞事情！</span>
    </el-footer>
  </el-container>
</template>

<script src="./rg.js">
</script>
<style scoped src="./rg.css">
</style>
