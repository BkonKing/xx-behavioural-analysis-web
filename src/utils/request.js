import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import {
  VueAxios
} from './axios'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    const status = error.response.status === 200 ? data.code : error.response.status
    if (status === 206 || status === 401) {
      notification.error({
        message: '未授权',
        description: '授权验证失败'
      })
      store.dispatch('Logout').then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      })
    } else {
      notification.error({
        message: '错误',
        description: data.message
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  if (!config.no_os_type) {
    const dataJson = {
      'os_type': storage.get('os_type') || 0
    }
    config.data = typeof config.data === 'object' ? {
      ...dataJson,
      ...config.data
    } : {
      ...dataJson
    }
  }
  config.data = {
    data: config.data
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  if (response.data.code !== 200) {
    return errorHandler({ response })
  } else {
    return response.data
  }
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
