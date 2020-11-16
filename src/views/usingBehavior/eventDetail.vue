<template>
  <analysis-header ref="AnalysisHeader" @change="loadAllData">
    <template v-slot:eventlist>
      <div style="display: inline-block;">
        <a-select
          show-search
          placeholder="请选择"
          v-model="selectVal"
          size="small"
          option-filter-prop="children"
          style="width: 200px"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        >
          <a-select-option v-for="(item, i) in selectList" :key="i" :value="item.id">
            {{ item.value }}
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
        <a-row :gutter="24" type="flex" justify="space-between" align="middle" style="margin-bottom: 20px;">
          <a-col :span="12" type="flex">
            <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
          </a-col>
          <a-col :span="12">
            <span style="float: right"><a-icon type="upload" :style="{ marginRight: '8px' }" />导出</span>
          </a-col>
        </a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto">
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, aLine } from '@/components'
import { EVENTDETAIL_TIP } from './const'
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
  }
]
export default {
  name: 'UsingHabit',
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
        },
        {
          text: '事件平均使用时长',
          value: 2
        }
      ],
      selectVal: 2,
      selectList: [
        {
          id: 1,
          value: '登录'
        },
        {
          id: 2,
          value: '加入购物车'
        }
      ],
      columns,
      // 查询参数
      queryParam: {},
      // 图表
      scale: [],
      chartData: []
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
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'value',
          alias: '事件数量',
          min: 0
        }
      ]
      this.chartData = [
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
          console.log({ ...this.getHeaderData() })
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
