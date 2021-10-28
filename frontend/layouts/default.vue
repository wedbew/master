<template>
  <div>
    <Header />
    <Nuxt class="pt-50" />
  </div>
</template>
<script>
export default {
  mounted() {
    if (localStorage.getItem('data')) {
      const data = JSON.parse(localStorage.getItem('data'))
      const adverts = data.adverts
      this.$store.commit('adverts/SET_ADVERTS', adverts)
    } else {
      this.$store.dispatch('adverts/fetchAds').then(() => {
        localStorage.setItem('data', JSON.stringify(this.$store.state.adverts))
      })
    }
  },
}
</script>

<style lang="scss">
@import '@carbon/themes/scss/themes';

@include carbon--theme($carbon--theme--g90);
// @include carbon--theme($carbon--theme--g100);
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
