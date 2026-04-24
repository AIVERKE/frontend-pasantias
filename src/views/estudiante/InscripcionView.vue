<template>
  <div class="h-full flex flex-col">
    <!-- Pestañas por postulación -->
    <div class="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto pb-1">
      <button 
        v-for="(postulacion, index) in postulaciones" 
        :key="postulacion.id"
        @click="activeTabId = postulacion.id"
        class="px-5 py-3 text-sm font-medium transition-colors relative whitespace-nowrap rounded-t-lg"
        :class="activeTabId === postulacion.id ? 'text-primary bg-white border border-b-0 border-gray-200' : 'text-gray-500 hover:text-secondary hover:bg-gray-100'"
      >
        <div class="flex items-center gap-2">
          <span>Postulación #{{ index + 1 }}</span>
          <div 
            class="w-2 h-2 rounded-full"
            :class="{
              'bg-tertiary': postulacion.estado === 'Pendiente',
              'bg-success': postulacion.estado === 'Aprobada',
              'bg-danger': postulacion.estado === 'Rechazada'
            }"
          ></div>
        </div>
        <div v-if="activeTabId === postulacion.id" class="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-white"></div>
        <div v-if="activeTabId === postulacion.id" class="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-lg transition-all"></div>
      </button>
    </div>

    <!-- Contenido de la Postulación Activa -->
    <div v-if="postulacionActiva" class="flex-1">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl">
        <!-- Encabezado de Estado -->
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-xl bg-neutral flex items-center justify-center font-bold text-2xl text-primary shrink-0">
              {{ postulacionActiva.empresa.charAt(0) }}
            </div>
            <div>
              <h2 class="text-2xl font-headline font-bold text-secondary">{{ postulacionActiva.cargo }}</h2>
              <p class="text-primary font-medium">{{ postulacionActiva.empresa }}</p>
            </div>
          </div>
          
          <div class="flex flex-col items-start md:items-end gap-2">
            <span 
              class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
              :class="{
                'bg-orange-50 text-tertiary border border-orange-200': postulacionActiva.estado === 'Pendiente',
                'bg-green-50 text-success border border-green-200': postulacionActiva.estado === 'Aprobada',
                'bg-red-50 text-danger border border-red-200': postulacionActiva.estado === 'Rechazada'
              }"
            >
              Estado: {{ postulacionActiva.estado }}
            </span>
            <span class="text-xs text-gray-500">Postulado el: {{ postulacionActiva.fecha }}</span>
          </div>
        </div>

        <!-- Alerta según estado -->
        <div 
          class="mb-8 p-4 rounded-lg flex items-start gap-3 border"
          :class="{
            'bg-orange-50 border-orange-200': postulacionActiva.estado === 'Pendiente',
            'bg-green-50 border-green-200': postulacionActiva.estado === 'Aprobada',
            'bg-red-50 border-red-200': postulacionActiva.estado === 'Rechazada'
          }"
        >
          <v-icon 
            :icon="postulacionActiva.estado === 'Aprobada' ? 'mdi-check-circle' : (postulacionActiva.estado === 'Rechazada' ? 'mdi-close-circle' : 'mdi-clock-outline')" 
            :class="{
              'text-tertiary': postulacionActiva.estado === 'Pendiente',
              'text-success': postulacionActiva.estado === 'Aprobada',
              'text-danger': postulacionActiva.estado === 'Rechazada'
            }"
            class="mt-0.5"
          ></v-icon>
          <div>
            <h4 
              class="text-sm font-bold mb-1"
              :class="{
                'text-tertiary': postulacionActiva.estado === 'Pendiente',
                'text-success': postulacionActiva.estado === 'Aprobada',
                'text-danger': postulacionActiva.estado === 'Rechazada'
              }"
            >
              {{ mensajeEstado(postulacionActiva.estado).titulo }}
            </h4>
            <p class="text-sm text-gray-600">{{ postulacionActiva.mensajeRespuesta || mensajeEstado(postulacionActiva.estado).cuerpo }}</p>
          </div>
        </div>

        <!-- Detalles de la Pasantía -->
        <h3 class="text-lg font-headline font-bold text-secondary mb-4">Detalles de la Convocatoria</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Modalidad</span>
              <span class="text-sm text-secondary font-medium">{{ postulacionActiva.modalidad }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Horas Requeridas</span>
              <span class="text-sm text-secondary font-medium">{{ postulacionActiva.horas }} hrs</span>
            </div>
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Requisitos Presentados</span>
              <ul class="list-disc list-inside text-sm text-secondary mt-1">
                <li>Hoja de vida digital</li>
                <li>Carta de postulación</li>
                <li>Kardex académico</li>
              </ul>
            </div>
          </div>
          <div class="bg-neutral p-4 rounded-xl border border-gray-100">
            <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Descripción del Puesto</span>
            <p class="text-sm text-gray-600 leading-relaxed">{{ postulacionActiva.descripcion }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock Data
const postulaciones = ref([
  {
    id: 1,
    empresa: 'TechCorp Bolivia',
    cargo: 'Desarrollador Frontend Vue.js',
    estado: 'Pendiente',
    fecha: '18 Abr 2026',
    modalidad: 'Remoto',
    horas: 80,
    descripcion: 'Buscamos un estudiante entusiasta para unirse a nuestro equipo de desarrollo trabajando en plataformas web modernas.',
    mensajeRespuesta: ''
  },
  {
    id: 2,
    empresa: 'Banco Bisa',
    cargo: 'Analista de Base de Datos',
    estado: 'Rechazada',
    fecha: '10 Abr 2026',
    modalidad: 'Presencial',
    horas: 120,
    descripcion: 'Participación en el equipo de Business Intelligence para optimización de consultas, migración de datos y creación de reportes operativos.',
    mensajeRespuesta: 'Gracias por tu interés. En esta ocasión hemos seleccionado a otro candidato que se ajusta más a nuestros requerimientos técnicos de Oracle DB.'
  }
])

const activeTabId = ref(postulaciones.value[0]?.id)

const postulacionActiva = computed(() => {
  return postulaciones.value.find(p => p.id === activeTabId.value)
})

const mensajeEstado = (estado) => {
  if (estado === 'Pendiente') {
    return {
      titulo: 'En revisión por la empresa',
      cuerpo: 'Tu postulación ha sido enviada correctamente y está siendo evaluada por el Jefe de Pasantes de la empresa. Recibirás una notificación cuando haya una respuesta.'
    }
  } else if (estado === 'Aprobada') {
    return {
      titulo: '¡Felicidades! Postulación Aprobada',
      cuerpo: 'Has sido seleccionado para esta pasantía. Tus otras postulaciones pendientes han sido marcadas como rechazadas automáticamente.'
    }
  } else {
    return {
      titulo: 'Postulación Rechazada',
      cuerpo: 'Esta postulación ha sido cerrada.'
    }
  }
}
</script>
