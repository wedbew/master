<template>
  <client-only>
    <ccv-bubble-chart :data="data" :options="options"></ccv-bubble-chart>
  </client-only>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return ''
      },
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    // axes: {
    //   type: Object,
    //   default() {
    //     return {
    //       bottom: {
    //         title: '',
    //         mapsTo: '',
    //       },
    //       left: {
    //         title: '',
    //         mapsTo: '',
    //       },
    //     }
    //   },
    // },
    // bubble: {
    //   type: String,
    //   default: '',
    // },
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
  // data() {
  //   return {
  //     options: {
  //       title: this.$props.title,
  //       axes: {
  //         bottom: {
  //           title: this.$props.axes.bottom.title,
  //           mapsTo: this.$props.axes.bottom.mapsTo,
  //           includeZero: false,
  //         },
  //         left: {
  //           title: this.$props.axes.left.title,
  //           mapsTo: this.$props.axes.left.mapsTo,
  //           includeZero: false,
  //         },
  //       },
  //       bubble: {
  //         radiusMapsTo: this.bubble,
  //       },
  //       data: {
  //         loading: false,
  //       },
  //       height: '960px',
  //     },
  //   }
  // },
  // mounted() {
  //   console.log(this.$props.data)
  // },
}
</script>
