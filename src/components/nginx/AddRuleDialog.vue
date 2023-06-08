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
                    :rules="[RULES.required, RULES.noDuplicateName]"
                    v-model="rule.serviceName"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-text-field
                    label="Location"
                    hint="/api/tracker"
                    :rules="[RULES.required, RULES.startWithSlash]"
                    v-model="rule.location"
                ></v-text-field>

              </v-col>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                  <v-switch color="blue" inset label="add websockets" v-model="rule"></v-switch>
              </v-col>
            </v-row>
            <small>port is automaticly assigned</small>
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
  import {useNginxStore, NginxRule} from '../../stores/NginxStore.ts'

  const nginxStore = useNginxStore()

  const dialog = ref(false)
  const loading = ref(false)
  const formValid = ref(false)

  const rule = ref<NginxRule>({
    id: 0,
    serviceName: "",
    location: "",
    port: 0,
    websocketsEnabled: false
  })

  const RULES = {
    required: (value: string) => !!value || 'Required',
    startWithSlash: (value: string) => value.startsWith("/") || 'Must start with slash',
    noDuplicateName: (value: string) => !nginxStore.rules.find((rule) => rule.serviceName === value) || 'Service name must be unique'
  }

  const create = async (): Promise<void> => {
    if(!formValid.value) return
    loading.value = true
    await nginxStore.createRule(rule.value)
    loading.value = false
    dialog.value = false
  }
</script>

<style scoped>

</style>