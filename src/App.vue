<script setup lang="ts">
import "mcs-navbar"
</script>

<template>
  <mcs-navbar logoSrc="/src/assets/vue.svg"/>

  <main style="display: flex;">
    <div  class="tabs">
      <v-tabs direction="vertical" color="secondary" bgColor="donkerblauw">
        <v-tab value="nginx">Nginx</v-tab>
      </v-tabs>
    </div>
    

  </main>
</template>

<style scoped>

main {
  width: 100vw;
}

.tabs {
  background-color: #102c47;
  height: 100vh;
  z-index: -1;
}

</style>