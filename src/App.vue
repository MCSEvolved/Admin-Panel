<script setup lang="ts">
import "mcs-navbar"
</script>

<template>

  <div class="app">
    <v-header class="navbar">
      <mcs-navbar logoSrc="/src/assets/vue.svg" />
    </v-header>
    <main style="display: flex;">
      <div class="tabs">
        <v-tabs
            direction="vertical"
            color="white" bgColor="donkerblauw"
          >
          <v-tab>Nginx</v-tab>
          <v-tab>Docker</v-tab>
        </v-tabs>
      </div>
    </main>
  </div>

</template>

<style scoped>

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  z-index: 1000;
}

main {
  width: 100vw;
  height: 100%;
  background-color: #206191;
}

.tabs {
  background-color: #102c47;
  height: 100%;
}
</style>