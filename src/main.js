import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import pinia from './stores'
import axios from 'axios'
import './assets/tailwind.css'

const app = createApp(App)

// Configuración global de Axios
// Dejamos que las peticiones vayan al proxy de Vite para que gestione /api

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
