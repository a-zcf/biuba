import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/mobile/views/HelloWorld'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})