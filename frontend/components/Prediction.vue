<template>
  <client-only>
    <cv-grid>
      <cv-row>
        <cv-column :sm="12" :lg="6">
          <form @submit.prevent="submit">
            <cv-row class="mb-10" style="align-items: center">
              <TextInput
                v-model="address"
                label="Adres"
                type="text"
                placeholder="Type address"
                helper-text="This works only for Poznan"
                @textInput="inputAddress($event)"
              />
              <Button
                kind="primary"
                type="button"
                size="small"
                class="btn"
                @click.native="click()"
                >Submit</Button
              >
            </cv-row>
            <cv-row>
              <NumberInput
                v-model="rooms"
                class="number-input"
                label="Liczba pokoi"
                placeholder="1"
                :min="1"
                :max="10"
                :step="1"
                @numberInput="setRooms($event)"
              />
              <Slider
                label="Powierzchnia"
                placeholder="1"
                :min="15"
                :max="600"
                :step="1"
                @slider="setSurface($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <NumberInput
                v-model="floor"
                class="number-input"
                label="Piętro"
                placeholder="1"
                :min="0"
                :max="10"
                :step="1"
                @numberInput="setFloor($event)"
              />
              <Slider
                label="Rok budowy"
                placeholder="1"
                :min="1530"
                :max="new Date().getFullYear()"
                :step="1"
                @slider="setBuildingYear($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <Select
                class="mr-2"
                label="Typ okien"
                :options="typesOfWindows"
                @select="setWindowType($event)"
              />
              <Select
                label="Status"
                :options="constructionStatus"
                @select="setConstructionStatus($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <Select
                class="mr-2"
                label="Ogrzewanie"
                :options="typesOfHeating"
                @select="setHeatingType($event)"
              />
              <Select
                label="Materiał budowlany"
                :options="buildingMaterial"
                @select="setBuildingMaterial($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <Select
                label="Rodzaj zabudowy"
                :options="typeOfBuilding"
                @select="setBuildingType($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <MultiSelect
                v-model="checkedFeatures"
                class="multi-select"
                :options="features"
                label="Informacje dodatkowe"
                @multiSelect="selectedFeatures($event)"
              />
            </cv-row>
            <cv-row class="pt-10">
              <Button kind="primary" type="submit">Wyceń</Button>
            </cv-row>
          </form>
        </cv-column>
        <cv-column :sm="12" :lg="6">
          <cv-row class="pl-10">
            <PieChart
              v-if="results.length > 0"
              class="pt-10"
              :items="results"
            />
          </cv-row>
          <cv-row class="pl-10">
            <p v-if="distance !== 0" class="pt-5">
              Dystans do centrum:
              <strong>{{ distance.toFixed(2) }}</strong> km
            </p>
            <p v-if="prediction !== 0" class="pt-5" style="width: 100%">
              Cena za metr kwadratowy
              <strong>{{ prediction.toFixed(2) }} PLN</strong>
            </p>
            <p v-if="prediction !== 0" class="pt-5" style="width: 100%">
              Cena
              <strong>{{ (+prediction * surface).toFixed(2) }} PLN</strong>
            </p>
          </cv-row>
        </cv-column>
      </cv-row>
    </cv-grid>
  </client-only>
</template>

