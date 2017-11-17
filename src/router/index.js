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
Vue.use(Router)

let router = new Router({
  routes: [...defaultRouter, ...user, ...error, ...home],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    from.name ? next({ name: from.name }) : next('/error') // 未定义路由条状到error
  } else {
    let routerTitle = ''
    if (to.meta.title) {
      routerTitle = to.meta.title
    } else {
      routerTitle = 'BaoyiBao'
    }
    document.title = routerTitle
    next()
    /* // 后期你可以加入token验证
    if (to.name === 'login' || to.name === 'error') {
      next()
    } else {
      if (store.state.userInfo.accessToken) {
        next()
      } else {
        MessageBox.confirm('登录失效，请重新登录', '提示', {
          type: 'error',
          showCancelButton: false,
          closeOnClickModal: false
        }).then(() => {
          next('/user/login')
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    */
  }
})
export default router
