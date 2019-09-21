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
       path:'/',redirect:'/home'
     },
    {
      path: '/', component: () => import('@/views/TabBarLayout/index.vue'),
      children: [
        { name: 'home', path: 'home', component: () => import('@/views/Home/index.vue') },
      ]
    },
    { name: 'login', path: '/login', component: () => import(/* webpackChunkName: "about" */ '@/views/Login/index.vue') },
    { name: 'search', path: '/search', component: () => import('@/views/search/index.vue') },
    { name: 'list', path: '/list/:keyWords', component: () => import('@/views/list/index.vue') },
    { name: 'articleDetail', path: '/articleDetail/:artid', component: () => import('@/views/articleDetail/index.vue') },
  ]
})
