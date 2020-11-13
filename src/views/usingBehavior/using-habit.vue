<template>
  <div>
    <analysis-header ref="a" reportTip="sss">
    </analysis-header>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="使用频率">
            <!-- Content of Tab Pane 1 -->
          </a-tab-pane>
          <a-tab-pane key="2" tab="访问深度" force-render>
            <!-- Content of Tab Pane 2 -->
          </a-tab-pane>
          <a-tab-pane key="3" tab="使用时长">
            <!-- Content of Tab Pane 3 -->
          </a-tab-pane>
          <a-tab-pane key="4" tab="使用间隔">
            <!-- Content of Tab Pane 4 -->
          </a-tab-pane>
        </a-tabs>
        <!-- end -->
        <div id="c1" style="margin: 40px 0"></div>
        <a-row :gutter="24" type="flex" justify="space-between" align="middle" style="margin-bottom: 20px;">
          <a-col :span="12" type="flex">
            <popover-tip :tip-name="tipName" :tip-title="tipTitle" :tip-list="tipList"></popover-tip>
          </a-col>
          <a-col :span="12">
            <span style="float: right"><a-icon
              type="upload"
              :style="{ marginRight: '8px' }"
            />导出</span>
          </a-col>
        </a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <!-- <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span>
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span> -->
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">配置</a>
              <a-divider type="vertical" />
              <a @click="handleSub(record)">订阅报警</a>
            </template>
          </span>
        </s-table>
      </a-card>
    </div>
    <!-- <div class="ant-card">
      <div class="ant-card-head"></div>
    </div> -->
  </div>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, Ellipsis } from '@/components'
import { Chart } from '@antv/g2'
import { getEventList } from '@/api/using'
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
  },
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
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      tipName: '指标说明1',
      tipTitle: '事件分析',
      tipList: [
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整事件被触'
        },
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整'
        }
      ],
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getEventList(requestParameters)
          .then(res => {
            console.log(res)
            return res
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      // 图表
      chart: '',
      chartData: []
    }
  },
  mounted () {
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
    // Step 1: 创建 Chart 对象
    this.chart = new Chart({
      container: 'c1', // 指定图表容器 ID
      autoFit: true,
      // width: 600, // 指定图表宽度
      height: 300 // 指定图表高度
    })
    // Step 2: 载入数据源
    this.chart.data(this.chartData)
    this.chart.scale('value', {
      nice: true
    })
    // Step 3: 创建图形语法，绘制折线图
    this.chart.tooltip({
      showMarkers: false
    })
    // this.chart.size(20)
    this.chart.interaction('active-region')
    this.chart.interval().position('time*value').size(15)
    // Step 4: 渲染图表
    this.chart.render()
  },
  created () {
    // this.chartLine()
  },
  methods: {
    callback (key) {
      console.log(key)
      this.chartData = [
        { time: '1991', value: 13 },
        { time: '1992', value: 24 },
        { time: '1993', value: 3.5 },
        { time: '1994', value: 5 },
        { time: '1995', value: 4.9 },
        { time: '1996', value: 6 }
      ]
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  watch: {
    chartData: { // 深度监听，可监听到对象、数组的变化
      handler (val, oldVal) {
        console.log(val, oldVal)
        this.chart.changeData(this.chartData)
        // 刷新表格
        // this.$refs.table.refresh()
      },
      deep: true // true 深度监听
    }
  }
}
</script>

<style>

</style>
