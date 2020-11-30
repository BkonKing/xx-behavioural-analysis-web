<template>
  <div class="summary-wrapper summary-wrapper-data-link">
    <slot name="left">
      <h3 class="summary-title">{{ title }}</h3>
    </slot>
    <div id="Summary" ref="Summary" class="summary-container">
      <a-tabs class="summary data-link" v-model="active" @change="handleChange">
        <a-tab-pane v-for="(item, index) in data" :key="index">
          <span slot="tab">
            <div class="summary-item">
              <span class="text">{{ item.text }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </span>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: '汇总数据'
    },
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      active: this.value || 0,
      activeIndex: ''
    }
  },
  created () {
    // this.findIndex()
  },
  methods: {
    // 获取active所在的index
    // findIndex () {
    //   if (this.value !== undefined || this.value !== null) {
    //     this.activeIndex = this.data.findIndex(obj => {
    //       return obj.value === this.value
    //     })
    //   }
    // },
    handleChange (activeIndex) {
      // this.active = this.data[activeIndex].value
      this.$nextTick(() => {
        this.$emit('change', this.active, activeIndex)
      })
    }
  },
  watch: {
    active (value) {
      this.$emit('input', value)
    },
    value (val) {
      this.active = val
      // this.findIndex()
    }
  }
}
</script>

<style lang="less" scoped>
.summary-wrapper {
  position: relative;
  min-height: 100px;
  background-color: #fff;
  /deep/ .ant-tabs-bar {
    border-bottom: none;
  }
  /deep/ .ant-tabs-ink-bar {
    top: 0;
    bottom: initial;
  }
  h3.summary-title {
    position: absolute;
    top: 26px;
    left: 20px;
    color: #808492;
  }
  .summary-container {
    overflow: auto;
    margin-left: 160px;
    padding: 20px 0;
  }
  .summary-container {
    padding: 0;
    overflow: hidden;
    position: relative;
    .summary {
      width: 100%;
      margin-left: 0;
      table-layout: fixed;
      .summary-item {
        min-width: 156px;
        height: 100%;
        margin-right: 10px;
        border-top: 2px solid transparent;
        span {
          text-align: left;
          line-height: 1;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:first-child {
          padding-top: 25px;
        }
        span.text {
          font-size: 12px;
          color: #808492;
          margin-bottom: 20px;
          .help {
            height: auto;
            top: 0;
          }
        }
        span.value {
          color: #343437;
          font-size: 26px;
          min-height: 30px;
          line-height: 30px;
        }
        span.compare-value {
          font-size: 16px;
          color: #808492;
        }
        span.new-user-value {
          display: block;
          font-size: 15px;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      /deep/ .ant-tabs-tab {
        padding-left: 0;
      }
      /deep/ .ant-tabs-tab-active .summary-item {
        .value,
        .text {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
