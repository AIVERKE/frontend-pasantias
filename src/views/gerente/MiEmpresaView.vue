<template>
  <div class="space-y-6">
    <!-- Perfil de la Empresa (Editable) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-domain" size="20" class="text-primary"></v-icon>
          Perfil Corporativo
        </h2>
        <div v-if="mensaje" :class="mensaje.includes('Error') ? 'text-danger' : 'text-success'" class="text-sm font-medium">
          {{ mensaje }}
        </div>
        <button 
          @click="guardarCambios"
          :disabled="guardando"
          class="text-sm font-medium bg-primary text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <v-icon v-if="guardando" icon="mdi-loading" size="16" class="animate-spin"></v-icon>
          <v-icon v-else icon="mdi-content-save" size="16"></v-icon>
          {{ guardando ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Logo de la Empresa -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-32 h-32 rounded-xl bg-neutral border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden relative group cursor-pointer hover:bg-gray-100 transition-colors">
              <v-icon icon="mdi-camera-plus" size="32" class="group-hover:scale-110 transition-transform"></v-icon>
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white text-xs font-bold">Cambiar Logo</span>
              </div>
            </div>
            <p class="text-[11px] text-gray-400 text-center max-w-[120px]">JPG, PNG o SVG. Max 2MB.</p>
          </div>

          <!-- Formulario de Datos -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <!-- Logo de la Empresa -->
            <div class="col-span-1 md:col-span-2 flex flex-col items-center gap-3 mb-4">
              <div class="w-32 h-32 rounded-xl bg-neutral border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden relative group cursor-pointer hover:bg-gray-100 transition-colors">
                <img v-if="empresa.logo_url" :src="empresa.logo_url" class="w-full h-full object-contain" />
                <v-icon v-else icon="mdi-camera-plus" size="32" class="group-hover:scale-110 transition-transform"></v-icon>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-white text-xs font-bold">Cambiar Logo</span>
                </div>
              </div>
              <p class="text-[11px] text-gray-400 text-center max-w-[120px]">JPG, PNG o SVG. Max 2MB.</p>
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Misión</label>
              <textarea v-model="empresa.mision" rows="3" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary leading-relaxed"></textarea>
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Visión</label>
              <textarea v-model="empresa.vision" rows="3" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary leading-relaxed"></textarea>
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Objetivos</label>
              <textarea v-model="empresa.objetivos" rows="3" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary leading-relaxed"></textarea>
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Quiénes Somos</label>
              <textarea v-model="empresa.quienes_somos" rows="4" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary leading-relaxed"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Equipo Coordinador (Jefes de Pasantes) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-account-tie" size="20" class="text-primary"></v-icon>
          Equipo Coordinador (Jefes de Pasantes)
        </h2>
        <router-link to="/gerente/equipo" class="text-sm font-medium text-primary hover:text-blue-700 transition-colors flex items-center gap-1">
          Gestionar equipo <v-icon icon="mdi-arrow-right" size="16"></v-icon>
        </router-link>
      </div>
      <div class="p-6">
        <div v-if="loading" class="text-center py-8">
          <v-icon icon="mdi-loading" size="32" class="animate-spin text-gray-400"></v-icon>
          <p class="text-gray-500 mt-2">Cargando...</p>
        </div>
        <div v-else-if="equipo.length === 0" class="text-center py-8 text-gray-500">
          <v-icon icon="mdi-account-group" size="32" class="text-gray-300 mb-2"></v-icon>
          <p>No hay chiefs de pasantes registrados</p>
          <router-link to="/gerente/equipo" class="text-primary text-sm hover:underline">
            Invitar primer jefe de pasantes
          </router-link>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Tarjeta de Jefe -->
          <div v-for="jefe in equipo" :key="jefe.id" class="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:border-primary/30 transition-colors bg-neutral/50">
            <div class="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary font-bold text-lg shadow-sm shrink-0">
              {{ jefe.iniciales }}
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-secondary truncate">{{ jefe.nombre }}</h4>
              <p class="text-xs text-gray-500 mt-0.5 truncate">{{ jefe.area }}</p>
            </div>
          </div>
          
          <!-- Botón Añadir -->
          <button class="border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center gap-2 text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-blue-50/50 transition-all">
            <v-icon icon="mdi-plus" size="20"></v-icon>
            <span class="text-sm font-medium">Invitar Jefe</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Estado
const loading = ref(true)
const guardando = ref(false)
const mensaje = ref('')

// Empresa - usar reactive para el formulario
const empresa = reactive({
  logo_url: '',
  // Campos de información extendida
  mision: '',
  vision: '',
  objetivos: '',
  quienes_somos: '',
})

const equipo = ref([])

// Cargar empresa
onMounted(async () => {
  try {
    loading.value = true
    
    // Cargar empresa
    const empRes = await axios.get('/api/auth/gerente/empresa', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const emp = empRes.data
    
    // Logo
    empresa.logo_url = emp.logo_url || ''
    // Campos de información extendida
    empresa.mision = emp.mision || ''
    empresa.vision = emp.vision || ''
    empresa.objetivos = emp.objetivos || ''
    empresa.quienes_somos = emp.quienes_somos || ''
    
    // Cargar equipo
    const equipoRes = await axios.get('/api/auth/gerente/equipo', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    equipo.value = equipoRes.data || []
    
  } catch (err) {
    console.error('Error cargando empresa:', err)
    mensaje.value = 'Error al cargar los datos'
  } finally {
    loading.value = false
  }
})

// Guardar empresa
const guardarCambios = async () => {
  try {
    guardando.value = true
    await axios.patch('/api/auth/gerente/empresa', {
      logo_url: empresa.logo_url,
      // Campos de información extendida
      mision: empresa.mision,
      vision: empresa.vision,
      objetivos: empresa.objetivos,
      quienes_somos: empresa.quienes_somos,
    }, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    mensaje.value = 'Cambios guardados correctamente'
    setTimeout(() => mensaje.value = '', 3000)
  } catch (err) {
    console.error('Error guardando:', err)
    mensaje.value = 'Error al guardar los cambios'
  } finally {
    guardando.value = false
  }
}
</script>
