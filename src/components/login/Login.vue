<template>
  <el-container>
    <el-main class="content">
      <div class="title">
          <p>TZEC</p>
      </div>
      <el-card v-loading="loading" class="box-card form">
        <div slot="header" class="clearfix">
          <span>登录系统</span>
        </div>
        <el-form>
          <div>
            <el-input @keyup.enter.native="login" @focus="onNameFocus" v-model="loginName" placeholder="输入登录名">
              <template slot="prepend">帐号:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:nameNoticeShow}">
              <label>请输入帐号</label>
            </div>
          </div>
          <div>
            <el-input @keyup.enter.native="login" v-on:focus="onPwdFocus" v-model="password" type="password" placeholder="输入密码">
              <template slot="prepend">密码:</template>
            </el-input>
            <div class="notice" v-bind:style="{visibility:pwdNoticeShow}">
              <label>请输入密码</label>
            </div>
          </div>
          <div class="notice" v-bind:style="{visibility:resultNoticeShow}">
            <label>{{resultNotice}}</label>
          </div>
          <el-button class="lgBt" type="button" @click="login">登录</el-button>
          <router-link to="register">没有账号，去注册</router-link>
        </el-form>
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

<script src="./lg.js">
</script>
<style scoped src="./lg.css">
</style>
