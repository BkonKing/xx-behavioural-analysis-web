<template>
  <div class="body-cont">
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout">
      <a-card>
        <div class="table-lsit dashboard-container">
          <div v-for="(item, i) in tableList" :key="i" class="table-item">
            <template v-if="i == 0">
              <div class="item-line1">
                <popover-tip :tip-name="tipName" :tip-list="tipList"><div slot="upload"></div></popover-tip>
              </div>
              <div class="item-line2">{{ item.today }}</div>
              <div class="item-line3">{{ item.yesterday }}</div>
            </template>
            <template v-else class="table-item">
              <div class="item-line1">{{ item.text }}</div>
              <div class="item-line2">{{ item.today }}</div>
              <div class="item-line3">{{ item.yesterday }}</div>
            </template>
          </div>
        </div>
        <div class="dashboard-container">
          <div>
            <span class="select-label">指标：</span>
            <a-select
              class="select-indicator"
              v-model="indicator"
              size="small"
              :dropdownMatchSelectWidth="false"
              @change="loadChartData"
            >
              <a-select-option v-for="(item, i) in indicatorList" :key="i" :value="item.value">
                {{ item.text }}
              </a-select-option>
            </a-select>
            <range-picker v-model="date" @change="loadChartData"></range-picker>
          </div>
          <a-line :data="chartData" :scale="scale" :height="height" :padding="paddingVal"></a-line>
          <!-- <div class="toggle-btn" @click="toggleChart"><a-icon :type="isDown ? 'down' : 'up'" /></div> -->
        </div>
      </a-card>

      <div class="dashboard-container">
        <div class="flex-list flex-list-tit">
          <div class="flex-name">应用名称</div>
          <div class="flex-right">
            <div class="list-flex">
              <div></div>
              <div>新用户数</div>
              <div>启动用户数</div>
              <div>启动次数</div>
              <div>累计启动用户</div>
              <div class="text-center">操作</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-container">
        <div class="flex-list flex-list-c">
          <div class="flex-name">用户行为数据分析系统</div>
          <div class="flex-right">
            <div class="list-flex">
              <div class="text-center">
                <div class="icon-block">
                  <div class="tel-icon"><a-icon type="android" theme="filled" /></div>
                  <div>
                    <span>今日</span>
                    <span>昨天</span>
                  </div>
                </div>
              </div>
              <div>
                <span>{{ dashboardJson.newuserand }}</span>
                <span>{{ dashboardJson.yestodaynewuserand }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaystartusersand }}</span>
                <span>{{ dashboardJson.yesdaystartusersand }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaystarttimesand }}</span>
                <span>{{ dashboardJson.yestodaystarttimesand }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaycumulativestartand }}</span>
                <span>{{ dashboardJson.yesdaycumulativestartand }}</span>
              </div>
              <div class="text-center">
                <a-button type="primary" ghost @click="goLink(1, 2)">查看报告</a-button>
              </div>
            </div>
            <div class="list-flex">
              <div class="text-center">
                <div class="icon-block">
                  <div class="tel-icon"><a-icon type="apple" theme="filled" /></div>
                  <div>
                    <span>今日</span>
                    <span>昨天</span>
                  </div>
                </div>
              </div>
              <div>
                <span>{{ dashboardJson.newuserios }}</span>
                <span>{{ dashboardJson.yestodaynewuserios }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaystartusersios }}</span>
                <span>{{ dashboardJson.yesdaystartusersios }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaystarttimesios }}</span>
                <span>{{ dashboardJson.yestodaystarttimesios }}</span>
              </div>
              <div>
                <span>{{ dashboardJson.todaycumulativestartios }}</span>
                <span>{{ dashboardJson.yesdaycumulativestartios }}</span>
              </div>
              <div class="text-center">
                <a-button type="primary" ghost @click="goLink(2, 2)">查看报告</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PopoverTip, aLine, RangePicker } from '@/components'
