<template>
  <analysis-header ref="AnalysisHeader" :showSearchList="[]">
    <template v-slot:reportTip>
      <div v-html="reportTip"></div>
    </template>
    <a-card>
      <s-table ref="table" rowKey="name" :columns="columns" :data="loadTableData">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="time" slot-scope="text">
          {{ moment(parseInt(text) * 1000).format('YYYY/MM/DD HH:mm:ss') }}
        </span>
      </s-table>
    </a-card>
  </analysis-header>
</template>

<script>
import moment from 'moment'
import { AnalysisHeader, STable } from '@/components'
import { getvisitor } from '@/api/userAnalyse'
import { SAMPLE_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '访问时间',
    dataIndex: 'startup_time',
    scopedSlots: { customRender: 'time' }
  },
  {
    title: '版本',
    dataIndex: 'version'
  },
  {
    title: '地域',
    dataIndex: 'startup_province'
  },
  {
    title: '设备操作系统',
    dataIndex: 'os'
  },
  {
    title: '设备型号',
    dataIndex: 'equipment_number'
  },
  {
    title: '终端分辨率',
    dataIndex: 'resolving_power'
  },
  {
    title: '联网方式',
    dataIndex: 'networking_mode'
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
      columns,
      moment
    }
  },
  methods: {
    // 刷新表格数据
    loadTableData (page) {
      const params = Object.assign({}, page)
      return getvisitor(params)
    }
  }
}
</script>

<style></style>
