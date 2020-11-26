<template>
  <div style="margin-top: 10px;">
    <div style="padding-bottom: 45px;">
      <div class="time-span">
        <a-tooltip v-for="item in retainParams" :key="item.value" @click="handleRetainClick(item.value)">
          <template slot="title">
            {{ item.title }}
          </template>
          <span class="tac" :class="{ selected: retentiontype === item.value }">{{ item.text }}</span>
        </a-tooltip>
      </div>
      <div class="time-span">
        <span
          v-for="(item, index) in dateParams"
          :key="index"
          class="tac"
          :class="{ selected: datetype === item.value }"
          @click="handleDateClick(item.value)"
        >{{ item.text }}</span
        >
        <a-popover class="icon-font" placement="leftBottom">
          <template slot="content">
            某日/周/月的活跃用户中，在第2日/周/月之后，每日/周/月启动过程序的用户
          </template>
          <a-icon type="question-circle" />
        </a-popover>
      </div>
    </div>
    <color-table :data="data" :columns="retainColumns" :per-cent="retentiontype === 2"></color-table>
  </div>
</template>

<script>
import { ColorTable } from '@/components'
const retainColumns = [
  {
    title: '日期',
    dataIndex: 'name',
    scopedSlots: { customRender: 'row-header' }
  },
  {
    title: '新用户数',
    dataIndex: 'value',
    scopedSlots: { customRender: 'row-header' }
  },
  {
    title: '第2天',
    dataIndex: '2',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第3天',
    dataIndex: '3',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第4天',
    dataIndex: '4',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第5天',
    dataIndex: '5',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第6天',
    dataIndex: '6',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第7天',
    dataIndex: '7',
    scopedSlots: { customRender: 'color-td' }
  }
]
export default {
  components: {
    ColorTable
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      retainParams: [
        {
          title: '留存用户数',
          value: 1,
          text: '#'
        },
        {
          title: '留存率',
          value: 2,
          text: '%'
        }
      ],
      dateParams: [
        {
          text: '日',
          value: 1
        },
        {
          text: '周',
          value: 2
        }
        // {
        //   text: '月',
        //   value: 2
        // }
      ],
      retentiontype: 1,
      datetype: 1,
      retainColumns
    }
  },
  methods: {
    handleRetainClick (value) {
      this.retentiontype = value
      this.handleChange()
    },
    handleDateClick (value) {
      this.datetype = value
      this.retainColumns = this.retainColumns.map(obj => {
        obj.title = obj.title.replace(value === 1 ? '周' : '天', value === 1 ? '天' : '周')
        return obj
      })
      this.handleChange()
    },
    handleChange () {
      this.$emit('change', {
        retentiontype: this.retentiontype,
        datetype: this.datetype
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
