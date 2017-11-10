// import task from '../task/task'
import task from '../task/task'
import coin from '../coin/coin'
const Home = (resolve) => {
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}
const defaultHome = []
const home = [{
  path: '/home',
  component: Home,
  children: [...defaultHome, ...task, ...coin]
}]
export default home
