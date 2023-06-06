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
        ADD
      </v-btn>
    </template>
    <v-card>
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
                  hint="/api/tracker"
              ></v-text-field>

            </v-col>
            <v-col
                cols="16"
                sm="8"
                md="6"
            >
                <v-switch color="blue" inset label="add websockets"></v-switch>
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
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
        >
          Add
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