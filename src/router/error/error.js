const Error = (resolve) => {
  import('@/components/error/error.vue').then((module) => {
    resolve(module)
  })
}
const error = [{
  path: '/error',
  component: Error,
  name: 'error',
  meta: { title: '页面丢失' }
}]
export default error
