<template>
  <client-only>
    <ccv-scatter-chart v-if="loading" :data="data" :options="options" />
    <ccv-scatter-chart
      v-else
      :data="data"
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
        data: {
          loading: this.loading,
        },
        height: `${this.height}px`,
      },
    }
  },
  async created() {
    const data = await this.$axios.$get(this.api)
    this.data = data
    this.loading = false
  },
}
</script>
