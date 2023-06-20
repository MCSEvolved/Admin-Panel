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
              <DeleteServiceDialog :name="item.columns.name" />
            </template>

          </v-data-table>
        </v-card>
      </v-layout>
    </v-container>

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

    const headers = [
        { title: 'Service name', key: 'serviceName', align: 'start', width: '10%'},
        { title: 'Status', key: 'status', align: 'center', width: '10%'},
        { title: 'Edit', key: 'edit', align: 'center', width: '10%'},
        { title: 'Delete', key: 'delete', align: 'center', width: '10%'},
    ]

    dockerStore.fetchAllServices().finally(() => loading.value = false)
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

</style>