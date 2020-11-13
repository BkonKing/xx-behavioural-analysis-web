<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="dvData" :scale="scale" :padding="[50, 20, 100, 50]">
      <template v-if="htmlContent">
        <v-tooltip :htmlContent="htmlContent" />
      </template>
      <v-tooltip v-else />
      <v-axis />
      <v-legend />
      <v-line :position="position" color="city" />
      <v-point :position="position" color="city" :size="4" :shape="'circle'" />
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
  name: 'StackedLine',
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
    },
    position: {
      type: String,
      default: 'date*temperature'
    },
    // eslint-disable-next-line vue/require-default-prop
    htmlContent: Function
  },
  data () {
    return {
      loading: true,
      dvData: []
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

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding: 0;
}
</style>
