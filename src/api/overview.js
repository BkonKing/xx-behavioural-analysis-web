import request from '@/utils/request'

const overviewApi = {
  sum: '/applicationoverview/getsum',
  timesharing: '/applicationoverview/gettimesharing',
  sumpic: '/applicationoverview/getsumpic'
}

// 头部汇总
export function getsum () {
  return request({
    url: overviewApi.sum,
    method: 'post'
  })
}

// 汇总数据对比
export function gettimesharing () {
  return request({
    url: overviewApi.timesharing,
    method: 'post'
  })
}

// 下面多个图表
export function getsumpic () {
  return request({
    url: overviewApi.sumpic,
    method: 'post'
  })
}
