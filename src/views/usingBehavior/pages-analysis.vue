<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <Summary v-model="summary" :data="summaryList" @change="handleChange"></Summary>
      <a-card :bordered="false">
        <a-line :data="chartData" :scale="scale" :height="300"></a-line>
        <a-divider></a-divider>
        <popover-tip :tip-list="tipList">
          <template v-slot:search>
            <a-input-search
              size="small"
              placeholder="请输入页面名称"
              v-model="search"
              @search="$refs.table.refresh(true)"
              style="margin-right: 16px; width: 272px;"
            />
          </template>
        </popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="name"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto"
        >
          <template v-slot:index="text">
            {{ text.key }}
          </template>
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <a slot="pagename" slot-scope="text, record" @click="goDetail(record.name)">{{ text }}</a>
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary, PopoverTip, STable, aLine } from '@/components'
import { PAGE_TIP } from './const'
import { getPagesList, getPagesChart } from '@/api/using'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '访问页面',
    dataIndex: 'path',
    scopedSlots: { customRender: 'pagename' }
  },
  {
    title: '访问页面备注名称',
    dataIndex: 'remark'
  },
  {
    title: '页面访问次数',
    dataIndex: 'epagecount'
  },
  {
    title: '访问次数占比',
    dataIndex: 'epagecountdis'
  },
  {
    title: '次均停留时间',
    dataIndex: 'eusetime'
  },
  {
    title: '停留时间占比',
    dataIndex: 'eusetimedis'
  },
  {
    title: '退出率',
    dataIndex: 'eleavecountdis'
  },
  {
    title: '入口页次数',
    dataIndex: 'eentrycount'
  },
  {
    title: '退出页次数',
    dataIndex: 'eleavecount'
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
      search: '',
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
    loadChartData (page) {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      const param = Object.assign(
      {
        'eventid': this.eventId
      }, requestParameters)
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      getPagesChart(param).then(res => {
        this.summaryList[0].value = res.data.pagecount || 0
        this.summaryList[1].value = res.data.usetimesum || 0
        this.summaryList[2].value = (res.data.leavedis || 0) + '%'
        console.log('aa', this.summaryList, this.summaryIndex)
        this.scale = [
          {
            dataKey: 'value',
            alias: this.summaryList[this.summaryIndex].text,
            min: 0
          }
        ]
        this.chartData = res.data.list.map(obj => {
          return {
            name: obj.name,
            value: this.summaryIndex === 0 ? obj.epagecount : (this.summaryIndex === 1 ? obj.eusetime : obj.eleavecountdis)
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
        'search': this.search || '[]'
      }, page, requestParameters)
      return getPagesList(param)
    },
    goDetail (id) {
      this.$router.push({
        path: '/usingBehavior/pagesDetail',
        query: {
          id: id
        }
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
