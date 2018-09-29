<template>
  <div v-loading="loading">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="8">
            <el-input v-model="name">
              <template slot="prepend">名字:</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="url">
              <template slot="prepend">url:</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="unitName">
              <template slot="prepend">UnitName:</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <label style="visibility:hidden">占位</label>
          </el-col>
          <el-col :span="8">
            <el-button @click="queryMenu">查询</el-button>
            <el-button @click="newPadShow=true">增加</el-button>
            <el-button @click="showEditPad">修改</el-button>
            <el-button @click="deleteMenu">删除</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="menuData" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="parentId" label="父ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="type" :formatter="formateType" label="类型"></el-table-column>
          <el-table-column prop="url" show-overflow-tooltip label="url"></el-table-column>
          <el-table-column prop="unitName" label="UnitName"></el-table-column>
          <el-table-column prop="createdAt" :formatter="formateDate" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="pageSizes"
         :page-size="pageSize"
         :total="totalMenuCount"
         layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      </el-main>
    </el-container>

    <!--新增或者修改菜单的dialog-->
    <el-dialog v-loading="newLoading" title="新增菜单" :visible.sync="dialogShow">
      <el-form :model="newMenuForm">
        <el-form-item>
          <el-select @focus="onNewMenuTypeFocus" v-model="newMenuForm.type" placeholder="请选择类型">
            <el-option
            v-for="item in menuType"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
          </el-select>
          <div class="notice" v-bind:style="{visibility:newMenuTypeNotice}">
            <label>请输选择类型</label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input @focus="onNewMenuParentIdFocus" v-model="newMenuForm.parentId">
            <template slot="prepend">父ID:</template>
          </el-input>
          <div class="notice" v-bind:style="{visibility:newMenuParentIdNotice}">
            <label>请输入父ID</label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input @focus="onNewMenuNameFocus" v-model="newMenuForm.name">
            <template slot="prepend">名称:</template>
          </el-input>
          <div class="notice" v-bind:style="{visibility:newMenuNameNotice}">
            <label>请输入名称</label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input @focus="onNewMenuUrlFocus" v-model="newMenuForm.url">
            <template slot="prepend">url</template>
          </el-input>
          <div class="notice" v-bind:style="{visibility:newMenuUrlNotice}">
            <label>请输入url</label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input @focus="onNewMenuUnitNameFocus" v-model="newMenuForm.unitName">
            <template slot="prepend">UnitName</template>
          </el-input>
            <div class="notice" v-bind:style="{visibility:newMenuUnitNameNotice}">
            <label>请输入UnitName</label>
          </div>
        </el-form-item>
      </el-form>
      <div style="padding:0px;" slot="footer" class="dialog-footer">
        <el-button @click="newPadShow=false;editPadShow=false">取消</el-button>
        <el-button type="primary" @click="addOrEditMenu">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./po.js">
</script>
<style scoped src="./po.css">
</style>
