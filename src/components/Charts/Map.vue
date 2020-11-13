<template>
  <div class="v-container">
    <v-chart :forceFit="true" :height="400" :padding="padding" :data="geoData">
      <v-tooltip :htmlContent="htmlContent" />
      <v-view :data="geoData"><div></div></v-view>
      <v-view :data="data">
        <v-polygon :position="polygonOpts.position" :vStyle="polygonOpts.style" :color="polygonOpts.color" />
      </v-view>
    </v-chart>
  </div>
</template>

<script>
import * as _ from 'lodash'
const DataSet = require('@antv/data-set')
const colors = [
  '#3366cc',
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac'
]

const polygonOpts = {
  position: 'longitude*lantitude',
  // label: [
  //   'name',
  //   {
  //     textStyle: {
  //       fill: '#fff',
  //       fontSize: 12,
  //       shadowBlur: 2,
  //       shadowColor: 'rgba(0, 0, 0, .45)'
  //     }
  //   }
  // ],
  style: [
    'name',
    {
      textStyle: {
        fill: '#fff',
        fontSize: 14,
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    }
  ],
  color: ['value', '#BAE7FF-#1890FF-#0050B3']
}
export default {
  name: 'Map',
  data () {
    return {
      data: [],
      padding: ['auto', 'auto', 0, 0],
      geoData: {},
      polygonOpts,
      name: '',
      currentAreaNode: null,
      districtExplorer: null,
      htmlContent: function htmlContent (title, items) {
        var html = '<div class="g2-tooltip">'
        var listDom = '<ul class="g2-tooltip-list">'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemDom =
            '<li data-index={index}>' +
            '<span style="background-color:' +
            item.color +
            ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            item.point._origin.name +
            '<span class="g2-tooltip-value">' +
            item.value +
            '</span>' +
            '</li>'
          listDom += itemDom
        }
        listDom += '</ul>'
        return html + listDom + '</div>'
      }
    }
  },
  mounted () {
    // 调用高德 api 绘制底图以及获取 geo 数据
    // eslint-disable-next-line no-undef
    const map = new AMap.Map('china', {
      zoom: 4
    })

    // eslint-disable-next-line no-undef
    AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], DistrictExplorer => {
      // 创建一个实例
      const districtExplorer = (window.districtExplorer = new DistrictExplorer({
        eventSupport: true, // 打开事件支持
        map: map
      }))

      this.districtExplorer = districtExplorer

      this.switch2AreaNode(100000)
    })
  },
  methods: {
    // 切换区域后刷新显示内容
    refreshAreaNode (areaNode) {
      const districtExplorer = this.districtExplorer
      districtExplorer.setHoverFeature(null)
      this.renderAreaPolygons(areaNode)
    },
    // 加载区域
    loadAreaNode (adcode, callback) {
      const self = this
      const currentAreaNode = this.currentAreaNode
      const districtExplorer = this.districtExplorer

      districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
        if (error) {
          if (callback) {
            callback(error)
          }
          return
        }

        const adcode = areaNode.getAdcode()
        const geoJSON = areaNode.getSubFeatures() // 获取 geoJSON 数据
        const name = areaNode.getName()
        if (!geoJSON || (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode)) {
          return
        }

        const mapData = {
          type: 'FeatureCollection',
          features: geoJSON
        }
        // 构造虚拟数据
        const userData = []
        for (let i = 0; i < geoJSON.length; i++) {
          const name = geoJSON[i].properties.name
          userData.push({
            name: name,
            value: Math.round(Math.random() * 1000)
          })
        }

        const ds = new DataSet()
        const geoDataView = ds.createView().source(mapData, {
          type: 'GeoJSON'
        }) // geoJSON 经纬度数据

        console.log(geoDataView)

        // 用户数据
        const dvData = ds.createView().source(userData)
        dvData.transform({
          type: 'geo.region',
          field: 'name',
          geoDataView: geoDataView,
          as: ['longitude', 'lantitude']
        })

        self.$data.geoData = geoDataView
        self.$data.data = dvData
        self.$data.name = name

        if (callback) {
          callback(null, areaNode)
        }
      })
    },
    // 绘制某个区域的边界
    renderAreaPolygons (areaNode) {
      const districtExplorer = this.districtExplorer
      const node = _.cloneDeep(areaNode)
      districtExplorer.clearFeaturePolygons()
      districtExplorer.renderSubFeatures(node, function (feature, i) {
        const fillColor = colors[i % colors.length]
        const strokeColor = colors[colors.length - 1 - (i % colors.length)]

        return {
          cursor: 'default',
          bubble: true,
          strokeColor: strokeColor, // 线颜色
          strokeOpacity: 1, // 线透明度
          strokeWeight: 1, // 线宽
          fillColor: fillColor, // 填充色
          fillOpacity: 0.35 // 填充透明度
        }
      })

      // 绘制父区域
      districtExplorer.renderParentFeature(node, {
        cursor: 'default',
        bubble: true,
        strokeColor: 'black', // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 1, // 线宽
        fillColor: null, // 填充色
        fillOpacity: 0.35 // 填充透明度
      })
    },
    // 切换区域
    switch2AreaNode (adcode, callback = null) {
      const currentAreaNode = this.currentAreaNode
      if (currentAreaNode && '' + currentAreaNode.getAdcode() === '' + adcode) {
        return
      }

      this.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          if (callback) {
            callback(error)
          }
          return
        }
        window.currentAreaNode = areaNode

        this.currentAreaNode = areaNode
        this.refreshAreaNode(areaNode)
        if (callback) {
          callback(null, areaNode)
        }
      })
    }
  }
}
</script>

<style scoped>
.g2-tooltip-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.g2-tooltip-value {
  margin-left: 30px;
  display: inline;
  float: right;
}

.g2-tooltip-statistic {
  font-size: 14px;
  padding-bottom: 10px;
  margin-top: 10px;
  list-style-type: none;
}

.g2-tooltip-statistic-value {
  font-weight: 'bold';
  display: 'inline-block';
  float: right;
  margin-left: 30px;
}
</style>
