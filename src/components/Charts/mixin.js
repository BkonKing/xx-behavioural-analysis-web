const AProp = {
  type: Array,
  default: () => []
}

const loadingMixin = {
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
    switchLoading (val) {
      this.loading = val || !this.loading
    },
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
      }
    }
  }
}

export default loadingMixin
