// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  BlankLayout
} from '@/layouts'

// const RouteView = {
//   name: 'RouteView',
//   render: (h) => h('router-view')
// }

export const asyncRouterMap = [{
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '移动统计'
    },
    redirect: '/dashboard/index',
    children: [{
        path: '/dashboard/index',
        name: 'dashboard',
        hidden: true,
        component: () => import('@/views/user/dashboard')
      },
      {
        path: '/overview',
        name: 'overview',
        component: BlankLayout,
        meta: {
          title: '应用概况',
          icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
        },
        hideChildrenInMenu: true,
        redirect: '/overview/index',
        children: [{
          path: '/overview/index',
          name: 'overviewIndex',
          component: () => import('@/views/user/overview'),
          meta: {
            title: '应用概况'
          }
        }]
      },
      {
        path: '/userAnalyse',
        name: 'userAnalyse',
        component: BlankLayout,
        meta: {
          title: '用户分析',
          icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
        },
        children: [{
          path: '/userAnalyse/trend',
          name: 'UserTrend',
          component: () => import('@/views/userAnalyse/trend'),
          meta: {
            title: '用户趋势'
          }
        }, {
          path: '/userAnalyse/activitydegree',
          name: 'UserActivitydegree',
          component: () => import('@/views/userAnalyse/activitydegree'),
          meta: {
            title: '活跃用户'
          }
        }, {
          path: '/userAnalyse/region',
          name: 'UserRegion',
          component: () => import('@/views/userAnalyse/region'),
          meta: {
            title: '地域分布'
          }
        }, {
          path: '/userAnalyse/terminal',
          name: 'UserTerminal',
          component: () => import('@/views/userAnalyse/terminal'),
          meta: {
            title: '终端分析'
          }
        }, {
          path: '/userAnalyse/version',
          name: 'UserVersion',
          component: () => import('@/views/userAnalyse/version'),
          meta: {
            title: '版本分析'
          }
        }, {
          path: '/userAnalyse/sample',
          name: 'UserSample',
          component: () => import('@/views/userAnalyse/sample'),
          meta: {
            title: '实时访客'
          }
        }]
      },
      {
        path: '/usingBehavior',
        name: 'usingBehavior',
        component: BlankLayout,
        meta: {
          title: '使用行为',
          icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
        },
        children: [{
            path: '/usingBehavior/event',
            name: 'event',
            component: () => import('@/views/usingBehavior/event'),
            meta: {
              title: '事件分析',
              keepAlive: true
            }
          },
          {
            path: '/usingBehavior/eventDetail',
            name: 'eventDetail',
            component: () => import('@/views/usingBehavior/event-detail'),
            meta: {
              title: '事件分析详情',
              selectedKey: '/usingBehavior/event',
              hidden: true,
              keepAlive: true
            }
          },
          {
            path: '/usingBehavior/pagesAnalysis',
            name: 'pagesAnalysis',
            component: () => import('@/views/usingBehavior/pages-analysis'),
            meta: {
              title: '页面分析',
              keepAlive: true
            }
          },
          {
            path: '/usingBehavior/pagesDetail',
            name: 'pagesDetail',
            component: () => import('@/views/usingBehavior/pages-detail'),
            meta: {
              title: '页面分析详情',
              selectedKey: '/usingBehavior/pagesAnalysis',
              hidden: true,
              keepAlive: true
            }
          },
          {
            path: '/usingBehavior/usingHabit',
            name: 'usingHabit',
            component: () => import('@/views/usingBehavior/using-habit'),
            meta: {
              title: '使用习惯',
              keepAlive: true
            }
          }
        ]
      },
      {
        path: '/retain',
        name: 'retain',
        component: BlankLayout,
        meta: {
          title: '留存分析',
          icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
        },
        children: [{
          path: '/retain/user/newfirst',
          name: 'RetainUserNew',
          component: () => import('@/views/retain/user'),
          meta: {
            title: '新用户留存'
          }
        }, {
          path: '/retain/user/active',
          name: 'RetainUserActive',
          component: () => import('@/views/retain/user'),
          meta: {
            title: '活跃用户留存'
          }
        }]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
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
