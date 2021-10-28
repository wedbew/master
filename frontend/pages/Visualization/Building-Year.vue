<template>
  <Wrapper>
    <BarChart
      api="build_year"
      title="Price per SQM vs buiding year"
      :height="800"
      :axes="{
        left: { mapsTo: 'avgVal' },
        bottom: { mapsTo: 'group' },
      }"
    />
  </Wrapper>
</template>
