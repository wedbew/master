<template>
  <client-only>
    <ccv-simple-bar-chart
      :data="barChartData"
      :options="options"
    ></ccv-simple-bar-chart>
  </client-only>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    api: {
      type: String,
      default() {
        return undefined
      },
    },
    title: {
      type: String,
      default() {
        return ''
      },
    },
    axes: {
      type: Object,
      default() {
        return {
          bottom: {
            title: '',
            mapsTo: '',
          },
          left: {
            title: '',
            mapsTo: '',
          },
        }
      },
    },
    height: {
      type: Number,
      default: 700,
    },
  },
  data() {
    return {
      options: {
        title: this.$props.title,
        axes: {
          left: {
            mapsTo: this.$props.axes.left.mapsTo,
          },
          bottom: {
            mapsTo: this.$props.axes.bottom.mapsTo,
            scaleType: 'labels',
          },
        },
        legend: {
          alignment: 'center',
        },
        height: `${this.$props.height}px`,
      },
    }
  },
  computed: {
    barChartData() {
      const arr = this.$store.getters['adverts/groupBy'](
        `${this.api}`,
        'areaPrice'
      )
      let newArr = []
      if (this.api === 'build_year') {
        arr.map((item) => this.groupByDecade(item.group))
        newArr = this.grouping(arr)
        newArr = newArr.map((itemArr) => {
          return Object.assign(
            {},
            { group: itemArr.group.toString() },
            {
              avgVal: itemArr.stats.avgVal,
            },
            { value: itemArr.value }
          )
        })
        newArr = newArr.filter((el) => el.value > 10)
        // newArr = newArr.filter((el) => el.group !== '1530')
        // newArr = newArr.filter((el) => el.group !== 'no-data')
      } else {
        newArr = arr
      }
      return newArr.sort(this.compare)
    },
  },
  methods: {
    groupByDecade(year) {
      if (Number(+year)) {
        return Math.floor(+year / 10) * 10
      }
      return year
    },
    grouping(arr) {
      const merged = _(arr).groupBy('group').map(_.spread(_.merge)).value()
      return merged
    },
    compare(a, b) {
      if (a.avgVal < b.avgVal) {
        return 1
      }
      if (a.avgVal > b.avgVal) {
        return -1
      }
      return 0
    },
  },
}
</script>
