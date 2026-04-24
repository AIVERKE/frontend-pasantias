<template>
  <div class="h-full flex flex-col">
    <!-- Pestañas de Filtrado -->
    <div class="flex gap-4 mb-6 border-b border-gray-200">
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
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tag in pasantia.tags" :key="tag" class="text-[11px] bg-neutral text-gray-600 px-2 py-1 rounded-md">
              {{ tag }}
            </span>
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
        <!-- Encabezado del Detalle -->
        <div class="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div class="w-16 h-16 rounded-xl bg-neutral flex items-center justify-center text-2xl font-bold text-primary">
            {{ pasantiaSeleccionada.empresa.charAt(0) }}
          </div>
          <div>
            <h2 class="text-2xl font-headline font-bold text-secondary">{{ pasantiaSeleccionada.titulo }}</h2>
            <p class="text-primary font-medium">{{ pasantiaSeleccionada.empresa }}</p>
          </div>
        </div>

        <!-- Información General -->
        <div>
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Descripción del Puesto</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{{ pasantiaSeleccionada.descripcion }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-neutral p-4 rounded-lg">
            <span class="text-xs text-gray-500 block mb-1">Modalidad</span>
            <span class="font-medium text-secondary">{{ pasantiaSeleccionada.tipo }}</span>
          </div>
          <div class="bg-neutral p-4 rounded-lg">
            <span class="text-xs text-gray-500 block mb-1">Horas requeridas</span>
            <span class="font-medium text-secondary">{{ pasantiaSeleccionada.horas }} hrs/mes</span>
          </div>
        </div>

        <!-- Comentarios de Ex Pasantes -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Comentarios de Ex Pasantes</h3>
          
          <div v-if="pasantiaSeleccionada.comentarios.length > 0" class="space-y-4">
            <div v-for="(comentario, idx) in pasantiaSeleccionada.comentarios" :key="idx" class="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    {{ comentario.autor.charAt(0) }}
                  </div>
                  <span class="text-sm font-bold text-secondary">{{ comentario.autor }}</span>
                </div>
                <div class="flex text-yellow-400 text-sm">
                  <v-icon v-for="i in 5" :key="i" :icon="i <= comentario.rating ? 'mdi-star' : 'mdi-star-outline'" size="16"></v-icon>
                </div>
              </div>
              <p class="text-sm text-gray-600">{{ comentario.texto }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500 italic">No hay comentarios de ex pasantes para esta empresa aún.</p>
        </div>
      </div>

      <template #footer>
        <button 
          @click="isPanelOpen = false" 
          class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button class="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm shadow-primary/30">
          Postularme
        </button>
      </template>
    </SlidePanel>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SlidePanel from '@/components/SlidePanel.vue'

// Estado
const isPanelOpen = ref(false)
const activeTab = ref('todas')
const pasantiaSeleccionada = ref(null)

// Datos Mock
const tabs = [
  { id: 'todas', label: 'Todas las áreas' },
  { id: 'sistemas', label: 'Ingeniería de Sistemas' },
  { id: 'informatica', label: 'Informática' }
]

const pasantias = ref([
  {
    id: 1,
    titulo: 'Desarrollador Frontend Vue.js',
    empresa: 'TechCorp Bolivia',
    tipo: 'Remoto',
    categoria: 'sistemas',
    fechaLimite: '30 Abr 2026',
    horas: 80,
    tags: ['Vue.js', 'Tailwind', 'APIs'],
    descripcion: 'Buscamos un estudiante entusiasta para unirse a nuestro equipo de desarrollo trabajando en plataformas web modernas. Aprenderás buenas prácticas de código y metodologías ágiles.',
    comentarios: [
      { autor: 'Ana López', rating: 5, texto: 'Excelente ambiente laboral, los tutores realmente se preocupan por que aprendas. Totalmente recomendado.' },
      { autor: 'Carlos Ruiz', rating: 4, texto: 'Mucho aprendizaje en poco tiempo. A veces el ritmo es alto pero vale la pena.' }
    ]
  },
  {
    id: 2,
    titulo: 'Analista de Base de Datos',
    empresa: 'Banco Bisa',
    tipo: 'Presencial',
    categoria: 'informatica',
    fechaLimite: '15 May 2026',
    horas: 120,
    tags: ['SQL', 'Oracle', 'ETL'],
    descripcion: 'Participación en el equipo de Business Intelligence para optimización de consultas, migración de datos y creación de reportes operativos.',
    comentarios: []
  },
  {
    id: 3,
    titulo: 'Pasante de Seguridad Informática',
    empresa: 'Jalasoft',
    tipo: 'Híbrido',
    categoria: 'sistemas',
    fechaLimite: '10 May 2026',
    horas: 100,
    tags: ['Pentesting', 'Redes', 'Linux'],
    descripcion: 'Apoyo en auditorías de seguridad, escaneo de vulnerabilidades y elaboración de informes técnicos de mitigación.',
    comentarios: [
      { autor: 'Miguel Soto', rating: 5, texto: 'Una oportunidad increíble para aplicar conceptos de seguridad en proyectos reales.' }
    ]
  }
])

const pasantiasFiltradas = computed(() => {
  if (activeTab.value === 'todas') return pasantias.value
  return pasantias.value.filter(p => p.categoria === activeTab.value)
})

const abrirDetalle = (pasantia) => {
  pasantiaSeleccionada.value = pasantia
  isPanelOpen.value = true
}
</script>
