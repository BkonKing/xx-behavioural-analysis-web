<template>
  <analysis-header ref="AnalysisHeader" @change="loadAllData">
    <template v-slot:eventlist>
      <div style="display: inline-block;">
        <a-select
          show-search
          placeholder="请选择"
          v-model="pagesId"
          size="small"
          option-filter-prop="children"
          style="width: 200px"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="(item, i) in selectList" :key="i" :value="item.id">
            {{ item.remark }}
          </a-select-option>
        </a-select>
      </div>
    </template>
    <div style="background: #fff;">
      <Summary v-model="summary" :data="summaryList" @change="handleChange"></Summary>
      <div style="padding: 0 20px 20px;">
        <a-divider style="margin-top: 0;"></a-divider>
        <a-line :data="chartData" :scale="scale" :height="300"></a-line>
        <a-divider></a-divider>
        <popover-tip :tip-list="tipList"></popover-tip>
        <a-table :columns="columns" :data-source="tableData" rowKey="name">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <template slot="eleavecountdis" slot-scope="text">
            {{ text + '%' }}
          </template>
        </a-table>
      </div>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary, STable, PopoverTip, aLine } from '@/components'
import { PAGEDETAIL_TIP } from './const'
import { getPagesContans, getPagesDetail } from '@/api/using'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    dataIndex: 'name',
    title: '日期'
  },
  {
    title: '页面访问次数',
    dataIndex: 'epagecount'
  },
  {
    title: '次均停留时间',
    dataIndex: 'eusetime'
  },
  {
    title: '退出率',
    dataIndex: 'eleavecountdis',
    scopedSlots: { customRender: 'eleavecountdis' }
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
  name: 'PagesDetail',
  components: {
    AnalysisHeader,
    Summary,
    STable,
    PopoverTip,
    aLine
  },
  data () {
    return {
      tipName: PAGEDETAIL_TIP.tipName,
      tipList: PAGEDETAIL_TIP.tipList,
      time: '1',
      summary: 0,
      summaryIndex: 0,
      summaryList: [],
      params: {},
      columns,
      tableData: [],
      scale: [],
      chartData: [],
      selectList: [],
      pagesId: 0
    }
  },
  mounted () {
    this.pagesId = this.$route.query.id
    this.getSummary()
    this.getPagesContans()
  },
  methods: {
    // 获取app页面列表
    getPagesContans () {
      getPagesContans().then(res => {
        this.selectList = res.data.list
      })
    },
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
        },
        {
          text: '入口页次数',
          value: '24'
        },
        {
          text: '退出页次数',
          value: '23'
        }
      ]
      this.loadChartData(0)
    },
    // 汇总数据变更事件，刷新图表
    handleChange (value, index) {
      this.summaryIndex = index
      this.loadChartData(index)
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData(0)
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData (index) {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      const param = Object.assign(
      {
        'pageid': this.pagesId
      }, requestParameters)
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      getPagesDetail(param).then(res => {
        this.tableData = res.data.list
        this.summaryList[0].value = res.data.pagecount || 0
        this.summaryList[1].value = res.data.stoptime || 0
        this.summaryList[2].value = (res.data.leavedis || 0) + '%'
        this.summaryList[3].value = res.data.entrycount || 0
        this.summaryList[4].value = res.data.leavecount || 0
        this.scale = [
          {
            dataKey: 'value',
            alias: this.summaryList[this.summaryIndex].text,
            min: 0
          }
        ]
        if (res.data.list) {
          this.chartData = res.data.list.map(obj => {
            let value = ''
            switch (this.summaryIndex) {
                case 0:
                value = obj.epagecount
              break
              case 1:
                value = obj.eusetime
                break
              case 2:
                value = obj.eleavecountdis
                break
              case 3:
                value = obj.eentrycount
                break
              case 4:
                value = obj.eleavecount
                break
            }
            return {
              name: obj.name,
              value: value
            }
          })
        } else {
          this.chartData = []
        }
      })
    },
    // 刷新表格数据
    loadTableData (page) {

    },
    pagesChange (value) {
      console.log(`selected ${value}`)
      this.loadAllData()
    },
    handleBlur () {
      console.log('blur')
    },
    handleFocus () {
      console.log('focus')
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-table td {
  white-space: nowrap;
}
/deep/ .summary {
  .ant-tabs-nav {
    width: 100%;
    > div {
    width: 100%;
    .ant-tabs-tab {
      width: calc((100% - 64px) / 5);
    }
  }
  }
}
</style>
