<template>
  <analysis-header ref="AnalysisHeader" @change="loadAllData">
    <template v-slot:eventlist>
      <div style="display: inline-block;">
        <a-select
          show-search
          placeholder="请选择"
          v-model="eventId"
          size="small"
          option-filter-prop="children"
          style="width: 200px"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="(item, i) in selectList" :key="i" :value="item.id">
            {{ item.event_name }}
          </a-select-option>
        </a-select>
      </div>
    </template>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <div>
          <span>指标：</span>
          <a-select v-model="indicator" size="small" @change="loadChartData" style="width: 138px">
            <a-select-option v-for="(item, i) in indicatorList" :key="i" :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </div>
        <a-line :data="chartData" :scale="scale" :height="300"></a-line>
        <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="date"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto"
        >
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, aLine } from '@/components'
import { EVENTDETAIL_TIP } from './const'
import { getEventContans, getEventDetail } from '@/api/using'
const columns = [
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '事件数量  ',
    dataIndex: 'numberevents'
  },
  {
    title: '触发用户数 ',
    dataIndex: 'userevents'
  }
]
export default {
  name: 'EventDetail',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    aLine
  },
  data () {
    return {
      tipName: EVENTDETAIL_TIP.tipName,
      tipList: EVENTDETAIL_TIP.tipList,
      indicator: 0,
      indicatorList: [
        {
          text: '事件数量',
          value: 0
        },
        {
          text: '触发用户数',
          value: 1
        }
      ],
      selectList: [],
      columns,
      // 查询参数
      queryParam: {},
      // 图表
      scale: [],
      chartData: [],
      eventId: 0
    }
  },
  created () {
    this.eventId = this.$route.query.id
  },
  mounted () {
    this.loadChartData()
    this.getEventContans()
  },
  methods: {
    // 获取app页面列表
    getEventContans () {
      getEventContans().then(res => {
        this.selectList = res.data.list
      })
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
    // 刷新图表数据
    loadChartData () {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      const param = Object.assign(
      {
        'eventid': this.eventId
      }, requestParameters)
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      getEventDetail(param).then(res => {
        this.scale = [
          {
            dataKey: 'value',
            alias: this.indicatorList[this.indicator].text,
            min: 0
          }
        ]
        if (res.data.list) {
          this.chartData = res.data.list.map(obj => {
            return {
              name: obj.name,
              value: this.indicator === 0 ? obj.numberevents : obj.userevents
            }
          })
        } else {
          this.chartData = []
        }
      })
    },
    // 刷新表格数据
    loadTableData () {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      const param = Object.assign(
      {
        'eventid': this.eventId
      }, requestParameters)
      return getEventDetail(param)
    },
    handleChange (value) {
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

<style></style>
