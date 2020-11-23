<template>
  <a-spin
    :spinning="loading"
    tip="数据正在加载中..."
    :style="{ height: `${typeof height === 'number' ? height + 'px' : height}` }"
  >
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <slot>
        <v-legend />
        <v-tooltip />
        <v-axis :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid" position="top" />
        <v-axis :tickLine="axis2Opts.tickLine" :grid="axis2Opts.grid" />
        <v-polygon
          :position="seriesOpts.position"
          :color="seriesOpts.color"
          :label="seriesOpts.label"
          :vStyle="seriesOpts.style"
        />
      </slot>
    </v-chart>
  </a-spin>
</template>

<script>
import loadingMixin from './mixin'

const axis1Opts = {
  dataKey: 'name',
  tickLine: null,
  grid: {
    align: 'center',
    lineStyle: {
      lineWidth: 1,
      lineDash: null,
      stroke: '#f0f0f0'
    }
  }
}

const axis2Opts = {
  dataKey: 'day',
  title: null,
  grid: {
    align: 'center',
    lineStyle: {
      lineWidth: 1,
      lineDash: null,
      stroke: '#f0f0f0'
    },
    showFirstLine: true
  }
}

const seriesOpts = {
  quickType: 'polygon',
  color: ['sales', '#BAE7FF-#1890FF-#0050B3'],
  position: 'name*day',
  label: [
    'sales',
    {
      offset: -2,
      alias: '留存率',
      textStyle: {
        fill: '#fff',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    }
  ],
  style: {
    lineWidth: 1,
    stroke: '#fff'
  }
}
export default {
  mixins: [loadingMixin],
  data () {
    return {
      axis1Opts,
      axis2Opts,
      seriesOpts
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding: 0;
}
</style>
