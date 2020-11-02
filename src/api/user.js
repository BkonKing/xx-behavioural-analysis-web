import request from '@/utils/request'

const userApi = {
  menu: '/spi/v1/system/index/left'
}

export function getMenu () {
  return request({
    url: userApi.menu,
    method: 'get'
  })
}
