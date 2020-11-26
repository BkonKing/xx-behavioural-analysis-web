<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div style="padding: 20px;background: #fff;">
      <div>
        <span>指标：</span>
        <a-select v-model="ordertype" size="small" @change="loadChartData">
          <a-select-option v-for="(item, i) in ordertypeList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <a-line :data="data" :scale="scale" :position="position" :showLegend="false"></a-line>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table ref="table" rowKey="name" :columns="columns" :data="loadTableData">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="time" slot-scope="text">
          {{ moment(parseInt(text) * 1000).format('YYYY/MM/DD HH:mm:ss') }}
        </span>
        <span slot="percent" slot-scope="text"> {{ text }}% </span>
      </s-table>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, aLine } from '@/components'
import { ACTIVITY_TIP } from './const'
import { getActiveuserList, getActiveuserPic } from '@/api/userAnalyse'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '日期',
    dataIndex: 'name'
  },
  {
    title: '启动用户数',
    dataIndex: 'daystartusers'
  },
  {
    title: '日活跃度',
    dataIndex: 'dayactive',
    scopedSlots: { customRender: 'percent' }
  },
  {
    title: '日活/月活',
    dataIndex: 'dayormonthactive',
    scopedSlots: { customRender: 'percent' }
  },
  {
    title: '周活跃用户',
    dataIndex: 'weekstatusers'
  },
  {
    title: '周活跃度',
    dataIndex: 'weekactive',
    scopedSlots: { customRender: 'percent' }
  },
  {
    title: '月活跃用户',
    dataIndex: 'monthactive',
    scopedSlots: { customRender: 'percent' }
  },
  {
    title: '累计启动用户',
    dataIndex: 'sumstatusers'
  }
]

export default {
  name: 'UserActivitydegree',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    aLine
  },
  data () {
    return {
      reportTip: ACTIVITY_TIP.reportTip,
      tipName: ACTIVITY_TIP.tipName,
      tipList: ACTIVITY_TIP.tipList,
      ordertype: 2,
      ordertypeList: [
        {
          text: '启动用户数',
          value: 1,
          key: 'startusers'
        },
        {
          text: '日活/月活',
          value: 2,
          key: 'dayormonthactive'
        },
        {
          text: '累计启动用户数',
          value: 3,
          key: 'sumstatusers'
        }
      ],
      data: [],
      scale: [],
      position: '',
      columns
    }
  },
  mounted () {
    this.loadChartData()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData()
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData () {
      const params = { ...this.getHeaderData(), ordertype: this.ordertype }
      const ordertype = this.ordertypeList[this.ordertype - 1]
      this.scale = [
        {
          dataKey: ordertype.key,
          alias: ordertype.text
        }
      ]
      this.position = `name*${ordertype.key}`
      getActiveuserPic(params).then(({ data }) => {
        this.data = data.list || []
      })
    },
    // 刷新表格数据
    loadTableData () {
      const params = this.getHeaderData()
      return getActiveuserList(params)
    }
  }
}
</script>

<style></style>
