<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <template v-slot:condition>
      <div style="display: inline-block;margin-left: 20px;">
        <a-select size="small" v-model="time" style="width: 100px" @change="loadAllData">
          <a-select-option key="1">按日</a-select-option>
          <a-select-option key="2">按时</a-select-option>
        </a-select>
      </div>
    </template>
    <div style="background: #fff;">
      <Summary v-model="summary" :data="summaryList" @change="handleChange"></Summary>
      <div style="padding: 0 20px 20px;">
        <a-divider style="margin-top: 0;"></a-divider>
        <a-line :data="data" :scale="scale"></a-line>
        <a-divider></a-divider>
        <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadTableData"
          :scroll="{ x: 1000 }"
          style="margin-top: 20px;"
        >
          <template v-slot:index="text">
            {{ text.key }}
          </template>
        </s-table>
      </div>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary, STable, PopoverTip, aLine } from '@/components'
import { TREND_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'index' }
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '日期'
  },
  {
    title: '启动用户数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '新用户数',
    dataIndex: 'address',
    key: 'address'
  }
  /* {
    title: '新用户占比',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '老用户数',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '老用户占比',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '启动次数',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '次均使用时长',
    key: 'tags',
    dataIndex: 'tags'
  },
  {
    title: '人均使用时长',
    key: 'tags',
    dataIndex: 'tags'
  } */
]
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    Summary,
    STable,
    PopoverTip,
    aLine
  },
  data () {
    return {
      reportTip: TREND_TIP.reportTip,
      tipName: TREND_TIP.tipName,
      tipList: TREND_TIP.tipList,
      time: '1',
      summary: '',
      summaryList: [],
      params: {},
      columns,
      data: [],
      scale: []
    }
  },
  mounted () {
    this.getSummary()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 按日或者按时的更改，刷新图表和列表
    handleTimeChange (value) {
      this.getHeaderData()
    },
    // 获取汇总数据
    getSummary () {
      this.summaryList = [
        {
          text: '启动用户数',
          value: '1'
        },
        {
          text: '新用户数',
          value: '2'
        },
        {
          text: '新用户占比',
          value: '6'
        },
        {
          text: '老用户数',
          value: '24'
        },
        {
          text: '老用户占比',
          value: '23'
        },
        {
          text: '启动次数',
          value: '14'
        },
        {
          text: '次均使用时长',
          value: '16'
        },
        {
          text: '人均使用时长',
          value: '8'
        }
      ]
      this.summary = this.summaryList[0].value
      this.loadChartData(0)
    },
    // 汇总数据变更事件，刷新图表
    handleChange (value, index) {
      this.loadChartData(index)
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData(0)
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData (index) {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), summary: this.summary, time: this.time })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'value',
          alias: this.summaryList[index].text,
          min: 0
        }
      ]
      this.data = [
        { date: '2020/10/28', value: 3 },
        { date: '2020/10/29', value: 4 },
        { date: '2020/10/30', value: 3.5 },
        { date: '2020/10/31', value: 5 },
        { date: '2020/11/01', value: 4.9 },
        { date: '2020/11/02', value: 6 },
        { date: '2020/11/03', value: 7 },
        { date: '2020/11/04', value: 9 },
        { date: '2020/11/05', value: 13 }
      ]
    },
    // 刷新表格数据
    loadTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          console.log('-----表格------')
          console.log({ ...this.getHeaderData(), time: this.time })
          console.log('-----表格------')
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park'
            }
          ]
          resolve({
            pageSize: 1,
            pageNo: 1,
            totalCount: 1,
            totalPage: 1,
            data: data
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-table td {
  white-space: nowrap;
}
</style>
