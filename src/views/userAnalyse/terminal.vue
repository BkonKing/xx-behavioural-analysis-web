<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div style="padding: 20px;background: #fff;">
      <a-tabs v-model="active" @change="loadAllData">
        <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.title"></a-tab-pane>
      </a-tabs>
      <div>
        <span>指标：</span>
        <a-select v-model="indicator" size="small" style="width: 120px" @change="loadChartData">
          <a-select-option v-for="(item, i) in indicatorList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <bar :data="data" :scale="scale"></bar>
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
import { AnalysisHeader, PopoverTip, STable, Bar } from '@/components'
import { TERMINAL_TIP } from './const'
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
  name: 'UserTerminal',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    Bar
  },
  data () {
    return {
      reportTip: TERMINAL_TIP.reportTip,
      tipName: TERMINAL_TIP.tipName,
      tipList: TERMINAL_TIP.tipList,
      active: 0,
      tabList: [
        {
          key: 0,
          title: '品牌'
        },
        {
          key: 1,
          title: '设备型号'
        },
        {
          key: 2,
          title: '操作系统'
        },
        {
          key: 3,
          title: '分辨率'
        },
        {
          key: 4,
          title: '联网方式'
        },
        {
          key: 5,
          title: '运营商'
        }
      ],
      indicator: 0,
      indicatorList: [
        {
          text: '启动次数',
          value: 0
        },
        {
          text: '启动次数分布',
          value: 1
        },
        {
          text: '新用户分布',
          value: 2
        },
        {
          text: '启动用户分布',
          value: 3
        },
        {
          text: '次均使用时长',
          value: 4
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
      console.log({ ...this.getHeaderData(), active: this.active, indicator: this.indicator })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'sales',
          alias: this.indicatorList[this.indicator].text,
          min: 0
        }
      ]
      this.data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
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
