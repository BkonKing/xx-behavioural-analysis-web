import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const getEventList = (options) => {
  const { pageindex } = getBody(options)
  return builder({
    'pageindex': pageindex,
    'pagesize': 10,
    'total': 156,
    'list': [
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 3,
        'eventname': '全部应用编辑'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 5,
        'eventname': '签到'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 6,
        'eventname': '搜索'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 8,
        'eventname': '扫一扫'
      },
      {
        'numberevents': 1,
        'userevents': 1,
        'name': 11,
        'eventname': '消息'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const getEventDetail = (options) => {
  return builder({
    'list': [
      {
        'name': '2020/11/11',
        'date': '2020/11/11',
        'numberevents': '2',
        'userevents': '1'
      },
      {
        'name': '2020/11/12',
        'date': '2020/11/12',
        'numberevents': '4',
        'userevents': '5'
      }
    ]
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}
Mock.mock(/\/event\/geteventlist/, 'post', getEventList)
Mock.mock(/\/event\/getsinglelist/, 'post', getEventDetail)
