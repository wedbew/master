/* eslint-disable camelcase */ /* eslint-disable camelcase */
<template>
  <client-only>
    <Wrapper>
      <cv-grid>
        <cv-row>
          <cv-column>
            <cv-structured-list :condensed="true" style="margin-bottom: unset">
              <template slot="headings">
                <cv-structured-list-heading
                  v-for="(column, index) in columns"
                  :key="index"
                  >{{ column }}</cv-structured-list-heading
                >
              </template>
              <template slot="items">
                <cv-structured-list-item
                  v-for="(data, index) in data.slice(init, init + incriser)"
                  :key="index"
                >
                  <cv-structured-list-data>
                    <NuxtLink :to="`/${data.id}`">{{ data.id }}</NuxtLink>
                  </cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.advertiserType
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.area
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.roomsNum
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    $moment(data.dateCreated).format('LL')
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.areaPrice
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.price
                  }}</cv-structured-list-data>
                  <cv-structured-list-data>{{
                    data.distance
                  }}</cv-structured-list-data>
                </cv-structured-list-item>
              </template>
            </cv-structured-list>
            <cv-pagination
              :backward-text="backwardsText"
              :forward-text="forwardsText"
              :page-number-label="pageNumberLabel"
              :number-of-items="len"
              :page="page"
              :page-sizes="pageSizes"
              :backwards-button-disabled="disableBackwards"
              :forwards-button-disabled="disabledForwards"
              @change="log($event)"
            ></cv-pagination>
          </cv-column>
        </cv-row>
        <!-- <cv-column :lg="12">
          <cv-pagination
            :backward-text="backwardsText"
            :forward-text="forwardsText"
            :page-number-label="pageNumberLabel"
            :number-of-items="len"
            :page="page"
            :page-sizes="pageSizes"
            :backwards-button-disabled="disableBackwards"
            :forwards-button-disabled="disabledForwards"
            @change="log($event)"
          ></cv-pagination>
        </cv-column> -->
      </cv-grid>
    </Wrapper>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        'Advert ID',
        'Advertiser type',
        'Area',
        'Number of rooms',
        'Advert creation date',
        'Price per sqm',
        'Price',
        'Distance to city center',
      ],
      data: [],
      skeletonRows: 50,
      init: 0,
      incriser: 10,
      backwardsText: 'Previous page',
      forwardsText: 'Next page',
      pageNumberLabel: 'Page number',
      pageSizesLabel: 'Items per page:',
      page: 1,
      pageSizes: [
        {
          value: 10,
          selected: true,
        },
        20,
        50,
        100,
        200,
      ],
      disableBackwards: false,
      disabledForwards: false,
    }
  },
  computed: {
    exploreData() {
      return this.$store.getters['adverts/exploreData'].slice(
        this.init,
        this.init + this.incriser
      )
    },
    len() {
      return this.$store.getters['adverts/length']
    },
    // columns() {
    //   const arr = this.$store.getters['adverts/exploreData']
    //   const columns = Array.From(Object.keys(arr[0]))
    //   return columns
    // },
  },
  async created() {
    const ads = await this.$axios.$get('')
    const data = ads.map((item) => {
      const picked = (({
        id,
        // eslint-disable-next-line camelcase
        advertiser_type,
        m,
        // eslint-disable-next-line camelcase
        rooms_num,
        dateCreated,
        areaPrice,
        price,
        distance,
      }) => ({
        id,
        // eslint-disable-next-line camelcase
        advertiser_type,
        area: +m,
        // eslint-disable-next-line camelcase
        roomsNum: +rooms_num,
        dateCreated: new Date(dateCreated),
        areaPrice: +areaPrice,
        price: +price,
        distance: +distance,
      }))(item)
      return picked
    })
    this.data = data
  },
  methods: {
    log(item) {
      this.init = item.start
      this.incriser = item.length
    },
    sliced() {
      const slice = this.data.slice(this.init, this.init + this.incriser)
      return slice
    },
  },
}
</script>
