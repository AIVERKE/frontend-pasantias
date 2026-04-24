<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-headline font-bold text-secondary">Directorio de Pasantes Activos</h2>
      <button class="bg-white border border-gray-200 hover:bg-gray-50 text-secondary font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm">
        <v-icon icon="mdi-export-variant" size="18"></v-icon>
        Exportar Reporte
      </button>
    </div>

    <!-- Tabla de Pasantes Activos -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[1000px]">
          <thead class="bg-neutral border-b border-gray-200">
            <tr>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Estudiante</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Pasantía Asignada</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Jefe Responsable</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Inicio</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center">Progreso</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center w-24">Acciones</th>
            </tr>
            <!-- Filtros Inline -->
            <tr class="bg-white border-b border-gray-200">
              <th class="px-3 py-2"><input type="text" placeholder="Buscar pasante..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.estudiante"></th>
              <th class="px-3 py-2"><input type="text" placeholder="Filtrar pasantía..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.pasantia"></th>
              <th class="px-3 py-2"><input type="text" placeholder="Buscar jefe..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.jefe"></th>
              <th class="px-3 py-2"></th>
              <th class="px-3 py-2"></th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="pasante in filteredPasantes" :key="pasante.id" class="hover:bg-neutral/50 transition-colors">
              <td class="py-4 px-6">
                <div class="font-medium text-sm text-secondary">{{ pasante.nombre }}</div>
                <div class="text-xs text-gray-500 mt-1 flex items-center"><v-icon icon="mdi-identifier" size="12" class="mr-1"></v-icon> CI: {{ pasante.ci }}</div>
              </td>
              <td class="py-4 px-6 text-sm text-gray-500">{{ pasante.pasantia }}</td>
              <td class="py-4 px-6 text-sm text-gray-500">
                <div class="flex items-center gap-2">
                  <v-icon icon="mdi-account-tie" size="16" class="text-gray-400"></v-icon>
                  {{ pasante.jefe }}
                </div>
              </td>
              <td class="py-4 px-6 text-sm text-gray-500 font-medium">{{ pasante.fechaInicio }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2 justify-center">
                  <div class="w-full bg-gray-200 rounded-full h-1.5 max-w-[80px]">
                    <div class="bg-primary h-1.5 rounded-full" :style="{ width: pasante.progreso + '%' }"></div>
                  </div>
                  <span class="text-xs text-gray-500 font-medium w-8 text-right">{{ pasante.progreso }}%</span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <button class="w-7 h-7 rounded-md bg-neutral text-gray-500 hover:bg-primary hover:text-white transition-colors flex items-center justify-center mx-auto" title="Ver detalle del pasante">
                  <v-icon icon="mdi-eye-outline" size="16"></v-icon>
                </button>
              </td>
            </tr>
            <tr v-if="filteredPasantes.length === 0">
              <td colspan="6" class="py-12 text-center text-gray-500 text-sm">
                No se encontraron pasantes activos que coincidan con la búsqueda.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
        <span class="text-xs text-gray-500 font-medium">Total: {{ filteredPasantes.length }} pasantes</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ref({ estudiante: '', pasantia: '', jefe: '' })

const pasantes = ref([
  { id: 1, nombre: 'Ana López', ci: '8392102', pasantia: 'Desarrollador Frontend React/Vue', jefe: 'Lic. María Fernández', fechaInicio: '15/02/2026', progreso: 45 },
  { id: 2, nombre: 'Luis Blanco', ci: '9928172', pasantia: 'Desarrollador Frontend React/Vue', jefe: 'Lic. María Fernández', fechaInicio: '15/02/2026', progreso: 80 },
  { id: 3, nombre: 'María Quispe', ci: '7728192', pasantia: 'Diseñador UI/UX Junior', jefe: 'Lic. María Fernández', fechaInicio: '01/03/2026', progreso: 10 },
  { id: 4, nombre: 'Jorge Flores', ci: '1092837', pasantia: 'Analista de Datos y BI', jefe: 'Ing. Carlos Mendoza', fechaInicio: '20/01/2026', progreso: 95 },
  { id: 5, nombre: 'Camila Rojas', ci: '6628192', pasantia: 'Especialista en Marketing Digital', jefe: 'Lic. Ana Rodríguez', fechaInicio: '10/03/2026', progreso: 25 },
])

const filteredPasantes = computed(() => {
  return pasantes.value.filter(item => {
    if (filters.value.estudiante && !item.nombre.toLowerCase().includes(filters.value.estudiante.toLowerCase()) && !item.ci.includes(filters.value.estudiante)) return false
    if (filters.value.pasantia && !item.pasantia.toLowerCase().includes(filters.value.pasantia.toLowerCase())) return false
    if (filters.value.jefe && !item.jefe.toLowerCase().includes(filters.value.jefe.toLowerCase())) return false
    return true
  })
})
</script>
