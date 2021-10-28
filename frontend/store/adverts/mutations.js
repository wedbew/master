export default {
  DATA_LOADED(state, laoded) {
    state.dataLoaded = laoded
  },
  SET_ADVERTS(state, adverts) {
    state.adverts = adverts
  },
  ADD_ADVERT(state, ad) {
    state.list.push({
      ad,
    })
  },
  REMOVE_ADVERT(state, { ad }) {
    state.list.splice(state.list.indexOf(ad), 1)
  },
}
