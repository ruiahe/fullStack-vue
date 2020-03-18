import Vue from 'vue'
// import VueRouter from 'vue-router'
import Notice from '@/components/Notice'
import VueRouter from '@/router/krouter'
import KVuex from '@/components/kvuexTest'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index'
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/kvuex',
      name: 'KVuex',
      component: KVuex
    }
  ]
})
