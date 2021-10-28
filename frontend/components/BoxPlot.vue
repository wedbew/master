<template>
  <client-only>
    <ccv-boxplot-chart :data="boxData" :options="options"></ccv-boxplot-chart>
  </client-only>
</template>

<script>
export default {
  props: {
    api: {
      type: String,
      required: true,
      default() {
        return undefined
      },
    },
    title: {
      type: String,
      default() {
        return ''
      },
    },
    axes: {
      type: Object,
      default() {
        return {
          bottom: {
            mapsTo: '',
          },
          left: {
            mapsTo: '',
          },
        }
      },
    },
    height: {
      type: Number,
      default: 700,
    },
  },
  data() {
    return {
      loaded: false,
      options: {
        title: this.title,
        axes: {
          bottom: {
            mapsTo: this.axes.bottom.mapsTo,
          },
          left: {
            scaleType: 'labels',
            mapsTo: this.axes.left.mapsTo,
          },
        },
        height: `${this.height}px`,
      },
    }
  },
  computed: {
    boxData() {
      return this.$store.getters[`adverts/${this.api}`]
    },
  },
  // beforeMount() {
  //   this.fetchAds()
  // },
  // mounted() {
  //   const values = []
  //   this.data.forEach((item) => {
  //     values.push(+item.value)
  //   })
  // },
  // methods: {
  //   async fetchAds() {
  //     await this.$axios.$get(this.api).then((data) => {
  //       this.data = data
  //       this.loaded = true
  //     })
  //   },
  // },
}
</script>
