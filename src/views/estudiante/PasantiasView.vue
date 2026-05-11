<template>
  <div class="h-full flex flex-col">
    <!-- Pestañas de Filtrado -->
    <div v-if="tabs.length > 1" class="border-b border-gray-200 mb-8">
      <nav class="flex space-x-8">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="pb-3 px-1 text-sm font-medium transition-colors relative"
          :class="activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-secondary'"
        >
          {{ tab.label }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full transition-all duration-150"></div>
        </button>
      </nav>
    </div>

    <!-- Grid de Tarjetas -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="pasantia in pasantiasFiltradas" 
        :key="pasantia.id"
        class="bg-white rounded-xl p-5 border border-white/5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full group"
        @click="abrirDetalle(pasantia)"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-neutral flex items-center justify-center font-bold text-primary group-hover:scale-105 transition-transform">
            {{ pasantia.empresa.charAt(0) }}
          </div>
          <!-- Insignia (Badge) -->
          <span 
            class="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            :class="pasantia.tipo === 'Remoto' ? 'bg-blue-50 text-primary' : 'bg-green-50 text-success'"
          >
            {{ pasantia.tipo }}
          </span>
        </div>

        <h3 class="text-lg font-headline font-bold text-secondary mb-1">{{ pasantia.titulo }}</h3>
        <p class="text-sm text-gray-500 font-medium mb-4">{{ pasantia.empresa }}</p>

        <div class="mt-auto space-y-2">
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-for="tag in pasantia.tags" :key="tag" class="text-[11px] bg-neutral text-gray-600 px-2 py-1 rounded-md">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-2 mb-3 text-xs font-medium text-gray-500">
            <span class="w-2 h-2 rounded-full" :class="pasantia.cuposOcupados >= pasantia.cuposTotales ? 'bg-red-400' : 'bg-green-400'"></span>
            Cupos: {{ pasantia.cuposOcupados }}/{{ pasantia.cuposTotales }} ocupados
          </div>
          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <span class="text-xs text-gray-400">Vence: {{ pasantia.fechaLimite }}</span>
            <button class="text-primary text-sm font-medium hover:underline">Ver detalle</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel Lateral de Detalles (600px según prompt) -->
    <SlidePanel 
      :isOpen="isPanelOpen" 
      :title="'Detalle de Pasantía'" 
      width="600px"
      @close="isPanelOpen = false"
    >
      <div v-if="pasantiaSeleccionada" class="space-y-6">
        <!-- 1. Encabezado e Información Rápida -->
        <div class="border-b border-gray-100 pb-6">
          <!-- Banner corporativo simulado -->
          <div class="w-full h-24 bg-gradient-to-r from-blue-500 to-primary rounded-xl mb-12 relative">
            <div class="absolute -bottom-8 left-6 w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center text-2xl font-bold text-primary border border-gray-100">
              {{ pasantiaSeleccionada.empresa.charAt(0) }}
            </div>
          </div>
          
          <div class="px-2">
            <h2 class="text-2xl font-headline font-bold text-secondary">{{ pasantiaSeleccionada.titulo }}</h2>
            <p class="text-primary font-medium mt-1">{{ pasantiaSeleccionada.empresa }}</p>
          </div>
        </div>

        <!-- Tarjetas de Resumen (Grises) -->
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-neutral p-4 rounded-lg">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Modalidad</span>
            <span class="font-medium text-secondary text-sm">{{ pasantiaSeleccionada.tipo }}</span>
          </div>
          <div class="bg-neutral p-4 rounded-lg">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Horario laboral</span>
            <span class="font-medium text-secondary text-sm">{{ pasantiaSeleccionada.horario }}</span>
          </div>
          <div class="bg-neutral p-4 rounded-lg">
            <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Cupos</span>
            <span class="font-medium text-secondary text-sm">{{ pasantiaSeleccionada.cuposOcupados }}/{{ pasantiaSeleccionada.cuposTotales }} ocupados</span>
          </div>
        </div>

        <!-- 2. Cuerpo del Contenido (Secciones) -->
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Descripción del Puesto</h3>
            <p class="text-sm text-gray-600 leading-relaxed">{{ pasantiaSeleccionada.descripcion }}</p>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Requisitos del Puesto</h3>
            <ul class="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li v-for="(req, idx) in pasantiaSeleccionada.requisitos" :key="idx">{{ req }}</li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Actividades a Desarrollar</h3>
            <ul class="space-y-2">
              <li v-for="(act, idx) in pasantiaSeleccionada.actividades" :key="idx" class="flex items-start gap-2 text-sm text-gray-600">
                <span class="text-primary mt-0.5">✓</span>
                <span>{{ act }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 3. Sección de Comentarios (Feedback) -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Comentarios de Ex Pasantes</h3>
          
          <div v-if="pasantiaSeleccionada.comentarios.length > 0" class="space-y-4">
            <div v-for="(comentario, idx) in pasantiaSeleccionada.comentarios" :key="idx" class="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {{ comentario.autor.charAt(0) }}
                  </div>
                  <span class="text-sm font-bold text-secondary">{{ comentario.autor }}</span>
                </div>
                <!-- Componente visual de valoración (Estrellas) -->
                <div class="flex text-yellow-400 text-sm">
                  <span v-for="i in 5" :key="i">
                    {{ i <= comentario.rating ? '★' : '☆' }}
                  </span>
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-2">{{ comentario.texto }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500 italic">No hay comentarios de ex pasantes para esta empresa aún.</p>
        </div>
      </div>

      <!-- 4. Barra Inferior Fija (Botón de Acción - CTA) -->
      <template #footer>
        <div class="flex justify-end gap-3 w-full">
          <button 
            @click="isPanelOpen = false" 
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            :disabled="ctaConfig.disabled || isPostulando"
            class="px-6 py-2 text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
            :class="ctaConfig.classes"
            @click="postular"
          >
            <span v-if="isPostulando" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ isPostulando ? 'Enviando...' : ctaConfig.text }}
          </button>
        </div>
      </template>
    </SlidePanel>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import SlidePanel from '@/components/SlidePanel.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isPostulando = ref(false)

