<template>
  <Wrapper>
    <BoxPlot
      api="numberOfRoomsPerSQM"
      title="Number of rooms per SQMP"
      :height="700"
      :axes="{
        left: { mapsTo: 'group' },
        bottom: { mapsTo: 'value' },
      }"
    />
  </Wrapper>
</template>
