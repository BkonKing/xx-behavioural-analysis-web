<template>
  <a-card :loading="loading" class="v-container" :bordered="false">
    <v-chart :width="650" :height="500" :padding="padding" :scale="scale">
      <v-tooltip :htmlContent="htmlContent" />
      <v-legend data-key="value" position="left" />
      <v-view :data="geoData" :scale="scale">
        <v-polygon :position="view1Opts.position" :vStyle="view1Opts.style" :tooltip="view1Opts.tooltip" />
      </v-view>
      <v-view :data="dvData">
        <v-polygon
          :position="view2Opts.position"
          :opacity="view2Opts.opacity"
          :color="view2Opts.color"
          :animate="view2Opts.animate"
          :tooltip="view2Opts.tooltip"
        />
      </v-view>
    </v-chart>
  </a-card>
</template>

<script>
import geoDatas from './Map'
const DataSet = require('@antv/data-set')

const scale = [
  {
    dataKey: 'longitude',
    sync: true
  },
  {
    dataKey: 'latitude',
    sync: true
  }
]

const view1Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  style: {
    fill: '#fdfdfd',
    stroke: '#ddd',
    lineWidth: 1
  },
  tooltip: false
}

const view2Opts = {
  quickType: 'polygon',
  position: 'longitude*latitude',
  opacity: 'starttimes',
  color: ['starttimes', '#BAE7FF-#1890FF-#0050B3'],
  tooltip: 'name*starttimes*starttimesdis',
  animate: {
    leave: {
      animation: 'fadeOut'
    }
  }
}

export default {
  name: 'Map',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: true,
      dvData: [],
      padding: [20, 20],
      geoData: [],
      scale,
      view1Opts,
      view2Opts,
      ChinaMap: null,
      htmlContent: function htmlContent (title, items) {
        var html = '<div class="g2-tooltip">'
        var listDom = '<ul class="g2-tooltip-list">'
        var itemDom =
          '<li style="border-bottom: 1px solid #eee;">' +
          items[0].value +
          '</li>' +
          '<li>' +
          '<span style="background-color:' +
          items[0].color +
          ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
          '启动次数' +
          '<span class="g2-tooltip-value">' +
          items[2].value +
          '%</span>' +
          '<span class="g2-tooltip-value">' +
          items[1].value +
          '</span>' +
          '</li>'
        listDom += itemDom
        listDom += '</ul>'
        return html + listDom + '</div>'
      }
    }
  },
  mounted () {
    const mapData = {
      type: 'FeatureCollection',
      features: geoDatas
    }
    this.geoData = new DataSet.View().source(mapData, {
      type: 'GeoJSON'
    })
  },
  methods: {
    loadMap () {
      this.loading = false

      const userDv = new DataSet.View().source(this.data).transform({
        geoDataView: this.geoData,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      })

      this.dvData = userDv
    }
  },
  watch: {
    data (val) {
      setTimeout(() => {
        val.length && this.loadMap()
      }, 0)
    }
  }
}
</script>

<style>
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
