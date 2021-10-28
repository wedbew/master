<template>
  <ccv-pie-chart :data="items" :options="options"></ccv-pie-chart>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      options: {
        title: this.$props.title,
        resizable: true,
        height: `${this.$props.height}px`,
      },
    }
  },
}
</script>
