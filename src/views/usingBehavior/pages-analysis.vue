<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <Summary v-model="summary" :data="summaryList" @change="handleChange"></Summary>
      <a-card :bordered="false">
        <a-line :data="chartData" :scale="scale" position="time*value"></a-line>
        <a-divider></a-divider>
        <popover-tip :tip-list="tipList">
          <template v-slot:search>
            <a-input-search
              size="small"
              placeholder="请输入页面名称"
              v-model="queryParam.id"
              @search="$refs.table.refresh(true)"
              style="margin-right: 16px; width: 272px;"
            />
          </template>
        </popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary, PopoverTip, STable, aLine } from '@/components'
import { PAGE_TIP } from './const'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '供应商（名称）',
    dataIndex: 'seller_name'
  },
  {
    title: '平台',
    dataIndex: 'platform_name'
    // scopedSlots: { customRender: 'description' }
  },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   scopedSlots: { customRender: 'status' }
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updatedAt',
  //   sorter: true
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'PageAnalysis',
  components: {
    AnalysisHeader,
    Summary,
    PopoverTip,
    STable,
    aLine
  },
  data () {
    return {
      reportTip: PAGE_TIP.reportTip,
      tipName: PAGE_TIP.tipName,
      tipList: PAGE_TIP.tipList,
      summary: '',
      summaryIndex: 0,
      summaryList: [],
      // 查询参数
      queryParam: {},
      columns,
      // 图表
      scale: [],
      chartData: []
    }
  },
  mounted () {
    this.getSummary()
  },
  methods: {
    // 获取汇总数据
    getSummary () {
      this.summaryList = [
        {
          text: '页面访问次数',
          value: '1'
        },
        {
          text: '次均停留时间',
          value: '2'
        },
        {
          text: '退出率',
          value: '6'
        }
      ]
      this.summary = this.summaryList[0].value
      this.loadChartData()
    },
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData()
      this.$refs.table.refresh(true)
    },
    // 汇总数据变更事件，刷新图表
    handleChange (value, index) {
      this.summaryIndex = index
      this.loadChartData(index)
    },
    // 刷新图表数据
    loadChartData (index) {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), summary: this.summary })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'time',
          range: [0, 1]
        },
        {
          dataKey: 'value',
          min: 0,
          alias: this.summaryList[this.summaryIndex].text,
          nice: true
        }
      ]
      this.chartData = [
        { time: '1991', value: 3 },
        { time: '1992', value: 4 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 },
        { time: '1997', value: 7 },
        { time: '1998', value: 9 },
        { time: '1999', value: 13 }
      ]
    },
    // 刷新表格数据
    loadTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
          console.log('-----表格------')
          console.log(requestParameters)
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
/deep/ .summary {
  .ant-tabs-nav {
    width: 100%;
    > div {
    width: 100%;
    .ant-tabs-tab {
      width: calc((100% - 64px) / 3);
    }
  }
  }
}
</style>
