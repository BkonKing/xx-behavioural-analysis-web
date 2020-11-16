<template>
  <a-row :gutter="24" type="flex" justify="space-between" align="middle" style="margin-bottom: 20px;">
    <a-col :span="12" type="flex">
      <slot name="search"></slot>
      <a-popover :title="tipTitle" placement="rightTop">
        <template slot="content">
          <div class="tip-cont">
            <div v-for="(item,index) in tipList":key="index"><b>{{ item.title }}</b>{{ item.content }}</div>
          </div>
        </template>
        <span>{{ tipName }}<a-icon
          class="report-btn"
          type="question-circle"
          :style="{ marginLeft: '8px' }"
        /></span>
      </a-popover>
    </a-col>
    <a-col :span="12">
      <span class="upload-btn" style="float: right"><a-icon type="upload" :style="{ marginRight: '8px' }" />导出CSV文件</span>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'PopoverTip',
  props: {
    tipName: {
      type: String,
      default: '指标说明'
    },
    tipTitle: {
      type: String,
      default: ''
    },
    tipList: {
      type: Array,
      default: () => [
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整事件被触'
        },
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整'
        }
      ]
    }
  },
  methods: {
    handleTipClick () {
      this.activeKey = this.activeKey.length === 0 ? ['1'] : []
    }
  }
}
</script>
<style scoped>
  .tip-cont {
    max-width: 300px;
    font-size: 12px;
  }
  .tip-cont b {
    color: #444;
  }
  .upload-btn {
    cursor: pointer;
  }
</style>
