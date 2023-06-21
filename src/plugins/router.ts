import App from "../App.vue"
import { createRouter, createWebHistory } from 'vue-router'
import Nginx from "../components/nginx/Nginx.vue"
import Docker from "../components/docker/Docker.vue"

const routes = [
    {path: '/admin-panel/', component: Nginx},
    {path: '/admin-panel/nginx', component: Nginx},
    {path: '/admin-panel/docker', component: Docker}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})