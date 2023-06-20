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
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-text-field
                    label="Service Name"
                    v-model="rule.serviceName"
                    :rules="[RULES.required, RULES.noDuplicateName]"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-text-field
                    label="Location"
                    v-model="rule.location"
                    hint="api.mcsynergy.nl/tracker"
                    :rules="[RULES.required, RULES.startWithSlash]"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-text-field
                    label="Port"
                    v-model="rule.port"
                    readonly
                    disabled
                ></v-text-field>
              </v-col>
              <v-col
                  cols="16"
                  sm="8"
                  md="6"
              >
                <v-switch
                    color="blue"
                    inset
                    label="add websockets"
                    v-model="rule.websocketsEnabled"
                ></v-switch>
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
  import {NginxRule, useNginxStore} from '../../stores/NginxStore.ts'

  const nginxStore = useNginxStore()

  const dialog = ref(false)
  const loading = ref(false)
  const formValid = ref(false)
  const props = defineProps<{rule: NginxRule}>()

  const RULES = {
    required: (value: string) => !!value || 'Required',
    startWithSlash: (value: string) => value.startsWith("/") || 'Must start with slash',
    noDuplicateName: (value: string) => 
      value === props.rule.serviceName || 
      !nginxStore.rules.find((rule) => rule.serviceName === value) || 'Service name must be unique'
  }

  const rule = ref<NginxRule>({...props.rule})

  const update = async () => {
    if(!formValid) return
    loading.value = true
    await nginxStore.updateRule(props.rule.id, rule.value)
    loading.value = false
    dialog.value = false
  }
</script>

<style scoped>

</style>