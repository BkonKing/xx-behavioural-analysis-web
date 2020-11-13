<template>
  <analysis-header ref="AnalysisHeader" @change="loadAssignData">
    <template v-slot:reportTip>
      <div style="margin-bottom: 10px;" v-for="(item, i) in reportTip" :key="i">
        <strong>{{ item.title }}</strong>
        <div>{{ item.content }}</div>
      </div>
    </template>
    <a-card>
      <a-tabs v-model="active" v-if="isNewFirst" @change="handleTabChange">
        <a-tab-pane key="1" tab="新用户首次使用留存">
          <div style="padding-bottom: 30px;">
            <div class="time-span">
              <span class="tac selected">#</span>
              <span class="tac">%</span>
            </div>
            <div class="time-span">
              <span class="tac selected">日</span>
              <span class="tac">周</span>
              <span class="tac">月</span>
              <a-popover class="icon-font" placement="leftBottom">
                <template slot="content">
                  某日/周/月的活跃用户中，在第2日/周/月之后，每日/周/月启动过程序的用户
                </template>
                <a-icon type="question-circle" />
              </a-popover>
            </div>
          </div>
          <color-piece :data="data" :scale="scale"></color-piece>
        </a-tab-pane>
        <a-tab-pane key="2" tab="新用户自定义留存">
          <a-row>
            <a-col :span="3">汇总数据</a-col>
            <a-col :span="7">
              <div>留存用户</div>
              <div>25</div>
            </a-col>
            <a-col :span="7">
              <div>新用户数</div>
              <div>25</div>
            </a-col>
            <a-col :span="7">
              <div>留存率</div>
              <div>25</div>
            </a-col>
          </a-row>
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
        </a-tab-pane>
      </a-tabs>
      <template v-else>
        <div style="padding-bottom: 30px;">
          <div class="time-span">
            <span class="tac selected">#</span>
            <span class="tac">%</span>
          </div>
          <div class="time-span">
            <span class="tac selected">日</span>
            <span class="tac">周</span>
            <span class="tac">月</span>
            <a-popover class="icon-font" placement="leftBottom">
              <template slot="content">
                某日/周/月的活跃用户中，在第2日/周/月之后，每日/周/月启动过程序的用户
              </template>
              <a-icon type="question-circle" />
            </a-popover>
          </div>
        </div>
        <color-piece :data="data" :scale="scale"></color-piece>
      </template>
    </a-card>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, STable, ColorPiece, PopoverTip } from '@/components'
import { RETAIN_TIP } from './const'

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
  name: 'RetainUser',
  components: {
    AnalysisHeader,
    STable,
    ColorPiece,
    PopoverTip
  },
  data () {
    return {
      reportTip: RETAIN_TIP.reportTip,
      tipName: RETAIN_TIP.tipName,
      tipList: RETAIN_TIP.tipList,
      isNewFirst: false, // 是否新用户留存
      active: '1',
      data: [],
      scale: [],
      columns
    }
  },
  created () {
    this.isNewFirst = this.$route.name === 'RetainUserNew'
  },
  mounted () {
    this.loadAssignData()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 刷新现在所需要的图表或表格
    loadAssignData (params) {
      if (this.isNewFirst) {
        this.handleTabChange()
      } else {
        this.loadChartData()
      }
    },
    // 新用户tab刷新图表或者表格
    handleTabChange () {
      if (this.active === '1') { // 新用户首次使用留存
        this.loadChartData()
      } else { // 新用户自定义留存
        this.$refs.table && this.$refs.table.refresh(true)
      }
    },
    // 刷新图表数据
    loadChartData () {
      console.log('-----图表------')
      console.log({ ...this.getHeaderData(), indicator: this.indicator })
      console.log('-----图表------')
      this.scale = [
        {
          dataKey: 'name',
          type: 'cat',
          values: ['新用户数', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天', '第15天', '第30天']
        },
        {
          dataKey: 'day',
          type: 'cat',
          values: ['2020/11/02', '2020/11/03', '2020/11/04', '2020/11/05', '2020/11/06']
        }
      ]
      const data = [
        [0, 0, 10],
        [0, 1, 19],
        [0, 2, 8],
        [0, 3, 24],
        [0, 4, 67],
        [1, 0, 92],
        [1, 1, 58],
        [1, 2, 78],
        [1, 3, 117],
        [1, 4, 48],
        [2, 0, 35],
        [2, 1, 15],
        [2, 2, 123],
        [2, 3, 64],
        [2, 4, 52],
        [3, 0, 72],
        [3, 1, 132],
        [3, 2, 114],
        [3, 3, 19],
        [3, 4, 16],
        [4, 0, 38],
        [4, 1, 5],
        [4, 2, 8],
        [4, 3, 117],
        [4, 4, 115],
        [5, 0, 88],
        [5, 1, 32],
        [5, 2, 12],
        [5, 3, 6],
        [5, 4, 120],
        [6, 0, 13],
        [6, 1, 44],
        [6, 2, 88],
        [6, 3, 98],
        [6, 4, 96],
        [7, 0, 31],
        [7, 1, 1],
        [7, 2, 82],
        [7, 3, 32],
        [7, 4, 30],
        [8, 0, 85],
        [8, 1, 97],
        [8, 2, 123],
        [8, 3, 64],
        [8, 4, 84],
        [9, 0, 47],
        [9, 1, 114],
        [9, 2, 31],
        [9, 3, 48],
        [9, 4, 91]
      ]
      const source = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const obj = {}
        obj.name = item[0]
        obj.day = item[1]
        obj.sales = item[2]
        source.push(obj)
      }

      this.data = source
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
  },
  watch: {
    $route (to, from) {
      this.isNewFirst = this.$route.name === 'RetainUserNew'
    }
  }
}
</script>

<style lang="less" scoped>
.time-span {
  float: right;
}

.time-span span {
  display: inline-block;
  border-radius: 2px;
  width: 30px;
  height: 28px;
  line-height: 28px;
  vertical-align: middle;
  text-align: center;
}

.time-span span.selected {
  background-color: #f3f4f9;
  color: #396fff;
}

.time-span span:hover {
  color: #396fff;
  cursor: pointer;
}

.icon-font {
  margin: 0 20px 0 10px;
  color: #808492;
}
</style>
