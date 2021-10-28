<template>
  <client-only>
    <Wrapper>
      <!-- <div v-html="description"></div> -->
      <cv-data-table-skeleton
        v-if="data.length === 0"
        :columns="columns"
        :rows="skeletonRows"
        class="font-bold"
        title="Table title"
        helper-text="Data has been requested fetched"
      ></cv-data-table-skeleton>
      <cv-data-table
        ref="table"
        :zebra="true"
        :columns="columns"
        :data="data"
        title="Table title"
        helper-text="Data has been requested fetched"
      ></cv-data-table>
    </Wrapper>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      columns: ['Key', 'Value'],
      keys: [],
      values: [],
      data: [],
      skeletonRows: 50,
      description: '',
    }
  },
  // computed: {
  //   id() {
  //     const ad = this.$store.getters['adverts/id'](`${this.$route.params.id}`)
  //     this.addKeys(ad)
  //     this.addValues(ad)
  //     this.keys.forEach((item, index) => {
  //       this.data.push([this.keys[index], this.values[index]])
  //     })
  //     return this.$store.getters['adverts/id'](`${this.$route.params.id}`)
  //   },
  // },
  // watch: {
  //   data(o, n) {
  //     console.log({ o, n })
  //   },
  // },
  async created() {
    const [ad] = await this.$axios.$get(
      `http://localhost:3030/${this.$route.params.id}`
    )
    // const { description } = ad
    // this.description = description
    this.keys = Object.keys(ad)
    this.values = Object.values(ad)
    this.keys.forEach((item, index) => {
      this.data.push([this.keys[index], this.values[index]])
    })
    // setTimeout(() => {
    //   this.keys.forEach((item, index) => {
    //     this.data.push([this.keys[index], this.values[index]])
    //   })
    // }, 1500)
  },
  methods: {
    addKeys(ad) {
      this.keys = Object.keys(ad)
    },
    addValues(ad) {
      this.values = Object.values(ad)
    },
  },
}
</script>
