<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" :showSearchList="['rangeDate']" @change="loadAllData">
    <div class="v-container" style="padding: 20px;background: #fff;">
      <div>
        <span>指标：</span>
        <a-select v-model="indicator" size="small" style="width: 120px" @change="loadChartData">
          <a-select-option v-for="(item, i) in indicatorList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
        <span class="margin-left-large">版本：</span>
        <a-select mode="multiple" v-model="version" size="small" @blur="loadChartData">
          <a-select-option v-for="(item, i) in versionList" :key="i" :value="item.key">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <stacked-line :data="data" :transform="transObj" :scale="scale" :htmlContent="htmlContent"></stacked-line>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table
        ref="table"
        size="default"
        :bordered="true"
        rowKey="key"
        :columns="columns"
        :data="loadTableData"
        style="margin-top: 20px;"
      >
      </s-table>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, StackedLine } from '@/components'
import { VERSION_TIP } from './const'

const columns = [
  {
    dataIndex: 'index'
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: '日期'
  },
  {
    title: '启动用户数',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'UserVersion',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    StackedLine
  },
  data () {
    return {
      reportTip: VERSION_TIP.reportTip,
      tipName: VERSION_TIP.tipName,
      tipList: VERSION_TIP.tipList,
      indicator: 0,
      indicatorList: [
        {
          text: '新用户数',
          value: 0
        },
        {
          text: '升级用户',
          value: 1
        },
        {
          text: '启动用户数',
          value: 2
        },
        {
          text: '启动次数',
          value: 3
        }
      ],
      data: [],
      scale: [],
      transObj: {},
      version: [],
      versionList: [],
      columns,
      htmlContent (title, items) {
        console.log(items)
        var html = '<div class="g2-tooltip">'
        var listDom = '<table class="g2-tooltip-list"><tbody>'
        listDom += '<tr><td>' + title + '</td><td></td></tr>'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemDom =
            '<tr data-index={index}>' +
            '<td><span style="background-color:' +
            item.color +
            ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            item.name + '</td>' +
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
  created () {
    this.getVersionList()
  },
  mounted () {
    this.loadChartData(0)
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 获取版本列表
    getVersionList () {
      this.versionList = [
        {
          text: '1.0.1',
          key: 2
        },
        {
          text: '1.0.0',
          key: 1
        }
      ]
      this.version = this.versionList[0].key
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData(0)
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData (index) {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), indicator: this.indicator, version: this.version })
      console.log('-----图表------')
      this.transObj = {
        type: 'fold',
        fields: ['v1', 'v2'],
        key: 'city',
        value: 'temperature'
      }
      this.scale = [
        {
          dataKey: 'date',
          alias: 'sdfdf'
        }
      ]
      this.data = [
        { date: '2020-10-20', v1: 7.0, v2: 3.9 },
        { date: '2020-10-21', v1: 6.9, v2: 4.2 },
        { date: '2020-10-22', v1: 9.5, v2: 5.7 },
        { date: '2020-10-23', v1: 14.5, v2: 8.5 },
        { date: '2020-10-24', v1: 18.4, v2: 11.9 },
        { date: '2020-10-25', v1: 21.5, v2: 15.2 },
        { date: '2020-10-26', v1: 25.2, v2: 17.0 },
        { date: '2020-10-27', v1: 26.5, v2: 16.6 },
        { date: '2020-10-28', v1: 23.3, v2: 14.2 },
        { date: '2020-10-29', v1: 18.3, v2: 10.3 },
        { date: '2020-10-30', v1: 13.9, v2: 6.6 },
        { date: '2020-10-31', v1: 9.6, v2: 4.8 }
      ]
    },
    // 刷新表格数据
    loadTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          console.log('-----表格------')
          console.log(this.getHeaderData())
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
    }
  }
}
</script>

<style></style>
