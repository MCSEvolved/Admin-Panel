<template>
  <v-dialog
      v-model="dialog"
      persistent
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
                  :model-value="title"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="16"
                sm="8"
                md="6"
            >
              <v-text-field
                  label="Location"
                  :model-value="location"
                  hint="/api/tracker"
              ></v-text-field>
            </v-col>
            <v-col
                cols="16"
                sm="8"
                md="6"
            >
              <v-text-field
                  label="Port"
                  :model-value="port"
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
                  :model-value="websocketsEnabled"
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
            @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import {ref} from 'vue'
  const dialog = ref(false)
  const props = defineProps(['item'])

  const {
    title,
    location,
    port,
    websocketsEnabled
  } = props.item.columns
</script>

<style scoped>

</style>