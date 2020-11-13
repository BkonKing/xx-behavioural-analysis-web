<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="dvData" :scale="scale">
      <v-tooltip :crosshairs="crosshairs" />
      <v-axis dataKey="value" />
      <v-legend />
      <v-line position="year*value" :size="2" color="type" />
      <v-area position="year*value" color="type" />
    </v-chart>
  </a-card>
</template>

<script>
import DataSet from '@antv/data-set'

const AProp = {
  type: Array,
  default: () => []
}

export default {
  name: 'StackedArea',
  props: {
    data: AProp,
    scale: AProp,
    tooltip: AProp,
    padding: AProp,
    height: {
      type: [Number, String],
      default: 500
    },
    transform: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      loading: true,
      dvData: [],
      crosshairs: { type: 'line' }
    }
  },
  created () {
    setTimeout(() => {
      this.loadingChange()
      this.transformData()
    })
  },
  methods: {
    loadingChange () {
      if (this.data.length > 0) {
        this.loading = false
      }
    },
    transformData () {
      const dv = new DataSet.View().source(this.data)
      dv.transform(this.transform)
      this.dvData = dv.rows
    }
  },
  watch: {
    data (value) {
      setTimeout(() => {
        this.loadingChange()
        this.transformData()
      })
    }
  }
}
</script>
