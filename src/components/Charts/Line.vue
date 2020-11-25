<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="dvData" :scale="scale" :padding="padding">
      <slot>
        <template v-if="htmlContent">
          <v-tooltip :htmlContent="(title, items) => htmlContent(title, items, alias)" />
        </template>
        <v-tooltip v-else />
        <v-axis />
        <template v-if="showLegend">
          <v-legend />
        </template>
        <v-line :position="position" :color="color" />
        <v-point :position="position" :color="color" :size="4" shape="circle" />
      </slot>
    </v-chart>
  </a-card>
</template>

<script>
import DataSet from '@antv/data-set'
import loadingMixin from './mixin'

export default {
  name: 'ALine',
  mixins: [loadingMixin],
  props: {
    transform: {
      type: Object,
      default: () => {
        return {}
      }
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
    },
    showLegend: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dvData: []
    }
  },
  methods: {
    transformData () {
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
        this.transformData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-card-body {
  padding: 0;
}
</style>
