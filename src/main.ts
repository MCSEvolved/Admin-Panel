import { createApp } from 'vue'
import App from './App.vue'
import "./styles/app.css"
import { vuetify } from './plugins/vuetify'
import { pinia } from './plugins/pinia'
import { router } from './plugins/router'

createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(router)
    .mount('#app')
