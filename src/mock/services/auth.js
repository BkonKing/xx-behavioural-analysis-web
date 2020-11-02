import Mock from 'mockjs2'
import { builder } from '../util'

// const username = ['admin', 'super']
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
// const password = ['admin', 'ant.design'] // admin, ant.design

const login = (options) => {
  // const body = getBody(options)
  // if (!username.includes(body.username) || !password.includes(body.password)) {
  //   return builder({ isLogin: true }, '账户或密码错误', 401)
  // }
  console.log(options)

  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'password': '',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'deleted': 0,
    'roleId': 'admin',
    'lang': 'zh-CN',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

Mock.mock(/\/system\/slognin\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
