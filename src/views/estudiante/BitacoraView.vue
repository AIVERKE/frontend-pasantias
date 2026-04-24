<template>
  <div class="h-full flex flex-col md:flex-row gap-6">
    <!-- Columna Izquierda: LISTA -->
    <div class="w-full md:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      <div class="p-4 border-b border-gray-100 shrink-0 bg-gray-50 flex justify-between items-center">
        <h2 class="font-headline font-bold text-secondary text-lg">Semanas</h2>
        <span class="text-xs font-bold bg-neutral text-gray-500 px-2 py-1 rounded-full">4 Registradas</span>
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
          <p class="text-xs text-gray-500 truncate">{{ semana.resumen }}</p>
          <div class="mt-2 flex gap-2">
            <span v-if="semana.nota" class="text-[10px] font-bold bg-green-50 text-success px-1.5 py-0.5 rounded border border-green-100">
              Nota: {{ semana.nota }}/100
            </span>
            <span v-else class="text-[10px] font-bold bg-orange-50 text-tertiary px-1.5 py-0.5 rounded border border-orange-100">
              Sin calificar
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Columna Derecha: PANEL -->
    <div class="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden" v-if="semanaDetalle">
      <!-- Pestañas del Panel -->
      <div class="flex border-b border-gray-200 bg-gray-50 pt-2 px-4 shrink-0">
        <button 
          @click="activeTab = 'entradas'"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === 'entradas' ? 'text-primary bg-white rounded-t-lg border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-secondary'"
        >
          Mis Entradas
          <div v-if="activeTab === 'entradas'" class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"></div>
        </button>
        <button 
          @click="activeTab = 'actividades'"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === 'actividades' ? 'text-primary bg-white rounded-t-lg border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-secondary'"
        >
          Actividades Asignadas
          <div v-if="activeTab === 'actividades'" class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"></div>
        </button>
      </div>

      <!-- Contenido del Panel -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        
        <!-- Tab: Mis Entradas -->
        <div v-if="activeTab === 'entradas'" class="space-y-6">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-headline font-bold text-secondary">{{ semanaDetalle.titulo }}</h3>
            <div class="text-right">
              <div class="text-sm text-gray-500">Puntuación del Tutor</div>
              <div class="text-2xl font-bold font-headline" :class="semanaDetalle.nota ? 'text-success' : 'text-tertiary'">
                {{ semanaDetalle.nota || '--' }} <span class="text-sm font-body font-normal text-gray-400">/ 100</span>
              </div>
            </div>
          </div>

          <div class="bg-neutral p-5 rounded-lg border border-gray-100 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {{ semanaDetalle.entradaCompleta }}
          </div>

          <div v-if="semanaDetalle.observacionTutor" class="mt-6 border-l-4 border-primary pl-4 py-1">
            <span class="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Observación del Tutor</span>
            <p class="text-sm text-gray-700 italic">"{{ semanaDetalle.observacionTutor }}"</p>
          </div>
        </div>

        <!-- Tab: Actividades -->
        <div v-if="activeTab === 'actividades'" class="space-y-4">
          <h3 class="text-lg font-headline font-bold text-secondary mb-4">Actividades de la Semana</h3>
          
          <div v-if="semanaDetalle.actividades.length === 0" class="text-center py-8 text-gray-500 text-sm">
            No hubieron actividades específicas asignadas en esta semana.
          </div>

          <div 
            v-for="act in semanaDetalle.actividades" 
            :key="act.id"
            class="p-4 rounded-lg border border-gray-200 flex items-start gap-4"
          >
            <v-icon 
              :icon="act.completada ? 'mdi-check-circle' : 'mdi-circle-outline'"
              :class="act.completada ? 'text-success' : 'text-gray-300'"
              size="24"
            ></v-icon>
            <div>
              <h4 class="font-bold text-sm text-secondary mb-1" :class="{'line-through text-gray-400': act.completada}">{{ act.titulo }}</h4>
              <p class="text-xs text-gray-500">{{ act.descripcion }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('entradas')
const semanaActiva = ref(1)

const semanas = ref([
  {
    id: 1,
    titulo: 'Semana 1',
    fecha: '01 May - 05 May',
    resumen: 'Inducción y configuración del entorno de desarrollo.',
    nota: 95,
    entradaCompleta: 'Durante esta primera semana recibí la inducción por parte del equipo de recursos humanos y el área de IT.\n\nSe configuró el entorno de desarrollo local con Node.js, Vue 3 y TailwindCSS. Además, me asignaron mis primeras credenciales para los repositorios de GitLab.\n\nTerminé de leer la documentación interna sobre los estándares de código.',
    observacionTutor: 'Excelente inicio. Has configurado todo muy rápido y la lectura de los estándares te ayudará mucho en las próximas semanas.',
    actividades: [
      { id: 101, titulo: 'Configuración de entorno', descripcion: 'Instalar Node, Git y configurar acceso a repositorio.', completada: true },
      { id: 102, titulo: 'Lectura de estándares', descripcion: 'Leer el manual de estilo de código de la empresa.', completada: true }
    ]
  },
  {
    id: 2,
    titulo: 'Semana 2',
    fecha: '08 May - 12 May',
    resumen: 'Asignación del primer ticket de frontend.',
    nota: 88,
    entradaCompleta: 'Me asignaron mi primer ticket en Jira para realizar un refactor del componente de navegación. \n\nLogré implementar los cambios utilizando Tailwind, pero tuve algunas dificultades entendiendo el estado global con Pinia, lo cual consulté con mi tutor y me ayudó a resolverlo.',
    observacionTutor: 'Buen trabajo pidiendo ayuda a tiempo. Recuerda siempre revisar la documentación de Pinia.',
    actividades: [
      { id: 201, titulo: 'Refactor Navbar', descripcion: 'Migrar el navbar antiguo al nuevo diseño con Tailwind.', completada: true }
    ]
  },
  {
    id: 3,
    titulo: 'Semana 3',
    fecha: '15 May - 19 May',
    resumen: 'Trabajo en integración con API REST.',
    nota: null, // Sin calificar
    entradaCompleta: 'Inicié el desarrollo de la vista de usuarios que consume una API REST interna.\n\nEstoy utilizando Axios para las peticiones. Falta terminar el manejo de errores global.',
    observacionTutor: null,
    actividades: [
      { id: 301, titulo: 'Vista Usuarios', descripcion: 'Crear tabla de usuarios con datos de la API.', completada: true },
      { id: 302, titulo: 'Manejo de Errores', descripcion: 'Implementar interceptor de Axios para errores 500.', completada: false }
    ]
  }
])

const semanaDetalle = computed(() => {
  return semanas.value.find(s => s.id === semanaActiva.value)
})
</script>
