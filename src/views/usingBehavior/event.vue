<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <popover-tip :tip-list="tipList" @exportFile="exportFile">
          <template v-slot:search>
            <a-input-search
              size="small"
              placeholder="请输入页面名称"
              v-model="search"
              @search="$refs.table.refresh(true)"
              style="margin-right: 16px; width: 272px;"
            />
          </template>
        </popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="name"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto"
        >
          <a slot="eventname" slot-scope="text, record" @click="goDetail(record.name)">{{ text }}</a>
        </s-table>
      </a-card>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, Ellipsis } from '@/components'
import { EVENT_TIP } from './const'
import { getEventList } from '@/api/using'

const columns = [
  // {
  //   scopedSlots: { customRender: 'serial' }
  // },
  {
    title: '事件名称',
    dataIndex: 'eventname',
    scopedSlots: { customRender: 'eventname' }
    // scopedSlots: { customRender: 'serial' }
  },
  {
    title: '事件ID',
    dataIndex: 'name'
  },
  {
    title: '事件数量(日均)',
    dataIndex: 'numberevents'
  },
  {
    title: '触发用户数(日均)',
    dataIndex: 'userevents'
  }
]

export default {
  name: 'UserEvent',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      reportTip: EVENT_TIP.reportTip,
      tipName: EVENT_TIP.tipName,
      tipList: EVENT_TIP.tipList,
      search: '',
      // 查询参数
      queryParam: {}
    }
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新表格数据
    loadAllData () {
      this.$refs.table.refresh(true)
    },
    // 刷新表格数据
    loadTableData (page) {
      const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
      console.log('-----表格------')
      // console.log(requestParameters)
      console.log('-----表格------')
      const param = Object.assign(
        {
        'search': this.search || '[]'
      }, page, requestParameters)
      console.log(param)
      return getEventList(param)
    },
    // 导出csv文件
    exportFile () {
      console.log('导出')
    },
    goDetail (id) {
      this.$router.push({
        path: '/usingBehavior/eventdetail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style></style>
