import Formatter from '../../utils/Formatter';
import axios from 'axios';
import ReqUtils from '../../utils/ReqUtils';
import GeneralUtils from '../../utils/GeneralUtils';
export default {
  name: 'Catagory',
  data: function () {
    return {
      loading: false,
      dialogTitle: '新增类目',
      newPadShow: false,
      editPadShow: false,
      newLoading: false,
      newCataOrderNotice:'hidden',
      newCataNameNotice: 'hidden',
      newCataParentIdNotice: 'hidden',
      name: undefined,
      currentPage: 1,
      pageSizes: [7, 10, 20, 50],
      pageSize: 7,
      totalCount: undefined,
      tableData: [],
      itemSelected: [],
      parentCatagorys: [],
      newForm: {
        name: '',
        parentId: '',
        order: 0,
        parentCatagorysSelected:[]
      }
    };
  },
  mounted() {
    //准备数据
    this.query();
  },
  computed: {
    dialogShow() {
      return this.$data.newPadShow || this.$data.editPadShow;
    }
  },
  methods: {
    token() {
      return this.$store.state.userInfo.token;
    },
    dialogCancle() {
      this.$data.newPadShow = false;
      this.$data.editPadShow = false;
      this.$data.dialogTitle = '新增菜单';
    },
    initParentSelectData: async function () {
      let response = await axios({
        url: ReqUtils.getHttpRoot() + '/catagory/get',
        method: 'post',
        data: ReqUtils.getReq(this.token(), {})
      }).then();
      if (response.status === 200) {
        let header = response.data.header;
        if (header.status === 'success') {
          let data = response.data.data;
          if (data.catagoryInfo) {
            //准备可选择父类目数据，给el-cascader控件准备的,要将array转成tree
            let arrayWithInfo=[];
            if(data.catagoryInfo.length>0){
              arrayWithInfo = data.catagoryInfo.map(cataInfo => {
                cataInfo.value = cataInfo.id;
                cataInfo.label = cataInfo.name;
                return cataInfo;
              });
            }
            arrayWithInfo.push({
              value: 0,
              id: 0,
              parentId: -1,
              label: '根类目'
            });
            this.$data.parentCatagorys = GeneralUtils.arrToTree(arrayWithInfo);
          }
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '查询失败：' + header.errMsg,
            duration: 1000
          });
        }
      } else {
        this.$message({
          showClose: true,
          type: 'error',
          message: '查询失败，网络错误：' + response.status,
          duration: 1000
        });
      }
    },
    showNewPad(){
      this.$data.newPadShow=true;
      this.initParentSelectData();
    },
    showEditPad() {
      if (this.$data.itemSelected.length === 1) {
        this.$data.newForm.name = this.$data.itemSelected[0].name;
        this.$data.newForm.parentId = this.$data.itemSelected[0].parentId;
        this.$data.newForm.order=this.$data.itemSelected[0].order;
        this.$data.newForm.id=this.$data.itemSelected[0].id;
        this.$data.newForm.parentCatagorysSelected=
        this.$data.editPadShow = true;
        this.initParentSelectData();
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条记录,',
          type: 'info',
          duration: 1000
        });
      }
    },
    handleSizeChange(size) {
      this.$data.pageSize = size;
      this.query();
    },
    handleCurrentChange(currentPage) {
      this.$data.currentPage = currentPage;
      this.query();
    },
    handleSelectionChange(itemSelected) {
      this.$data.itemSelected = itemSelected;
    },
    newParentCatagoryChange(selectedValueArray){
      if(selectedValueArray&&selectedValueArray.length>0){
        this.$data.newForm.parentId=selectedValueArray[selectedValueArray.length-1];
      }else{
        this.$data.newForm.parentId='';
      }
    },
    onNewCataParentIdFocus() {
      this.$data.newCataParentIdNotice = 'hidden';
    },
    onNewCataNameFocus() {
      this.$data.newCataNameNotice = 'hidden';
    },
    formateDate: function (row, col, cellValue) {
      return Formatter.formatDate(cellValue, 'yyyy-MM-dd HH:mm:ss');
    },
    addOrEditCata: async function () {
      if (this.newValidate()) {
        let itemCommit = this.$data.newForm;
        let reqUrl = ReqUtils.getHttpRoot();
        if (this.$data.editPadShow) {
          itemCommit.id = this.$data.itemSelected[0].id;
          reqUrl += '/catagory/edit';
        } else {
          reqUrl += '/catagory/add';
        }
        try {
          this.$data.newLoading = true;
          let response = await axios({
            url: reqUrl,
            method: 'post',
            data: ReqUtils.getReq(this.token(), itemCommit)
          }).then();
          this.$data.newLoading = false;
          if (response.status === 200) {
            let header = response.data.header;
            if (header.status === 'success') {
              this.$data.currentPage = 0;
              this.$data.newPadShow = false;
              this.$data.editPadShow = false;
              this.$data.newForm = {
                name: '',
                parentId: '',
                order: 0
              };
              this.query();
            } else {
              this.$message({
                showClose: true,
                message: '新增失败,' + header.errMsg,
                type: 'info',
                duration: 1000
              })
            }
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '删除失败，网络错误：' + response.status,
              duration: 1000
            });
          }
        } catch (error) {
          console.log(error);
          this.$data.newLoading = false;
          this.$message({
            showClose: true,
            message: '发生了可怕的错误',
            type: 'error',
            duration: 1000
          });
        }
      }
    },
    newValidate: function () {
      let pass = true;
      if (!this.$data.newForm.name || this.$data.newForm.name.length <= 0) {
        pass = false;
        this.$data.newCataNameNotice = 'visible';
      }

      if ((!this.$data.newForm.parentId && this.$data.newForm.parentId !== 0) || this.$data.newForm.parentId.length <= 0) {
        pass = false;
        this.$data.newCataParentIdNotice = 'visible';
      }
      return pass;
    },
    deleteItems: async function () {
      if (this.$data.itemSelected && this.$data.itemSelected.length > 0) {
        try {
          this.$data.loading = true;
          let response = await axios({
            url: ReqUtils.getHttpRoot() + "/catagory/delete",
            method: 'post',
            data: ReqUtils.getReq(this.token(), {
              needDeleteCatagoryArr: this.$data.itemSelected
            })
          }).then();
          this.$data.loading = false;
          if (response.status === 200) {
            let header = response.data.header;
            if (header.status === 'success') {
              this.$data.currentPage = 0;
              this.query();
            } else {
              this.$message({
                showClose: true,
                message: '删除失败,' + header.errMsg,
                type: 'info',
                duration: 1000
              });
            }
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '删除失败，网络错误：' + response.status,
              duration: 1000
            });
          }
        } catch (error) {
          console.log(error);
          this.$data.loading = false;
          this.$message({
            showClose: true,
            message: '发生了可怕的错误',
            type: 'error',
            duration: 1000
          });
        }
      } else {
        this.$message({
          message: '请选择要删除的菜单',
          showClose: true,
          duration: 1000,
          type: 'info'
        });
      }
    },
    query: async function () {
      try {
        this.$data.loading = true;
        let response = await axios({
          url: ReqUtils.getHttpRoot() + '/catagory/get',
          method: 'post',
          data: ReqUtils.getReq(this.token(), {
            currentPage: this.$data.currentPage,
            pageSize: this.$data.pageSize,
            name: this.$data.name,
          })
        }).then();
        this.$data.loading = false;
        if (response.status === 200) {
          let header = response.data.header;
          if (header.status === 'success') {
            let data = response.data.data;
            this.$data.tableData = data.catagoryInfo;
            this.$data.totalCount = data.totalCount;
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '查询失败：' + header.errMsg,
              duration: 1000
            });
          }
        } else {
          this.$message({
            showClose: true,
            type: 'error',
            message: '查询失败，网络错误：' + response.status,
            duration: 1000
          });
        }
      } catch (error) {
        console.log(error);
        this.$data.loading = false;
        this.$message({
          showClose: true,
          type: 'error',
          message: '发生了可怕的错误',
          duration: 1000
        });
      }
    }
  }
}
