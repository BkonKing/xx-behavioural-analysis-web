<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <a-tabs v-model="active" @change="loadAllData">
          <a-tab-pane key="1" tab="使用频率"></a-tab-pane>
          <a-tab-pane key="2" tab="访问深度"></a-tab-pane>
          <a-tab-pane key="3" tab="使用时长"></a-tab-pane>
          <a-tab-pane key="4" tab="使用间隔"></a-tab-pane>
        </a-tabs>
        <!-- end -->
        <bar :data="chartData" :scale="scale" position="time*value" :height="300"></bar>
        <a-divider></a-divider>
        <popover-tip :tip-list="tipList"></popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, Bar } from '@/components'
import { CHARACTER_TIP } from './const'

const columns = [
  {
    title: '',
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
  }
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
  // }
]
export default {
  name: 'UsingHabit',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    Bar
  },
  data () {
    return {
      reportTip: CHARACTER_TIP.reportTip,
      tipName: CHARACTER_TIP.tipName,
      tipList: CHARACTER_TIP.tipList,
      columns,
      active: '1',
      // 查询参数
      queryParam: {},
      // 图表
      scale: [],
      chartData: []
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
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), active: this.active })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'value',
          alias: '启动次数',
          min: 0
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
          console.log('-----表格------')
          console.log({ ...this.getHeaderData(), active: this.active })
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

<style></style>
