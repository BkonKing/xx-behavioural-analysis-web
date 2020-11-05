<template>
  <div>
    <analysis-header ref="a" reportTip="sss" :showSearchList="['rangeDate', 'channel', 'versions']">
    </analysis-header>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <a-row :gutter="24" type="flex" justify="space-between" align="middle" style="margin-bottom: 20px;">
          <a-col :span="12" type="flex">
            <a-input-search v-model="queryParam.id" @input="$refs.table.refresh(true)" style="margin-right: 16px; width: 272px;" />
            <popover-tip :tip-title="tipTitle" :tip-list="tipList"></popover-tip>
          </a-col>
          <a-col :span="12">
            <span style="float: right"><a-icon
              type="upload"
              :style="{ marginRight: '8px' }"
            />导出</span>
          </a-col>
        </a-row>
        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :alert="true"
          :rowSelection="rowSelection"
          showPagination="auto"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </span>
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleEdit(record)">配置</a>
              <a-divider type="vertical" />
              <a @click="handleSub(record)">订阅报警</a>
            </template>
          </span>
        </s-table>
      </a-card>
    </div>
    <!-- <div class="ant-card">
      <div class="ant-card-head"></div>
    </div> -->
  </div>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, Ellipsis } from '@/components'
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
  },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   title: '状态',
  //   dataIndex: 'status',
  //   scopedSlots: { customRender: 'status' }
  // },
  // {
  //   title: '更新时间',
  //   dataIndex: 'updatedAt',
  //   sorter: true
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    Ellipsis
  },
  data () {
    this.columns = columns
    return {
      tipTitle: '事件分析',
      tipList: [
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整事件被触'
        },
        {
          title: '事件数量(日均)：',
          content: '事件被触发的日均次数，数值向下取整'
        }
      ],
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getEventList(requestParameters)
          .then(res => {
            console.log(res)
            return res
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  }
}
</script>

<style>

</style>
