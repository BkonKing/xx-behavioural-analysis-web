<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="getusertrend">
    <template v-slot:condition>
      <div style="display: inline-block;margin-left: 20px;">
        <a-select size="small" v-model="type" style="width: 100px" @change="getusertrend">
          <a-select-option :key="1">按日</a-select-option>
          <a-select-option :key="2">按时</a-select-option>
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
        <a-table
          rowKey="name"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          style="margin-top: 20px;"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="newusersdis" slot-scope="text">{{ text }}%</span>
          <span slot="oldusersdis" slot-scope="text">{{ text }}%</span>
        </a-table>
      </div>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary, PopoverTip, aLine } from '@/components'
import { getusertrend } from '@/api/userAnalyse'
import { TREND_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'serial' },
    width: 70
  },
  {
    title: '日期',
    dataIndex: 'name'
  },
  {
    title: '启动用户数',
    dataIndex: 'everystartusers'
  },
  {
    title: '新用户数',
    dataIndex: 'everynewusers'
  },
  {
    title: '新用户占比',
    dataIndex: 'newusersdis',
    scopedSlots: { customRender: 'newusersdis' }
  },
  {
    title: '老用户数',
    dataIndex: 'oldusers'
  },
  {
    title: '老用户占比',
    dataIndex: 'oldusersdis',
    scopedSlots: { customRender: 'oldusersdis' }
  },
  {
    title: '启动次数',
    dataIndex: 'estarttimes'
  },
  {
    title: '次均使用时长',
    dataIndex: 'timesdurationuse'
  },
  {
    title: '人均使用时长',
    dataIndex: 'avgdurationuse'
  }
]
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    Summary,
    PopoverTip,
    aLine
  },
  data () {
    return {
      reportTip: TREND_TIP.reportTip,
      tipName: TREND_TIP.tipName,
      tipList: TREND_TIP.tipList,
      type: 1,
      summary: '',
      summaryList: [],
      summaryType: ['everystartusers', 'everynewusers', 'newusersdis', 'oldusers', 'oldusersdis', 'estarttimes'],
      params: {},
      columns,
      tableData: [],
      data: [],
      scale: []
    }
  },
  mounted () {
    this.getusertrend()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 获取汇总数据
    getusertrend () {
      const params = { ...this.getHeaderData(), type: this.type }
      getusertrend(params).then(({ data }) => {
        const { list, ...summary } = data
        this.summaryList = [
          {
            text: '启动用户数',
            value: summary.startusersum || 0
          },
          {
            text: '新用户数',
            value: summary.newusersum || 0
          },
          {
            text: '新用户占比',
            value: `${summary.newusersumdis || 0}%`
          },
          {
            text: '老用户数',
            value: summary.oldusersum || 0
          },
          {
            text: '老用户占比',
            value: `${summary.oldusersumdis || 0}%`
          },
          {
            text: '启动次数',
            value: summary.starttimes || 0
          }
        ]
        this.summary = this.summaryList[0].value
        this.tableData = list
        this.loadChartData(0)
      })
    },
    // 汇总数据变更事件，刷新图表
    handleChange (value, index) {
      this.loadChartData(index)
    },
    // 刷新图表数据
    loadChartData (index) {
      this.scale = [
        {
          dataKey: 'value',
          alias: this.summaryList[index].text,
          min: 0
        }
      ]
      this.data = this.tableData && this.tableData.length > 0 ? this.tableData.map(obj => {
        return {
          name: obj.name,
          value: obj[this.summaryType[index]]
        }
      }) : []
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-table td {
  white-space: nowrap;
}
</style>