const estadoEstudianteGlobal = ref('disponible') 
const pasantiasPostuladas = ref([]) 

const isPanelOpen = ref(false)
const activeTab = ref('todas')
const pasantiaSeleccionada = ref(null)

const tabs = ref([{ id: 'todas', label: 'Todas las áreas' }])
const pasantias = ref([])

onMounted(async () => {
  try {
    if (authStore.user?.id) {
      const inscripcionesRes = await axios.get(`/api/inscripciones/estudiante/${authStore.user.id}`)
      pasantiasPostuladas.value = inscripcionesRes.data.map(i => i.pasantia?.id_pasantia)
      
      const activa = inscripcionesRes.data.find(i => i.estado === 'aprobada' || i.estado_ejecucion === 'en_curso')
      if (activa) {
        estadoEstudianteGlobal.value = 'con_pasantia'
      }
    }

    const response = await axios.get('/api/pasantias')
    pasantias.value = response.data.map(p => ({
      id: p.id_pasantia,
      titulo: p.titulo,
      empresa: p.empresa ? p.empresa.nombre : 'Sin Empresa asignada',
      tipo: 'Presencial', 
      horario: p.horario_laboral || 'No especificado',
      cuposTotales: p.cupos_totales || 0,
      cuposOcupados: 0, 
      categoria: p.area || 'General',
      fechaLimite: p.fecha_fin ? new Date(p.fecha_fin).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Sin límite',
      tags: [], 
      descripcion: p.descripcion,
      requisitos: ['Cumplir con el horario establecido', 'Ser proactivo y responsable'],
      actividades: ['Asignadas por el Jefe de Pasantes al inicio de la pasantía'],
      comentarios: []
    }))

    const areasUnicas = [...new Set(pasantias.value.map(p => p.categoria))]
    if (areasUnicas.length > 0) {
      tabs.value = [
        { id: 'todas', label: 'Todas las áreas' },
        ...areasUnicas.map(area => ({ id: area, label: area.charAt(0).toUpperCase() + area.slice(1) }))
      ]
    }

  } catch (error) {
    console.error('Error al cargar pasantías desde el backend:', error)
  }
})

const pasantiasFiltradas = computed(() => {
  if (activeTab.value === 'todas') return pasantias.value
  return pasantias.value.filter(p => p.categoria === activeTab.value)
})

const abrirDetalle = (pasantia) => {
  pasantiaSeleccionada.value = pasantia
  isPanelOpen.value = true
}

const ctaConfig = computed(() => {
  if (!pasantiaSeleccionada.value) return {}

  if (estadoEstudianteGlobal.value === 'con_pasantia') {
    return {
      disabled: true,
      text: 'Tienes una pasantía en curso',
      classes: 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }
  }

  if (pasantiasPostuladas.value.includes(pasantiaSeleccionada.value.id)) {
    return {
      disabled: true,
      text: 'Postulación enviada',
      classes: 'bg-green-50 text-green-600 border border-green-200 cursor-not-allowed'
    }
  }

  return {
    disabled: false,
    text: 'Postularme',
    classes: 'bg-primary text-white hover:bg-blue-600 shadow-sm shadow-primary/30'
  }
})

const postular = async () => {
  if (ctaConfig.value.disabled) return

  isPostulando.value = true
  
  try {
    await axios.post('/api/inscripciones', {
      id_estudiante: authStore.user.id,
      id_pasantia: pasantiaSeleccionada.value.id
    })
    
    pasantiasPostuladas.value.push(pasantiaSeleccionada.value.id)
    console.log('Postulación exitosa')
  } catch (error) {
    console.error('Error al postular:', error)
    alert('Hubo un error al postular. Intenta de nuevo.')
  } finally {
    isPostulando.value = false
  }
}
</script>
