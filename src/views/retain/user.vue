<template>
  <analysis-header ref="AnalysisHeader" @change="loadAssignData">
    <template v-slot:reportTip>
      <div style="margin-bottom: 10px;" v-for="(item, i) in reportTip" :key="i">
        <strong>{{ item.title }}</strong>
        <div>{{ item.content }}</div>
      </div>
    </template>
    <a-card>
      <a-tabs v-model="active" v-if="isNewFirst" @change="handleTabChange">
        <a-tab-pane key="1" tab="新用户首次使用留存">
          <chart-box :data="data" :scale="scale" @change="handleChartChange"></chart-box>
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
        <chart-box :data="tableData" :scale="scale" @change="handleChartChange" style="margin-top: 20px;"></chart-box>
      </template>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, STable, PopoverTip } from '@/components'
import ChartBox from './chart'
import { getRetentionList } from '@/api/userAnalyse'
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
      active: '1',
      chartParams: { active: 0, dateActive: 0 },
      data: [],
      scale: [],
      columns,
      pagination: {},
      loading: false,
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
        // 新用户自定义留存
        this.getRetentionList()
      }
    },
    handleChartChange (params) {
      this.chartParams = params
      this.loadChartData()
    },
    // 刷新图表数据
    loadChartData () {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), ...this.chartParams })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'name',
          type: 'cat',
          values: ['新用户数', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天', '第15天', '第30天']
        },
        {
          dataKey: 'day',
          type: 'cat',
          values: ['2020/11/02', '2020/11/03', '2020/11/04', '2020/11/05', '2020/11/06']
        }
      ]
      const data = [
        [0, 0, 10],
        [0, 1, 19],
        [0, 2, 8],
        [0, 3, 24],
        [0, 4, 67],
        [1, 0, 92],
        [1, 1, 58],
        [1, 2, 78],
        [1, 3, 117],
        [1, 4, 48],
        [2, 0, 35],
        [2, 1, 15],
        [2, 2, 123],
        [2, 3, 64],
        [2, 4, 52],
        [3, 0, 72],
        [3, 1, 132],
        [3, 2, 114],
        [3, 3, 19],
        [3, 4, 16],
        [4, 0, 38],
        [4, 1, 5],
        [4, 2, 8],
        [4, 3, 117],
        [4, 4, 115],
        [5, 0, 88],
        [5, 1, 32],
        [5, 2, 12],
        [5, 3, 6],
        [5, 4, 120],
        [6, 0, 13],
        [6, 1, 44],
        [6, 2, 88],
        [6, 3, 98],
        [6, 4, 96],
        [7, 0, 31],
        [7, 1, 1],
        [7, 2, 82],
        [7, 3, 32],
        [7, 4, 30],
        [8, 0, 85],
        [8, 1, 97],
        [8, 2, 123],
        [8, 3, 64],
        [8, 4, 84],
        [9, 0, 47],
        [9, 1, 114],
        [9, 2, 31],
        [9, 3, 48],
        [9, 4, 91]
      ]
      const source = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const obj = {}
        obj.name = item[0]
        obj.day = item[1]
        obj.sales = item[2]
        source.push(obj)
      }

      setTimeout(() => {
        this.data = source
      })
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.getRetentionList()
    },
    // 刷新表格数据
    getRetentionList () {
      const { current } = this.pagination
      const params = { ...this.getHeaderData(), pageindex: current, pagesize: 10 }
      this.loading = true
      getRetentionList(params).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = 200
        this.loading = false
        this.newuserssum = data.newuserssum
        this.reminduserssum = data.reminduserssum
        this.reminddis = data.reminddis
        this.tableData = data.list
        this.pagination = pagination
      })
    }
  },
  watch: {
    $route (to, from) {
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
