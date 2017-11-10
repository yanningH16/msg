const User = (resolve) => {
  import('@/components/user/user').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('@/components/user/login').then((module) => {
    resolve(module)
  })
}
const Reg = (resolve) => {
  import('@/components/user/reg').then((module) => {
    resolve(module)
  })
}
const loginAndReg = [
  {
    path: 'login',
    component: Login,
    name: 'login',
    meta: { title: '登陆' }
  },
  {
    path: 'reg',
    component: Reg,
    name: 'reg',
    meta: { title: '找回密码' }
  }
]
const defaultUser = []
const user = [
  {
    path: '/user',
    component: User,
    redirect: {
      name: 'login'
    },
    children: [...defaultUser, ...loginAndReg]
  }
]
export default user
