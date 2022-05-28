import request from '@/utils/request'

const overviewApi = {
  sum: '/applicationoverview/getsum',
  timesharing: '/applicationoverview/gettimesharing',
  sumpic: '/applicationoverview/getsumpic',
  version: '/version/getVersionall'
}

// 头部汇总
export function getsum () {
  return request({
    url: overviewApi.sum,
    method: 'post'
  })
}

// 汇总数据对比
export function gettimesharing (data) {
  return request({
    url: overviewApi.timesharing,
    method: 'post',
    data
  })
}

// 下面多个图表
export function getsumpic (data) {
  return request({
    url: overviewApi.sumpic,
    method: 'post',
    data
  })
}

// 获取所有版本
export function getVersionall (data) {
  return request({
    url: overviewApi.version,
    method: 'post',
    data
  })
}
