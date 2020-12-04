<template>
  <div :class="wrpCls">
    <div style="display: inline-block;color: #333;">
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()" style="color: #333;">
          {{ mobileType[os_type].name }} <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item, i) in mobileType" :key="item.value" v-if="i == 0" @click="menuSelect(item.value)">
            <a href="javascript:;">{{ item.name }}</a>
          </a-menu-item>
          <template v-else>
            <a-menu-divider v-if="i == 1" />
            <a-menu-item :key="item.value" @click="menuSelect(i)">
              {{ item.name }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-dropdown>
    </div>
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
// import storage from 'store'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      // os_type: storage.get('os_type') || 0,
      mobileType: [
        {
          name: '美好生活家园',
          value: 0
        },
        {
          name: '美好生活家园(Android)',
          value: 1
        },
        {
          name: '美好生活家园(IOS)',
          value: 2
        },
        {
          name: '我的应用',
          value: 3
        }
      ]
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true
      }
    },
    ...mapGetters(['nickname', 'os_type'])
  },
  mounted () {
    this.currentUser = {
      name: this.nickname
    }
  },
  methods: {
    menuSelect (i) {
      store.commit('setOs_type', i)
      if (i === 3) {
        this.$router.push('/dashboard/index')
      } else if (this.$route.name === 'dashboard') {
        this.$router.push({
          path: '/overview/index'
        })
      } else {
        this.$router.go(0)
      }
    }
  }
}
</script>
