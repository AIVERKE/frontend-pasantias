import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import pinia from './stores'
import axios from 'axios'
import './assets/tailwind.css'

const app = createApp(App)

// Configuración global de Axios
// El baseURL vacío hace que Axios use el origen actual; el prefijo /api lo maneja cada llamada
axios.defaults.baseURL = ''

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
