<template>
  <client-only>
    <cv-multi-select
      :light="light"
      :label="label"
      :inline="inline"
      :title="title"
      :disabled="disabled"
      :selection-feedback="selectionFeedback"
      :filterable="filterable"
      :auto-filter="autoFilter"
      :auto-highlight="autoHighlight"
      :value="initialValue"
      :options="options"
      @change="sendArray($event)"
    >
    </cv-multi-select>
  </client-only>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      default() {
        return []
      },
    },
    initialValue: {
      type: Array,
      default() {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      light: false,
      inline: false,
      disabled: false,
      selectionFeedback: 'top-after-reopen',
      filterable: false,
      autoFilter: false,
      autoHighlight: false,
    }
  },
  methods: {
    sendArray(event) {
      this.$emit('multiSelect', event)
    },
  },
}
</script>
