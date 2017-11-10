import Vue from 'vue'
import Router from 'vue-router'

import user from './user/user'
import error from './error/error'
import home from './home/home'

const defaultRouter = [{
  path: '/',
  redirect: {
    name: 'login'
  }
}]
console.log([...defaultRouter, ...user, ...error, ...home])
Vue.use(Router)

export default new Router({
  routes: [...defaultRouter, ...user, ...error, ...home],
  mode: 'history'
})
