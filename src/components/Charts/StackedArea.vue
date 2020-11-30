<template>
  <a-spin
    :spinning="loading"
    tip="数据正在加载中..."
    :style="spinStyle"
  >
    <v-chart
      v-if="data.length > 0"
      :forceFit="true"
      :height="height"
      :data="dvData"
      :scale="scale"
      :padding="padding">
      <v-tooltip :htmlContent="htmlContent" />
      <v-axis data-key="name" :useHtml="true" :label="{ htmlTemplate: htmlTemplate, rotate: 45 }" />
      <v-legend v-if="legend" />
      <v-line :position="position" :size="2" :color="color" />
      <v-area :position="position" :color="color" />
    </v-chart>
    <a-empty v-else-if="!loading" :image="simpleImage" />
  </a-spin>
</template>

<script>
import loadingMixin from './mixin'
import DataSet from '@antv/data-set'
import moment from 'moment'

export default {
  name: 'StackedArea',
  mixins: [loadingMixin],
  props: {
    transform: {
      type: Object,
      default: () => {},
      required: true
    },
    color: {
      type: String,
      default: 'value'
    },
    legend: {
      type: Boolean,
      default: true
    },
    alias: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dvData: [],
      htmlTemplate (text, item, index) {
        if (index % 3 === 0) {
          return '<span style="white-space: nowrap;">' + text + '</span>'
        }
        return ''
      },
      tooltipContent (title, items, alias) {
        var html = '<div class="g2-tooltip">'
        var listDom = '<table class="g2-tooltip-list"><tbody>'
        listDom += '<tr><td>' + title + '</td><td style="text-align:right;">' + alias + '</td></tr>'
        for (var i = 0; i < items.length; i++) {
          var item = items[i]
          var itemDom =
            '<tr>' +
            '<td><span style="background-color:' +
            item.color +
            ';width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>' +
            moment(parseInt(item.name) * 1000).format('YYYY/MM/DD') +
            '</td>' +
            '<td><span class="g2-tooltip-value">' +
            (['次均使用时长', '人均使用时长'].indexOf(alias) > -1 ? moment(item.value * 1000 - 28800000).format('HH:mm:ss') : item.value) +
            '</span></td>' +
            '</tr>'
          listDom += itemDom
        }
        listDom += '</tbody></table>'
        return html + listDom + '</div>'
      }
    }
  },
  methods: {
    transformData () {
      const dv = new DataSet.View().source(this.data)
      dv.transform(this.transform)
      this.dvData = dv.rows
    },
    htmlContent (title, items) {
      return this.tooltipContent(title, items, this.alias)
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
