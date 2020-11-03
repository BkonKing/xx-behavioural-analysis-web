<template>
  <div class="ant-pro-page-header-wrap">
    <div class="ant-pro-page-header-wrap-page-header-warp">
      <div class="ant-pro-grid-content">
        <div class="ant-page-header ant-page-header-ghost">
          <div class="ant-page-header-heading">
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
          </div>
          <div class="ant-page-header-content">
            <div :class="`${prefixedClassName}-detail`">
              <div :class="`${prefixedClassName}-main`">
                <div :class="`${prefixedClassName}-row`">
                  <div :class="`${prefixedClassName}-content`">
                    <slot name="content">
                      <!-- 日期 -->
                      <a-range-picker
                        v-if="showSearchList.includes('rangeDate')"
                        v-model="rangeDate"
                        size="small"
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
                      />
                      <!-- 渠道 -->
                      <template v-if="showSearchList.includes('channel')">
                        <span class="margin-left-large">渠道：</span>
                        <a-select v-model="channel" size="small" style="width: 120px">
                          <a-select-option v-for="(item, i) in channelList" :key="i" :value="item.value">
                            {{ item.text }}
                          </a-select-option>
                        </a-select>
                      </template>
                      <slot name="condition"></slot>
                      <!-- 版本 -->
                      <template v-if="showSearchList.includes('versions')">
                        <span class="margin-left-large">版本：</span>
                        <div style="display: inline-block;min-width: 200px;">
                          <a-select mode="multiple" size="small" v-model="versions" style="width: 100%;" placeholder="请选择">
                            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                              {{ (i + 9).toString(36) + i }}
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
      default: () => ['rangeDate']
    }
  },
  data () {
    return {
      prefixedClassName: 'ant-pro-page-header-wrap',
      activeKey: [], // 控制显示模块说明tip
      rangeDate: [], // 时间范围
      channel: '', // 渠道
      channelList: [
        {
          value: '1',
          text: '不限'
        }
      ], // 渠道类型
      versions: [] // 版本
    }
  },
  methods: {
    moment,
    // 显示隐藏说明tip
    handleTipClick () {
      this.activeKey = this.activeKey.length === 0 ? ['1'] : []
    },
    // 不能选择今天之后的日期
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    // 获取搜索条件数据
    getSearchData () {
      const data = {}
      this.showSearchList.forEach(obj => {
        data[obj] = this[obj]
      })
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.margin-left-large {
  margin-left: 24px;
}
.analysis-header-collapse {
  background-color: #fff;
  margin-bottom: 8px;
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
      padding: 10px;
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
