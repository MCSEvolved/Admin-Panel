<template>
  <navbar logoSrc="/emerald-exchange-wide.svg" />
</template>

<script lang="ts">
import {applyReactInVue} from 'veaury'
import Navbar from 'mcs-navbar'

export default {
  components: {
    // Use HOC 'applyReactInVue'
    navbar: applyReactInVue(Navbar)
  }
}
</script>