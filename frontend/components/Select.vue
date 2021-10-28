<template>
  <client-only>
    <cv-select
      :light="light"
      :label="label"
      :hide-label="hideLabel"
      :inline="inline"
      :disabled="disabled"
      :helper-text="helperText"
      @change="updateSlectedValue($event)"
    >
      <cv-select-option disabled selected hidden>{{
        placeholder
      }}</cv-select-option>
      <cv-select-option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </cv-select-option>
    </cv-select>
  </client-only>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    helptext: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Choose an option',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    inline: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      light: false,
      selectLabel: this.$props.label,
      helperText: this.$props.helptext,
      hideLabel: false,
      disabled: false,
    }
  },
  methods: {
    updateSlectedValue(val) {
      this.$emit('select', val)
    },
  },
}
</script>
