<template>
    <v-container class="title-container">
      <h1 class="title">Nginx Control</h1>
      <div class="text-end ma-2 add-btn">
        <AddRuleDialog />
      </div>
    </v-container>

    <v-container class="list" color="donkerblauw">
      <v-layout column>
        <v-card md6 style="overflow-y: auto; width: 100%">
          <v-data-table
              :headers="headers"
              :items="items"
              item-key="title"
              items-per-page="10"
              :loading="false"
          >

            <template v-slot:column.edit="{ item }">
              Edit
            </template>

            <template v-slot:column.delete="{ item }">
              Delete
            </template>

            <template v-slot:item.edit="{ item }">
              <EditRuleDialog
                  :item="item"
              />
            </template>

            <template v-slot:item.delete="{ item }">
              <DeleteRuleDialog />
            </template>

          </v-data-table>
        </v-card>
      </v-layout>
    </v-container>

</template>

<script setup>
import {ref} from 'vue'
import EditRuleDialog from "./EditRuleDialog.vue";
import DeleteRuleDialog from "./DeleteRuleDialog.vue";
import AddRuleDialog from "./AddRuleDialog.vue";


    const items = ref([
        {
            title: "Filesyncer",
            location: "/filesyncer",
            port: 8469
        }
    ])

for(let i = 0 ; i < 100 ; i++) {
  items.value.push({
    title: `Filesyncer_${i}`,
    location: "/filesyncer",
    port: 8469
  })
}

    const headers = [
        { title: 'Service name', key: 'title', align: 'start'},
        { title: 'Location', key: 'location', align: 'start'},
        { title: 'Port', key: 'port', align: 'start'},
        { title: 'Edit', key: 'edit', align: 'center'},
        { title: 'Delete', key: 'delete', align: 'center'},
      ]
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