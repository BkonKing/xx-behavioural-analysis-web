<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" :showSearchList="[]">
    <div style="background: #fff;">
      <table-list :data="sumData"></table-list>
      <a-select v-model="type" size="small" style="width: 120px" @change="gettimesharing">
        <a-select-option v-for="(item, i) in typeList" :key="i" :value="item.value">
          {{ item.text }}
        </a-select-option>
      </a-select>
      <stacked-area :data="data1" :scale="scale1" :transform="transform"></stacked-area>
      <a-row class="data-card-container">
        <a-col :span="12">
          <h3 class="data-card-title">新用户留存<span class="data-card-condition">（近7日）</span></h3>
          <color-table :data="retainData" :columns="retainColumns" :per-cent="true"></color-table>
        </a-col>
        <a-col :span="12" style="border-right-color: transparent;">
          <h3 class="data-card-title">页面分析<span class="data-card-condition">（近7日）</span></h3>
          <a-line
            ref="aline"
            color="page"
            position="name*value*edis"
            :data="pageData"
            :transform="transObj"
            :htmlContent="pageContent"
            :padding="[50, 50, 80, 50]"
          ></a-line>
        </a-col>
        <a-col :span="12">
          <h3 class="data-card-title">地域分布<span class="data-card-condition">（近7日）</span></h3>
          <a-map :data="regiontData" :width="500"></a-map>
        </a-col>
        <a-col :span="12" style="border-right-color: transparent;">
          <h3 class="data-card-title">错误报告<span class="data-card-condition">（近7日）</span></h3>
          <a-line :data="data" :scale="scale"></a-line>
        </a-col>
      </a-row>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, aLine, StackedArea, ColorTable, aMap } from '@/components'
import TableList from './components/TableList'
import { getsum, gettimesharing, getsumpic } from '@/api/overview'

