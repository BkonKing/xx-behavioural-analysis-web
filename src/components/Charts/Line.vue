<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="dvData" :scale="scale" :padding="padding">
      <template v-if="htmlContent">
        <v-tooltip :htmlContent="(title, items) => htmlContent(title, items, alias)" />
      </template>
      <v-tooltip v-else />
      <v-axis />
      <v-legend />
      <v-line :position="position" :color="color" />
      <v-point :position="position" :color="color" :size="4" shape="circle" />
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
  name: 'ALine',
  props: {
    data: AProp,
    scale: AProp,
    tooltip: AProp,
    padding: {
      type: Array,
      default: () => [50, 20, 100, 50]
    },
    height: {
      type: [Number, String],
      default: 500
    },
    transform: {
      type: Object,
      default: () => {
        return {}
      }
    },
    position: {
      type: String,
      default: 'name*value'
    },
    // eslint-disable-next-line vue/require-default-prop
    htmlContent: Function,
    color: {
      type: String,
      default: '#1890ff'
    },
    alias: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: true,
      dvData: []
    }
  },
  methods: {
    loadingChange () {
      if (this.data.length > 0) {
        this.loading = false
      }
    },
    transformData () {
      console.log(this.transform)
      if (Object.keys(this.transform).length > 0) {
        const dv = new DataSet.View().source(this.data)
        dv.transform(this.transform)
        this.dvData = dv.rows
      } else {
        this.dvData = this.data
      }
    }
  },
  watch: {
    data: {
      handler (value) {
        setTimeout(() => {
          this.loadingChange()
          this.transformData()
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding: 0;
}
</style>
