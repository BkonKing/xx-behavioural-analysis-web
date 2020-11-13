<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div style="padding: 20px;background: #fff;">
      <div>
        <span>指标：</span>
        <a-select v-model="indicator" size="small" @change="loadChartData">
          <a-select-option v-for="(item, i) in indicatorList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <a-line :data="data" :scale="scale"></a-line>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table
        ref="table"
        size="default"
        :bordered="true"
        rowKey="key"
        :columns="columns"
        :data="loadTableData"
        style="margin-top: 20px;"
      >
      </s-table>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, aLine } from '@/components'
import { ACTIVITY_TIP } from './const'

const columns = [
  {
    dataIndex: 'index'
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
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
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
      indicator: 2,
      indicatorList: [
        {
          text: '启动用户数',
          value: 0
        },
        {
          text: '日活/月活',
          value: 1
        },
        {
          text: '累计启动用户数',
          value: 2
        }
      ],
      data: [],
      scale: [],
      columns
    }
  },
  mounted () {
    this.loadChartData(0)
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData(0)
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData (index) {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), indicator: this.indicator })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'value',
          alias: this.indicatorList[index].text,
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
          console.log(this.getHeaderData())
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
