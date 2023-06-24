<template>
    <v-container fluid class="h-100 w-100">
        <v-sheet class="h-100 w-100 bg-blue pa-4 rounded-lg">
            <div class="h-100 w-100 pa-4 bg-black rounded-lg">
                <v-virtual-scroll
                class="bg-black"
                height="100%"
                width="100%"
                :items="logs"
                >

                <template v-slot:default="{ item }">
                    <span
                    class="text-no-wrap"
                    style="width: 50px;
                    display: block;"
                    @vue:mounted="scrollToBottom"
                    v-html="item">
                    </span>
                </template>

                </v-virtual-scroll>
            </div>
        </v-sheet>
    </v-container>
    
</template>

<script setup>
    import {ref} from 'vue'
    import { useDockerStore } from '../../stores/DockerStore';
    import {useRoute} from "vue-router"
    import { nextTick } from 'vue';


    const logs = ref([''])
    const dockerStore = useDockerStore()
    
    const route = useRoute()
    dockerStore.fetchLogs(route.params.serviceName).then(receivedLogs => {
        logs.value = receivedLogs.split("\n")
    })

</script>

<style scoped>
</style>