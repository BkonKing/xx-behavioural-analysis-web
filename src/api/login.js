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
    data,
    no_os_type: true
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post'
  })
}
