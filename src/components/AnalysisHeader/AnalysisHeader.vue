<template>
  <div class="ant-pro-page-header-wrap">
    <div class="ant-pro-page-header-wrap-page-header-warp">
      <div class="ant-pro-grid-content">
        <div class="ant-page-header ant-page-header-ghost">
          <div class="ant-page-header-heading">
            <slot name="eventlist">
              <!-- 用折叠面板实现的tip说明 -->
              <a-collapse class="analysis-header-collapse" v-model="activeKey" :bordered="false">
                <a-collapse-panel key="1" :showArrow="false" :disabled="true">
                  <template slot="header">
                    <!-- 标题 -->
                    <span class="ant-page-header-heading-title">{{ title || $route.meta.title }}</span>
                    <!-- 问号，控制tip说明的显示隐藏 -->
                    <a-icon
                      v-if="$slots.reportTip || reportTip"
                      class="report-btn"
                      type="question-circle"
                      @click="handleTipClick"
                    />
                    <div class="tip-arrow" style="left: 71px;"></div>
                  </template>
                  <!-- 统计模块说明，可以为props或者slot -->
                  <slot name="reportTip">{{ reportTip }}</slot>
                </a-collapse-panel>
              </a-collapse>
            </slot>
          </div>
          <div class="ant-page-header-content">
            <div :class="`${prefixedClassName}-detail`">
              <div :class="`${prefixedClassName}-main`">
                <div :class="`${prefixedClassName}-row`">
                  <div :class="`${prefixedClassName}-content`">
                    <slot name="content">
                      <!-- 日期 -->
                      <template v-if="showSearchList.includes('date')">
                        <span>日期：</span>
                        <a-range-picker
                          v-model="date"
                          size="small"
                          :allowClear="false"
                          :inputReadOnly="true"
                          :disabled-date="disabledDate"
                          :ranges="{
                            今天: [moment(), moment()],
                            昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            最近7天: [moment().subtract(6, 'days'), moment()],
                            最近30天: [moment().subtract(29, 'days'), moment()],
                            最近60天: [moment().subtract(59, 'days'), moment()]
                          }"
                          format="YYYY-MM-DD"
                          style="width: 220px;"
                          @change="handleChange"
                        />
                      </template>
                      <slot name="condition"></slot>
                      <!-- 版本 -->
                      <template v-if="showSearchList.includes('version')">
                        <span class="margin-left-large">版本：</span>
                        <div style="display: inline-block;min-width: 200px;">
                          <a-select
                            ref="version"
                            mode="multiple"
                            size="small"
                            v-model="version"
                            style="width: 100%;"
                            @blur="handleChange"
                          >
                            <span slot="removeIcon"></span>
                            <a-select-option v-for="item in versionList" :key="item.key">
                              {{ item.text }}
                            </a-select-option>
                          </a-select>
                        </div>
                      </template>
                    </slot>
                  </div>
                  <div v-if="$slots.extraContent" :class="`${prefixedClassName}-extraContent`">
                    <slot name="extraContent"></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-pro-grid-content">
      <div :class="`${prefixedClassName}-children-content`">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { PageHeaderWrapper } from 'xx-ant-design-vue-pro-layout'
import { mapGetters } from 'vuex'
export default {
  name: 'AnalysisHeader',
  components: {
    PageHeaderWrapper
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    // 当前统计模块说明
    reportTip: {
      type: String,
      default: ''
    },
    // 要显示的搜索条件
    showSearchList: {
      type: Array,
      default: () => ['date', 'version']
    }
  },
  computed: {
    ...mapGetters(['versions'])
  },
  data () {
    return {
      prefixedClassName: 'ant-pro-page-header-wrap',
      activeKey: [], // 控制显示模块说明tip
      date: [moment().subtract(2, 'days'), moment()], // 时间范围，默认为近三天
      version: [0], // 选中的版本
      versionList: [
        {
          text: '不限',
          key: 0
        }
      ]
    }
  },
  created () {
    if (this.versions.length > 0) {
      this.setVersionList(this.versions)
    } else {
      this.getVersionList()
    }
  },
  methods: {
    moment,
    getVersionList () {
      this.$store.dispatch('GetVersionall').then(data => {
        this.setVersionList(this.versions)
      })
    },
    // 设置版本列表
    setVersionList (versions) {
      this.versionList = [
        {
          text: '不限',
          key: 0
        },
        ...versions
      ]
    },
    // 显示隐藏说明tip
    handleTipClick () {
      this.activeKey = this.activeKey.length === 0 ? ['1'] : []
    },
    // 不能选择今天之后的日期
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    // 搜索参数变更事件
    handleChange () {
      this.$emit('change', this.getSearchData())
    },
    // 获取显示的搜索条件数据
    getSearchData () {
      const data = {}
      this.showSearchList.forEach(obj => {
        if (obj === 'date') {
          data[obj] = this.date
            .map(obj => {
              return obj.format('YYYY/MM/DD')
            })
            .join('~')
        } else if (this[obj].length !== 1 || this[obj][0] !== 0) {
          data[obj] = this[obj].join('、')
        }
      })
      return data
    },
    // 重置搜索条件
    resetSearchData () {
      this.date = [moment().subtract(2, 'days'), moment()] // 时间范围，默认为近三天
      this.version = [0] // 选中的版本
    }
  },
  watch: {
    version (val, old) {
      if (old.length === 1 && old[0] === 0) {
        this.version.shift()
      } else if (val[val.length - 1] === 0 && val.length > 1) {
        this.$refs.version.blur()
        this.version = [0]
      } else if (val.length === 0) {
        this.version = [0]
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-select-selection__choice {
  padding-right: 10px;
}
.margin-left-large {
  margin-left: 24px;
}
.analysis-header-collapse {
  background-color: #fff;
  .report-btn {
    margin-top: 8px;
    color: #999;
    cursor: pointer;
    font-size: 16px;
  }
  /deep/ .ant-collapse {
    &-header {
      height: 32px;
      padding: 0 !important;
    }
    &-content-box {
      padding: 4px 10px;
      margin-top: 8px;
      background-color: #fffce1;
      cursor: default;
      border: 1px solid #f5e49c;
    }
  }
  /deep/ & > .ant-collapse-item {
    border-bottom: none;
  }
  & /deep/ .ant-collapse-item-disabled > .ant-collapse-header,
  & /deep/ .ant-collapse-item-disabled > .ant-collapse-header > .arrow {
    color: initial;
    cursor: initial;
  }
}
.tip-arrow {
  border-width: 0 5px 5px;
  border-color: transparent transparent transparent red;
  left: 67px;
  top: -4px;
  position: absolute;
}
</style>
