<template>
  <Wrapper class="theme--g100">
    <Scatter
      api="distancePerPrice"
      title="Distance vs price per square meter"
      class="theme--g100"
      :height="700"
      :axes="{
        bottom: { title: 'Distance', mapsTo: 'distance' },
        left: { title: 'Price', mapsTo: 'price' },
      }"
    />
  </Wrapper>
</template>
