<template>
  <div class="container-fluid mx-auto mt-12" :class="paddingClass">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    padding: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    paddingClass() {
      return `p-${this.padding}`
    },
  },
}
</script>
