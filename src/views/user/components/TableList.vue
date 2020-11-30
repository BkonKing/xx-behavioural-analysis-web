<template>
  <div id="Outline" class="table-list" :class="{ 'table-list__hidden': !visible }">
    <table cellspacing="0" cellpadding="0" class="list time-span l">
      <thead>
        <tr>
          <th class="null"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(c, i) in col" :key="i" :class="{ today: i === 0 }">
          <td>{{ c.label }}</td>
        </tr>
      </tbody>
    </table>
    <div class="table-wrapper">
      <table cellspacing="0" cellpadding="0" class="list width100">
        <tbody>
          <tr class="title">
            <th v-for="(t, i) in title" :key="i" :class="{ 'td-selected': active === t.value }" @click="active = t.value">
              {{ t.text }}
            </th>
          </tr>
          <tr v-for="(c, i) in col" :key="i" :class="{ highlight: i === 0 }">
            <td
              v-for="(item, index) in data"
              :key="index"
              :class="{ 'arrow-down': c.value === 'c', 'td-selected': active === title[index].value }"
              @click="active = title[index].value"
            >
              <div :title="item[c.value]" class="outline-td-value ellipsis">
                {{ item[c.value] }}
                <template v-if="c.value === 'c'">
                  <a-icon v-if="c.value !== 'c'" type="arrow-up" />
                  <a-icon v-else type="arrow-down" />
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="fold  btw">
      <a-icon v-if="visible" type="up-circle" theme="filled" :style="{ fontSize: '16px' }" @click="visible = false" />
      <a-icon v-else type="down-circle" theme="filled" :style="{ fontSize: '16px' }" @click="visible = true" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    title: {
      type: Array,
      default: () => []
    },
    col: {
      type: Array,
      default: () => [
        {
          label: '今日',
          value: 'today'
        },
        {
          label: '昨日',
          value: 'yesterday'
        }
      ]
    },
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      visible: false,
      active: this.value
    }
  },
  watch: {
    active (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less" scoped>
.table-list__hidden {
  height: 150px;
  overflow: hidden;
}
div.fold {
  position: absolute;
  top: 120px;
  right: 10px;
  border: none;
  background-color: #fff;
}
#Outline .loading {
  width: 140px;
}

#Outline .td-hover,
#Outline .td-selected {
  color: #1890ff;
}

.title .td-selected {
  position: relative;
}

.title .td-selected::before {
  content: '';
  display: block;
  width: 100%;
  top: -20px;
  height: 2px;
  position: absolute;
  background: #1890ff;
}

.arrow {
  display: inline-block;
  width: 9px;
  height: 10px;
  float: left;
}

.arrow-up .outline-td-value {
  position: relative;
  color: #f34b60;
}

// .arrow-up .outline-td-value:after {
//   position: absolute;
//   content: '\e6f9';
// }

.arrow-down .outline-td-value {
  position: relative;
  color: #02b449;
}

// .arrow-down .outline-td-value:after {
//   position: absolute;
//   content: '\e6e2';
// }

div.table-list table.time-span tr.today td {
  height: 50px;
  font-size: 12px;
  line-height: 50px;
}

div.table-list div.index-table-list-tip {
  background-color: #ffffc6;
  overflow: hidden;
  position: absolute;
  visibility: hidden;
  width: 145px;
  z-index: 100;
  border: 1px solid #9d9a89;
  padding: 10px 2px;
  word-wrap: break-word;
  text-align: center;
}

div.table-list table.list {
  border-collapse: collapse;
  font-size: 12px;
  table-layout: fixed;
}

div.table-list table.width100 {
  width: 100%;
}

div.table-list table.list th {
  height: 34px;
  line-height: 34px;
  text-align: left;
  color: #808492;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 400;
}

div.table-list table.list th.nbg {
  background: 0 0;
  color: #000;
}

div.table-list table.list tr td {
  height: 34px;
  font-size: 14px;
  line-height: 34px;
  white-space: nowrap;
  text-align: left;
  color: #808492;
}

div.table-list table.list tr.highlight td {
  font-size: 26px;
  line-height: 50px;
  color: #343437;
}

div.table-list table.list tr.highlight td.normal {
  font-size: 12px;
  font-weight: 400;
}

div.table-list table.list tr td.normal {
  width: 85px;
  text-align: left;
}

div.table-list table.list tr.last td {
  border-bottom: none;
  height: 34px;
  line-height: 34px;
}

div.table-list table.list tr.fade {
  height: 34px;
  line-height: 34px;
}

div.table-list table.list tr.fade th {
  color: #808492;
}

div.table-list table.list tr.fade td {
  color: #808492;
  border-bottom: none;
}

div.table-list table.list tr.fade td.highlight-tip {
  cursor: pointer;
}

.table-list {
  padding: 20px 40px 10px;
  background-color: #fff;
}

div.table-list .list.time-span tr td {
  font-size: 12px;
}

.table-wrapper {
  position: relative;
  margin-left: 60px;
}
.l {
  float: left;
}
div.table-wrapper table.list tr td:hover,
div.table-wrapper table.list tr th:hover {
  cursor: pointer;
}

div.table-wrapper table.list tr td,
div.table-wrapper table.list tr th {
  padding-right: 20px;
  font-size: 14px;
  text-align: right;
}

div.table-wrapper table.list tr td div.ellipsis {
  display: block;
  max-width: 100%;
}

div.table-wrapper table.list tr th {
  font-size: 12px;
}
</style>
