export default {
  async fetchAds({ commit }) {
    return await this.$axios
      .$get('')
      .then((adverts) => {
        commit('SET_ADVERTS', adverts)
      })
      .catch((error) => {
        throw new Error(`Unable to fetch adverts: ${error}`)
      })
  },
}
