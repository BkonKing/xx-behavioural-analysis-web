<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="[50, 50]">
      <v-tooltip></v-tooltip>
      <v-axis />
      <v-line :position="position" color="#1890ff" />
      <v-legend></v-legend>
      <v-point :position="position" shape="circle" />
    </v-chart>
  </a-card>
</template>

<script>
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
    padding: AProp,
    height: {
      type: [Number, String],
      default: 500
    },
    position: {
      type: String,
      default: 'date*value'
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    loadingChange () {
      if (this.data.length > 0) {
        this.loading = false
      }
    }
  },
  watch: {
    data: {
      handler (value) {
        setTimeout(() => {
          this.loadingChange()
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
