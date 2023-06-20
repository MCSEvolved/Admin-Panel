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
        ADD
      </v-btn>
    </template>
    <v-card>
      <v-form @submit.prevent v-model="formValid">
        <v-card-title>
          <span class="text-h5">Add</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-text-field
                    label="Service Name"
                    :rules="[RULES.required, RULES.onlyLetters, RULES.noDuplicateName]"
                    v-model="service.serviceName"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="16"
                  sm="8"
                  md="6"
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
              type="submit"
              color="blue-darken-1"
              variant="text"
              :loading="loading"
              @click="create()"
              
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import { DockerServiceDto, useDockerStore } from '../../stores/DockerStore';

  const dockerStore = useDockerStore()

  const dialog = ref(false)
  const loading = ref(false)
  const formValid = ref(false)

  const service = ref<DockerServiceDto>({
    serviceName: "",
    composeData: []
  })

  const RULES = {
    required: (value: string) => value.length === 1|| 'Required',
    noDuplicateName: (value: string) => !dockerStore.services.find((service) => service.serviceName === value) || 'Service name must be unique',
    onlyLetters: (value: string) => /^[A-Za-z]*$/.test(value) ? true : 'Only letters allowed'
  }

  const create = async (): Promise<void> => {
    if(!formValid.value) return
    loading.value = true
    await dockerStore.createService(service.value)
    loading.value = false
    dialog.value = false
  }
</script>

<style scoped>

</style>