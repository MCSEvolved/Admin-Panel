import { createRouter, createWebHistory } from 'vue-router'
import Nginx from "../components/nginx/Nginx.vue"
import Docker from "../components/docker/Docker.vue"
import DockerLogs from "../components/docker/DockerLogs.vue"

const routes = [
    {name: "nginx", path: '/admin-panel/', component: Nginx},
    {name: "nginx", path: '/admin-panel/nginx', component: Nginx},
    {name: "docker", path: '/admin-panel/docker', component: Docker},
    {name: "docker-logs", path: '/admin-panel/docker/:serviceName/logs', component: DockerLogs}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})