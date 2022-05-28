import Mock from 'mockjs2'
import {
  builder,
  getBody
} from '../util'

const menu = options => {
  const menuArray = [{
      path: '/overview/index',
      name: 'overviewIndex',
      meta: {
        title: '应用概况',
        icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
      }
    },
    {
      path: '/userAnalyse',
      meta: {
        title: '用户分析',
        icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
      },
      children: [{
          path: '/userAnalyse/trend',
          name: 'UserTrend',
          meta: {
            title: '用户趋势'
          }
        },
        {
          path: '/userAnalyse/activitydegree',
          name: 'UserActivitydegree',
          meta: {
            title: '活跃用户'
          }
        },
        {
          path: '/userAnalyse/region',
          name: 'UserRegion',
          meta: {
            title: '地域分布'
          }
        },
        {
          path: '/userAnalyse/terminal',
          name: 'UserTerminal',
          meta: {
            title: '终端分析'
          }
        },
        {
          path: '/userAnalyse/version',
          name: 'UserVersion',
          meta: {
            title: '版本分析'
          }
        },
        {
          path: '/userAnalyse/sample',
          name: 'UserSample',
          meta: {
            title: '实时访客'
          }
        }
      ]
    },
    {
      path: '/usingBehavior',
      meta: {
        title: '使用行为',
        icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
      },
      children: [{
          path: '/usingBehavior/event',
          name: 'event',
          meta: {
            title: '事件分析'
          }
        },
        {
          path: '/usingBehavior/pagesAnalysis',
          name: 'pagesAnalysis',
          meta: {
            title: '页面分析'
          }
        },
        {
          path: '/usingBehavior/usingHabit',
          name: 'usingHabit',
          meta: {
            title: '使用习惯'
          }
        }
      ]
    },
    {
      path: '/retain',
      meta: {
        title: '留存分析',
        icon: 'https://test.tosolomo.com//library/bootstrap/img/logo/logo-bs4.png'
      },
      children: [{
          path: '/retain/user/newfirst',
          name: 'RetainUserNew',
          meta: {
            title: '新用户留存'
          }
        },
        {
          path: '/retain/user/active',
          name: 'RetainUserActive',
          meta: {
            title: '活跃用户留存'
          }
        }
      ]
    }
  ]
  const json = builder(menuArray)
  return json
}

const overviewSum = () => {
  return builder({
    'todaynewuser': 0,
    'yestodaynewuser': 0,
    'todaystarttimes': 0,
    'yestodaystarttimes': 0,
    'todaystartusers': 0,
    'yesdaystartusers': 0,
    'todayperstarttimes': 0,
    'yestodayperstarttimes': 0,
    'todaydurationuse': 0,
    'yestodaydurationuse': 0,
    'todayperusagetime': 0,
    'yestodayperusagetime': 0
  }, '', 200)
}

const gettimesharing = (options) => {
  const {
    type
  } = getBody(options).data
  let data = {}
  if (parseInt(type) < 3) {
    data = {
      'list': {
        '00:00-00:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '01:00-01:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '02:00-02:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '03:00-03:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '04:00-04:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '05:00-05:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '06:00-06:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '07:00-07:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '08:00-08:59': [{
            '1602345600000': '8'
          },
          {
            '1602432000000': 0
          }
        ],
        '09:00-09:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '10:00-10:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '11:00-11:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '12:00-12:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '13:00-13:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '14:00-14:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '15:00-15:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '16:00-16:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '17:00-17:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '18:00-18:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '19:00-19:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '20:00-20:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '21:00-21:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '22:00-22:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ],
        '23:00-23:59': [{
            '1602345600000': 0
          },
          {
            '1602432000000': 0
          }
        ]
      }
    }
  } else {
    data = {
      'list': [{
          'name': '2020/11/17',
          'startusers': 0
        },
        {
          'name': '2020/11/18',
          'startusers': 0
        },
        {
          'name': '2020/11/19',
          'startusers': 0
        },
        {
          'name': '2020/11/20',
          'startusers': 2
        },
        {
          'name': '2020/11/21',
          'startusers': 0
        },
        {
          'name': '2020/11/22',
          'startusers': 0
        },
        {
          'name': '2020/11/23',
          'startusers': 10
        }
      ]
    }
  }
  return builder(data, '', 200)
}

const getsumpic = () => {
  return builder({
    'geolist': [{
        'name': '江苏省',
        'starttimes': '8',
        'starttimesdis': 34.8
      },
      {
        'name': '福建省',
        'starttimes': '15',
        'starttimesdis': 65.2
      }
    ],
    'pagelist': {
      '2020/11/11': [{
          'pathname': 'cart(购物车)',
          'starttimes': 1,
          'edis': 8.3
        },
        {
          'pathname': 'search(搜索)',
          'starttimes': 1,
          'edis': 8.3
        },
        {
          'pathname': 'goodsDetail(商品详情)',
          'starttimes': 1,
          'edis': 8.3
        },
        {
          'pathname': 'specialArea(专区页)',
          'starttimes': 1,
          'edis': 8.3
        },
        {
          'pathname': 'flashPurchase(闪购页)',
          'starttimes': 1,
          'edis': 8.3
        }
      ],
      '2020/11/12': [{
          'pathname': 'cart(购物车)',
          'starttimes': 3,
          'edis': 18.3
        },
        {
          'pathname': 'search(搜索)',
          'starttimes': 4,
          'edis': 28.3
        },
        {
          'pathname': 'goodsDetail(商品详情)',
          'starttimes': 5,
          'edis': 38.3
        },
        {
          'pathname': 'specialArea(专区页)',
          'starttimes': 6,
          'edis': 48.3
        },
        {
          'pathname': 'flashPurchase(闪购页)',
          'starttimes': 7,
          'edis': 18.3
        }
      ]
    },
    'retainlist': {
      '2020/11/11': {
        'dis': [
          50,
          2.9,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2.9
        ]
      },
      '2020/11/12': {
        'dis': [
          100,
          6.3,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          6.3
        ]
      },
      '2020/11/13': {
        'dis': [
          0
        ]
      },
      '2020/11/14': {
        'dis': [
          0
        ]
      },
      '2020/11/15': {
        'dis': [
          0,
          0,
          0,
          0,
          100,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      '2020/11/16': {
        'dis': [
          0,
          0,
          0,
          0,
          100,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      '2020/11/17': {
        'dis': [
          0
        ]
      }
    }
  }, '', 200)
}

const getVersionall = () => {
  return builder({
    'list': [
      '2.0.2',
      '2.0.3',
      '2.0.4'
    ]
  }, '', 200)
}

Mock.mock(/\/api\/spi\/v1\/system\/index\/left/, 'get', menu)
Mock.mock(/(\/applicationoverview\/getsumpic)/, 'post', getsumpic)
Mock.mock(/\/applicationoverview\/getsum/, 'post', overviewSum)
Mock.mock(/\/applicationoverview\/gettimesharing/, 'post', gettimesharing)
Mock.mock(/\/version\/getVersionall/, 'post', getVersionall)
