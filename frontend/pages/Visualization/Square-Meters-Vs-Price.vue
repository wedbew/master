<template>
  <Wrapper>
    <Scatter
      api="pricePerSQM"
      title="SQM vs Price"
      :height="700"
      :axes="{
        bottom: { title: 'Square meters', mapsTo: 'sqm' },
        left: { title: 'Price', mapsTo: 'price' },
      }"
    />
  </Wrapper>
</template>
