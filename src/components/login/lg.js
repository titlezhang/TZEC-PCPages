import axios from 'axios';
import ReqUtils from '../../utils/ReqUtils';
import ResCode from '../../utils/ResCode';
import GeneralUtils from '../../utils/GeneralUtils'
export default {
  name: 'Login',
  data: function () {
    return {
      loading: false,
      loginName: '',
      password: '',
      nameNoticeShow: 'hidden',
      pwdNoticeShow: 'hidden',
      resultNoticeShow: 'hidden',
      resultNotice: '用户名或密码错误'
    }
  },
  methods: {
    onNameFocus: function () {
      this.$data.nameNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    onPwdFocus: function () {
      this.$data.pwdNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    login: async function () {
      let isPass = true;
      if (!this.$data.loginName || this.$data.loginName.length <= 0) {
        isPass = false;
        this.$data.nameNoticeShow = 'visible';
      }
      if (!this.$data.password || this.$data.password.length <= 0) {
        isPass = false;
        this.$data.pwdNoticeShow = 'visible';
      }
      if (isPass) {
        try {
          this.$data.loading = true;
          let response = await axios({
            url: ReqUtils.getHttpRoot()+'/user/login',
            method: 'post',
            data: ReqUtils.getReq('',{
              loginName: this.$data.loginName,
              password: this.$data.password
            })
          }).then();
          if (response.status === 200) {
            //访问成功
            let header = response.data.header;
            let data=response.data.data;
            let treeMenuInfo=GeneralUtils.arrToTree(data.menuInfo);
            if (header.status === 'success') {
              //登录成功，跳转
              this.$data.loading = false;
              data.userInfo.token=data.token;
              this.$store.commit('setUserInfo', data.userInfo);
              this.$store.commit('setMenuInfo', treeMenuInfo);
              this.$router.push('home');
            } else {
              this.$data.loading = false;
              this.$data.resultNotice = header.errMsg;
              this.$data.resultNoticeShow = 'visible';
            }
          } else {
            this.$data.loading = false;
            this.$data.resultNotice = '发生了可怕的错误：' + response.status;
            this.$data.resultNoticeShow = 'visible';
          }
        } catch (error) {
          console.log(error);
          this.$data.loading = false;
          this.$data.resultNotice = '发生了可怕的错误';
          this.$data.resultNoticeShow = 'visible';
        }
      }
    }
  }
}
