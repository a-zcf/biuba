// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Pc from './Pc'
import router from './router';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#pc',
  router,
  render: h => h(Pc)
}) 
