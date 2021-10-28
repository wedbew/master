<template>
  <client-only>
    <div id="map-wrap" style="height: 100vh">
      <l-map :zoom="zoom" :center="[currentLocation.lat, currentLocation.lng]">
        <l-tile-layer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker
          v-for="(point, index) in points"
          :key="index"
          :lat-lng="[point.lat, point.lng]"
          @click="setData(point.lat, point.lng, point.id)"
        ></l-marker>
      </l-map>
    </div>
    <!-- <vue-google-heatmap
      class="map"
      :lat="currentLocation.lat"
      :lng="currentLocation.lng"
      :initial-zoom="zoom"
      :map-type="type"
      :points="points"
    /> -->
    <!-- <GMap
      ref="gMap"
      class="map"
      language="en"
      :center="{ lat: currentLocation.lat, lng: currentLocation.lng }"
      :options="{ fullscreenControl: false }"
      :zoom="zoom"
    >
      <GMapMarker
        v-for="(point, index) in points"
        :key="index"
        :position="{ lat: point.lat, lng: point.lng }"
        @click="setData(point.lat, point.lng, point.id)"
      >
        <GMapInfoWindow>
          <NuxtLink :to="`/${point.id}`">{{ point.id }}</NuxtLink>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap> -->
  </client-only>