<script>
import distance from '../helpers/distance'
import locations from '../helpers/locations'
import features from '../helpers/features'
let ml5
if (process.browser) {
  ml5 = require('ml5')
}
export default {
  data() {
    return {
      address: '',
      rooms: 0,
      surface: 0,
      location: 0,
      floor: 0,
      market: 0,
      windowType: '',
      heatingType: '',
      buildingType: '',
      status: '',
      material: '',
      buildingYear: 0,
      center: {
        lat: 52.408243,
        lng: 16.934138,
      },
      checkedFeatures: [],
      distance: 0,
      googleAPI: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
      key: '&key=AIzaSyBcrfNS-3Xk8X1qpFIJEMxYsJRRhxZ55M8',
      lat: 0,
      lon: 0,
      nn: '',
      regression: '',
      prediction: 0,
      results: [],
      constructionStatus: ['ready_to_use', 'to_renovation', 'to_completion'],
      typesOfWindows: ['plastic', 'wooden', 'aluminium'],
      typesOfHeating: [
        'urban',
        'gas',
        'other',
        'boiler_room',
        'electrical',
        'tiled_stove',
      ],
      buildingMaterial: [
        'concrete_plate',
        'brick',
        'reinforced_concrete',
        'silikat',
        'breezeblock',
        'other',
        'cellular_concrete',
        'concrete',
        'hydroton',
      ],
      typeOfBuilding: [
        'block',
        'tenement',
        'apartment',
        'infill',
        'ribbon',
        'house',
        'house',
      ],
    }
  },
  computed: {
    features() {
      const arr = []
      features.forEach((feature) => {
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
  },
  mounted() {
    const options = {
      task: 'classification',
    }
    this.nn = ml5.neuralNetwork(options)
    const modelDetails = {
      model: '/locationModel/model.json',
      metadata: '/locationModel/model_meta.json',
      weights: '/locationModel/model.weights.bin',
    }
    this.nn.load(modelDetails)

    const regression = {
      task: 'regression',
    }
    this.regression = ml5.neuralNetwork(regression)
    const modelRegressionDetails = {
      model: '/regression/model.json',
      metadata: '/regression/model_meta.json',
      weights: '/regression/model.weights.bin',
    }
    this.regression.load(modelRegressionDetails)
  },
  methods: {
    async click() {
      this.results = []
      const url = this.googleAPI + this.address.split(' ').join('+') + this.key
      const response = await this.$axios.$get(url)
      const { lat, lng } = response.results[0].geometry.location
      this.lat = lat
      this.lon = lng
      this.distance = distance(this.center.lat, this.center.lng, lat, lng)
      this.nn.classify({ lat: this.lat, lon: this.lon }, this.handleResults)
    },
    parseFeatures(checkedFeatures) {
      const obj = {}
      features.forEach((feature) => {
        const localObj = { [feature]: 0 }
        Object.assign(obj, localObj)
      })
      checkedFeatures.forEach((feature) => {
        obj[feature] = 1
      })
      return obj
    },
    submit() {
      const formData = Object.assign(
        {},
        {
          advertiserType: 0,
          distance: this.distance,
          m: this.surface,
          rooms: this.rooms,
          floor: this.floor,
          location: this.location,
          market: this.buildingYear === new Date().getFullYear() ? 1 : 0,
          constructionStatus: this.status !== '' ? this.status : 0,
          windowType: this.windowType !== '' ? this.windowType : 0,
          heatingType: this.heatingType !== '' ? this.heatingType : 0,
          buildingType: this.buildingType !== '' ? this.buildingType : 0,
          buildingMaterial: this.material !== '' ? this.material : 0,
          buildingYear: this.buildingYear,
        },
        {
          ...this.parseFeatures(this.checkedFeatures),
        }
      )
      // eslint-disable-next-line no-console
      console.log(formData)
      this.$axios
        // .$post(
        //   'http://predict-env.eba-fwa87phk.us-east-2.elasticbeanstalk.com:5000/predict',
        //   null,
        //   {
        .$post('http://127.0.0.1:5000/predict', null, {
          params: formData,
        })
        .then((data) => {
          this.prediction = data
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log(error))
    },
    predict() {
      this.regression.predict(
        {
          loc: this.location,
          rooms: this.rooms,
          floor: this.floor,
          market: this.market,
          status: this.status,
        },
        this.predictResults
      )
    },
    inputAddress(event) {
      this.address = event
    },
    selectedFeatures(event) {
      this.checkedFeatures = event
    },
    setHeatingType(event) {
      this.heatingType = event
    },
    setRooms(event) {
      this.rooms = +event
    },
    setFloor(event) {
      this.floor = +event
    },
    setBuildingYear(event) {
      this.buildingYear = +event
    },
    setSurface(event) {
      this.surface = +event
    },
    setWindowType(event) {
      this.windowType = event
    },
    setBuildingType(event) {
      this.buildingType = event
    },
    setBuildingMaterial(event) {
      this.material = event
    },
    setConstructionStatus(event) {
      this.status = event
    },
    handleResults(error, result) {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return
      }
      this.location = +this.mapLocations(result[0].label)
      result.slice(0, 5).forEach((item) => {
        const i = {
          group: item.label,
          value: item.confidence,
        }
        this.results.push(i)
      })
    },
    predictResults(error, result) {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return
      }
      this.prediction = result[0].value
    },
    mapLocations(label) {
      const arr = locations.filter((item) => {
        return item.label === label
      })
      return arr[0].id
    },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  margin-top: 3px;
  min-height: 40px;
}
.number-input {
  + div {
    min-width: 50%;
  }
}
.bx--number {
  min-width: 50%;
}
.multi-select {
  width: 100%;
}
</style>
