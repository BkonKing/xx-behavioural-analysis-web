<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="padding">
      <v-tooltip />
      <v-axis />
      <v-bar :position="position" />
    </v-chart>
  </a-card>
</template>

<script>
const AProp = {
  type: Array,
  default: () => []
}
export default {
  name: 'Bar',
  props: {
    data: AProp,
    scale: AProp,
    tooltip: AProp,
    padding: {
      type: Array,
      default: () => [50, 50]
    },
    height: {
      type: [Number, String],
      default: 500
    },
    position: {
      type: String,
      default: 'name*value'
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
