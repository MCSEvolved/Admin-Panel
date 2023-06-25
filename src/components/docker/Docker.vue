<template>
    <v-container class="title-container">
      <h1 class="title">Docker Control</h1>
      <div class="text-end ma-2 add-btn">
        <AddServiceDialog />
      </div>
    </v-container>

    <v-container class="list" color="donkerblauw">
      <v-layout column style="height: 100%">
        <v-card md6 style="overflow-y: auto; height: 100%; width: 100%">
          <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="(headers as DeepReadonly<{key: string, title: string}[]>)"
              :items="dockerStore.services"
              item-key="title"
              items-per-page="10"
              :loading="loading"
              :search="search"
          >
            <template v-slot:item.serviceName="{ item }">
              <v-btn color="blue" variant="plain" :to="{name: 'docker-logs', params: {serviceName: item.columns.serviceName}}">{{ item.columns.serviceName }}</v-btn>
            </template>

            <template v-slot:column.edit>
              Edit
            </template>

            <template v-slot:column.delete>
              Delete
            </template>

            <template v-slot:item.edit="{ item }">
              <EditServiceDialog
                  :service="(item.columns as DockerService)"
              />
            </template>

            <template v-slot:item.delete="{ item }">
              <DeleteServiceDialog :name="item.columns.serviceName" />
            </template>

            <template v-slot:item.control="{ item }">
              <div class="d-flex justify-center">
                <v-btn
                  v-if="(item.columns.status as string).startsWith('running')"
                  color="red"
                  @click="stopService(item.columns.serviceName)"
                  >
                  Stop
                </v-btn>
                <v-btn v-else color="green" @click="startService(item.columns.serviceName)">
                  Start
                </v-btn>
                <v-btn color="grey" @click="resetService(item.columns.serviceName)">
                  Reset
                </v-btn>
              </div>
            </template>

            <template v-slot:item.status="{item}">
              <div v-if="(item.columns.status as string).startsWith('exited')">
                <v-icon size="x-large" icon="mdi-pause-circle" color="red" ref="exitedIconRef" class="status-icon"></v-icon>
                <v-tooltip
                    :activator="$refs.exitedIconRef as Element"
                    location="start">
                  Exited
                </v-tooltip>
              </div>
              <div v-else-if="(item.columns.status as string).startsWith('created')">
                <v-icon size="x-large" icon="mdi-pause-circle" color="grey" ref="createdIconRef" class="status-icon"></v-icon>
                <v-tooltip
                    :activator="$refs.createdIconRef as Element"
                    location="start">
                  Created
                </v-tooltip>
              </div>
              <div v-else-if="(item.columns.status as string).startsWith('running')">
                <v-icon size="x-large" icon="mdi-play-circle" color="green" ref="runningIconRef" class="status-icon"></v-icon>
                <v-tooltip
                    :activator="$refs.runningIconRef as Element"
                    location="start">
                  Running
                </v-tooltip>
              </div>

            </template>

          </v-data-table>
        </v-card>
      </v-layout>
    </v-container>

    <v-overlay
      v-model="loadService"
      class="align-center justify-center"
      :close-on-content-click="false"
      persistent
    >
    <v-progress-circular indeterminate :size="128"></v-progress-circular>
    </v-overlay>

</template>

<script setup lang="ts">
    import { DeepReadonly, ref } from 'vue'
    import { DockerService, useDockerStore } from '../../stores/DockerStore';
    import AddServiceDialog from "./AddServiceDialog.vue";
    import EditServiceDialog from "./EditServiceDialog.vue";
    import DeleteServiceDialog from "./DeleteServiceDialog.vue";

    const dockerStore = useDockerStore()
    const search = ref("")
    const loading = ref(true)

    const loadService = ref(false)

    const headers = [
        { title: 'Service name', key: 'serviceName', align: 'start', width: '10%'},
        { title: 'Status', key: 'status', align: 'center', width: '10%'},
        { title: 'Control', key: 'control', align: 'center', width: '10%'},
        { title: 'Edit', key: 'edit', align: 'center', width: '10%'},
        { title: 'Delete', key: 'delete', align: 'center', width: '10%'},
    ]

    dockerStore.fetchAllServices().finally(() => loading.value = false)

    const stopService = async (name: string) => {
      loadService.value = true
      dockerStore.stopService(name).finally(() => loadService.value = false)

    }
    const startService = async (name: string) => {
      loadService.value = true
      dockerStore.startService(name).finally(() => loadService.value = false)

    }
    const resetService = (name: string) => {
      loadService.value = true
      dockerStore.resetService(name).finally(() => loadService.value = false)
    }
</script>

<style>
h1 {
    text-align: center;
    color: white;
}

.list {
    width: 90%;
    height: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 0px !important;

}

.title-container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    padding-bottom: 0px !important;
}

.title {
    grid-column-start: 2;
    grid-column-end: 3;
}

.add-btn {
    grid-column-start: 3;
}

.status-icon {
  margin-right: 1.5rem;
}

</style>