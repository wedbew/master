<template>
  <client-only>
    <cv-button :kind="kind" :size="size" :disabled="disabled">
      <slot />
    </cv-button>
  </client-only>
</template>
<script>
export default {
  props: {
    kind: {
      type: String,
      default: 'kind',
    },
    size: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
