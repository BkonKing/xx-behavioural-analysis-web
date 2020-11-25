<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <a-tabs v-model="active" @change="loadAllData">
          <a-tab-pane v-for="item in tapList" :key="item.key" :tab="item.txt"></a-tab-pane>
          <!-- <a-tab-pane key="1" tab="使用频率"></a-tab-pane>
          <a-tab-pane key="2" tab="访问深度"></a-tab-pane>
          <a-tab-pane key="3" tab="使用时长"></a-tab-pane>
          <a-tab-pane key="4" tab="使用间隔"></a-tab-pane> -->
        </a-tabs>
        <!-- end -->
        <bar :data="chartData" :scale="scale" :height="350"></bar>
        <!-- <bar :data="chartData" :scale="scale" position="time*value" :height="300"></bar> -->
        <a-divider></a-divider>
        <popover-tip :tip-list="tipList"></popover-tip>
        <a-table :columns="columns" :data-source="tableData" rowKey="name">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <template slot="estarttimesdis" slot-scope="text">
            {{ text + '%' }}
          </template>
        </a-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, Bar } from '@/components'
import { CHARACTER_TIP } from './const'
import { getUsingHabit } from '@/api/using'

var columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '日启动次数',
    dataIndex: 'tname'
  },
  {
    title: '启动用户数',
    dataIndex: 'estarttimes'
  },
  {
    title: '所占比例',
    dataIndex: 'estarttimesdis',
    scopedSlots: { customRender: 'estarttimesdis' }
  }
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
      tableData: [],
      active: 0,
      tapList: [
        {
          key: 0,
          txt: '使用频率'
        },
        {
          key: 1,
          txt: '访问深度'
        },
        {
          key: 2,
          txt: '使用时长'
        },
        {
          key: 3,
          txt: '使用间隔'
        }
      ],
      columns1: ['日启动次数', '启动用户数'],
      columns2: ['访问深度', '启动次数'],
      columns3: ['使用时长', '启动次数'],
      columns4: ['使用间隔', '启动次数'],
      // 查询参数
      queryParam: {},
      // 图表
      scale: [],
      chartData: []
    }
  },
  mounted () {
    this.loadChartData()
    console.log(getUsingHabit())
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData()
      // this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData () {
      switch (parseInt(this.active)) {
        case 0:
          columns[1].title = this.columns1[0]
          columns[2].title = this.columns1[1]
          break
        case 1:
          columns[1].title = this.columns2[0]
          columns[2].title = this.columns2[1]
          break
        case 2:
          columns[1].title = this.columns3[0]
          columns[2].title = this.columns3[1]
          break
        case 3:
          columns[1].title = this.columns4[0]
          columns[2].title = this.columns4[1]
          break
      }
      this.columns = columns
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      const param = Object.assign(
      {
        'type': this.active + 1
      }, requestParameters)
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      getUsingHabit(param).then(res => {
        this.tableData = res.data.list
        this.scale = [
          {
            dataKey: 'value',
            alias: this.tapList[this.active].txt,
            min: 0
          }
        ]
        this.chartData = res.data.piclist.map(obj => {
          return {
            name: obj.tname,
            value: obj.estarttimes
          }
        })
      })
    },
    // 刷新表格数据
    loadTableData (page) {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      console.log('-----表格------')
      // console.log(requestParameters)
      console.log('-----表格------')
      const param = Object.assign(
        {
        'search': this.search
      }, page, requestParameters)
      return getUsingHabit(param)
    }
  }
}
</script>

<style></style>
