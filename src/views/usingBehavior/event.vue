<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" @change="loadAllData">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <popover-tip :tip-list="tipList">
          <template v-slot:search>
            <a-input-search
              size="small"
              placeholder="请输入页面名称"
              v-model="queryParam.id"
              @search="$refs.table.refresh(true)"
              style="margin-right: 16px; width: 272px;"
            />
          </template>
        </popover-tip>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadTableData"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
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
  {
    title: '#',
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
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updatedAt',
  //   sorter: true
  // }
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
    loadTableData () {
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const requestParameters = { ...this.getHeaderData(), ...this.queryParam }
          console.log('-----表格------')
          console.log(requestParameters)
          console.log('-----表格------')
          getEventList(requestParameters).then(res => {
            return res
          })
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
