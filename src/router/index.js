import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
   /*  {
      path: '/',
      name: 'home',
      component: Home
    }, */
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: "about" */ '@/views/Login/index.vue')
    }
  ]
})
