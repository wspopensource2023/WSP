import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// /* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/user/login')
  },
  {
    path: '/dashboard',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '用户管理', icon: 'peoples', affix: true }
      }
    ]
  },
  // {
  //   path: '/feedback',
  //   hidden: false,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'feedback',
  //       component: () => import('@/views/feedback/index'),
  //       name: 'Feedback',
  //       meta: { title: '反馈', icon: 'email', affix: true }
  //     }
  //   ]
  // },
  {
    path: '/campaign',
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'campaign',
        component: () => import('@/views/campaign/index'),
        name: 'campaign',
        meta: { title: '数字成就 / 活动', icon: 'excel', affix: true }
      }
    ]
  },
  {
    path: '/achievement',
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'achievement',
        component: () => import('@/views/achievement/index'),
        name: 'achievement',
        meta: { title: '数字成就 / 徽章', icon: 'star', affix: true }
      }
    ]
  },
  {
    path: '/condition-template',
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'condition-template',
        component: () => import('@/views/condition-template/index'),
        name: 'condition-template',
        meta: { title: '数字成就 / 条件模板', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: '/achievement-condition',
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'achievement-condition',
        component: () => import('@/views/achievement-condition/index'),
        name: 'achievement-condition',
        meta: {
          title: '数字成就 / 条件绑定',
          icon: 'clipboard',
          affix: true
        }
      }
    ]
  },
  // {
  //   path: '/issuer',
  //   hidden: false,
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'issuer',
  //       component: () => import('@/views/issuer/index'),
  //       name: 'issuer',
  //       meta: { title: '数字成就 / 发行方', icon: 'component', affix: true }
  //     }
  //   ]
  // }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
