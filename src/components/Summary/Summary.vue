<template>
  <div class="summary-wrapper summary-wrapper-data-link">
    <h3 class="summary-title">汇总数据</h3>
    <div id="Summary" ref="Summary" class="summary-container">
      <table class="summary data-link" :style="{width: `${width}px`,marginLeft: `${marginLeft}px`}">
        <tbody>
          <tr>
            <td v-for="(item, i) in summaryList" :key="i" :class="{active: active === i}">
              <div class="summary-item">
                <span class="text">{{ item }}</span>
                <span class="value">{{ item }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paginate">
        <a-icon class="right" type="right-circle" @click="toLeft" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  data () {
    return {
      summaryList: [1, 2, 3, 4, 5, 6],
      active: 0,
      marginLeft: 0,
      width: '100%'
    }
  },
  mounted () {
    this.width = 156 * this.summaryList.length
  },
  methods: {
    toLeft () {
      this.marginLeft = -this.$refs.Summary.clientWidth
    }
  }
}
</script>

<style scoped>
.summary-wrapper {
  position: relative;
  border-bottom: 1px solid #f3f4f9;
  min-height: 100px;
  background-color: #fff;
}

.summary-wrapper.summary-wrapper-data-link {
  margin-bottom: 20px;
}

.summary-wrapper h3.summary-title {
  position: absolute;
  top: 26px;
  left: 0;
  color: #808492;
}

.summary-wrapper .summary-container {
  overflow: auto;
  margin-left: 180px;
  padding: 20px 0;
}

.summary-wrapper .summary-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.summary-wrapper .summary-container::-webkit-scrollbar-thumb:vertical {
  border-right: 4px solid rgba(255, 255, 255, 0);
  height: 50px;
  background-color: #e7e9f0;
  background-clip: content-box;
}

.summary-wrapper .summary-container::-webkit-scrollbar-thumb:horizontal {
  border-bottom: 4px solid rgba(255, 255, 255, 0);
  width: 50px;
  background-color: #e7e9f0;
  background-clip: content-box;
}

.summary-wrapper .summary-container::-webkit-scrollbar-thumb:vertical:hover {
  background-color: #989898;
}

.summary-wrapper .summary-container::-webkit-scrollbar-thumb:horizontal:hover {
  background-color: #989898;
}

.summary-wrapper .summary-container::-webkit-scrollbar-button:end:increment,
.summary-wrapper .summary-container::-webkit-scrollbar-button:start:decrement {
  display: block;
  width: 0;
  height: 0;
  background-color: transparent;
}

.summary-wrapper .summary-container {
    padding: 0;
    overflow: hidden;
    position: relative
}

.summary-wrapper .summary-container .summary {
    width: 100%;
    margin-left: 0;
    table-layout: fixed
}

.summary-wrapper .summary-container .summary td {
    cursor: default;
    border-right: none;
    padding: 0;
    width: 156px;
    text-align: left;
    vertical-align: top
}

.summary-wrapper .summary-container .summary td .summary-item {
    height: 100%;
    margin-right: 10px;
    border-top: 2px solid transparent
}

.summary-wrapper .summary-container .summary td .summary-item span {
    cursor: default;
    text-align: left;
    margin-bottom: 20px;
    line-height: 1;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis
}

.summary-wrapper .summary-container .summary td .summary-item span:first-child {
    padding-top: 25px
}

.summary-wrapper .summary-container .summary td .summary-item span.text {
    font-size: 12px;
    color: #808492
}

.summary-wrapper .summary-container .summary td .summary-item span.text .help {
    height: auto;
    top: 0
}

.summary-wrapper .summary-container .summary td .summary-item span.value {
    color: #343437;
    font-size: 26px;
    min-height: 30px;
    line-height: 30px
}

.summary-wrapper .summary-container .summary td .summary-item span.compare-value {
    font-size: 16px;
    color: #808492
}

.summary-wrapper .summary-container .summary td .summary-item span.new-user-value {
    display: block;
    font-size: 15px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}

.summary-wrapper .summary-container .summary td .summary-item span .upgrade {
    background-color: #396fff
}

.summary-wrapper .summary-container .summary td .summary-item span .brand {
    background-color: #d7d7d7
}

.summary-wrapper .summary-container .summary td .summary-item span .new-user-div {
    position: relative
}

.summary-wrapper .summary-container .summary td .summary-item span .new-user-bar {
    width: 100%;
    height: 5px;
    cursor: pointer
}

.summary-wrapper .summary-container .summary td .summary-item span .new-user-bar .text {
    float: left
}

.summary-wrapper .summary-container .summary td .summary-item span .new-user-brand {
    height: 100%;
    width: 0;
    cursor: pointer
}

.summary-wrapper .summary-container .summary td .summary-item.last {
    border-right: none
}

.summary-wrapper .summary-container .summary.data-link td,.summary-wrapper .summary-container .summary.data-link td .summary-item span {
    cursor: pointer
}

.summary-wrapper .summary-container .summary.data-link td.active .summary-item,.summary-wrapper .summary-container .summary.data-link td:hover .summary-item {
    border-top: 2px solid #396fff
}

.summary-wrapper .summary-container .summary.data-link td.active .summary-item span,.summary-wrapper .summary-container .summary.data-link td:hover .summary-item span {
    color: #396fff!important
}

.summary-wrapper .summary-container .paginate {
    position: absolute;
    right: 0;
    top: 0;
    width: 61px;
    height: 100%;
    background-color: #fff
}

.summary-wrapper .summary-container .paginate i {
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    left: 11px;
    top: 62px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center
}

.table .table-index.sortable.asc .td-content:after,.table .table-index.sortable.desc .td-content:after {
    top: -15px;
    right: -3px;
    font-family: iconfont,sans-serif;
    color: #555966;
    font-size: 12px
}
</style>
