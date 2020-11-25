import Mock from 'mockjs2'
import Cookies from 'js-cookie'
import { builder } from '../util'

const login = () => {
  Cookies.set('tokenid', 'MQ%3D%3D')
  Cookies.set('logintime', '1606266713')
  Cookies.set('keystr', 'd5745e54ad1417dd31d1bc63a7d47353')
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

Mock.mock(/\/login\/login/, 'post', login)
Mock.mock(/\/login\/logout/, 'post', logout)
