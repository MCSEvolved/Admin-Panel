import { createApp } from 'vue'
import App from './App.vue'
import "./styles/app.css"
import { vuetify } from './plugins/vuetify'

createApp(App)
    .use(vuetify)
    .mount('#app')
