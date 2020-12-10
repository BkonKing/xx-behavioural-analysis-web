<template>
  <a-spin :spinning="loading" class="v-container" tip="数据正在加载中...">
    <div v-show="data && data.length" id="container"></div>
    <a-empty v-show="(!data || !data.length) && !loading" :image="simpleImage" />
  </a-spin>
</template>

<script>
import geoDatas from './Map'
import { Chart } from '@antv/g2'
import { setToolTipContent } from '@/utils/domUtil'
import { Empty } from 'ant-design-vue'
const DataSet = require('@antv/data-set')

export default {
  name: 'Map',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: [Number, String],
      default: 650
    },
    height: {
      type: [Number, String],
      default: 500
    },
    padding: {
      type: Array,
      default: () => [20, 20]
    }
  },
  data () {
    return {
      loading: true,
      ds: new DataSet(),
      mapChart: null,
      ChinaMap: null,
      userView: null
    }
  },
  beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  mounted () {
    this.initMap()
    this.initChinaMap()
    this.initData()
  },
  methods: {
    initMap () {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 400
      })
      chart.tooltip({
        showTitle: false,
        shared: true,
        customContent: (name, items) => {
          if (items.length > 0) {
            return setToolTipContent({
              title: items[0].name,
              color: items[0].color,
              label: '启动次数',
              values: [items[0].starttimesdis, items[0].value],
              hasContainer: false
            })
          }
          return document.createElement('div')
        }
      })
      // 同步度量
      chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      })
      chart.axis(false)
      chart.legend(false)
      this.mapChart = chart
    },
    initChinaMap () {
      // 绘制中国地图背景
      this.ChinaMap = this.ds.createView('back').source(geoDatas, {
        type: 'GeoJSON'
      })
      const ChinaMapView = this.mapChart.createView()
      ChinaMapView.data(this.ChinaMap.rows)
      ChinaMapView.tooltip(false)
      ChinaMapView.polygon()
        .position('longitude*latitude')
        .style({
          fill: '#fdfdfd',
          stroke: '#ddd',
          lineWidth: 1
        })
    },
    // 只初始化数据格式不渲染初始数据
    initData () {
      const userView = this.mapChart.createView()
      // 默认不渲染数据
      // const userDv = this.ds
      //   .createView()
      //   .source(this.data)
      //   .transform({
      //     geoDataView: this.ChinaMap,
      //     field: 'name',
      //     type: 'geo.region',
      //     as: ['longitude', 'latitude']
      //   })
      // userView.data(userDv.rows)
      userView
        .polygon()
        .position('longitude*latitude')
        .color('starttimes', '#BAE7FF-#1890FF-#0050B3')
        .tooltip('name*starttimes*starttimesdis', (name, starttimes, starttimesdis) => {
          return {
            name: name,
            value: starttimes,
            starttimesdis: starttimesdis + '%'
          }
        })
        .animate({
          leave: {
            animation: 'fade-out'
          }
        })
        .state({
          active: {
            style: {
              lineWidth: 0,
              fill: '#896ff4'
            }
          }
        })
      userView.interaction('element-active')
      this.userView = userView

      // this.mapChart.render()
    },
    loadData () {
      const userDv = this.ds
        .createView()
        .source(this.data)
        .transform({
          geoDataView: this.ChinaMap,
          field: 'name',
          type: 'geo.region',
          as: ['longitude', 'latitude']
        })
      this.userView.changeData(userDv.rows)
      this.mapChart.render()
    }
  },
  watch: {
    data (value, oldvalue) {
      setTimeout(() => {
        if (value.length >= oldvalue.length) {
          this.loading = false
        }
        this.loadData()
      }, 0)
    }
  }
}
</script>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 480px;
  min-height: 480px;
}
#container {
  width: 480px;
  height: 400px;
}
</style>
