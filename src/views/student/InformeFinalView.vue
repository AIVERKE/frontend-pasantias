<template>
  <div class="h-full flex flex-col md:flex-row gap-6">
    
    <!-- Columna Izquierda: Lista de Pasantías Realizadas -->
    <div class="w-full md:w-1/3 flex flex-col gap-4">
      <h2 class="text-lg font-headline font-bold text-secondary mb-2">Historial de Pasantías</h2>
      
      <div 
        v-for="pasantia in pasantias" 
        :key="pasantia.id"
        @click="pasantiaActiva = pasantia.id"
        class="bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer flex flex-col gap-3"
        :class="pasantiaActiva === pasantia.id ? 'border-primary ring-1 ring-primary' : 'border-gray-100 hover:border-gray-300'"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-neutral flex items-center justify-center font-bold text-primary shrink-0 text-xl">
            {{ pasantia.empresa.charAt(0) }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-secondary truncate">{{ pasantia.cargo }}</h3>
            <p class="text-xs text-gray-500 truncate">{{ pasantia.empresa }}</p>
          </div>
        </div>
        
        <div class="flex justify-between items-end mt-1 pt-3 border-t border-gray-50">
          <span class="text-xs text-gray-400">{{ pasantia.periodo }}</span>
          <div class="flex items-center gap-1">
            <span class="text-xs text-gray-500 font-medium">Nota:</span>
            <span 
              class="text-sm font-bold font-headline"
              :class="pasantia.nota >= 51 ? 'text-success' : 'text-danger'"
            >
              {{ pasantia.nota }}/100
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Columna Derecha: Detalle del Informe -->
    <div class="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden" v-if="informeSeleccionado">
      
      <!-- Encabezado del Informe -->
      <div class="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
        <div>
          <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-success border border-green-200 mb-3 inline-block">
            Informe Emitido
          </span>
          <h2 class="text-2xl font-headline font-bold text-secondary">Informe Final de Desempeño</h2>
          <p class="text-sm text-gray-500 mt-1">Emitido por {{ informeSeleccionado.evaluador }} (Jefe de Pasantes)</p>
        </div>
        
        <button class="flex items-center gap-2 px-4 py-2 bg-neutral text-secondary font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors border border-gray-200">
          <v-icon icon="mdi-download" size="18"></v-icon>
          Descargar PDF
        </button>
      </div>

      <!-- Contenido del Informe -->
      <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
        
        <!-- Resumen de Notas -->
        <div class="grid grid-cols-2 gap-6">
          <div class="bg-neutral p-6 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Promedio de Actividades</span>
            <span class="text-4xl font-headline font-bold text-secondary">{{ informeSeleccionado.promedioActividades }}</span>
            <span class="text-xs text-gray-400 mt-1">Calculado automáticamente</span>
          </div>
          
          <div class="bg-blue-50/50 p-6 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center">
            <span class="text-xs font-bold text-primary uppercase tracking-wider mb-2">Nota Final Aprobada</span>
            <span class="text-5xl font-headline font-bold text-primary">{{ informeSeleccionado.nota }}</span>
            <span class="text-xs text-blue-400 mt-1">Puntuación Definitiva</span>
          </div>
        </div>

        <!-- Evaluación Cualitativa -->
        <div>
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Evaluación Cualitativa</h3>
          <div class="bg-gray-50 p-6 rounded-lg border border-gray-100 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {{ informeSeleccionado.comentarios }}
          </div>
        </div>

        <!-- Criterios Evaluados -->
        <div>
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Desglose por Criterios</h3>
          <div class="space-y-4">
            <div v-for="criterio in informeSeleccionado.criterios" :key="criterio.nombre" class="flex items-center gap-4">
              <span class="w-1/3 text-sm text-gray-600 font-medium">{{ criterio.nombre }}</span>
              <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all"
                  :class="criterio.puntaje >= 80 ? 'bg-success' : (criterio.puntaje >= 60 ? 'bg-tertiary' : 'bg-danger')"
                  :style="{ width: `${criterio.puntaje}%` }"
                ></div>
              </div>
              <span class="w-10 text-right text-sm font-bold text-secondary">{{ criterio.puntaje }}%</span>
            </div>
          </div>
        </div>

        <!-- Firmas (Visuales) -->
        <div class="mt-12 pt-8 border-t border-gray-200 flex justify-around">
          <div class="text-center">
            <div class="w-48 border-b border-gray-400 mb-2"></div>
            <span class="text-xs text-gray-500 font-medium block">{{ informeSeleccionado.evaluador }}</span>
            <span class="text-[10px] text-gray-400 uppercase tracking-wide">Jefe de Pasantes</span>
          </div>
          <div class="text-center">
            <div class="w-48 border-b border-gray-400 mb-2"></div>
            <span class="text-xs text-gray-500 font-medium block">Sello Empresa</span>
            <span class="text-[10px] text-gray-400 uppercase tracking-wide">{{ informeSeleccionado.empresa }}</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const pasantiaActiva = ref(1)

const pasantias = ref([
  {
    id: 1,
    empresa: 'TechCorp Bolivia',
    cargo: 'Desarrollador Frontend Vue.js',
    periodo: 'Julio 2025 - Diciembre 2025',
    nota: 92,
    promedioActividades: 90,
    evaluador: 'Ing. Carlos Mendoza',
    comentarios: 'El estudiante demostró excelentes habilidades técnicas y una gran capacidad de aprendizaje rápido.\n\nSe adaptó perfectamente a nuestro flujo de trabajo ágil y logró completar todas las tareas asignadas en los tiempos estimados. Además, propuso mejoras significativas en la interfaz de usuario del proyecto principal.\n\nRecomendamos ampliamente al estudiante para futuras posiciones en el área de desarrollo.',
    criterios: [
      { nombre: 'Conocimiento Técnico', puntaje: 95 },
      { nombre: 'Responsabilidad', puntaje: 100 },
      { nombre: 'Trabajo en Equipo', puntaje: 85 },
      { nombre: 'Iniciativa', puntaje: 90 }
    ]
  },
  {
    id: 2,
    empresa: 'Innovación IT Labs',
    cargo: 'Pasante de QA Automation',
    periodo: 'Enero 2025 - Junio 2025',
    nota: 85,
    promedioActividades: 82,
    evaluador: 'Lic. Mariana Ríos',
    comentarios: 'Buen desempeño general en la creación de scripts de prueba automatizados.\n\nAl principio requirió bastante supervisión, pero hacia la mitad de la pasantía logró autonomía en la detección y reporte de bugs.',
    criterios: [
      { nombre: 'Conocimiento Técnico', puntaje: 80 },
      { nombre: 'Responsabilidad', puntaje: 90 },
      { nombre: 'Trabajo en Equipo', puntaje: 85 },
      { nombre: 'Iniciativa', puntaje: 85 }
    ]
  }
])

const informeSeleccionado = computed(() => {
  return pasantias.value.find(p => p.id === pasantiaActiva.value)
})
</script>
