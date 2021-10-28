/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import { standardDeviation, quantile } from 'simple-statistics'

import quantileArr from '../../helpers/quantiles'
import featuresArr from '../../helpers/features'

export default {
  id: (state) => (id) => {
    return state.adverts.find((ad) => ad.id === id)
  },
  loaded(store) {
    return store.dataLoaded
  },
  length(store) {
    return store.adverts.length
  },
  exploreData(store) {
    const data = store.adverts.map((item) => {
      const {
        id,
        advertiser_type,
        m,
        rooms_num,
        dateCreated,
        areaPrice,
        price,
        distance,
      } = item
      const obj = Object.assign(
        {},
        { id },
        { advertiserType: advertiser_type },
        { area: +m },
        { roomsNum: +rooms_num },
        { dateCreated: new Date(dateCreated) },
        { areaPrice: +areaPrice },
        { price: +price },
        { distance: +distance }
      )
      // const picked = (({
      //   advertId,
      //   advertiser_type,
      //   m,
      //   rooms_num,
      //   dateCreated,
      //   areaPrice,
      //   price,
      //   distance,
      // }) => ({
      //   id: advertId,
      //   advertiserType: advertiser_type,
      //   area: +m,
      //   roomsNum: +rooms_num,
      //   dateCreated: new Date(dateCreated),
      //   areaPrice: +areaPrice,
      //   price: +price,
      //   distance: +distance,
      // }))(item)
      return obj
    })
    return data
  },
  stats: (store) => (arg) => {
    const values = store.adverts.map((ad) => +ad[arg])
    let reducer = 0
    values.map((price) => (reducer += price))
    const avgVal = reducer / values.length
    const stdDev = values.length === 0 ? 0 : standardDeviation(values)
    const quantiles = quantileArr.map((item) =>
      values.length === 0 ? 0 : quantile(values, item)
    )
    return { avgVal, stdDev, quantiles }
  },
  surface(store) {
    const surface = []
    store.adverts.forEach((ad) => {
      surface.push(ad.m)
    })
    return surface
  },
  groupBy: (store) => (arg, arg2) => {
    const arr = []
    let group = []
    store.adverts.forEach((ad) => {
      let obj
      if (arg === 'build_year') {
        obj = Math.floor(ad[arg] / 10) * 10
      } else {
        obj = ad[arg]
      }
      group.push(obj)
    })
    group = Array.from(new Set(group))
    group.forEach((item) => {
      const newArr = store.adverts.filter((ad) => {
        if (arg === 'build_year') {
          return Math.floor(ad[arg] / 10) * 10 === item
        }
        return ad[arg] === item
      })
      const key = item === '' || item === 0 ? 'no-data' : item

      const values = newArr.map((ad) => +ad[arg2])
      let reducer = 0
      values.map((price) => (reducer += price))
      const avgVal = reducer / values.length
      const stdDev = values.length === 0 ? 0 : standardDeviation(values)
      const quantiles = quantileArr.map((item) =>
        newArr.length === 0 ? 0 : quantile(values, item)
      )
      const stats = {
        label: arg2,
        avgVal,
        stdDev,
        quantiles,
      }

      const characteristic = Object.assign(
        {},
        { group: key },
        { value: newArr.length },
        { stats }
      )
      arr.push(characteristic)
    })
    return arr
  },
  countFeatures(store) {
    const arr = []
    featuresArr.forEach((feature) => {
      const values = []
      store.adverts.forEach((ad) => {
        if (+ad[feature]) {
          values.push(+ad.areaPrice)
        }
      })
      const newArr = store.adverts.filter((ad) => {
        return +ad[feature] === 1
      })
      let reducer = 0
      values.map((price) => (reducer += price))
      const avgVal = reducer / values.length
      const stdDev = values.length === 0 ? 0 : standardDeviation(values)
      const quantiles = quantileArr.map((item) =>
        values.length === 0 ? 0 : quantile(values, item)
      )
      const stats = {
        avgVal,
        stdDev,
        quantiles,
      }

      const item = {
        group: feature,
        value: newArr.length,
        stats,
      }
      arr.push(item)
    })
    return arr
  },
  distancePerPrice(store) {
    const distance = []
    store.adverts.forEach((ad) => {
      const obj = Object.assign(
        {},
        { group: ad.market },
        { distance: ad.distance },
        { price: (ad.price / ad.m).toFixed(2) }
      )
      distance.push(obj)
    })
    return distance
  },
  pricePerSQM(store) {
    const price = []
    store.adverts.forEach((ad) => {
      if (ad.m < 150) {
        const obj = Object.assign(
          {},
          { group: ad.advertiser_type },
          { price: ad.price },
          { sqm: ad.m }
        )
        price.push(obj)
      }
    })
    return price
  },
  constructionPerSQM(store) {
    const boxplot = []
    store.adverts.forEach((ad) => {
      const obj = Object.assign(
        {},
        {
          group:
            ad.construction_status === ''
              ? 'no data'
              : ad.construction_status.split('_').join(' '),
        },
        { key: ad.market },
        { value: +ad.price / +ad.m }
      )
      boxplot.push(obj)
    })
    return boxplot
  },
  numberOfRoomsPerSQM(store) {
    const boxplot = []
    store.adverts.forEach((ad) => {
      if (+ad.rooms_num <= 6) {
        const obj = Object.assign(
          {},
          {
            group:
              ad.rooms_num === ''
                ? 'no data'
                : ad.rooms_num.split('_').join(' '),
          },
          { value: +ad.price / +ad.m }
        )
        boxplot.push(obj)
      }
    })
    return boxplot.sort((a, b) => (a.group > b.group ? 1 : -1))
  },
  surfacePerRoom(store) {
    const boxplot = []
    store.adverts.forEach((ad) => {
      if (+ad.rooms_num <= 6) {
        const obj = Object.assign(
          {},
          {
            group:
              ad.rooms_num === ''
                ? 'no data'
                : ad.rooms_num.split('_').join(' '),
          },
          { value: +ad.m / +ad.rooms_num }
        )
        boxplot.push(obj)
      }
    })
    return boxplot.sort((a, b) => (a.group > b.group ? 1 : -1))
  },
  coordinates(store) {
    const coordinates = []
    store.adverts.forEach((ad) => {
      const obj = Object.assign(
        {},
        { id: ad.id },
        { lat: ad.latitude },
        { lng: ad.longitude }
      )
      coordinates.push(obj)
    })
    return coordinates
  },
}
