import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import pinia from './stores'
import axios from 'axios'

const app = createApp(App)

// Configuración global de Axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api'

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
