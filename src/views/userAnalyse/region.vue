<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip">
    <a-card>
      <a-row :gutter="20">
        <a-col :span="16">
          <a-map></a-map>
        </a-col>
        <a-col :span="8">
          <s-table
            ref="table"
            size="small"
            rowKey="key"
            :columns="columns"
            :data="loadData"
            style="margin-top: 20px;"
          >
          </s-table>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
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
      loadData: () => {
        return new Promise((resolve, reject) => {
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer']
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
}
</script>
