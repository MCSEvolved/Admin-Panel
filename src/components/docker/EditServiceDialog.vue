<template>
  <v-dialog
      v-model="dialog"
      width="1024"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          color="blue"
          v-bind="props"
      >
        EDIT
      </v-btn>
    </template>
    <v-card>
      <v-form @submit.prevent v-model="formValid">
        <v-card-title>
          <span class="text-h5">Edit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="32"
                  sm="16"
                  md="12"
              >
              <v-file-input
                label="Compose file"
                accept=".yml,.yaml"
                :rules="[RULES.required]"
                v-model="service.composeData"
              ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
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
              color="blue-darken-1"
              variant="text"
              @click="update()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
import { DockerServiceRo, useDockerStore } from '../../stores/DockerStore';

  const dockerStore = useDockerStore()

  const dialog = ref(false)
  const loading = ref(false)
  const formValid = ref(false)
  const props = defineProps<{service: DockerServiceRo}>()

  const RULES = {
    required: (value: string) => value.length === 1 || 'Required',
  }

  const service = ref<{
    composeData: File[]
  }>({
      composeData: [],
    })

  const update = async () => {
    if(!formValid) return
    loading.value = true
    const data = await service.value.composeData[0].text();
    await dockerStore.updateService(props.service.serviceName, data)
    loading.value = false
    dialog.value = false
  }
</script>

<style scoped>

</style>