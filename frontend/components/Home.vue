<template>
  <client-only>
    <Bubble :data="bubble" :options="options" title="Averages" />
  </client-only>
</template>
<script>
import _ from 'lodash'
import locationsArray from '../helpers/locations'

export default {
  data() {
    return {
      limit: 100,
      options: {
        title: 'Averages',
        axes: {
          bottom: {
            title: 'Median distance',
            mapsTo: 'distance',
            includeZero: false,
          },
          left: {
            title: 'Median price per SQM',
            mapsTo: 'areaPrice',
            includeZero: false,
          },
        },
        bubble: {
          radiusMapsTo: 'm',
          radiusLabel: 'm',
        },
        data: {
          loading: false,
        },
        height: '850px',
      },
    }
  },
  computed: {
    bubble() {
      const location = this.$store.getters['adverts/groupBy'](
        'location',
        'areaPrice'
      )
      const distance = this.$store.getters['adverts/groupBy'](
        'location',
        'distance'
      )
      const area = this.$store.getters['adverts/groupBy']('location', 'm')

      const LocationsValues = this.clean(location, 'areaPrice')
      const DistanceValues = this.clean(distance, 'distance')
      const AreaValues = this.clean(area, 'm')
      const data = this.groupBy([
        ...LocationsValues,
        ...DistanceValues,
        ...AreaValues,
      ])
      return data
    },
  },
  methods: {
    clean(arr, key) {
      const filteredArr = arr.filter((item) => item.value > this.limit)
      const newArr = []
      filteredArr.forEach((item) => {
        const { group } = item
        const { quantiles } = item.stats
        const data = {
          group: this.mapLocations(group),
          [key]: quantiles[5],
        }
        newArr.push(data)
      })
      return newArr
    },
    groupBy(arr) {
      const merged = _(arr).groupBy('group').map(_.spread(_.merge)).value()
      return merged
    },
    mapLocations(id) {
      const arr = locationsArray.filter((item) => {
        return item.id === id
      })
      return arr[0].label
    },
  },
}
</script>
