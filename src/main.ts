import { createApp } from 'vue'
import App from './App.vue'
import "./styles/app.css"
import { vuetify } from './plugins/vuetify'
import { pinia } from './plugins/pinia'

createApp(App)
    .use(vuetify)
    .use(pinia)
    .mount('#app')
