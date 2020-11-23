import request from '@/utils/request'

const userApi = {
  Login: '/login/login',
  Logout: '/login/logout',
  UserInfo: '/user/info'
}

/**
 * login func
 * parameter: {
 *     account: '',
 *     password: ''
 * }
 * @param data
 * @returns {*}
 */
export function login (data) {
  return request({
    url: userApi.Login,
    method: 'post',
    data
  })
}

export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post'
  })
}
