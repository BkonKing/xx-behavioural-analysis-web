<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="getdistribution">
    <a-card>
      <a-row type="flex" :gutter="20">
        <a-col flex="650px">
          <a-map :data="chartData"></a-map>
        </a-col>
        <a-col flex="auto">
          <a-table size="small" rowKey="name" :columns="columns" :data-source="tableData" :pagination="false">
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </span>
          </a-table>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <a-table rowKey="name" :columns="detailColumns" :data-source="tableData" :pagination="false">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </a-table>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, aMap } from '@/components'
import { getdistribution } from '@/api/userAnalyse'
import { AREA_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '地域分布',
    dataIndex: 'name'
  },
  {
    title: '启动次数',
    dataIndex: 'starttimes'
  },
  {
    title: '启动次数占比',
    dataIndex: 'starttimesdis'
  }
]
const detailColumns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '地域分布',
    dataIndex: 'name'
  },
  {
    title: '启动次数',
    dataIndex: 'starttimes'
  },
  {
    title: '启动次数分布',
    dataIndex: 'starttimesdis'
  },
  {
    title: '新用户分布',
    dataIndex: 'newusersdis'
  },
  {
    title: '启动用户分布',
    dataIndex: 'startusersdis'
  }
]

export default {
  components: {
    AnalysisHeader,
    PopoverTip,
    aMap
  },
  data () {
    return {
      reportTip: AREA_TIP.reportTip,
      tipName: AREA_TIP.tipName,
      tipList: AREA_TIP.tipList,
      columns,
      detailColumns,
      tableData: [],
      chartData: []
    }
  },
  mounted () {
    this.getdistribution()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    getdistribution () {
      getdistribution(this.getHeaderData()).then(({ data }) => {
        this.chartData = data.piclist
        this.tableData = data.list
      })
    }
  }
}
</script>
