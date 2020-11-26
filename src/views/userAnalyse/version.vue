<template>
  <analysis-header ref="AnalysisHeader" :reportTip="reportTip" :showSearchList="['date']" @change="loadAllData">
    <div class="v-container" style="padding: 20px;background: #fff;">
      <div>
        <span>指标：</span>
        <a-select v-model="ordertype" size="small" style="width: 120px" @change="loadChartData">
          <a-select-option v-for="(item, i) in ordertypeList" :key="i" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
        <span class="margin-left-large">版本：</span>
        <a-select mode="multiple" v-model="version" size="small" @blur="loadChartData" style="min-width: 100px;">
          <span slot="removeIcon"></span>
          <a-select-option v-for="(item, i) in versionList" :key="i" :value="item.key">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <a-line
        ref="aline"
        color="version"
        position="name*value*dis"
        :data="data"
        :htmlContent="htmlContent"
        :alias="alias"
        :padding="[50, 50, 80, 50]"
      ></a-line>
      <a-divider></a-divider>
      <popover-tip :tip-name="tipName" :tip-list="tipList"></popover-tip>
      <s-table ref="table" rowKey="name" :columns="columns" :data="loadTableData" style="margin-top: 20px;">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
      </s-table>
    </div>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, PopoverTip, STable, aLine } from '@/components'
import { getversion, getversionpic } from '@/api/userAnalyse'
import { mapGetters } from 'vuex'
import { VERSION_TIP } from './const'

const columns = [
  {
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '版本',
    dataIndex: 'name'
  },
  {
    title: '升级用户',
    dataIndex: 'eupgradeusers'
  },
  {
    title: '新用户数',
    dataIndex: 'enewusers'
  },
  {
    title: '启动次数',
    dataIndex: 'estarttimes'
  },
  {
    title: '启动用户分布',
    dataIndex: 'estartusersdis'
  },
  {
    title: '次平均使用时长',
    dataIndex: 'avgusetime'
  }
]

export default {
  name: 'UserVersion',
  components: {
    AnalysisHeader,
    PopoverTip,
    STable,
    aLine
  },
  computed: {
    ...mapGetters(['versions'])
  },
  data () {
    return {
      reportTip: VERSION_TIP.reportTip,
      tipName: VERSION_TIP.tipName,
      tipList: VERSION_TIP.tipList,
      ordertype: 0,
      ordertypeList: [
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
      version: [],
      versionList: [],
      alias: '', // tooltip自定义别名
      columns,
      htmlContent (title, items, alias) {
        var html = '<div class="g2-tooltip">'
        var listDom = '<table class="g2-tooltip-list"><tbody>'
        listDom +=
          '<tr><td>' +
          title +
          '</td><td style="text-align:right;padding-left: 10px;">' + alias + '</td><td style="text-align:right;">占比</td></tr>'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemDom =
            '<tr>' +
            '<td><span style="background-color:' +
            item.color +
            ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            item.name +
            '</td>' +
            '<td><span class="g2-tooltip-value">' +
            item.value +
            '</span></td>' +
            '<td><span class="g2-tooltip-value">' +
            item.point._origin.dis +
            '%</span></td>' +
            '</tr>'
          listDom += itemDom
        }
        listDom += '</tbody></table>'
        return html + listDom + '</div>'
      }
    }
  },
  mounted () {
    this.getVersionList()
  },
  methods: {
    // 获取头部筛选条件数据
    getHeaderData () {
      return this.$refs.AnalysisHeader && this.$refs.AnalysisHeader.getSearchData()
    },
    // 获取版本列表
    getVersionList () {
      if (this.versions.length > 0) {
        this.versionList = this.versions
        this.version = [this.versionList[0].key]
        this.loadChartData()
      }
    },
    // 刷新图表和表格数据
    loadAllData (params) {
      this.loadChartData()
      this.$refs.table.refresh(true)
    },
    // 刷新图表数据
    loadChartData () {
      this.$refs.aline.switchLoading(true)
      const params = { ...this.getHeaderData(), version: this.version.join('、'), ordertype: this.ordertype + 1 }

      getversionpic(params).then(({ data }) => {
        this.data = this.versionsTransform(data.list)
        this.$refs.aline.switchLoading()
      })
    },
    // 图表数据转换
    versionsTransform (data) {
      this.transObj = {
        type: 'fold',
        fields: this.version,
        key: 'version', // color对应的值
        value: 'value' // 对应值所转化的key
      }
      this.alias = this.ordertypeList[this.ordertype].text
      if (data) {
        const arr = []
        Object.keys(data).forEach((key, index) => {
          arr.push(
            ...data[key].map(obj => {
              const version = Object.keys(obj)[0]
              return {
                version,
                name: key,
                value: obj[version].starttimes,
                dis: obj[version].dis
              }
            })
          )
        })
        return arr
      }
      return []
    },
    // 刷新表格数据
    loadTableData (page) {
      const params = this.getHeaderData()
      return getversion(params)
    }
  },
  watch: {
    version (val, oldVal) {
      if (val && val.length === 0 && oldVal && oldVal.length > 0) {
        this.version = oldVal
      }
    },
    versions (data) {
      this.getVersionList()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-select-selection__choice {
  padding-right: 10px;
}
</style>
