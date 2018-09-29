import SubComponents from '../common/SubComponents';
let subComs;
export default {
  components: SubComponents.subComs,
  name: 'Home',
  data() {
    return {
      userInfo:this.$store.state.userInfo,
      menuInfo:this.$store.state.menuInfo,
      coms: SubComponents.subComs,
      mainHeight: 0,
      topMenuActiveIndex: "0",
      asideMenuInfo: undefined,
      fullHeight:
        document.documentElement
          .clientHeight,
      tabs: [
        {
          title: '首页',
          name: '0',
          key: 'wt-first'
        }
      ],
      tabsActive: ['wt-first'],
      currentTabIndex: '0',
      currentTabComponent: SubComponents.subComs['wt-first'],
      uniqueOpened: true
    };
  },
  beforeMount() {

  },
  mounted() {
    if(!this.$store.state.userInfo){
      this.$router.push('login');
    }
    this.$data.asideMenuInfo = this.menuInfo[0].children;
    this.mainHeight = this.$data.fullHeight - this.$refs.myHeader.offsetHeight;
  },
  methods: {
    logout(){//注销
      this.$store.commit('setUserInfo', undefined);
      this.$store.commit('setMenuInfo', undefined);
      this.$router.push('login');
    },
    menuSelected(keyName) {
      let key = keyName.split(':')[0];
      let name = keyName.split(':')[1];
      let isHas = false;
      let lastIndex = this.$data.tabs.length;
      for (let i = 0; i < this.$data.tabs.length; i++) {
        if (this.$data.tabs[i].key === key) {
          this.$data.currentTabIndex = i + '';
          isHas = true;
          break;
        }
      }
      if (!isHas) {
        this.$data.tabs.push({
          title: name,
          name: lastIndex + '',
          key: key
        });
        this.$data.currentTabIndex = lastIndex + '';
      }
      this.$data.currentTabComponent = this.$data.coms[key];
    },
    onTabClick(tab) {
      this.$data.currentTabIndex = tab.name;
      let key = this.$data.tabs[tab.name].key;
      this.$data.currentTabComponent = this.$data.coms[key];
    },
    removeTab(targetName) {
      if(targetName==='0'){
        return;//首页不关
      }
      let tab = this.$data.tabs[targetName];
      if (targetName === this.$data.currentTabIndex) {
        let nameNum = Number.parseInt(targetName);
        this.$data.currentTabIndex =
          this.$data.tabs[nameNum + 1] ? (nameNum + 1) + '' :
            (this.$data.tabs[nameNum - 1] ? (nameNum - 1) + '' : '0');
        this.onTabClick(this.$data.tabs[this.$data.currentTabIndex]);
      }
      this.$data.tabs = this.$data.tabs.filter(tab => tab.name !== targetName);
    }


  }
}
