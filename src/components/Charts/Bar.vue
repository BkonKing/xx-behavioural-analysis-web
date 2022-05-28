<template>
  <a-spin :spinning="loading" tip="数据正在加载中..." :style="spinStyle">
    <v-chart
      v-if="data.length > 0"
      :forceFit="true"
      :height="height"
      :data="data"
      :scale="scale"
      :padding="padding">
      <slot>
        <template v-if="htmlContent">
          <v-tooltip :htmlContent="tooltipContent" />
        </template>
        <v-tooltip v-else />
        <slot name="axis">
          <v-axis />
        </slot>
        <v-bar :position="position" />
      </slot>
    </v-chart>
    <a-empty v-else-if="!loading" :image="simpleImage" />
  </a-spin>
</template>

<script>
import loadingMixin from './mixin'

export default {
  name: 'Bar',
  mixins: [loadingMixin],
  props: {
    // eslint-disable-next-line vue/require-default-prop
    htmlContent: Function
  },
  methods: {
    tooltipContent (title, items) {
      return this.htmlContent(title, items, this.alias)
    }
  }
}
</script>
