<template>
  <ccv-gauge-chart :data="data" :options="options"></ccv-gauge-chart>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          group: 'value',
          value: 5000,
        },
      ],
      options: {
        title: 'Gauge semicircular -- danger status',
        resizable: true,
        height: '250px',
        width: '100%',
        gauge: {
          type: 'semi',
          status: 'danger',
          showPercentageSymbol: false,
        },
      },
    }
  },
}
</script>
