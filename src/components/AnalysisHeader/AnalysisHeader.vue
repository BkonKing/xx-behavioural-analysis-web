<template>
  <div>
    <h3>
      {{ title }}
      <a-popover v-model="visible" title="Title" placement="bottom" trigger="click">
        <a slot="content" @click="hide">Close</a>
        <a-icon type="question-circle" />
      </a-popover>
    </h3>
  </div>
</template>

<script>
export default {
  name: 'AnalysisHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    hide () {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
