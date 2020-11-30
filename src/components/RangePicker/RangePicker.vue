<template>
  <a-range-picker
    v-model="rangeDate"
    :placeholder="['自定义时间段']"
    size="small"
    :allowClear="false"
    :inputReadOnly="true"
    :disabled-date="disabledDate"
    :ranges="ranges"
    :format="format"
    style="width: 186px;"
    @change="handleChange"
  >
    <a-icon slot="suffixIcon" type="down" :style="{ fontSize: '12px', marginTop: '-6px', color: '#00000040' }" />
  </a-range-picker>
</template>

<script>
import moment from 'moment'

export default {
  name: 'RangePicker',
  props: {
    data: {
      type: [String, Array],
      default: ''
    },
    disabledDate: {
      type: Function,
      // 不能选择今天之后的日期
      default (current) {
        return current && current > moment().endOf('day')
      }
    },
    ranges: {
      type: Object,
      default: () => ({
        今天: [moment(), moment()],
        昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        最近7天: [moment().subtract(6, 'days'), moment()],
        最近30天: [moment().subtract(29, 'days'), moment()],
        最近60天: [moment().subtract(59, 'days'), moment()]
      })
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data () {
    return {
      first: true,
      rangeDate: this.data || [moment().subtract(2, 'days'), moment()] // 时间范围，默认为近三天
    }
  },
  methods: {
    moment,
    transform (data) {
      return data
        .map(obj => {
          return obj.format('YYYY/MM/DD')
        })
        .join('~')
    },
    handleChange (value) {}
  },
  watch: {
    data (val) {
      if (Array.isArray(val)) {
        this.$emit('input', this.transform(val))
      }
    },
    rangeDate: {
      handler (val) {
        const value = this.transform(val)
        this.$emit('input', value)
        if (!this.first) {
          this.$emit('change', value)
        } else {
          this.first = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-calendar-picker-input {
  border: none !important;
  box-shadow: initial !important;
  &:focus,
  &:hover {
    outline: none;
  }
}
/deep/ .ant-calendar-picker:focus .ant-calendar-picker-input:not(.ant-input-disabled) {
  border: none;
}
/deep/ .ant-calendar-picker {
  border: none;
  &:focus,
  &:hover {
    box-shadow: initial;
    outline: none;
  }
}
/deep/ .ant-calendar-range-picker-input {
  width: 76px;
  padding: 2px 0;
}
</style>
