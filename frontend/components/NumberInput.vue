<template>
  <cv-number-input
    :label="label"
    :placeholder="placeholder"
    :helper-text="helperText"
    :invalid-message="invalidMessage"
    :min="min"
    :max="max"
    :step="step"
    @input="updateInputValue($event)"
  >
  </cv-number-input>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    helperText: {
      type: String,
      required: false,
      default: '',
    },
    invalidMessage: {
      type: String,
      required: false,
      default: '',
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
  },
  methods: {
    updateInputValue(val) {
      this.$emit('numberInput', val)
    },
  },
}
</script>
