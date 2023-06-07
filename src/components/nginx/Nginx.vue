<template>
    <v-container class="title-container">
      <h1 class="title">Nginx Control</h1>
      <div class="text-end ma-2 add-btn">
        <AddRuleDialog />
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
              :items="nginxStore.rules"
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
              <EditRuleDialog
                  :rule="(item.columns as NginxRule)"
              />
            </template>

            <template v-slot:item.websocketsEnabled="{ item }">
              <v-icon start v-if="item.columns.websocketsEnabled" icon="mdi-check-circle" color="green"/>
              <v-icon start v-else icon="mdi-close-circle" color="red"/>
            </template>

            <template v-slot:item.delete="{ item }">
              <DeleteRuleDialog :id="item.columns.id" />
            </template>

          </v-data-table>
        </v-card>
      </v-layout>
    </v-container>

</template>

<script setup lang="ts">
    import {DeepReadonly, ref} from 'vue'
    import EditRuleDialog from "./EditRuleDialog.vue";
    import DeleteRuleDialog from "./DeleteRuleDialog.vue";
    import AddRuleDialog from "./AddRuleDialog.vue";
    import {useNginxStore, NginxRule} from "../../stores/NginxStore.ts"

    const nginxStore = useNginxStore()
    const search = ref("")
    const loading = ref(true)

    const headers = [
        { title: 'Service name', key: 'serviceName', align: 'start', width: '10%'},
        { title: 'Location', key: 'location', align: 'start', width: '10%'},
        { title: 'Port', key: 'port', align: 'start', width: '8%'},
        { title: 'websockets', key: 'websocketsEnabled', align: 'center', width: '10%'},
        { title: 'Edit', key: 'edit', align: 'center', width: '10%'},
        { title: 'Delete', key: 'delete', align: 'center', width: '10%'},
    ]

    nginxStore.fetchAllRules().finally(() => loading.value = false)
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