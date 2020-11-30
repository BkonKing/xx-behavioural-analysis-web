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
        :height="270"
        :padding="[15, 80, 30]"
        :alias="alias"
        :legend="false"
        :data="sharingData"
        :transform="sharingTransform"
        :scale="sharingScale"
      ></stacked-area>
      <a-line
        v-else
        :height="270"
        :padding="[15, 80, 30]"
        :showLegend="false"
        :data="sharingData"
        :scale="sharingLineScale"
        :htmlContent="tooltipContent"
      ></a-line>
      <a-row
        class="data-card-container"
        style="border-top: 1px solid #e7e9f0;border-bottom: 1px solid #e7e9f0;margin-top: 30px;"
      >
        <a-col :span="12">
          <h3 class="data-card-title">新用户留存<span class="data-card-condition">（近7日）</span></h3>
          <color-table :data="retainData" :columns="retainColumns" :per-cent="true"></color-table>
        </a-col>
        <a-col :span="12" style="border-right-color: transparent;">
          <h3 class="data-card-title">页面分析<span class="data-card-condition">（近7日）</span></h3>
          <a-line
            class="page-line"
            ref="aline"
            color="page"
            position="name*value*edis"
            :showLegend="false"
            :height="300"
            :data="pageData"
            :htmlContent="pageContent"
            :padding="[25, 30, 34]"
          ></a-line>
        </a-col>
      </a-row>
      <a-row class="data-card-container" style="padding: 30px 40px;">
        <a-col :span="24">
          <h3 class="data-card-title">地域分布<span class="data-card-condition">（近7日）</span></h3>
          <a-map :data="regiontData" :width="500"></a-map>
        </a-col>
      </a-row>
    </div>
  </analysis-header>
</template>

<script>
import moment from 'moment'
import { AnalysisHeader, aLine, StackedArea, ColorTable, aMap } from '@/components'
import TableList from './components/TableList'
import { getsum, gettimesharing, getsumpic } from '@/api/overview'
import { setToolTipTable, setToolTipContent } from '@/utils/domUtil'

const retainColumns = [
  {
    title: '首次使用',
    dataIndex: 'name',
    width: 90,
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
    value: 1,
    key: 'startusers'
  },
  {
    text: '启动次数',
    value: 2,
    key: 'starttimes'
  },
  {
    text: '新用户数',
    value: 3,
    key: 'newusers'
  },
  {
    text: '次均使用时长',
    value: 4,
    key: 'durationtime'
  },
  {
    text: '人均使用时长',
    value: 5,
    key: 'percapitatime'
  },
  {
    text: '人均日启动次数',
    value: 6,
    key: 'percapitastartup'
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
      summaryList: [],
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
      // 页面分析tooltip自定义显示内容
      pageContent (title, items) {
        return setToolTipTable({
          title: [title, '访问次数', '占比'],
          items,
          key: 'edis',
          suffix: '%'
        })
      },
      tooltipContent (title, items) {
        return setToolTipContent({
          title: title,
          label: items[0].name,
          values:
            ['次均使用时长', '人均使用时长'].indexOf(items[0].name) > -1
              ? moment(items[0].value * 1000 - 28800000).format('HH:mm:ss')
              : items[0].value
        })
      }
    }
  },
  mounted () {
    this.getsum()
    this.gettimesharing()
    this.getsumpic()
  },
  computed: {
    sharingPosition () {
      return `name*${this.sumTitle[this.ordertype - 1].key}`
    }
  },
  methods: {
    // 获取汇总数据
    getsum () {
      getsum().then(({ data }) => {
        const {
          todaystartusers,
          yesdaystartusers,
          todaystarttimes,
          yestodaystarttimes,
          todaynewuser,
          yestodaynewuser,
          todaydurationuse,
          yestodaydurationuse,
          todayperusagetime,
          yestodayperusagetime,
          todayperstarttimes,
          yestodayperstarttimes
        } = data
        this.sumData = [
          {
            today: todaystartusers || 0,
            yesterday: yesdaystartusers || 0
          },
          {
            today: todaystarttimes || 0,
            yesterday: yestodaystarttimes || 0
          },
          {
            today: todaynewuser || 0,
            yesterday: yestodaynewuser || 0
          },
          {
            today: !todaydurationuse || todaydurationuse === '0' ? '00:00:00' : todaydurationuse,
            yesterday: !yestodaydurationuse || yestodaydurationuse === '0' ? '00:00:00' : yestodaydurationuse
          },
          {
            today: !todayperusagetime || todayperusagetime === '0' ? '00:00:00' : todayperusagetime,
            yesterday: !yestodayperusagetime || yestodayperusagetime === '0' ? '00:00:00' : yestodayperusagetime
          },
          {
            today: todayperstarttimes || 0,
            yesterday: yestodayperstarttimes || 0
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
      const fields = list[keys[0]].map(obj => Object.keys(obj)[0])
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
      const key = this.sumTitle[this.ordertype - 1].key
      this.sharingLineScale = [
        {
          dataKey: 'value',
          alias: this.alias
        }
      ]
      this.sharingData =
        list && list.length > 0
          ? list.map(obj => {
              return {
                name: obj.name,
                value: obj[key]
              }
            })
          : []
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
                page: obj.pathname,
                value: obj.starttimes,
                edis: obj.edis
              }
            })
          )
        })
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
    .data-card-condition {
      font-size: 12px;
      color: #808492;
    }
  }
  /deep/ .ant-col-12 {
    padding: 30px 40px;
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
/deep/ .ant-table-small {
  border: none;
}
/deep/ .ant-table-thead > tr > th {
  border-bottom: none;
}
/deep/ .color-table-container .color-table-tr .color-td,
/deep/ .color-table-container .row-header {
  height: 36px;
  line-height: 25px;
}
.page-line {
  /deep/ .ant-empty-normal {
    margin: 115px 0;
  }
}
</style>
