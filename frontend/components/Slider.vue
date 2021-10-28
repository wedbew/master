<template>
  <cv-slider
    :label="label"
    :min="min.toString()"
    :max="max.toString()"
    :step="step.toString()"
    :step-multiplier="stepMultiplier.toString()"
    :min-label="minLabel"
    :max-label="maxLabel"
    @change="updateSliderValue($event)"
  />
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 1,
    },
    stepMultiplier: {
      type: Number,
      default: 10,
    },
    minLabel: {
      type: String,
      default: 'Min',
    },
    maxLabel: {
      type: String,
      default: 'Min',
    },
  },
  methods: {
    updateSliderValue(val) {
      this.$emit('slider', val)
    },
  },
}
</script>
