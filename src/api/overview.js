import request from '@/utils/request'

const overviewApi = {
  sum: '/applicationoverview/getsum'
}

export function getsum () {
  return request({
    url: overviewApi.sum,
    method: 'post'
  })
}
