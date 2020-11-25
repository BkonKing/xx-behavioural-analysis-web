<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" :showSearchList="[]">
    <div class="v-container" style="background: #fff;">
      <table-list v-model="ordertype" :title="sumTitle" :data="sumData" @change="gettimesharing"></table-list>
      <a-select v-model="type" size="small" style="width: 120px;margin: 10px 40px;" @change="gettimesharing">
        <a-select-option v-for="(item, i) in typeList" :key="i" :value="item.value">
          {{ item.text }}
        </a-select-option>
      </a-select>
      <stacked-area
        v-if="type < 3"
        color="type"
        position="name*value"
        :alias="alias"
        :legend="false"
        :data="sharingData"
        :transform="sharingTransform"
        :scale="sharingScale"
      ></stacked-area>
      <a-line
        v-else
        position="name*startusers"
        :showLegend="false"
        :data="sharingData"
        :scale="sharingLineScale"></a-line>
      <a-row class="data-card-container" style="border-top: 1px solid #e7e9f0;border-bottom: 1px solid #e7e9f0;">
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
      </a-row>
      <a-row class="data-card-container" style="padding: 0 20px 40px;">
        <a-col :span="24">
          <h3 class="data-card-title">地域分布<span class="data-card-condition">（近7日）</span></h3>
          <a-map :data="regiontData" :width="500"></a-map>
        </a-col>
      </a-row>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, aLine, StackedArea, ColorTable, aMap } from '@/components'
import TableList from './components/TableList'
import { getsum, gettimesharing, getsumpic } from '@/api/overview'

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
const sharingScale = [
  {
    dataKey: 'name',
    min: 0
  }
]
const sumTitle = [
  {
    text: '启动用户数',
    value: 1
  },
  {
    text: '启动次数',
    value: 2
  },
  {
    text: '新用户数',
    value: 3
  },
  {
    text: '次均使用时长',
    value: 4
  },
  {
    text: '人均使用时长',
    value: 5
  },
  {
    text: '人均日启动次数',
    value: 6
  }
]

export default {
  name: 'OverviewIndex',
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
        '应用概况是产品健康仪表盘，通过集中展现当前应用的核心数据指标（如：新用户数、启动用户数等）及主要报表的近7日趋势变化缩略图，帮助您快速了解应用的当前数据表现。',
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
      sharingLineScale: [],
      sharingData: [],
      sharingScale,
      sharingTransform: {},
      alias: '',
      sumData: [], // 汇总数据
      sumTitle,
      ordertype: 1, // 图表对比指标参数
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
      ], // 图表对比时间选项
      retainData: {}, // 留存
      retainColumns,
      regiontData: [], // 地域分布
      pageData: [],
      transObj: {},
      // 页面分析tooltip自定义显示内容
      pageContent (title, items) {
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
            '<td><span class="g2-tooltip-value">' +
            item.point._origin.edis +
            '%</span></td>' +
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
    this.gettimesharing()
    this.getsumpic()
  },
  methods: {
    // 获取汇总数据
    getsum () {
      getsum().then(({ data }) => {
        this.sumData = [
          {
            today: data.todaystartusers || 0,
            yesterday: data.yesdaystartusers || 0
          },
          {
            today: data.todaystarttimes || 0,
            yesterday: data.yestodaystarttimes || 0
          },
          {
            today: data.todaynewuser || 0,
            yesterday: data.yestodaynewuser || 0
          },
          {
            today: data.todaydurationuse || 0,
            yesterday: data.yestodaydurationuse || 0
          },
          {
            today: data.todayperusagetime || 0,
            yesterday: data.yestodayperusagetime || 0
          },
          {
            today: data.todayperstarttimes || 0,
            yesterday: data.yestodayperstarttimes || 0
          }
        ]
      })
    },
    // 汇总对比图表
    gettimesharing () {
      const params = {
        type: this.type,
        ordertype: this.ordertype
      }
      this.alias = this.sumTitle[this.ordertype - 1].text
      console.log('对比数据参数：' + JSON.stringify(params))
      gettimesharing(params).then(({ data }) => {
        if (this.type < 3) {
          this.transformTimeSharing(data.list)
        } else {
          this.transformDaySharing(data.list)
        }
      })
    },
    // 汇总对比图表数据转换(时段)
    transformTimeSharing (list) {
      const keys = Object.keys(list)
      const fields = list[keys[0]].map(obj => {
        return Object.keys(obj)[0]
      })
      this.sharingTransform = {
        type: 'fold',
        fields,
        key: 'type',
        value: 'value'
      }
      this.sharingData = keys.map(key => {
        return {
          name: key,
          [fields[0]]: list[key][0][fields[0]],
          [fields[1]]: list[key][1][fields[1]]
        }
      })
    },
    // 汇总对比图表数据转换(天)
    transformDaySharing (list) {
      this.sharingLineScale = [
        {
          dataKey: 'startusers',
          alias: this.alias,
          min: 0
        }
      ]
      this.sharingData = list
    },
    // 下半部分图表数据
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
    border-bottom: none;
    border-left-color: transparent;
  }
}
/deep/ .v-container {
  .ant-card-body {
    padding: 0;
  }
}
</style>