import store from '@/store'
import { DASHBOARD_TIP } from '../userAnalyse/const'
import { getDashboardJson, getDashboardChart } from '@/api/using'
export default {
  name: 'Dashboard',
  components: {
    PopoverTip,
    aLine,
    RangePicker
  },
  data () {
    return {
      tipName: DASHBOARD_TIP.tipName,
      tipList: DASHBOARD_TIP.tipList,
      tableList: [
        {
          text: '汇总数据',
          today: '今天',
          yesterday: '昨天'
        },
        {
          text: '新用户数',
          today: 1,
          yesterday: 2
        },
        {
          text: '启动用户数',
          today: 456,
          yesterday: 2
        },
        {
          text: '启动次数',
          today: 1,
          yesterday: 2
        },
        {
          text: '累计启动用户',
          today: 3,
          yesterday: 2
        }
      ],
      indicator: 1,
      indicatorList: [],
      date: '',
      isDown: true,
      chartData: [],
      scale: [],
      height: 350,
      paddingVal: [50, 40, 30, 50],
      dashboardJson: {}
    }
  },
  mounted () {
    this.getSummary()
    this.getDashboardJson()
  },
  methods: {
    getDashboardJson () {
      getDashboardJson().then(res => {
        this.dashboardJson = res.data
        this.tableList[1].today = res.data.newuser
        this.tableList[1].yesterday = res.data.yestodaynewuser
        this.tableList[2].today = res.data.todaystartusers
        this.tableList[2].yesterday = res.data.yesdaystartusers
        this.tableList[3].today = res.data.todaystarttimes
        this.tableList[3].yesterday = res.data.yestodaystarttimes
        this.tableList[4].today = res.data.todaycumulativestart
        this.tableList[4].yesterday = res.data.yesdaycumulativestart
      })
    },
    // 获取汇总数据
    getSummary () {
      this.indicatorList = [
        {
          text: '新用户数',
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
      ]
      this.loadChartData(0)
    },
    // 刷新图表数据
    loadChartData (index) {
      const param = Object.assign({
        date: this.date,
        ordertype: this.indicator
      })
      getDashboardChart(param).then(res => {
        this.scale = [
          {
            dataKey: 'value',
            alias: this.indicatorList[this.indicator - 1].text,
            min: 0
          }
        ]
        this.chartData = res.data.list.map(obj => {
          let chartVal = ''
          if (this.indicator === 1) {
            chartVal = obj.newusers
          } else if (this.indicator === 2) {
            chartVal = obj.startusers
          } else {
            chartVal = obj.starttimes
          }
          return {
            name: obj.name,
            value: chartVal
            // value: this.indicator === 0 ? obj.numberevents : obj.userevents
          }
        })
        console.log(22, this.chartData)
      })
    },
    // 图表高度修改
    toggleChart () {
      this.isDown = !this.isDown
      this.height = this.isDown ? 200 : 400
    },
    // 跳转 os_type
    goLink (osType, projectId) {
      store.commit('setOs_type', osType)
      this.$router.push({
        path: '/overview/index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@lineHeight50: 50px;
@fontSize: 12px;
@color808492: #808492;
@color343437: #343437;
@bg: #fff;
.flex {
  display: flex;
}
.flex-center {
  .flex();
  justify-content: center;
  align-items: center;
}
.flex-end {
  .flex();
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.mb20 {
  margin-bottom: 20px;
}
.body-cont {
  min-height: 100%;
  background-color: #f3f4f9;
  margin: -25px;
}
.dashboard-container {
  max-width: 1180px;
  margin: 0 auto;
  overflow: hidden;
}
.table-lsit {
  display: flex;
  .table-item {
    flex: 1;
    text-align: right;
  }
  .table-item:nth-child(1) {
    text-align: left;
  }
  .table-item:nth-child(1) .item-line2,
  .table-item:nth-child(1) .item-line3 {
    font-size: @fontSize;
    color: @color808492;
  }

  .item-line1 {
    font-size: @fontSize;
    color: @color808492;
    padding-top: 25px;
    .mb20();
  }
  .item-line2 {
    color: @color343437;
    font-size: 26px;
    min-height: 30px;
    line-height: 30px;
    .mb20();
  }
  .item-line3 {
    font-size: 16px;
    color: @color808492;
    .mb20();
    line-height: 1;
  }
}
.select-indicator {
  margin-right: 15px;
}
.flex-list {
  min-height: @lineHeight50;
  background-color: @bg;
  display: flex;
  .flex-name {
    flex-basis: 25%;
    text-align: center;
    line-height: @lineHeight50;
  }
  .flex-right {
    flex-basis: 75%;
    .list-flex:nth-child(2) {
      border-top: 1px solid #f3f4f9;
    }
  }
  .list-flex {
    .flex();
    min-height: @lineHeight50;
  }
}
.flex-list-tit {
  margin: 10px 0;
  .list-flex {
    div {
      line-height: @lineHeight50;
      flex: 1;
      text-align: right;
    }
  }
}
.flex-list-c {
  margin-bottom: 30px;
  .flex-name {
    .flex-center();
  }
  .flex-right {
    border-left: 1px solid #f3f4f9;
  }
  .list-flex {
    > div {
      color: @color343437;
      font-size: @fontSize;
      .flex-end();
      flex: 1;
      padding: 8px;
      line-height: 20px;
      span:nth-child(2) {
        color: @color808492;
      }
    }
  }
  .list-flex:nth-child(2) {
    .tel-icon {
      color: #06f;
    }
  }
}
.text-center {
  text-align: center !important;
  align-items: center !important;
}
.icon-block {
  .tel-icon {
    .flex-center();
    font-size: 16px;
    color: #396;
    margin-right: 20px;
  }
  .flex();
  div:nth-child(2) {
    .flex-end();
  }
}
.toggle-btn {
  height: 30px;
  width: 60px;
  cursor: pointer;
  margin: 0 auto;
  .flex-center();
  font-size: 16px;
}
</style>
