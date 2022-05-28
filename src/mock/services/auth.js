import Mock from 'mockjs2'
import Cookies from 'js-cookie'
import { builder } from '../util'

const login = () => {
  Cookies.set('tokenid', 'MQ%3D%3D')
  Cookies.set('logintime', '1606266713')
  Cookies.set('keystr', 'd5745e54ad1417dd31d1bc63a7d47353')
  return builder(Mock.mock('@name'), '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

Mock.mock(/\/login\/login/, 'post', login)
Mock.mock(/\/login\/logout/, 'post', logout)
