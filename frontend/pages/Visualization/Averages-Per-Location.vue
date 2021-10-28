<template>
  <Wrapper>
    <Bubble :data="data" :options="options" title="Averages" />
    <Bubble :data="data" :options="options2" title="Averages" />
  </Wrapper>
</template>

<script>
import data from '../../helpers/bubble'
export default {
  data() {
    return {
      data,
      options: {
        title: 'Averages',
        axes: {
          bottom: {
            title: 'Avg price per SQM',
            mapsTo: 'areaPrice',
            includeZero: false,
          },
          left: {
            title: 'Avg area',
            mapsTo: 'area',
            includeZero: false,
          },
        },
        bubble: {
          radiusMapsTo: 'distance',
          radiusLabel: 'distance',
        },
        data: {
          loading: false,
        },
        height: '850px',
      },
      options2: {
        title: 'Averages',
        axes: {
          bottom: {
            title: 'Avg distance',
            mapsTo: 'distance',
            includeZero: false,
          },
          left: {
            title: 'Avg price per SQM',
            mapsTo: 'areaPrice',
            includeZero: false,
          },
        },
        bubble: {
          radiusMapsTo: 'area',
          radiusLabel: 'area',
        },
        data: {
          loading: false,
        },
        height: '850px',
      },
    }
  },
}
</script>
