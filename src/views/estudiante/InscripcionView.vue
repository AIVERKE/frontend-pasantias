<template>
  <div class="h-full flex flex-col">
    <!-- Pestañas por postulación (solo si hay más de 1) -->
    <div v-if="postulaciones.length > 1" class="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto pb-1">
      <button 
        v-for="postulacion in postulaciones" 
        :key="postulacion.id"
        @click="activeTabId = postulacion.id"
        class="px-5 py-3 text-sm font-medium transition-colors relative whitespace-nowrap rounded-t-lg"
        :class="activeTabId === postulacion.id ? 'text-primary bg-white border border-b-0 border-gray-200' : 'text-gray-500 hover:text-secondary hover:bg-gray-100'"
      >
        <div class="flex items-center gap-2">
          <span>{{ postulacion.empresa }}</span>
          <div 
            class="w-2 h-2 rounded-full"
            :class="{
              'bg-tertiary': postulacion.estado === 'pendiente',
              'bg-success': postulacion.estado === 'aprobada',
              'bg-danger': postulacion.estado === 'rechazada'
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
                'bg-orange-50 text-tertiary border border-orange-200': postulacionActiva.estado === 'pendiente',
                'bg-green-50 text-success border border-green-200': postulacionActiva.estado === 'aprobada',
                'bg-red-50 text-danger border border-red-200': postulacionActiva.estado === 'rechazada'
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
            'bg-orange-50 border-orange-200': postulacionActiva.estado === 'pendiente',
            'bg-green-50 border-green-200': postulacionActiva.estado === 'aprobada',
            'bg-red-50 border-red-200': postulacionActiva.estado === 'rechazada'
          }"
        >
          <div class="mt-0.5">
            <span v-if="postulacionActiva.estado === 'aprobada'" class="text-success text-lg">✓</span>
            <span v-else-if="postulacionActiva.estado === 'rechazada'" class="text-danger text-lg">✗</span>
            <span v-else class="text-tertiary text-lg">⏱</span>
          </div>
          <div>
            <h4 
              class="text-sm font-bold mb-1"
              :class="{
                'text-tertiary': postulacionActiva.estado === 'pendiente',
                'text-success': postulacionActiva.estado === 'aprobada',
                'text-danger': postulacionActiva.estado === 'rechazada'
              }"
            >
              {{ mensajeEstado(postulacionActiva.estado).titulo }}
            </h4>
            <p class="text-sm text-gray-600">{{ postulacionActiva.mensajeRespuesta || mensajeEstado(postulacionActiva.estado).cuerpo }}</p>
          </div>
        </div>

        <!-- Detalles de la Pasantía -->
        <h3 class="text-lg font-headline font-bold text-secondary mb-4">Detalles de la Convocatoria</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="space-y-4">
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Modalidad</span>
              <span class="text-sm text-secondary font-medium">{{ postulacionActiva.modalidad }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Horario Laboral</span>
              <span class="text-sm text-secondary font-medium">{{ postulacionActiva.horario }}</span>
            </div>
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Cupos</span>
              <span class="text-sm text-secondary font-medium">{{ postulacionActiva.cuposOcupados }}/{{ postulacionActiva.cuposTotales }} ocupados</span>
            </div>
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">Requisitos</span>
              <span class="text-sm text-secondary">Perfil enviado: Hoja de Vida Digital</span>
            </div>
          </div>
          <div class="bg-neutral p-4 rounded-xl border border-gray-100">
            <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-2">Descripción del Puesto</span>
            <p class="text-sm text-gray-600 leading-relaxed">{{ postulacionActiva.descripcion }}</p>
          </div>
        </div>

        <!-- Acciones Inferiores (CTA) -->
        <div class="pt-6 border-t border-gray-100 flex justify-end">
          <!-- ESTADO A: Rechazada -->
          <router-link v-if="postulacionActiva.estado === 'rechazada'" :to="{ name: 'Pasantias' }" class="px-5 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            Buscar otras pasantías
          </router-link>
          
          <!-- ESTADO B: Pendiente -->
          <button v-else-if="postulacionActiva.estado === 'pendiente'" @click="cancelarPostulacion(postulacionActiva.id)" class="px-5 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors" :disabled="isCanceling">
            {{ isCanceling ? 'Cancelando...' : 'Cancelar Postulación' }}
          </button>
          
          <!-- ESTADO C: Aprobada -->
          <router-link v-else-if="postulacionActiva.estado === 'aprobada'" :to="{ name: 'Bitacora' }" class="px-6 py-2.5 bg-success text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm shadow-success/30 block">
            Ir a mi Bitácora
          </router-link>
        </div>

      </div>
    </div>
    
    <!-- Estado Vacío -->
    <div v-else class="flex flex-col items-center justify-center flex-1 py-12 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h3 class="text-xl font-headline font-bold text-secondary mb-2">Aún no tienes postulaciones</h3>
      <p class="text-gray-500 mb-6 max-w-md">Explora las oportunidades disponibles y postúlate a las pasantías que se ajusten a tu perfil profesional.</p>
      <router-link :to="{ name: 'Pasantias' }" class="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm shadow-primary/30 block">
        Explorar Pasantías
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const postulaciones = ref([])
const isCanceling = ref(false)
const activeTabId = ref(null)

onMounted(async () => {
  if (!authStore.user?.id) return
  
  try {
    const res = await axios.get(`/api/inscripciones/estudiante/${authStore.user.id}`)
    postulaciones.value = res.data.map(i => ({
      id: i.id_inscripcion,
      empresa: i.pasantia?.empresa?.nombre || 'Empresa Desconocida',
      cargo: i.pasantia?.titulo || 'Pasantía',
      estado: i.estado, // pendiente, aprobada, rechazada
      fecha: new Date(i.fecha_inscripcion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      modalidad: 'Presencial',
      horario: i.pasantia?.horario_laboral || 'No especificado',
      cuposOcupados: 0,
      cuposTotales: i.pasantia?.cupos_totales || 0,
      descripcion: i.pasantia?.descripcion || '',
      mensajeRespuesta: i.estado === 'rechazada' ? 'Tu postulación no ha sido seleccionada.' : ''
    }))
    
    if (postulaciones.value.length > 0) {
      activeTabId.value = postulaciones.value[0].id
    }
  } catch (error) {
    console.error('Error al cargar postulaciones', error)
  }
})

const postulacionActiva = computed(() => {
  return postulaciones.value.find(p => p.id === activeTabId.value)
})

const cancelarPostulacion = async (id) => {
  if (!confirm('¿Estás seguro de cancelar tu postulación?')) return
  
  isCanceling.value = true
  try {
    await axios.delete(`/api/inscripciones/${id}`)
    postulaciones.value = postulaciones.value.filter(p => p.id !== id)
    if (postulaciones.value.length > 0) {
      activeTabId.value = postulaciones.value[0].id
    } else {
      activeTabId.value = null
    }
  } catch (error) {
    console.error('Error al cancelar postulación', error)
    alert('No se pudo cancelar. Intenta de nuevo.')
  } finally {
    isCanceling.value = false
  }
}

const mensajeEstado = (estado) => {
  if (estado === 'pendiente') {
    return {
      titulo: 'En revisión por la empresa',
      cuerpo: 'Tu postulación ha sido enviada correctamente y está siendo evaluada por el Jefe de Pasantes de la empresa. Recibirás una notificación cuando haya una respuesta.'
    }
  } else if (estado === 'aprobada') {
    return {
      titulo: '¡Felicidades! Has sido seleccionado para esta pasantía',
      cuerpo: 'Has sido aceptado oficialmente en este puesto. Por favor dirígete a tu Bitácora para iniciar tu proceso.'
    }
  } else {
    return {
      titulo: 'Postulación Rechazada',
      cuerpo: 'Esta postulación ha sido cerrada.'
    }
  }
}
</script>
