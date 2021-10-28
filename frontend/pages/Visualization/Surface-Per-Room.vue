<template>
  <Wrapper>
    <BoxPlot
      api="surfacePerRoom"
      title="Surface per room"
      :height="700"
      :axes="{
        left: { mapsTo: 'group' },
        bottom: { mapsTo: 'value' },
      }"
    />
  </Wrapper>
</template>
