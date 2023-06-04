<template>
    <h1>Nginx Control</h1>

    <v-card class="list" color="donkerblauw">
        <v-data-table
            :headers="headers"
            :items="items"
            item-key="title"
            items-per-page="5"
            color="purple"
            height="100%"
        ></v-data-table>
    </v-card>
</template>

<script setup>
import {ref} from 'vue'
    const items = ref([
        {
            title: "Filesyncer",
            location: "/filesyncer",
            port: 8469
        }
    ])

    const headers = [
        { title: 'Service name', key: 'title', align: 'start'},
        { title: 'Location', key: 'location', align: 'start'},
        { title: 'Port', key: 'port', align: 'start'},
        { title: 'Edit', key: 'edit', align: 'center'},
        { title: 'Delete', key: 'delete', align: 'center'},
      ]
</script>

<style scoped>
h1 {
    text-align: center;
    color: white;
}

.list {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    height: 90%;
}
</style>