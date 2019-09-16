/*
* 入口js文件
* */

import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mock' //特别的引入方式
//解决移动端 延迟 0.3s
import fastClick from 'fastclick'
fastClick.attach(document.body)
Vue.component(Button.name, Button) //全局注册 my button

new Vue({
  el:'#app',
  render : h=> h(App),
  router,
  store

})
