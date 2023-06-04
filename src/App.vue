<script setup lang="ts">
import "mcs-navbar"
import { ref } from "vue";
import Nginx from "./components/nginx/Nginx.vue";
import Docker from "./components/docker/Docker.vue"

const tab = ref("nginx");
</script>

<template>

  <div class="app">
    <header class="navbar">
      <mcs-navbar logoSrc="/src/assets/vue.svg"/>
    </header>
    <main style="display: flex;">
      <div class="tabs">
        <v-tabs
            v-model="tab"
            direction="vertical"
            color="white" bgColor="donkerblauw"
          >
          <v-tab value="nginx">Nginx</v-tab>
          <v-tab value="docker">Docker</v-tab>
        </v-tabs>
      </div>

      <v-window v-model="tab" class="window" direction="vertical">
        <v-window-item value="nginx" class="window">
          <Nginx />
        </v-window-item>

        <v-window-item value="docker">
          <Docker />
        </v-window-item>
      </v-window>
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

.window {
  width: 100%;
  height: 100%;
}
</style>