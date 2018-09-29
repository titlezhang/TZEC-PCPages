<template>
<el-container>
  <el-header class="header">
    <div ref="myHeader">
      <el-row>
        <el-col :span="20">
          <div  class="logo-pad">
            <label class="logo-text">广电银通微服务研发平台</label>
          </div>
        </el-col>
        <el-col :span="4">
          <!--用户-->
          <label class="user-text">你好，{{userInfo.name}}</label>
          <!--用户-->
              <!--用户信息开始-->
          <el-button size="mini" type="text" class="logout-btn" v-on:click="logout">注销</el-button>
          <!--用户信息结束-->
        </el-col>
      </el-row>
    </div>
  </el-header>
    <el-main class="top-main">
      <el-container style="padding-left:0px;padding-right:0px;">
        <el-aside style="width:200px">
        <!--左侧菜单-->
          <el-menu :unique-opened="uniqueOpened" :style="{height:mainHeight+'px'}" @select="menuSelected"  class="aside">
              <div v-for="(asideMenu) in menuInfo">
                <el-submenu
                  v-if="asideMenu.children"
                  :index="asideMenu.unitName+'fdas'">
                    <template slot="title">
                      {{asideMenu.name}}
                    </template>
                    <div v-for="(subAsideMenu) in asideMenu.children"
                      :index="subAsideMenu.unitName+':'+subAsideMenu.name"
                      :key="subAsideMenu.unitName">
                      <el-menu-item :index="subAsideMenu.unitName+':'+subAsideMenu.name" :key="subAsideMenu.unitName">{{subAsideMenu.name}}</el-menu-item>
                    </div>
                </el-submenu>
                <el-menu-item
                  v-else
                  :index="asideMenu.unitName+':'+asideMenu.name" :key="asideMenu.unitName">{{asideMenu.name}}
                </el-menu-item>
                </div>
          </el-menu>
            <!--左侧菜单结束-->
        </el-aside>
        <el-main class="main" :style="{height:mainHeight+'px'}">
            <!--tabs开始-->
          <el-tabs style="padding-bottom:0px;padding-right:0px"
                @tab-remove="removeTab" @tab-click="onTabClick" v-model="currentTabIndex" type="card" closable >
              <el-tab-pane style="padding-bottom:0px;padding-right:0px"
                  v-for="(tab,index) in tabs"
                  :key="tab.name"
                  :label="tab.title"
                  :name="tab.name">
              </el-tab-pane>
          </el-tabs>
            <!--tabs结束-->
            <!--这里子模块-->
          <component :is="currentTabComponent"></component>
        </el-main>
      </el-container>
    </el-main>
</el-container>

</template>
<script src='./hm.js'>
</script>
<style scope src='./hm.css'>
</style>