const data = [
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
const retainColumns = [
  {
    title: '首次使用',
    dataIndex: 'name',
    scopedSlots: { customRender: 'row-header' }
  },
  {
    title: '第2天',
    dataIndex: '2',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第3天',
    dataIndex: '3',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第4天',
    dataIndex: '4',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第5天',
    dataIndex: '5',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第6天',
    dataIndex: '6',
    scopedSlots: { customRender: 'color-td' }
  },
  {
    title: '第7天',
    dataIndex: '7',
    scopedSlots: { customRender: 'color-td' }
  }
]
const scale = [
  {
    dataKey: 'value',
    alias: '新用户数',
    min: 0
  }
]

const transform = {
  type: 'fold',
  fields: ['north', 'south'],
  key: 'type',
  value: 'value'
}

const scale1 = [
  {
    dataKey: 'year',
    min: 0,
    max: 1
  }
]
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    aLine,
    StackedArea,
    TableList,
    ColorTable,
    aMap
  },
  data () {
    return {
      reportTip:
        '应用概况是产品健康仪表盘，通过集中展现当前应用的核心数据指标（如：新用户数、启动用户数等）及主要报表的近7日趋势变化缩略图，帮助您快速了解应用的当前数据表现。详细介绍请见',
      summaryList: [
        {
          text: '启动用户数',
          value: '29'
        },
        {
          text: '新用户数',
          value: '29'
        },
        {
          text: '新用户占比',
          value: '29'
        },
        {
          text: '老用户数',
          value: '29'
        },
        {
          text: '老用户占比',
          value: '29'
        },
        {
          text: '启动次数',
          value: '29'
        },
        {
          text: '次均使用时长',
          value: '29'
        },
        {
          text: '人均使用时长',
          value: '2'
        }
      ],
      data,
      scale,
      data1: [],
      scale1,
      transform,
      sumData: [],
      type: 1, // 图表对比时间参数
      typeList: [
        {
          text: '今天对比昨天',
          value: 1
        },
        {
          text: '昨天对比前天',
          value: 2
        },
        {
          text: '近7天',
          value: 3
        },
        {
          text: '近30天',
          value: 4
        },
        {
          text: '近60天',
          value: 5
        }
      ], // 图表对比时间列表
      retainData: {}, // 留存
      retainColumns,
      regiontData: [], // 地域分布
      pageData: [],
      transObj: {
        type: 'fold',
        fields: [],
        key: 'page', // color对应的值
        value: 'value' // 对应值所转化的key
      },
      pageContent (title, items) {
        console.log(items)
        var html = '<div class="g2-tooltip">'
        var listDom = '<table class="g2-tooltip-list"><tbody>'
        listDom +=
          '<tr><td>' +
          title +
          '</td><td style="text-align:right;">访问次数</td><td style="text-align:right;">占比</td></tr>'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemDom =
            '<tr>' +
            '<td><span style="background-color:' +
            item.color +
            ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            item.name +
            '</td>' +
            '<td><span class="g2-tooltip-value">' +
            item.value +
            '</span></td>' +
            '</tr>'
          listDom += itemDom
        }
        listDom += '</tbody></table>'
        return html + listDom + '</div>'
      }
    }
  },
  mounted () {
    this.getsum()
    this.getsumpic()
    setTimeout(() => {
      this.data1 = [
        { name: '1996', north: 322, south: 162 },
        { name: '1997', north: 324, south: 90 },
        { name: '1998', north: 329, south: 50 },
        { name: '1999', north: 342, south: 77 },
        { name: '2000', north: 348, south: 35 },
        { name: '2001', north: 334, south: -45 },
        { name: '2002', north: 325, south: -88 },
        { name: '2003', north: 316, south: -120 },
        { name: '2004', north: 318, south: -156 },
        { name: '2005', north: 330, south: -123 },
        { name: '2006', north: 355, south: -88 },
        { name: '2007', north: 366, south: -66 },
        { name: '2008', north: 337, south: -45 },
        { name: '2009', north: 352, south: -29 },
        { name: '2010', north: 377, south: -45 },
        { name: '2011', north: 383, south: -88 },
        { name: '2012', north: 344, south: -132 },
        { name: '2013', north: 366, south: -146 },
        { name: '2014', north: 389, south: -169 },
        { name: '2015', north: 334, south: -184 }
      ]
    })
  },
  methods: {
    handleChange (a, b) {
      console.log(a, b)
    },
    // 获取汇总数据
    getsum () {
      getsum().then(({ data }) => {
        this.sumData = [
          {
            today: data.todaystartusers,
            yesterday: data.yesdaystartusers
          },
          {
            today: data.todaystarttimes,
            yesterday: data.yestodaystarttimes
          },
          {
            today: data.todaynewuser,
            yesterday: data.yestodaynewuser
          },
          {
            today: data.todaydurationuse,
            yesterday: data.yestodaydurationuse
          },
          {
            today: data.todayperusagetime,
            yesterday: data.yestodayperusagetime
          },
          {
            today: data.todayperstarttimes,
            yesterday: data.yestodayperstarttimes
          }
        ]
      })
    },
    // 汇总对比图表
    gettimesharing () {
      gettimesharing().then(({ data }) => {
        // this.data = data
      })
    },
    getsumpic () {
      getsumpic().then(({ data }) => {
        this.retainData = data.retainlist
        this.regiontData = data.geolist
        this.pageData = this.pageTransform(data.pagelist)
      })
    },
    // 页面分析数据转换
    pageTransform (data) {
      if (data) {
        const fields = []
        const arr = []
        Object.keys(data).forEach((key, index) => {
          arr.push(
            ...data[key].map(obj => {
              if (index === 0) {
                fields.push(obj.pathname)
              }
              return {
                name: key,
                [obj.pathname]: obj.starttimes,
                edis: obj.edis
              }
            })
          )
        })
        this.transObj = {
          type: 'fold',
          fields,
          key: 'page', // color对应的值
          value: 'value' // 对应值所转化的key
        }
        return arr
      }
      return []
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-table td {
  white-space: nowrap;
}
/deep/ .ant-page-header-content {
  padding-top: 0;
}
.data-card-container {
  border-top: 1px solid #e7e9f0;
  padding-bottom: 40px;
  .data-card-title {
    margin-top: 20px;
    .data-card-condition {
      font-size: 12px;
      color: #808492;
    }
  }
  /deep/ .ant-col-12 {
    padding: 10px 20px;
    border: 1px solid #e7e9f0;
    border-top: none;
    border-left-color: transparent;
  }
}
/deep/ .v-container {
  margin-left: -20px;
  .ant-card-body {
    padding: 0;
  }
}
</style>
