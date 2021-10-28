<template>
  <client-only>
    <Wrapper>
      <cv-grid>
        <cv-row>
          <cv-column :sm="12" :lg="6">
            <Select
              class="mb-5"
              :options="options"
              @select="selectedValue($event)"
            />
            <!-- <MultiSelect :options="features" /> -->
            <p class="text-xl font-bold pt-10">
              Number of ads: {{ numberOfAds.toLocaleString() }}
            </p>
            <p class="text-xl font-bold">
              Average {{ humanValue }}:
              {{
                Number(stats.avgVal)
                  ? stats.avgVal.toLocaleString()
                  : stats.avgVal
              }}
            </p>
            <p class="text-xl font-bold">
              Median {{ humanValue }}:
              {{
                Number(stats.quantiles[5])
                  ? stats.quantiles[5].toLocaleString()
                  : stats.quantiles[5]
              }}
            </p>
            <p class="text-xl font-bold">
              Min {{ humanValue }}:
              {{
                Number(stats.quantiles[0])
                  ? stats.quantiles[0].toLocaleString()
                  : stats.quantiles[0]
              }}
            </p>
            <p class="text-xl font-bold">
              Max {{ humanValue }}:
              {{
                Number(stats.quantiles[10])
                  ? stats.quantiles[10].toLocaleString()
                  : stats.quantiles[10]
              }}
            </p>
            <p class="text-xl font-bold">
              Standard deviation:
              {{
                Number(stats.stdDev)
                  ? stats.stdDev.toLocaleString()
                  : stats.stdDev
              }}
            </p>
            <cv-structured-list class="pt-10" :condensed="true">
              <template slot="headings">
                <cv-structured-list-heading
                  >Quantile</cv-structured-list-heading
                >
                <cv-structured-list-heading>Value</cv-structured-list-heading>
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(item, index) in stats.quantiles"
                  :key="index"
                >
                  <cv-structured-list-data>{{ index }}</cv-structured-list-data>
                  <cv-structured-list-data>{{ item }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-column>
          <cv-column :sm="12" :lg="6">
            <span class="text-xl font-bold">Group by</span>
            <Select
              style="display: inline-flex"
              :options="characristicsArr"
              :inline="true"
              @select="selectedCharacteristic($event)"
            />
            <PieChart
              class="mb-10"
              title="Share of adverts by category type"
              :height="500"
              :items="groupBy"
            />
            <Select
              style="display: inline-flex"
              :options="options"
              :inline="true"
              @select="selectArr($event)"
            />
            <cv-structured-list class="pt-10" :condensed="true">
              <template slot="headings">
                <cv-structured-list-heading>{{
                  characristic
                }}</cv-structured-list-heading>
                <cv-structured-list-heading
                  >No. of adverts</cv-structured-list-heading
                >
                <cv-structured-list-heading>Avg</cv-structured-list-heading>
                <cv-structured-list-heading>Median</cv-structured-list-heading>
                <cv-structured-list-heading>90%</cv-structured-list-heading>
                <cv-structured-list-heading>Std Dev</cv-structured-list-heading>
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(location, index) in groupBy"
                  :key="index"
                >
                  <cv-structured-list-data>{{
                    location.group
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.value
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.avgVal.toFixed(2)
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.quantiles[5]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.quantiles[9]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.stdDev.toFixed(2)
                  }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column>
            <h2 id="locations">Stats about features</h2>
            <cv-structured-list class="pt-10" :condensed="true">
              <template slot="headings">
                <cv-structured-list-heading>Feature</cv-structured-list-heading>
                <cv-structured-list-heading
                  >No. adverts</cv-structured-list-heading
                >
                <cv-structured-list-heading>Avg</cv-structured-list-heading>
                <cv-structured-list-heading>Median</cv-structured-list-heading>
                <cv-structured-list-heading>90%</cv-structured-list-heading>
                <cv-structured-list-heading>Std Dev</cv-structured-list-heading>
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(feature, index) in countFeatures"
                  :key="index"
                >
                  <cv-structured-list-data>{{
                    feature.group
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    feature.value
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    feature.stats.avgVal.toFixed(2)
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    feature.stats.quantiles[5]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    feature.stats.quantiles[9]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    feature.stats.stdDev.toFixed(2)
                  }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column>
            <h2 id="locations">Stats about locations</h2>
            <cv-structured-list class="pt-10" :condensed="true">
              <template slot="headings">
                <cv-structured-list-heading
                  >Locaction</cv-structured-list-heading
                >
                <cv-structured-list-heading
                  >No. of adverts</cv-structured-list-heading
                >
                <cv-structured-list-heading>Avg</cv-structured-list-heading>
                <cv-structured-list-heading>Median</cv-structured-list-heading>
                <cv-structured-list-heading>90%</cv-structured-list-heading>
                <cv-structured-list-heading
                  >Stad dev</cv-structured-list-heading
                >
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(location, index) in locations"
                  :key="index"
                >
                  <cv-structured-list-data>{{
                    mapLocations(location.group)
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.value
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.avgVal.toFixed(2)
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.quantiles[5]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.quantiles[9]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    location.stats.stdDev.toFixed(2)
                  }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-column>
        </cv-row>
        <cv-row>
          <cv-column>
            <h2 id="locations">Stats about building year</h2>
            <cv-structured-list class="pt-10" :condensed="true">
              <template slot="headings">
                <cv-structured-list-heading
                  >Building year</cv-structured-list-heading
                >
                <cv-structured-list-heading
                  >No. of adverts</cv-structured-list-heading
                >
                <cv-structured-list-heading>Avg</cv-structured-list-heading>
                <cv-structured-list-heading>Median</cv-structured-list-heading>
                <cv-structured-list-heading>90%</cv-structured-list-heading>
                <cv-structured-list-heading>Std Dev</cv-structured-list-heading>
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(year, index) in buildingYear"
                  :key="index"
                >
                  <cv-structured-list-data>{{
                    year.group
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    year.value
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    year.stats.avgVal.toFixed(2)
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    year.stats.quantiles[5]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    year.stats.quantiles[9]
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    year.stats.stdDev.toFixed(2)
                  }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
          </cv-column>
        </cv-row>
      </cv-grid>
    </Wrapper>
  </client-only>
</template>
//
<script>
import _ from 'lodash'
import featuresArray from '../helpers/features'
import locationsArray from '../helpers/locations'

export default {
  data() {
    return {
      options: ['areaPrice', 'price', 'distance', 'm', 'rent'],
      selectedOption: 'areaPrice',
      selected: 'price',
      characristicsArr: [
        'rooms_num',
        'market',
        'building_type',
        'floor_no',
        'building_floors_num',
        'building_material',
        'windows_type',
        'heating',
        'construction_status',
        'building_ownership',
      ],
      characristic: 'market',
      checked: false,
    }
  },
  computed: {
    features() {
      const arr = []
      featuresArray.forEach((feature) => {
        const obj = Object.assign(
          {},
          { value: feature },
          { label: feature },
          { name: feature }
        )
        arr.push(obj)
      })
      return arr
    },
    characristics() {
      const arr = []
      featuresArray.forEach((feature) => {
        const obj = Object.assign(
          {},
          { value: feature },
          { label: feature },
          { name: feature }
        )
        arr.push(obj)
      })
      return arr
    },
    humanValue() {
      const str = this.selected
        .split(/(?=[A-Z])/)
        .map((i) => i.toLowerCase())
        .join(' ')
      return str
    },
    numberOfAds() {
      return this.$store.getters['adverts/length']
    },
    stats() {
      return this.$store.getters['adverts/stats'](`${this.selected}`)
    },
    groupBy() {
      return this.$store.getters['adverts/groupBy'](
        `${this.characristic}`,
        `${this.selectedOption}`
      )
    },
    locations() {
      return this.$store.getters['adverts/groupBy'](
        'location',
        'areaPrice'
      ).sort(this.compare)
    },
    countFeatures() {
      return this.$store.getters['adverts/countFeatures']
    },
    buildingYear() {
      return this.$store.getters['adverts/groupBy'](
        'build_year',
        'areaPrice'
      ).sort(this.compare)
    },
    decades() {
      const arr = this.$store.getters['adverts/groupBy'](
        'build_year',
        'areaPrice'
      )
      arr.map((item) => this.groupByDecade(item.group))
      return this.grouping(arr)
    },
  },
  methods: {
    selectedValue(value) {
      this.selected = value
    },
    selectedCharacteristic(value) {
      this.characristic = value
    },
    selectArr(value) {
      this.selectedOption = value
    },
    compare(a, b) {
      if (a.value < b.value) {
        return 1
      }
      if (a.value > b.value) {
        return -1
      }
      return 0
    },
    mapLocations(id) {
      const arr = locationsArray.filter((item) => {
        return item.id === id
      })
      return arr[0].label
    },
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
  },
}
</script>
