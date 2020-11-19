import request from '@/utils/request'

const usingApi = {
  event: '/event/geteventlist',
  eventDetail: '/event/getsinglelist',
  pagesNumber: '/life/spi/v1/life/seller/getSellerList',
  pagesQuit: '/life/spi/v1/life/seller/getSellerList',
  usingHabit: '/life/spi/v1/life/seller/getSellerList'
}

// 事件分析
export function getEventList (data) {
  return request({
    url: usingApi.event,
    method: 'post',
    data: data
  })
}
// 事件分析
export function getEventDetail (parameter) {
  return request({
    url: usingApi.eventDetail,
    method: 'post',
    data: parameter
  })
}

// 页面分析-页面访问次数
export function pagesNumber () {
  return request({
    url: usingApi.pagesNumber,
    method: 'post'
  })
}

// 页面分析-均次停留时间
export function pagesTimes () {
  return request({
    url: usingApi.pagesTimes,
    method: 'post'
  })
}

// 页面分析-退出率
export function pagesQuit () {
  return request({
    url: usingApi.pagesQuit,
    method: 'post'
  })
}

// 使用习惯
export function usingHabit () {
  return request({
    url: usingApi.usingHabit,
    method: 'post'
  })
}
