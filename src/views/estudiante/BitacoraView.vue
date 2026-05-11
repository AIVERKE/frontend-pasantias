<template>
  <div v-if="tienePasantia" class="h-full flex flex-col md:flex-row gap-6">
    <!-- Columna Izquierda: LISTA (LIFO) -->
    <div class="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      <div class="p-4 border-b border-gray-100 shrink-0 bg-gray-50 flex justify-between items-center">
        <h2 class="font-headline font-bold text-secondary text-lg">Semanas</h2>
        <span class="text-xs font-bold bg-neutral text-gray-500 px-2 py-1 rounded-full">{{ semanas.length }} Registradas</span>
      </div>
      
      <div class="flex-1 overflow-y-auto">
        <button 
          v-for="semana in semanas" 
          :key="semana.id"
          @click="semanaActiva = semana.id"
          class="w-full text-left p-4 border-b border-gray-50 transition-colors hover:bg-neutral relative"
          :class="semanaActiva === semana.id ? 'bg-blue-50/50' : ''"
        >
          <div v-if="semanaActiva === semana.id" class="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <div class="flex justify-between items-start mb-1">
            <span class="font-bold text-sm" :class="semanaActiva === semana.id ? 'text-primary' : 'text-secondary'">{{ semana.titulo }}</span>
            <span class="text-xs text-gray-400">{{ semana.fecha }}</span>
          </div>
          <p class="text-xs text-gray-500 mb-2 truncate">{{ semana.resumen }}</p>
          <div class="text-xs text-gray-400 font-medium">
            {{ semana.actividades.length }} actividades asignadas
          </div>
        </button>
      </div>
    </div>

    <!-- Columna Derecha: PANEL -->
    <div class="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden" v-if="semanaDetalle">
      <!-- Encabezado del Panel -->
      <div class="flex border-b border-gray-100 bg-gray-50 p-6 shrink-0 justify-between items-center">
        <div>
          <h2 class="text-xl font-headline font-bold text-secondary">Actividades Registradas</h2>
          <p class="text-sm text-gray-500 mt-1">{{ semanaDetalle.titulo }}</p>
        </div>
        <div v-if="promedio !== null" class="bg-primary/10 px-4 py-2 rounded-lg">
          <span class="text-xs font-bold text-primary block uppercase tracking-wider">Promedio Global</span>
          <span class="text-2xl font-bold text-primary">{{ promedio.toFixed(1) }} / 100</span>
        </div>
      </div>

      <!-- Contenido del Panel -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
        
        <div v-if="semanaDetalle.actividades.length === 0" class="text-center py-8 text-gray-500 text-sm">
          No hay actividades asignadas para esta semana.
        </div>

        <!-- Tarjetas de Actividades (LIFO) -->
        <div 
          v-for="act in semanaDetalle.actividades" 
          :key="act.id"
          class="p-5 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col gap-3 relative overflow-hidden"
        >
          <!-- Borde superior de color según estado -->
          <div class="absolute top-0 left-0 right-0 h-1"
               :class="{
                 'bg-gray-300': act.estado === 'Pendiente',
                 'bg-yellow-400': act.estado === 'En curso',
                 'bg-green-500': act.estado === 'Completada',
                 'bg-red-500': act.estado === 'No completada'
               }">
          </div>

          <div class="flex justify-between items-start pt-1">
            <h4 class="font-bold text-base text-secondary">{{ act.titulo }}</h4>
            <!-- Semáforo de Estado (Badge) -->
            <span 
              class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
              :class="{
                'bg-gray-50 text-gray-600 border-gray-200': act.estado === 'pendiente',
                'bg-yellow-50 text-yellow-700 border-yellow-200': act.estado === 'en_curso',
                'bg-green-50 text-success border-green-200': act.estado === 'completada',
                'bg-red-50 text-danger border-red-200': act.estado === 'no_completada'
              }"
            >
              {{ act.estado.replace('_', ' ') }}
            </span>
          </div>

          <p class="text-sm text-gray-600 leading-relaxed">{{ act.descripcion }}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 bg-neutral p-4 rounded-lg border border-gray-100">
            <div>
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Detalles de Asignación</span>
              <div class="text-xs text-gray-600 space-y-1">
                <p><strong>Asignado:</strong> {{ act.fechaAsignacion }}</p>
                <p><strong>Por:</strong> {{ act.responsable }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-start md:items-end justify-center">
              <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Evaluación</span>
              <div v-if="act.nota !== null" class="text-lg font-headline font-bold text-success">
                Calificación: {{ act.nota }} <span class="text-xs text-gray-400 font-normal">/ 100</span>
              </div>
              <div v-else class="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-md">
                Sin calificar
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Estado Vacío -->
  <div v-else class="flex flex-col items-center justify-center h-full py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    </div>
    <h3 class="text-xl font-headline font-bold text-secondary mb-2">Aún no tienes acceso a la Bitácora</h3>
    <p class="text-gray-500 mb-6 max-w-md">Debes tener una pasantía aprobada y en curso para visualizar tus actividades asignadas y su evaluación.</p>
    <router-link :to="{ name: 'Pasantias' }" class="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm shadow-primary/30 block">
      Explorar Pasantías
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const tienePasantia = ref(false)
const promedio = ref(null)

const semanas = ref([
  {
    id: 1,
    titulo: 'Actividades Registradas',
    fecha: 'Historial completo',
    resumen: 'Todas las actividades ordenadas de la más reciente a la más antigua.',
    actividades: []
  }
])

const semanaActiva = ref(1)

onMounted(async () => {
  if (!authStore.user?.id) return
  
  try {
    // 1. Obtener postulaciones para buscar una aprobada
    const inscripcionesRes = await axios.get(`/api/inscripciones/estudiante/${authStore.user.id}`)
    const pasantiaActiva = inscripcionesRes.data.find(i => i.estado === 'aprobada' && i.estado_ejecucion === 'en_curso')
    
    if (pasantiaActiva) {
      tienePasantia.value = true
      
      // 2. Cargar actividades
      const actsRes = await axios.get(`/api/actividades/inscripcion/${pasantiaActiva.id_inscripcion}`)
      
      const actividadesLIFO = actsRes.data.actividades.map(a => ({
        id: a.id_actividad,
        titulo: a.titulo_actividad,
        descripcion: a.descripcion_actividad,
        estado: a.estado_semaforo,
        fechaAsignacion: new Date(a.fecha_asignacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        responsable: a.jefe_asignador ? `${a.jefe_asignador.nombres} ${a.jefe_asignador.apellidos}` : 'Jefe de Pasantes',
        nota: a.nota_actividad
      })).reverse() // LIFO

      semanas.value[0].actividades = actividadesLIFO
      promedio.value = actsRes.data.promedioGlobal
    }
  } catch (error) {
    console.error('Error al cargar la bitácora', error)
  }
})

const semanaDetalle = computed(() => {
  return semanas.value.find(s => s.id === semanaActiva.value)
})
</script>
