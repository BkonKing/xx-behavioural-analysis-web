<template>
  <div class="color-table-container">
    <a-table
      size="small"
      rowKey="name"
      :rowClassName="() => 'color-table-tr'"
      :dataSource="tableData"
      :columns="columns"
      :bordered="false"
      :pagination="false"
      :loading="loading"
    >
      <div class="row-header" slot="row-header" slot-scope="text" :title="text">{{ text }}</div>
      <div class="color-td" slot="color-td" slot-scope="text" :title="text" :style="{ background: setColor(text) }">
        {{ text ? text : '' }}{{ text && perCent ? '%' : '' }}
      </div>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'ColorTable',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    columns: {
      type: Array,
      default: () => [
        {
          title: '日期',
          dataIndex: 'name',
          scopedSlots: { customRender: 'row-header' }
        },
        {
          title: '新用户数',
          dataIndex: 'eremindusers',
          scopedSlots: { customRender: 'row-header' }
        },
        {
          title: '第2天',
          dataIndex: 'enewusers',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第3天',
          dataIndex: 'ereminddis',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第4天',
          dataIndex: '1',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第5天',
          dataIndex: '2',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第6天',
          dataIndex: '3',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第7天',
          dataIndex: '4',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第15天',
          dataIndex: '5',
          scopedSlots: { customRender: 'color-td' }
        },
        {
          title: '第30天',
          dataIndex: '6',
          scopedSlots: { customRender: 'color-td' }
        }
      ]
    },
    perCent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableData: [],
      loading: false,
      maxNum: 0,
      colorReg: /^#?[0-9A-Fa-f]{6}$/,
      level: [1, 1, 1]
    }
  },
  methods: {
    // 数据转换
    transform () {
      let maxNum = 0
      this.tableData = Object.keys(this.data).map((key, i) => {
        const colData = {}
        const dis = this.data[key].dis
        maxNum = Math.max(maxNum, ...dis)
        dis.forEach((obj, index) => {
          const ikey = this.columns[index + 1]
          if (ikey && ikey.dataIndex) {
            colData[ikey.dataIndex] = obj || ''
          }
        })
        return { name: key, ...colData }
      })
      this.maxNum = maxNum
    },
    // 根据数值生成色值
    setColor (num) {
      if (num) {
        let level = 1 - parseFloat(num) / this.maxNum
        if (level !== 0) {
          level = level / 1.5
        }
        return this.getLightColor('#1890ff', level)
      }
    },
    // hex颜色转rgb颜色
    HexToRgb (str) {
      // test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
      if (!this.colorReg.test(str)) return
      // replace替换查找的到的字符串
      str = str.replace('#', '')
      // match得到查询数组
      const hxs = str.match(/../g)
      // alert('bf:'+hxs)
      for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
      // alert(parseInt(80, 16))
      // console.log(hxs);
      return hxs
    },
    // GRB颜色转Hex颜色
    RgbToHex (a, b, c) {
      const r = /^\d{1,3}$/
      if (!r.test(a) || !r.test(b) || !r.test(c)) return
      const hexs = [a.toString(16), b.toString(16), c.toString(16)]
      for (let i = 0; i < 3; i++) if (hexs[i].length === 1) hexs[i] = '0' + hexs[i]
      return '#' + hexs.join('')
    },

    // 得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
    getDarkColor (color, level) {
      if (!this.colorReg.test(color)) return
      const rgbc = this.HexToRgb(color)
      // floor 向下取整
      for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
      return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
    },
    // 得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
    getLightColor (color, level) {
      if (!this.colorReg.test(color)) return
      const rgbc = this.HexToRgb(color)
      for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
      return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2])
    }
  },
  watch: {
    data: {
      handler (value, oldvalue) {
        this.transform()
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.color-table-container {
  /deep/ .ant-table-small {
    table {
      padding-bottom: 10px;
    }
    .ant-table-tbody > tr > td {
      border-bottom: none;
      padding: 0 !important;
    }
    .ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
      background: #fff;
    }
    > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
      padding-left: 3px;
    }
  }
  .row-header,.color-table-tr .color-td {
    height: 48px;
    line-height: 37px;
    border: 3px solid #fff;
    border-top-width: 8px;
  }
  .color-table-tr .color-td {
    padding-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    background: #f7f7fa;
  }
}
</style>
