<template>
  <div>
    <!-- Dashboard Mockup -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- Tarjeta 1: Estado de Pasantía -->
      <router-link :to="{ name: 'Inscripcion' }" class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-primary block">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">ESTADO DE PASANTÍA</h3>
        <div v-if="resumen.pasantia" class="text-3xl font-headline font-bold text-secondary">
          {{ resumen.pasantia.estado === 'en_curso' ? 'En curso' : 
             resumen.pasantia.estado === 'pendiente' ? 'Postulando' : 'Finalizada' }}
        </div>
        <div v-else class="text-3xl font-headline font-bold text-gray-400">Sin pasantía</div>
        <div class="text-sm font-body text-gray-500 mt-1">
          {{ resumen.pasantia ? 'Empresa: ' + resumen.pasantia.empresa : 'Explora pasantías disponibles' }}
        </div>
      </router-link>
      
      <!-- Tarjeta 2: Tareas Completadas -->
      <router-link :to="{ name: 'Bitacora' }" class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-primary block">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">TAREAS COMPLETADAS</h3>
        <div v-if="resumen.pasantia && resumen.pasantia.estado === 'en_curso'" class="text-3xl font-headline font-bold text-secondary">
          {{ resumen.tareas.completadas }} <span class="text-sm font-body text-gray-400 font-normal">/ {{ resumen.tareas.totales }}</span>
        </div>
        <div v-else class="text-3xl font-headline font-bold text-gray-400">-</div>
        <div class="text-sm font-body text-gray-500 mt-1">
          {{ resumen.pasantia && resumen.pasantia.estado === 'en_curso' ? 'actividades completadas' : 'No hay tareas asignadas' }}
        </div>
      </router-link>
      
      <!-- Tarjeta 3: Evaluación Promedio -->
      <router-link :to="{ name: 'InformeFinal' }" class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-primary block">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">EVALUACIÓN PROMEDIO</h3>
        <div v-if="resumen.evaluacion !== null" class="text-3xl font-headline font-bold text-secondary">
          {{ resumen.evaluacion }} <span class="text-sm font-body text-gray-400 font-normal">/ 100</span>
        </div>
        <div v-else class="text-3xl font-headline font-bold text-gray-400">N/A</div>
        <div class="text-sm font-body text-gray-500 mt-1">
          {{ resumen.evaluacion !== null ? 'Promedio actual' : 'Aún no hay calificaciones' }}
        </div>
      </router-link>
    </div>

    <!-- Tabla Inferior -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-headline font-bold text-secondary">Actividades Asignadas y Recientes</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
              <th class="p-4 font-semibold">Actividad</th>
              <th class="p-4 font-semibold">Fecha Límite</th>
              <th class="p-4 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-gray-100">
            <!-- Fila Completada -->
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="p-4 text-secondary font-medium">Revisión de requerimientos iniciales</td>
              <td class="p-4 text-gray-500">12 Oct 2026</td>
              <td class="p-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Completada</span>
              </td>
            </tr>
            <!-- Fila En Curso -->
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="p-4 text-secondary font-medium">Desarrollo de módulo de reportes</td>
              <td class="p-4 text-gray-500">15 Oct 2026</td>
              <td class="p-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">En Curso</span>
              </td>
            </tr>
            <!-- Fila Pendiente -->
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="p-4 text-secondary font-medium">Pruebas de integración</td>
              <td class="p-4 text-gray-500">20 Oct 2026</td>
              <td class="p-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700">Pendiente</span>
              </td>
            </tr>
            <!-- Fila Vencida / No Completada -->
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="p-4 text-secondary font-medium">Documentación técnica (Fase 1)</td>
              <td class="p-4 text-gray-500">05 Oct 2026</td>
              <td class="p-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">No Completada</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Objeto reactivo que almacenará los datos reales del estudiante
const resumen = ref({
  pasantia: null, // Si es null, mostrará "Sin pasantía"
  tareas: { completadas: 0, totales: 0 },
  evaluacion: null // Si es null, mostrará "N/A"
})

onMounted(async () => {
  try {
    const response = await axios.get(`/api/estudiantes/${authStore.user.id}/dashboard`)
    resumen.value = response.data
  } catch (error) {
    console.error('Error obteniendo el dashboard:', error)
  }
})
</script>
