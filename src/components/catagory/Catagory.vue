<template>
  <div v-loading="loading">
      <div class="queryPad">
          <el-row>
            <el-col class="elCol" :span="8">
              <el-input v-model="name">
                <template slot="prepend">名字:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <label style="visibility:hidden">占位</label>
            </el-col>
            <el-col :span="8">
              <el-button @click="query">查询</el-button>
              <el-button @click="showNewPad">增加</el-button>
              <el-button @click="showEditPad">修改</el-button>
              <el-button @click="deleteItems">删除</el-button>
            </el-col>
          </el-row>
      </div>
      <div class="tablePad">
        <el-table :data="tableData" tooltip-effect="dark" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="parentId" label="父ID"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="order" label="排序"></el-table-column>
          <el-table-column prop="createdAt" :formatter="formateDate" label="创建时间"></el-table-column>
        </el-table>
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentPage"
         :page-sizes="pageSizes"
         :page-size="pageSize"
         :total="totalCount"
         layout="total,sizes,prev,pager,next,jumper"></el-pagination>
      </div>

    <!--新增或者修改类目的dialog-->
    <el-dialog v-loading="newLoading" :before-close="dialogCancle" :visible.sync="dialogShow">
      <label slot="title" class="dialogTitle">{{dialogTitle}}</label>
      <el-form :model="newForm">
        <el-form-item>
          父类目：
          <el-cascader
            expand-trigger="hover"
            :options="parentCatagorys"
            v-model="newForm.parentCatagorysSelected"
            @change="newParentCatagoryChange">
          </el-cascader>
          <div class="notice" v-bind:style="{visibility:newCataParentIdNotice}">
            <label>请选择父类目</label>
          </div>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-input @focus="onNewCataNameFocus" v-model="newForm.name">
            <template slot="prepend">名称:</template>
          </el-input>
          <div class="notice" v-bind:style="{visibility:newCataNameNotice}">
            <label>请输入名称</label>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="newForm.order">
            <template slot="prepend">排序:</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div style="padding:0px;" slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取消</el-button>
        <el-button type="primary" @click="addOrEditCata">提交</el-button>
      </div>
    </el-dialog>
    <!--新增或者修改类目的dialog结束-->

  </div>
</template>

<script src="./cg.js">
</script>
<style scoped src="./cg.css">
</style>
