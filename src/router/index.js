import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Register from '@/components/register/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path:'/home/',
      name:'Home',
      component:Home
    }
  ]
})
