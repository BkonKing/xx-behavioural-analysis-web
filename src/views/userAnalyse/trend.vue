<template>
  <analysis-header ref="a" reportTip="sss" :showSearchList="['rangeDate', 'channel', 'versions']">
    <Summary></Summary>
  </analysis-header>
</template>

<script>
import { AnalysisHeader, Summary } from '@/components'
export default {
  name: 'UserTrend',
  components: {
    AnalysisHeader,
    Summary
  },
  methods: {
    aaa () {
      console.log(this.$refs.a)
      console.log(this.$refs.a.getSearchData())
    }
  }
}
</script>

<style>

</style>
