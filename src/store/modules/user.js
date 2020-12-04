import storage from 'store'
import { login, logout } from '@/api/login'
import { getVersionall } from '@/api/overview'
import { welcome } from '@/utils/util'
import Cookies from 'js-cookie'

const user = {
  state: {
    token: '',
    name: storage.get('nickName') || '未命名',
    welcome: '',
    avatar: '',
    info: {},
    os_type: storage.get('os_type') || 0,
    versions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      storage.set('nickName', name)
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    setOs_type (state, value) {
      state.os_type = value
      storage.set('os_type', value)
    },
    SET_VERSIONS: (state, versions) => {
      state.versions = versions
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // commit('SET_INFO', response)
          commit('SET_NAME', { name: response.data, welcome: welcome() })
          // commit('SET_AVATAR', response.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          commit('SET_TOKEN', '')
          Cookies.remove('tokenid')
          Cookies.remove('logintime')
          Cookies.remove('keystr')
          resolve(res)
        }).catch(error => {
          reject(error)
        }).finally(() => {
        })
      })
    },

    // 获取所有版本号
    GetVersionall ({ commit }) {
      return new Promise((resolve, reject) => {
        getVersionall().then((res) => {
          const versions = res.data.list.map(version => {
            return {
              text: `v${version}`,
              key: version
            }
          })
          commit('SET_VERSIONS', versions)
          resolve(res)
        }).catch(error => {
          reject(error)
        }).finally(() => {
        })
      })
    }
  }
}

export default user
