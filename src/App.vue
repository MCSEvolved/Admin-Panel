<script setup lang="ts">
import "mcs-navbar"
import { ref } from "vue";
import {useRouter} from 'vue-router'

const router = useRouter()
const tab = ref(window.location.pathname.split("/")[2]);

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
            @update:model-value="router.push({name: tab})"
          >
          <v-tab value="nginx">Nginx</v-tab>
          <v-tab value="docker">Docker</v-tab>
        </v-tabs>
      </div>

      <div class="window">
        <router-view></router-view>

      </div>
    </main>
  </div>

</template>

<style scoped>

.app {
  height: 100vh;
}

.navbar {
  z-index: 1000;
}

main {
  width: 100vw;
  height: calc(100% - 56px);
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