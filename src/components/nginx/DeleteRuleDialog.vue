<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="512"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          color="red"
          v-bind="props"
      >
        DELETE
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Delete</span>
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete this rule?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
            color="red"
            variant="text"
            @click="dialog = false"
        >
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import {ref} from 'vue'
  const dialog = ref(false)
</script>

<style scoped>

</style>