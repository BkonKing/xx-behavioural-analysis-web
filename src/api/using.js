import request from '@/utils/request'

const usingApi = {
  dashboardJson: '/mobilestatistics/getsum',
  dashboardChart: '/mobilestatistics/statisticschart',
  event: '/event/geteventlist',
  eventContans: '/event/geteventcontanslist',
  eventDetail: '/event/getsinglelist',
  pagesList: '/page/getpagelist',
  pagesChart: '/page/getpagelistpic',
  pagesContans: '/page/getpagecontanslist',
  pagesDetail: '/page/getsinglepage',
  usingHabit: '/page/getsinglepage'
}

// 移动统计-首页数据
export function getDashboardJson (data) {
  return request({
    url: usingApi.dashboardJson,
    method: 'post',
    data
  })
}
// 移动统计-首页图表
export function getDashboardChart (data) {
  return request({
    url: usingApi.dashboardChart,
    method: 'post',
    data
  })
}

// 事件分析
export function getEventList (data) {
  return request({
    url: usingApi.event,
    method: 'post',
    data
  })
}

// 事件分析-事件常量
export function getEventContans (data) {
  return request({
    url: usingApi.eventContans,
    method: 'post',
    data
  })
}

// 事件分析-单个事件
export function getEventDetail (data) {
  return request({
    url: usingApi.eventDetail,
    method: 'post',
    data
  })
}

// 页面分析-表格
export function getPagesList (data) {
  return request({
    url: usingApi.pagesList,
    method: 'post',
    data
  })
}

// 页面分析-图表
export function getPagesChart (data) {
  return request({
    url: usingApi.pagesChart,
    method: 'post',
    data
  })
}

// 页面分析-页面常量
export function getPagesContans (data) {
  return request({
    url: usingApi.pagesContans,
    method: 'post',
    data
  })
}

// 页面分析-单个页面
export function getPagesDetail (data) {
  return request({
    url: usingApi.pagesDetail,
    method: 'post',
    data
  })
}

// 使用习惯
export function usingHabit (data) {
  return request({
    url: usingApi.usingHabit,
    method: 'post',
    data
  })
}
