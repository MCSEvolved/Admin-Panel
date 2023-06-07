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
  import { useNginxStore } from '../../stores/NginxStore';

  const nginxStore = useNginxStore()

  const {id} = defineProps({id: Number})
  const dialog = ref(false)
  const loading = ref(false)

  const remove = async (): Promise<void> => {
    if(id) {
      loading.value = true
      await nginxStore.deleteRule(id)
      loading.value = false
      dialog.value = false
    }
  }
</script>

<style scoped>

</style>