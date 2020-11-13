<template>
  <analysis-header ref="AnalysisHeader" :showSearchList="[]">
    <template v-slot:reportTip>
      <div v-html="reportTip"></div>
    </template>
    <a-card>
      <!-- <a-tabs default-active-key="1" @change="handleChange">
        <a-tab-pane key="1" tab="在线访客"> </a-tab-pane>
        <a-tab-pane key="2" tab="近期访客"> </a-tab-pane>
      </a-tabs> -->
      <s-table ref="table" size="default" rowKey="key" :columns="columns" :data="loadTableData"> </s-table>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, STable } from '@/components'
import { SAMPLE_TIP } from './const'

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
  name: 'UserSample',
  components: {
    AnalysisHeader,
    STable
  },
  data () {
    return {
      reportTip: SAMPLE_TIP.reportTip,
      columns
    }
  },
  methods: {
    // 刷新表格数据
    loadTableData () {
      return new Promise((resolve, reject) => {
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
    }
  }
}
</script>

<style></style>
