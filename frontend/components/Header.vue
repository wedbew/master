<template>
  <client-only>
    <cv-header aria-label="Carbon header">
      <cv-header-menu-button
        aria-label="Header menu"
        aria-controls="side-nav"
      />
      <cv-skip-to-content href="#main-content">
        Skip to content
      </cv-skip-to-content>
      <cv-header-name prefix="Vis"></cv-header-name>
      <cv-header-nav aria-label="Carbon nav">
        <cv-header-menu-item href="/">Home</cv-header-menu-item>
        <cv-header-menu-item href="/maps">Maps</cv-header-menu-item>
        <cv-header-menu-item href="/report">Report</cv-header-menu-item>
        <cv-header-menu-item href="/explore-data"
          >Explore Data</cv-header-menu-item
        >
        <cv-header-menu-item href="/prediction">Prediction</cv-header-menu-item>
        <cv-header-menu aria-label="Visualizations" title="Visualizations">
          <cv-header-menu-item href="/visualization/price-vs-distance">
            Price vs Distance
          </cv-header-menu-item>
          <cv-header-menu-item href="/visualization/square-meters-vs-price">
            Square meters vs price
          </cv-header-menu-item>
          <cv-header-menu-item
            href="/visualization/construction-status-per-sqmp"
          >
            Construction status vs SQMP
          </cv-header-menu-item>
          <cv-header-menu-item href="/visualization/averages-per-location">
            Averages Per Location
          </cv-header-menu-item>
          <cv-header-menu-item href="/visualization/building-year">
            Price per SQM vs building yaer
          </cv-header-menu-item>
          <cv-header-menu-item href="/visualization/rooms-per-sqmp">
            Number of room per SQMP
          </cv-header-menu-item>
          <cv-header-menu-item href="/visualization/surface-per-room">
            Surface per room
          </cv-header-menu-item>
        </cv-header-menu>
      </cv-header-nav>
      <template #left-panels>
        <cv-side-nav id="side-nav" fixed>
          <cv-side-nav-items>
            <cv-header-side-nav-items>
              <cv-header-menu-item href="/">Home</cv-header-menu-item>
              <cv-header-menu-item href="/maps">Maps</cv-header-menu-item>
              <cv-header-menu-item href="/report">Report</cv-header-menu-item>
              <cv-header-menu
                aria-label="Visualizations"
                title="Visualizations"
              >
                <cv-header-menu-item href="/visualization/price-vs-distance">
                  Price vs Distance
                </cv-header-menu-item>
                <cv-header-menu-item href="/visualization/building-year">
                  Price per SQM vs building yaer
                </cv-header-menu-item>
              </cv-header-menu>
            </cv-header-side-nav-items>
          </cv-side-nav-items>
        </cv-side-nav>
      </template>
    </cv-header>
  </client-only>
</template>
