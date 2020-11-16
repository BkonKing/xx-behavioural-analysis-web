<template>
  <a-card :loading="loading" :bordered="false">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="[50, 50]">
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
    padding: AProp,
    height: {
      type: [Number, String],
      default: 500
    },
    position: {
      type: String,
      default: 'year*sales'
    }
  },
  data () {
    return {
      loading: true
    }
  },
  created () {
    setTimeout(() => {
      this.loadingChange()
    })
  },
  methods: {
    loadingChange () {
      if (this.data.length > 0) {
        this.loading = false
      }
    }
  },
  watch: {
    data (value) {
      setTimeout(() => {
        this.loadingChange()
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
