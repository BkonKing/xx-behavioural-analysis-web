<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div style="padding: 20px;background: #fff;">
      <a-tabs v-model="active" @change="loadAllData">
        <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.title"></a-tab-pane>
      </a-tabs>
      <div>
        <span>指标：</span>
        <a-select v-model="ordertype" size="small" :dropdownMatchSelectWidth="false" @change="loadChartData">
          <a-select-option v-for="(item, i) in ordertypeList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <bar :data="data" :scale="scale" :htmlContent="tooltipContent">
        <template v-slot:axis>
          <v-axis
            dataKey="value"
            :title="{
              autoRotate: false,
              offset: -1,
              text: [1,2,3].indexOf(ordertype) > -1 ? '%' : ' ',
              position: 'end',
              textStyle: { rotate: 0, fill: '#666' }
            }"
          />
        </template>
      </bar>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table ref="table" rowKey="name" :columns="columns" :data="loadTableData" style="margin-top: 20px;">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <!-- <span slot="percent" slot-scope="text">
          {{ text }}
        </span> -->
      </s-table>
    </div>
  </analysis-header>
</template>

<script>
import moment from 'moment'
import { AnalysisHeader, PopoverTip, STable, Bar } from '@/components'
import { getterminaldata, getterminalpic } from '@/api/userAnalyse'
import { setToolTipContent } from '@/utils/domUtil'
import { TERMINAL_TIP } from './const'
const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '品牌',
    dataIndex: 'name'
  },
  {
    title: '启动次数',
    dataIndex: 'estarttimes'
  },
  {
    title: '启动次数分布',
    dataIndex: 'estarttimedis'
    // scopedSlots: { customRender: 'percent' }
  },
  {
    title: '新用户分布',
    dataIndex: 'enewusersdis'
    // scopedSlots: { customRender: 'percent' }
  },
  {
    title: '启动用户分布',
    dataIndex: 'estartusersdis'
    // scopedSlots: { customRender: 'percent' }
  },
  {
    title: '次平均使用时长',
    dataIndex: 'avgusetime'
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
      ordertype: 0,
      ordertypeList: [
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
      columns,
      tooltipContent (title, items) {
        return setToolTipContent({
          title: items[0].title,
          label: items[0].name,
          values:
            ['次均使用时长'].indexOf(items[0].name) > -1
              ? moment(items[0].value * 1000 - 28800000).format('HH:mm:ss')
              : items[0].value,
          suffix: ['启动次数分布', '新用户分布', '启动用户分布'].indexOf(items[0].name) > -1 ? '%' : ''
        })
      }
    }
  },
  mounted () {
    this.loadChartData()
  },
  methods: {
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
      const params = { ...this.getHeaderData(), terminal: this.active + 1, ordertype: this.ordertype + 1 }
      getterminalpic(params).then(({ data }) => {
        this.scale = [
          {
            dataKey: 'value',
            alias: this.ordertypeList[this.ordertype].text
          }
        ]
        const valueList = ['estarttimes', 'estarttimedis', 'enewusersdis', 'estartusersdis', 'avgusetime']
        this.data = data.list
          ? data.list.map(obj => {
              return {
                name: obj.name,
                value: parseInt(obj[valueList[this.ordertype]])
              }
            })
          : []
      })
    },
    // 刷新表格数据
    loadTableData () {
      const params = { ...this.getHeaderData(), terminal: this.active + 1 }
      return getterminaldata(params)
    }
  }
}
</script>

<style></style>
