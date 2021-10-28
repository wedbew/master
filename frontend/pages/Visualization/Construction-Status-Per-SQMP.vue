<template>
  <Wrapper>
    <BoxPlot
      api="constructionPerSQM"
      title="Construction status per SQMP"
      :height="700"
      :axes="{
        left: { mapsTo: 'group' },
        bottom: { mapsTo: 'value' },
      }"
    />
  </Wrapper>
</template>
