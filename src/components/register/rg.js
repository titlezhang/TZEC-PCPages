import axios from 'axios';
import ReqUtils from '../../utils/ReqUtils';
import ResCode from '../../utils/ResCode';
export default {
  name: 'Register',
  data: function () {
    return {
      loading: false,
      loginName: '',
      name: '',
      password: '',
      passwordAgain: '',
      email: '',
      mobilePhone: '',
      nameNoticeShow: 'hidden',
      loginNameNoticeShow: 'hidden',
      pwdNoticeShow: 'hidden',
      pwdAgainNoticeShow: 'hidden',
      resultNoticeShow: 'hidden',
      resultNotice: ''
    }
  },
  methods: {
    validate: function () {
      let isPass = true;
      if (!this.$data.loginName || this.$data.loginName.length <= 0) {
        isPass = false;
        this.$data.loginNameNoticeShow = 'visible';
      }
      if (!this.$data.name || this.$data.name.length <= 0) {
        isPass = false;
        this.$data.nameNoticeShow = 'visible';
      }
      if (!this.$data.password || this.$data.password.length <= 0) {
        isPass = false;
        this.$data.pwdNoticeShow = 'visible';
      } else {
        if (this.$data.password !== this.$data.passwordAgain) {
          isPass = false;
          this.$data.pwdAgainNoticeShow = 'visible';
        }
      }
      return isPass;
    },
    onLoginNameFocus: function () {
      this.$data.loginNameNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    onNameFocus: function () {
      this.$data.nameNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    onPwdFocus: function () {
      this.$data.pwdNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    onPwdAgainFocus: function () {
      this.$data.pwdAgainNoticeShow = 'hidden';
      this.$data.resultNoticeShow = 'hidden';
    },
    register: async function () {
      if (this.validate()) {
        try {
          this.$data.loading = true;
          let response = await axios({
            url: ReqUtils.getHttpRoot() + '/user/register',
            method: 'post',
            data: ReqUtils.getReq('', {
              loginName:this.$data.loginName,
              pwd:this.$data.password,
              name:this.$data.name,
              mobilePhone:this.$data.mobilePhone,
              email:this.$data.email
            })
          }).then();
          if (response.status === 200) {
            //访问成功
            let header = response.data.header;
            let data = response.data.data;
            if (header.status === 'success') {
              //注册成功，跳转到登录
              this.$data.loading = false;
              this.$router.push('login');
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
