<template>
  <cv-text-input
    :label="label"
    :type="inputType"
    :placeholder="placeholder"
    :helper-text="helperText"
    :invalid-message="invalidMessage"
    @input="updateInputValue($event)"
  >
  </cv-text-input>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    inputType: {
      type: String,
      default: 'text',
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
  },
  methods: {
    updateInputValue(val) {
      this.$emit('textInput', val)
    },
  },
}
</script>
