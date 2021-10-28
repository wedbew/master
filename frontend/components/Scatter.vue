<template>
  <client-only>
    <!-- <ccv-scatter-chart v-if="loading" :data="scatterData" :options="options" /> -->
    <ccv-scatter-chart
      :data="scatterData"
      :options="options"
    ></ccv-scatter-chart>
  </client-only>
</template>
<script>
export default {
  props: {
    api: {
      type: String,
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
            title: '',
            mapsTo: '',
          },
          left: {
            title: '',
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
      data: [],
      loading: true,
      options: {
        title: this.title,
        axes: {
          bottom: {
            title: this.axes.bottom.title,
            mapsTo: this.axes.bottom.mapsTo,
            scaleType: 'linear',
          },
          left: {
            title: this.axes.left.title,
            mapsTo: this.axes.left.mapsTo,
            scaleType: 'linear',
          },
        },
        experimental: true,
        zoomBar: {
          top: {
            enabled: true,
          },
        },
        // data: {
        //   loading: this.loading,
        // },
        height: `${this.height}px`,
      },
    }
  },
  computed: {
    scatterData() {
      return this.$store.getters[`adverts/${this.api}`]
    },
  },
  mounted() {
    console.log(this.options)
  },
  // async created() {
  //   await this.$axios.$get(this.api).then((data) => {
  //     this.data = data
  //     this.loading = false
  //   })
  // },
}
</script>
