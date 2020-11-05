// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView } from '@/layouts'

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/userAnalyse/trend',
    children: [
      {
        path: '/userAnalyse',
        name: 'userAnalyse',
        component: BlankLayout,
        meta: { title: '用户分析' },
        children: [{
          path: '/userAnalyse/trend',
          name: 'UserTrend',
          component: () => import('@/views/userAnalyse/trend'),
          meta: { title: '用户趋势', icon: 'tool', keepAlive: true }
        }]
      },
      {
        path: '/usingBehavior',
        name: 'usingBehavior',
        component: BlankLayout,
        meta: { title: '使用行为' },
        children: [{
          path: '/usingBehavior/event',
          name: 'event',
          component: () => import('@/views/usingBehavior/event'),
          meta: { title: '事件分析', icon: 'tool', keepAlive: true }
        },
        {
          path: '/usingBehavior/pagesAnalysis',
          name: 'pagesAnalysis',
          component: () => import('@/views/usingBehavior/pages-analysis'),
          meta: { title: '页面分析', icon: 'tool', keepAlive: true }
        },
        {
          path: '/usingBehavior/usingHabit',
          name: 'usingHabit',
          component: () => import('@/views/usingBehavior/using-habit'),
          meta: { title: '使用习惯', icon: 'tool', keepAlive: true }
        }]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
