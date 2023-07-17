<script setup lang="ts">
import "mcs-navbar"
import { ref } from "vue";
import {useRouter} from 'vue-router'
import logo from "./assets/vue.svg"
const router = useRouter()
const tab = ref(window.location.pathname.split("/")[2]);

</script>

<template>

  <div class="app">
    <header class="navbar">
      <mcs-navbar :logoSrc="logo" debug="false"/>
    </header>
    <main>
        <v-tabs
            v-model="tab"
            direction="vertical"
            color="white" bgColor="donkerblauw"
            mandatory
            class="tabs"
          >
          <v-tab value="nginx" @click="router.push({name: 'nginx'})">Nginx</v-tab>
          <v-tab value="docker" @click="router.push({name: 'docker'})">Docker</v-tab>
        </v-tabs>

      <div class="window">
        <router-view></router-view>
      </div>
    </main>
  </div>

</template>

<style scoped>

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  z-index: 1000;
}

main {
  background-color: #206191;
  min-height: 0;
  height: 100%;
}

.tabs {
  background-color: #102c47;
  height: 100% !important;
  width: 120px;
  float: left;
}

.window {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>