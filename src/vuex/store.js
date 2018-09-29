import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
function jsonParse(target){
  try{
    return JSON.parse(target);
  }catch(error){
    console.log('parseError:'+error+"--target:"+target);
  }
  return
}
const store = new Vuex.Store({
  state: {
    userInfo: jsonParse(localStorage.getItem('userInfo')),
    menuInfo: jsonParse(localStorage.getItem('menuInfo'))
  },
  mutations: {
    setUserInfo(state, newUserInfo) {
        if(newUserInfo){
          localStorage.setItem('userInfo',JSON.stringify(newUserInfo));
          state.userInfo=jsonParse(localStorage.getItem('userInfo'));
        }else{
          localStorage.removeItem('userInfo');
          state.userInfo=undefined;
        }
    },
    setMenuInfo(state, newMenuInfo) {
      if(newMenuInfo){
        localStorage.setItem('menuInfo',JSON.stringify(newMenuInfo));
        state.menuInfo=jsonParse(localStorage.getItem('menuInfo'));
      }else{
        localStorage.removeItem('menuInfo');
        state.menuInfo=undefined;
      }
    }
  }
});
export default store;