</template>
<script>
export default {
  data() {
    return {
      currentLocation: {
        lat: 52.406376,
        lng: 16.925167,
      },
      id: 0,
      zoom: 12,
      type: 'roadmap',
      pins: {
        notSelected:
          'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGgKICAgICAgICBkPSJtMzgzLjM2NyA0MTQuMzc4Yy0xNC4xODEtNi43NjgtMzIuNDkxLTEyLjIzOS01My42MjEtMTYuMDkyIDYuMTY2LTYuMzg2IDEyLjQ3MS0xMy4yMTUgMTguNzkyLTIwLjQ2NSAyNS4yNDQtMjguOTU3IDQ1LjM4Ny01OC41NDEgNTkuODctODcuOTMzIDE4LjMwOS0zNy4xNTYgMjcuNTkyLTc0LjEyOCAyNy41OTItMTA5Ljg4OCAwLTk5LjI1Mi04MC43NDgtMTgwLTE4MC0xODBzLTE4MCA4MC43NDgtMTgwIDE4MGMwIDM1Ljc2IDkuMjgzIDcyLjczMiAyNy41OTIgMTA5Ljg4OSAxNC40ODMgMjkuMzkyIDM0LjYyNiA1OC45NzYgNTkuODcgODcuOTMzIDYuMzIgNy4yNSAxMi42MjYgMTQuMDc5IDE4Ljc5MiAyMC40NjUtMjEuMTMgMy44NTMtMzkuNDQgOS4zMjQtNTMuNjIxIDE2LjA5Mi0yNi45NzEgMTIuODcxLTMyLjYzMyAyNy41NjMtMzIuNjMzIDM3LjYyMSAwIDEyLjczNiA4LjgwOSAzMC44NTQgNTAuNzcxIDQ0Ljg0MiAyOS4zMjUgOS43NzUgNjguMTE2IDE1LjE1OCAxMDkuMjI5IDE1LjE1OHM3OS45MDQtNS4zODMgMTA5LjIyOS0xNS4xNThjNDEuOTYyLTEzLjk4OCA1MC43NzEtMzIuMTA2IDUwLjc3MS00NC44NDIgMC0xMC4wNTgtNS42NjItMjQuNzUtMzIuNjMzLTM3LjYyMnptLTI4Ny4zNjctMjM0LjM3OGMwLTg4LjIyNCA3MS43NzYtMTYwIDE2MC0xNjBzMTYwIDcxLjc3NiAxNjAgMTYwYzAgNzQuMjQ2LTQ0LjcyMyAxNDEuMjI0LTgyLjI0MSAxODQuMzM4LTMyLjIyOSAzNy4wMzYtNjQuODQ5IDYzLjMzOC03Ny43NTkgNzMuMi0xMi45MTMtOS44NjUtNDUuNTMzLTM2LjE2Ny03Ny43NTktNzMuMTk5LTM3LjUxOC00My4xMTUtODIuMjQxLTExMC4wOTMtODIuMjQxLTE4NC4zMzl6bTI2Mi45MDQgMjk3Ljg2OWMtMjcuMzM5IDkuMTEyLTYzLjg4NCAxNC4xMzEtMTAyLjkwNCAxNC4xMzFzLTc1LjU2NS01LjAxOS0xMDIuOTA0LTE0LjEzMWMtMjcuMzgxLTkuMTI3LTM3LjA5Ni0xOS42NC0zNy4wOTYtMjUuODY5IDAtMTAuMzg5IDI2LjA2MS0yOC4yOCA4My44MzUtMzYuMjc0IDguNTU2IDguMTMyIDE2LjUyMyAxNS4yMTEgMjMuNDg1IDIxLjEzNy0xMC42MDggMy42NjUtMTcuMzIgOS4wODUtMTcuMzIgMTUuMTM3IDAgMTEuMDUgMjIuMzkgMjAgNTAgMjBzNTAtOC45NSA1MC0yMGMwLTYuMDUyLTYuNzEyLTExLjQ3Mi0xNy4zMi0xNS4xMzcgNi45NjItNS45MjYgMTQuOTI5LTEzLjAwNSAyMy40ODUtMjEuMTM3IDU3Ljc3NCA3Ljk5NCA4My44MzUgMjUuODg1IDgzLjgzNSAzNi4yNzQgMCA2LjIyOS05LjcxNSAxNi43NDItMzcuMDk2IDI1Ljg2OXoiCiAgICAvPgogICAgPHBhdGggZD0ibTM5NiAxODBjMC03Ny4xOTYtNjIuODA0LTE0MC0xNDAtMTQwcy0xNDAgNjIuODA0LTE0MCAxNDAgNjIuODA0IDE0MCAxNDAgMTQwIDE0MC02Mi44MDQgMTQwLTE0MHptLTI2MCAwYzAtNjYuMTY4IDUzLjgzMi0xMjAgMTIwLTEyMHMxMjAgNTMuODMyIDEyMCAxMjAtNTMuODMyIDEyMC0xMjAgMTIwLTEyMC01My44MzItMTIwLTEyMHoiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im0yNjYgMjUwYzAgNS41MjMgNC40NzcgMTAgMTAgMTBoNDBjNS41MjMgMCAxMC00LjQ3NyAxMC0xMHYtNTBoMjBjNC4xNTIgMCA3Ljg3Mi0yLjU2NSA5LjM0Ny02LjQ0NnMuMzk5LTguMjctMi43MDQtMTEuMDI4bC05MC04MGMtMy43ODktMy4zNjgtOS40OTgtMy4zNjgtMTMuMjg3IDBsLTkwIDgwYy0zLjEwMyAyLjc1OC00LjE3OSA3LjE0Ny0yLjcwNCAxMS4wMjhzNS4xOTYgNi40NDYgOS4zNDggNi40NDZoMjB2NTBjMCA1LjUyMyA0LjQ3NyAxMCAxMCAxMGg0MGM1LjUyMyAwIDEwLTQuNDc3IDEwLTEwdi0zMGgyMHptLTMwLTUwYy01LjUyMyAwLTEwIDQuNDc3LTEwIDEwdjMwaC0yMHYtNTBjMC01LjUyMy00LjQ3Ny0xMC0xMC0xMGgtMy42OThsNjMuNjk4LTU2LjYyMSA2My42OTggNTYuNjIxaC0zLjY5OGMtNS41MjMgMC0xMCA0LjQ3Ny0xMCAxMHY1MGgtMjB2LTMwYzAtNS41MjMtNC40NzctMTAtMTAtMTB6IgogICAgLz4KPC9zdmc+Cg==',
        selected:
          'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjEwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGgKICAgICAgICBkPSJtMzgzLjM2NyA0MTQuMzc4Yy0xNC4xODEtNi43NjgtMzIuNDkxLTEyLjIzOS01My42MjEtMTYuMDkyIDYuMTY2LTYuMzg2IDEyLjQ3MS0xMy4yMTUgMTguNzkyLTIwLjQ2NSAyNS4yNDQtMjguOTU3IDQ1LjM4Ny01OC41NDEgNTkuODctODcuOTMzIDE4LjMwOS0zNy4xNTYgMjcuNTkyLTc0LjEyOCAyNy41OTItMTA5Ljg4OCAwLTk5LjI1Mi04MC43NDgtMTgwLTE4MC0xODBzLTE4MCA4MC43NDgtMTgwIDE4MGMwIDM1Ljc2IDkuMjgzIDcyLjczMiAyNy41OTIgMTA5Ljg4OSAxNC40ODMgMjkuMzkyIDM0LjYyNiA1OC45NzYgNTkuODcgODcuOTMzIDYuMzIgNy4yNSAxMi42MjYgMTQuMDc5IDE4Ljc5MiAyMC40NjUtMjEuMTMgMy44NTMtMzkuNDQgOS4zMjQtNTMuNjIxIDE2LjA5Mi0yNi45NzEgMTIuODcxLTMyLjYzMyAyNy41NjMtMzIuNjMzIDM3LjYyMSAwIDEyLjczNiA4LjgwOSAzMC44NTQgNTAuNzcxIDQ0Ljg0MiAyOS4zMjUgOS43NzUgNjguMTE2IDE1LjE1OCAxMDkuMjI5IDE1LjE1OHM3OS45MDQtNS4zODMgMTA5LjIyOS0xNS4xNThjNDEuOTYyLTEzLjk4OCA1MC43NzEtMzIuMTA2IDUwLjc3MS00NC44NDIgMC0xMC4wNTgtNS42NjItMjQuNzUtMzIuNjMzLTM3LjYyMnptLTI4Ny4zNjctMjM0LjM3OGMwLTg4LjIyNCA3MS43NzYtMTYwIDE2MC0xNjBzMTYwIDcxLjc3NiAxNjAgMTYwYzAgNzQuMjQ2LTQ0LjcyMyAxNDEuMjI0LTgyLjI0MSAxODQuMzM4LTMyLjIyOSAzNy4wMzYtNjQuODQ5IDYzLjMzOC03Ny43NTkgNzMuMi0xMi45MTMtOS44NjUtNDUuNTMzLTM2LjE2Ny03Ny43NTktNzMuMTk5LTM3LjUxOC00My4xMTUtODIuMjQxLTExMC4wOTMtODIuMjQxLTE4NC4zMzl6bTI2Mi45MDQgMjk3Ljg2OWMtMjcuMzM5IDkuMTEyLTYzLjg4NCAxNC4xMzEtMTAyLjkwNCAxNC4xMzFzLTc1LjU2NS01LjAxOS0xMDIuOTA0LTE0LjEzMWMtMjcuMzgxLTkuMTI3LTM3LjA5Ni0xOS42NC0zNy4wOTYtMjUuODY5IDAtMTAuMzg5IDI2LjA2MS0yOC4yOCA4My44MzUtMzYuMjc0IDguNTU2IDguMTMyIDE2LjUyMyAxNS4yMTEgMjMuNDg1IDIxLjEzNy0xMC42MDggMy42NjUtMTcuMzIgOS4wODUtMTcuMzIgMTUuMTM3IDAgMTEuMDUgMjIuMzkgMjAgNTAgMjBzNTAtOC45NSA1MC0yMGMwLTYuMDUyLTYuNzEyLTExLjQ3Mi0xNy4zMi0xNS4xMzcgNi45NjItNS45MjYgMTQuOTI5LTEzLjAwNSAyMy40ODUtMjEuMTM3IDU3Ljc3NCA3Ljk5NCA4My44MzUgMjUuODg1IDgzLjgzNSAzNi4yNzQgMCA2LjIyOS05LjcxNSAxNi43NDItMzcuMDk2IDI1Ljg2OXoiCiAgICAvPgogICAgPHBhdGggZD0ibTM5NiAxODBjMC03Ny4xOTYtNjIuODA0LTE0MC0xNDAtMTQwcy0xNDAgNjIuODA0LTE0MCAxNDAgNjIuODA0IDE0MCAxNDAgMTQwIDE0MC02Mi44MDQgMTQwLTE0MHptLTI2MCAwYzAtNjYuMTY4IDUzLjgzMi0xMjAgMTIwLTEyMHMxMjAgNTMuODMyIDEyMCAxMjAtNTMuODMyIDEyMC0xMjAgMTIwLTEyMC01My44MzItMTIwLTEyMHoiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Im0yNjYgMjUwYzAgNS41MjMgNC40NzcgMTAgMTAgMTBoNDBjNS41MjMgMCAxMC00LjQ3NyAxMC0xMHYtNTBoMjBjNC4xNTIgMCA3Ljg3Mi0yLjU2NSA5LjM0Ny02LjQ0NnMuMzk5LTguMjctMi43MDQtMTEuMDI4bC05MC04MGMtMy43ODktMy4zNjgtOS40OTgtMy4zNjgtMTMuMjg3IDBsLTkwIDgwYy0zLjEwMyAyLjc1OC00LjE3OSA3LjE0Ny0yLjcwNCAxMS4wMjhzNS4xOTYgNi40NDYgOS4zNDggNi40NDZoMjB2NTBjMCA1LjUyMyA0LjQ3NyAxMCAxMCAxMGg0MGM1LjUyMyAwIDEwLTQuNDc3IDEwLTEwdi0zMGgyMHptLTMwLTUwYy01LjUyMyAwLTEwIDQuNDc3LTEwIDEwdjMwaC0yMHYtNTBjMC01LjUyMy00LjQ3Ny0xMC0xMC0xMGgtMy42OThsNjMuNjk4LTU2LjYyMSA2My42OTggNTYuNjIxaC0zLjY5OGMtNS41MjMgMC0xMCA0LjQ3Ny0xMCAxMHY1MGgtMjB2LTMwYzAtNS41MjMtNC40NzctMTAtMTAtMTB6IgogICAgLz4KPC9zdmc+Cg==',
      },
      points: [],
    }
  },
  // computed: {
  //   coordinates: {
  //     get() {
  //       return this.$store.getters['adverts/coordinates']
  //     },
  //     set(coord) {
  //       this.points = coord
  //     },
  //   },
  //   points() {
  //     return this.$store.getters['adverts/coordinates']
  //   },
  // },
  beforeMount() {
    this.fetchAds()
  },
  // mounted() {
  //   if (typeof google === 'object') {
  //     console.warn('Map loaded')
  //   }
  // },
  methods: {
    async fetchAds() {
      const ads = await this.$axios.$get('coordinates')
      this.points = ads.slice(0, 500)
      this.start = true
    },
    setData(lat, lng, id) {
      this.currentLocation.lat = lat
      this.currentLocation.lat = lng
      this.id = id
    },
  },
}
</script>
<style lang="scss" scoped>
.map {
  min-height: 100vh;
  height: 100% !important;
  width: 100%;
}
</style>
