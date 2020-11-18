<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <a-card>
      <a-row type="flex" :gutter="20">
        <a-col flex="650px">
          <a-map :data="chartData"></a-map>
        </a-col>
        <a-col flex="auto">
          <s-table
            ref="table"
            size="small"
            rowKey="key"
            :columns="columns"
            :data="loadTableData"
            style="margin-top: 20px;">
          </s-table>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table
        ref="detailTable"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadDetailTableData"
        style="margin-top: 20px;"
      >
      </s-table>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, STable, PopoverTip, aMap } from '@/components'
import { AREA_TIP } from './const'

const columns = [
  {
    dataIndex: 'index'
  },
  {
    title: '地域分布',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '启动次数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '启动 次数占比',
    dataIndex: 'address',
    key: 'address'
  }
]

export default {
  components: {
    AnalysisHeader,
    STable,
    PopoverTip,
    aMap
  },
  data () {
    return {
      reportTip: AREA_TIP.reportTip,
      tipName: AREA_TIP.tipName,
      tipList: AREA_TIP.tipList,
      columns,
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
      this.$refs.detailTable.refresh(true)
    },
    // 刷新图表数据
    loadChartData () {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData() })
      console.log('-----图表------')
      this.chartData = [
        {
          name: '北京市',
          value: 155
        },
        {
          name: '天津市',
          value: 43
        },
        {
          name: '河北省',
          value: 251
        },
        {
          name: '山西省',
          value: 431
        },
        {
          name: '内蒙古自治区',
          value: 414
        },
        {
          name: '辽宁省',
          value: 5
        },
        {
          name: '吉林省',
          value: 996
        },
        {
          name: '黑龙江省',
          value: 18
        },
        {
          name: '上海市',
          value: 266
        },
        {
          name: '江苏省',
          value: 897
        },
        {
          name: '浙江省',
          value: 303
        },
        {
          name: '安徽省',
          value: 854
        },
        {
          name: '福建省',
          value: 807
        },
        {
          name: '江西省',
          value: 601
        },
        {
          name: '山东省',
          value: 246
        },
        {
          name: '河南省',
          value: 707
        },
        {
          name: '湖北省',
          value: 372
        },
        {
          name: '湖南省',
          value: 487
        },
        {
          name: '广东省',
          value: 328
        },
        {
          name: '广西壮族自治区',
          value: 856
        },
        {
          name: '海南省',
          value: 972
        },
        {
          name: '重庆市',
          value: 537
        },
        {
          name: '四川省',
          value: 652
        },
        {
          name: '贵州省',
          value: 412
        },
        {
          name: '云南省',
          value: 962
        },
        {
          name: '西藏自治区',
          value: 525
        },
        {
          name: '陕西省',
          value: 243
        },
        {
          name: '甘肃省',
          value: 117
        },
        {
          name: '青海省',
          value: 880
        },
        {
          name: '宁夏回族自治区',
          value: 498
        },
        {
          name: '新疆维吾尔自治区',
          value: 268
        },
        {
          name: '台湾省',
          value: 955
        },
        {
          name: '香港特别行政区',
          value: 710
        },
        {
          name: '澳门特别行政区',
          value: 255
        }
      ]
    },
    // 刷新表格数据
    loadTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const requestParameters = this.getHeaderData()
          console.log('-----表格------')
          console.log(requestParameters)
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
    // 刷新详细表格数据
    loadDetailTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const requestParameters = this.getHeaderData()
          console.log('-----表格2------')
          console.log(requestParameters)
          console.log('-----表格2------')
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
