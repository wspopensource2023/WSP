import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import { account } from '@/api/overview'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  console.log('route...', to)
  async function check() {
    if (to.name == 'login' || to.path == '/login') {
      return true
    }
    try {
      const account_id = (await account()).data.account_id
      var account_list = [
        '5eb08596-e145-11ed-b225-00163e2bee58',
        'd866b332-e187-11ed-928d-00163e2bee58',
        'c1dc0d84-e18b-11ed-928d-00163e2bee58',
        'bcdd2e2c-e261-11ed-928d-00163e2bee58',
        '156cb081-68a6-4982-8ef9-8037a0835410',
        '2de79ec8-cfd5-4420-b250-d4b2fe10877b',
      ]
      console.log('account_id', account_id)
      if (!account_list.includes(account_id)) {
        console.log('homie')
        return false
      }
      return true
    } catch (e) {
      return false
    }
  }
  if (!(await check())) {
    router.push({
      path: '/login?redirectUri=' + to.path
    })
    next()
    NProgress.done()
    return
  }
  const accessRoutes = await store.dispatch(
    'permission/generateRoutes',
    'admin'
  )
  router.addRoutes(accessRoutes)
  next()
  NProgress.done()
  // set page title
  document.title = getPageTitle(to.meta.title)
  return
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
