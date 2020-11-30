<template>
  <analysis-header ref="AnalysisHeader" @change="loadAssignData">
    <template v-slot:reportTip>
      <div style="margin-bottom: 10px;" v-for="(item, i) in reportTip" :key="i">
        <strong>{{ item.title }}</strong>
        <div>{{ item.content }}</div>
      </div>
    </template>
    <a-card>
      <a-tabs v-if="isNewFirst" v-model="active" @change="handleTabChange">
        <a-tab-pane key="1" tab="新用户首次使用留存">
          <chart-box key="new-chart" ref="new-chart" :data="data" @change="handleChartChange"></chart-box>
        </a-tab-pane>
        <a-tab-pane key="2" tab="新用户自定义留存">
          <a-row style="margin-top: 20px;">
            <a-col :span="4">汇总数据</a-col>
            <a-col :span="7">
              <div>留存用户</div>
              <div class="vital-data">{{ reminduserssum }}</div>
            </a-col>
            <a-col :span="7">
              <div>新用户数</div>
              <div class="vital-data">{{ newuserssum }}</div>
            </a-col>
            <a-col :span="6">
              <div>留存率</div>
              <div class="vital-data">{{ reminddis }}%</div>
            </a-col>
          </a-row>
          <a-divider></a-divider>
          <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
          <a-table
            rowKey="name"
            :columns="columns"
            :data-source="tableData"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
            style="margin-top: 20px;"
          >
            <span slot="serial" slot-scope="text, record, index">
              {{ index + 1 }}
            </span>
            <span slot="ereminddis" slot-scope="text">{{ text }}%</span>
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <template v-else>
        <chart-box key="active-chart" ref="active-chart" :data="data" @change="handleChartChange" style="margin-top: 20px;"></chart-box>
      </template>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, STable, PopoverTip } from '@/components'
import ChartBox from './chart'
import { getRetentionList, getactiverate, getnewuserretention } from '@/api/userAnalyse'
import { RETAIN_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'serial' },
    width: 70
  },
  {
    title: '日期',
    dataIndex: 'name'
  },
  {
    title: '留存用户',
    dataIndex: 'eremindusers'
  },
  {
    title: '新用户数',
    dataIndex: 'enewusers'
  },
  {
    title: '留存率',
    dataIndex: 'ereminddis',
    scopedSlots: { customRender: 'ereminddis' }
  }
]

export default {
  name: 'RetainUser',
  components: {
    AnalysisHeader,
    STable,
    PopoverTip,
    ChartBox
  },
  data () {
    return {
      reportTip: RETAIN_TIP.reportTip,
      tipName: RETAIN_TIP.tipName,
      tipList: RETAIN_TIP.tipList,
      isNewFirst: false, // 是否新用户留存
      active: '1', // tab 1:新用户首次使用留存 2:新用户自定义留存
      chartParams: { retentiontype: 1, datetype: 1 },
      data: {},
      pagination: {},
      loading: false,
      columns,
      tableData: [],
      newuserssum: '', // 新用户数
      reminduserssum: '', // 留存用户数
      reminddis: 0 // 留存率 无百分号
    }
  },
  mounted () {
    this.pageLoad()
    this.getRetentionList()
  },
  methods: {
    pageLoad () {
      this.isNewFirst = this.$route.name === 'RetainUserNew'
      this.loadAssignData()
    },
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新现在所需要的图表或表格
    loadAssignData (params) {
      if (this.isNewFirst) {
        this.handleTabChange()
      } else {
        this.loadChartData()
      }
    },
    // 新用户tab刷新图表或者表格
    handleTabChange () {
      if (this.active === '1') {
        // 新用户首次使用留存
        this.loadChartData()
      } else {
        // 新用户自定义留存表格
        this.getRetentionList()
      }
    },
    handleChartChange (params) {
      this.chartParams = params
      this.loadChartData()
    },
    // 刷新图表数据
    loadChartData () {
      const params = { ...this.getHeaderData(), ...this.chartParams }
      this.isNewFirst ? this.getnewuserretention(params) : this.getactiverate(params)
    },
    // 活跃用户留存
    getactiverate (params) {
      getactiverate(params).then(({ data }) => {
        this.data = this.transformData(data) || {}
      })
    },
    // 新用户留存
    getnewuserretention (params) {
      getnewuserretention(params).then(({ data }) => {
        this.data = this.transformData(data) || {}
      })
    },
    // 图表留存数据格式转换
    transformData (data) {
      const tData = JSON.parse(JSON.stringify(data))
      for (const key in tData) {
        if (tData.hasOwnProperty(key)) {
          tData[key].list.unshift(parseFloat(tData[key].sum))
          tData[key] = {
            dis: tData[key].list
          }
        }
      }
      return tData
    },
    // 表格页码跳转
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getRetentionList()
    },
    // 刷新表格数据(新用户自定义留存)
    getRetentionList () {
      const { current } = this.pagination
      const params = { ...this.getHeaderData(), pageindex: current || 1, pagesize: 10 }
      this.loading = true
      getRetentionList(params).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = parseInt(data.total)
        this.loading = false
        this.newuserssum = data.newuserssum || 0
        this.reminduserssum = data.reminduserssum || 0
        this.reminddis = data.reminddis || 0
        this.tableData = data.list || []
        this.pagination = pagination
      })
    }
  },
  watch: {
    $route (to, from) {
      this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.resetSearchData()
      this.active = '1'
      this.chartParams = { retentiontype: 1, datetype: 1 }
      this.pageLoad()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding-top: 10px;
  .ant-tabs-tab {
    padding: 10px 0 20px;
  }
}
.vital-data {
  font-size: 32px;
  font-weight: 500;
}
</style>
