<template>
  <div style="margin-top: 10px;">
    <div style="padding-bottom: 45px;">
      <div class="time-span">
        <a-tooltip v-for="item in retainParams" :key="item.value" @click="handleRetainClick(item.value)">
          <template slot="title">
            {{ item.title }}
          </template>
          <span class="tac" :class="{ selected: active === item.value }">{{ item.text }}</span>
        </a-tooltip>
      </div>
      <div class="time-span">
        <span
          v-for="(item, index) in dateParams"
          :key="index"
          class="tac"
          :class="{ selected: dateActive === item.value }"
          @click="handleDateClick(item.value)"
        >{{ item.text }}</span>
        <a-popover class="icon-font" placement="leftBottom">
          <template slot="content">
            某日/周/月的活跃用户中，在第2日/周/月之后，每日/周/月启动过程序的用户
          </template>
          <a-icon type="question-circle" />
        </a-popover>
      </div>
    </div>
    <color-piece :data="data" :scale="scale" :padding="[0, 0, 120, 80]"></color-piece>
  </div>
</template>

<script>
import { ColorPiece } from '@/components'
export default {
  components: {
    ColorPiece
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    scale: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      retainParams: [
        {
          title: '留存用户数',
          value: 0,
          text: '#'
        },
        {
          title: '留存率',
          value: 1,
          text: '%'
        }
      ],
      dateParams: [
        {
          text: '日',
          value: 0
        },
        {
          text: '周',
          value: 1
        },
        {
          text: '月',
          value: 2
        }
      ],
      active: 0,
      dateActive: 0
    }
  },
  methods: {
    handleRetainClick (value) {
      this.active = value
      this.handleChange()
    },
    handleDateClick (value) {
      this.dateActive = value
      this.handleChange()
    },
    handleChange () {
      this.$emit('change', {
        active: this.active,
        dateActive: this.dateActive
      })
    }
  }
}
</script>

<style lang="less" scoped>
.time-span {
  float: right;
}

.time-span span {
  display: inline-block;
  border-radius: 2px;
  width: 34px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  text-align: center;
}

.time-span span.selected {
  background-color: #f3f4f9;
  color: #1890ff;
}

.time-span span:hover {
  color: #1890ff;
  cursor: pointer;
}

.icon-font {
  margin: 0 20px 0 10px;
  color: #808492;
}
</style>
