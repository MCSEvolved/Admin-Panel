<template>
  <v-dialog
      v-model="dialog"
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
        Are you sure you want to delete this service?
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
            @click="remove()"
            :loading="loading"
        >
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
import { useDockerStore } from '../../stores/DockerStore';

  const dockerStore = useDockerStore()

  const {name} = defineProps({name: String})
  const dialog = ref(false)
  const loading = ref(false)

  const remove = async (): Promise<void> => {
    console.log("delete:", name)
    if(name) {
      console.log("delete 2")
      loading.value = true
      await dockerStore.deleteService(name)
      loading.value = false
      dialog.value = false
    }
  }
</script>

<style scoped>

</style>