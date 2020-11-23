<template>
  <a-spin
    :spinning="loading"
    tip="数据正在加载中..."
    :style="{ height: `${typeof height === 'number' ? height + 'px' : height}` }"
  >
    <v-chart :forceFit="true" :height="height" :data="dvData" :scale="scale">
      <v-tooltip :crosshairs="crosshairs" />
      <v-axis dataKey="value" />
      <v-legend />
      <v-line :position="position" :size="2" color="type" />
      <v-area :position="position" color="type" />
    </v-chart>
  </a-spin>
</template>

<script>
import loadingMixin from './mixin'
import DataSet from '@antv/data-set'

export default {
  name: 'StackedArea',
  mixins: [loadingMixin],
  props: {
    transform: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      dvData: [],
      crosshairs: { type: 'line' }
    }
  },
  methods: {
    transformData () {
      const dv = new DataSet.View().source(this.data)
      dv.transform(this.transform)
      this.dvData = dv.rows
    }
  },
  watch: {
    data: {
      handler (value) {
        this.transformData()
      }
    }
  }
}
</script>
