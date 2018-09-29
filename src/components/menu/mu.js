import Formatter from '../../utils/Formatter';
import axios from 'axios';
import ReqUtils from '../../utils/ReqUtils';
export default {
  name: 'Menu',
  data: function () {
    return {
      loading:false,
      dialogTitle:'新增菜单',
      newPadShow:false,
      editPadShow:false,
      newLoading:false,
      newMenuTypeNotice:'hidden',
      newMenuNameNotice:'hidden',
      newMenuUrlNotice:'hidden',
      newMenuUnitNameNotice:'hidden',
      newMenuParentIdNotice:'hidden',
      name: undefined,
      url: undefined,
      unitName: undefined,
      currentPage:1,
      pageSizes:[7,10,20,50],
      pageSize:7,
      totalMenuCount:undefined,
      menuData: [],
      menuSelected:[],
      menuType:[
        {value:0,label:'菜单'},
        {value:1,label:'按钮'}
      ],
      newMenuForm:{
        name:'',
        url:'',
        unitName:'',
        parentId:'',
        type:0
      }
    }
  },
  mounted() {
    //准备数据
    this.queryMenu();
  },
  computed:{
    dialogShow(){
      return this.$data.newPadShow||this.$data.editPadShow;
    }
  },
  methods: {
    token(){
      return this.$store.state.userInfo.token;
    },
    showEditPad(){
      if(this.$data.menuSelected.length===1){
        this.$data.newMenuForm.name=this.$data.menuSelected[0].name;
        this.$data.newMenuForm.url=this.$data.menuSelected[0].url;
        this.$data.newMenuForm.unitName=this.$data.menuSelected[0].unitName;
        this.$data.newMenuForm.parentId=this.$data.menuSelected[0].parentId;
        this.$data.newMenuForm.type=this.$data.menuSelected[0].type;
        this.$data.dialogTitle='修改菜单';
        this.$data.editPadShow=true;
      }else{
        this.$message({
          showClose:true,
          message:'请选择一条记录,',
          type:'info',
          duration:1000
        });
      }
    },
    dialogCancle(){
      this.$data.newPadShow=false;
      this.$data.editPadShow=false;
      this.$data.dialogTitle='新增菜单'
    },
    handleSizeChange(size){
      this.$data.pageSize=size;
      this.queryMenu();
    },
    handleCurrentChange(currentPage){
      this.$data.currentPage=currentPage;
      this.queryMenu();
    },
    handleSelectionChange(menuSelected){
      this.$data.menuSelected=menuSelected;
    },
    onNewMenuTypeFocus(){
      this.$data.newMenuTypeNotice='hidden';
    },
    onNewMenuParentIdFocus(){
      this.$data.newMenuParentIdNotice='hidden';
    },
    onNewMenuNameFocus(){
      this.$data.newMenuNameNotice='hidden';
    },
    onNewMenuUrlFocus(){
      this.$data.newMenuUrlNotice='hidden';
    },
    onNewMenuUnitNameFocus(){
      this.$data.newMenuUnitNameNotice='hidden';
    },
    formateType(row,col,cellValue){
      if(cellValue===1){
        return '按钮';
      }else if(cellValue===0){
        return '菜单';
      }else{
        return '其它';
      }
    },
    formateDate:function(row,col,cellValue){
       return Formatter.formatDate(cellValue,'yyyy-MM-dd HH:mm:ss');
    },
    addOrEditMenu:async function(){
      if(this.newMenuValidate()){
        let menuCommit=this.$data.newMenuForm;
        let reqUrl=ReqUtils.getHttpRoot();
        if(this.$data.editPadShow){
          menuCommit.id=this.$data.menuSelected[0].id;
          reqUrl+='/menu/edit';
        }else{
          reqUrl+='/menu/add';
        }
        try{
          this.$data.newLoading=true;
          let response=await axios({
            url:reqUrl,
            method:'post',
            data:ReqUtils.getReq(this.token(),menuCommit)
          }).then();
          this.$data.newLoading=false;
          if(response.status===200){
            let header=response.data.header;
            if(header.status==='success'){
              this.$data.currentPage=0;
              this.$data.newPadShow=false;
              this.$data.editPadShow=false;
              this.$data.dialogTitle='新增菜单';
              this.$data.newMenuForm={
                name:'',
                url:'',
                unitName:'',
                parentId:'',
                type:0
              };
              this.queryMenu();
            }else{
              this.$message({
                showClose:true,
                message:'新增失败,'+header.errMsg,
                type:'info',
                duration:1000
              })
            }
          }else{
            this.$message({
              showClose:true,
              type:'error',
              message:'删除失败，网络错误：'+response.status,
              duration:1000
            });
          }
        }catch(error){
          console.log(error);
          this.$data.newLoading=false;
          this.$message({
            showClose:true,
            message:'发生了可怕的错误',
            type:'error',
            duration:1000
          });
        }
      }
    },
    newMenuValidate:function(){
      let pass=true;
      if(!this.$data.newMenuForm.name||this.$data.newMenuForm.name.length<=0){
        pass=false;
        this.$data.newMenuNameNotice='visible';
      }
      if(!this.$data.newMenuForm.url||this.$data.newMenuForm.url.length<=0){
        pass=false;
        this.$data.newMenuUrlNotice='visible';
      }
      if(!this.$data.newMenuForm.unitName||this.$data.newMenuForm.unitName.length<=0){
        pass=false;
        this.$data.newMenuUnitNameNotice='visible';
      }
      if((!this.$data.newMenuForm.parentId&&this.$data.newMenuForm.parentId!==0)||this.$data.newMenuForm.parentId.length<=0){
        pass=false;
        this.$data.newMenuParentIdNotice='visible';
      }
      return pass;
    },
    deleteMenu:async function(){
      if(this.$data.menuSelected&&this.$data.menuSelected.length>0){
        try{
          this.$data.loading=true;
          let response =await axios({
            url:ReqUtils.getHttpRoot()+"/menu/delete",
            method:'post',
            data:ReqUtils.getReq(this.token(),{
              needDeleteMenuArr:this.$data.menuSelected
            })
          }).then();
          this.$data.loading=false;
          if(response.status===200){
            let header=response.data.header;
            if(header.status==='success'){
              this.$data.currentPage=0;
              this.queryMenu();
            }else{
              this.$message({
                showClose:true,
                message:'删除失败,'+header.errMsg,
                type:'info',
                duration:1000
              });
            }
          }else{
            this.$message({
              showClose:true,
              type:'error',
              message:'删除失败，网络错误：'+response.status,
              duration:1000
            });
          }
        }catch(error){
          console.log(error);
          this.$data.loading=false;
          this.$message({
            showClose:true,
            message:'发生了可怕的错误',
            type:'error',
            duration:1000
          });
        }
      }else{
        this.$message({
          message:'请选择要删除的菜单',
          showClose:true,
          duration:1000,
          type:'info'
        });
      }
    },
    queryMenu: async function () {
      try{
        this.$data.loading = true;
        let response=await axios({
          url:ReqUtils.getHttpRoot()+'/menu/get',
          method:'post',
          data:ReqUtils.getReq(this.token(),{
            currentPage:this.$data.currentPage,
            pageSize:this.$data.pageSize,
            name:this.$data.name,
            url:this.$data.url,
            unitName:this.$data.unitName
          })
        }).then();
        this.$data.loading = false;
        if (response.status === 200) {
          let header=response.data.header;
          if(header.status==='success'){
            let data=response.data.data;
            this.$data.menuData=data.menuInfo;
            this.$data.totalMenuCount=data.totalMenuCount;
          }else{
            this.$message({
              showClose:true,
              type:'error',
              message:'查询失败：'+header.errMsg,
              duration:1000
            });
          }
        }else{
          this.$message({
            showClose:true,
            type:'error',
            message:'查询失败，网络错误：'+response.status,
            duration:1000
          });
        }
      }catch(error){
        console.log(error);
        this.$data.loading = false;
        this.$message({
          showClose:true,
          type:'error',
          message:'发生了可怕的错误',
          duration:1000
        });
      }
    }
  }
}
