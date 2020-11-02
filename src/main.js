// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from 'xx-ant-design-vue-pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: mockjs不支持IE，请不要在生产环境使用
import './mock'

import bootstrap from './core/bootstrap' // localstorage赋值到vuex
import './core/lazy_use' // 懒加载组件
import './permission' // 权限控制
import './utils/filter' // 全局filter
import './global.less' // 全局样式

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  // 初始化 localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
