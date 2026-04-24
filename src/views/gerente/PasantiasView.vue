<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-headline font-bold text-secondary">Gestión de Convocatorias</h2>
      <button class="bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm">
        <v-icon icon="mdi-plus" size="18"></v-icon>
        Crear Pasantía
      </button>
    </div>

    <!-- Pestañas de Estado -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="flex border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-4 text-sm font-medium transition-colors relative"
          :class="activeTab === tab.id ? 'text-primary' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'"
        >
          {{ tab.label }}
          <span v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
        </button>
      </div>

      <!-- Tabla de Pasantías -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead class="bg-neutral border-b border-gray-200">
            <tr>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Título de Pasantía</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Área / Categoría</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Jefe a Cargo</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center">Postulantes</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center w-24">Acciones</th>
            </tr>
            <!-- Filtros Inline -->
            <tr class="bg-white border-b border-gray-200">
              <th class="px-3 py-2"><input type="text" placeholder="Buscar título..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.titulo"></th>
              <th class="px-3 py-2"><input type="text" placeholder="Filtrar área..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.area"></th>
              <th class="px-3 py-2"><input type="text" placeholder="Buscar jefe..." class="w-full bg-neutral text-xs rounded border-none py-1.5 px-2 focus:ring-1 focus:ring-primary" v-model="filters.jefe"></th>
              <th class="px-3 py-2"></th>
              <th class="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in filteredPasantias" :key="item.id" class="hover:bg-neutral/50 transition-colors">
              <td class="py-4 px-6 font-medium text-sm text-secondary">{{ item.titulo }}</td>
              <td class="py-4 px-6 text-sm text-gray-500">{{ item.area }}</td>
              <td class="py-4 px-6 text-sm text-gray-500">
                <div class="flex items-center gap-2 group cursor-pointer" title="Ver jefe en el equipo">
                  <v-icon icon="mdi-account-tie" size="16" class="text-primary"></v-icon>
                  <span class="group-hover:text-primary transition-colors border-b border-dashed border-transparent group-hover:border-primary">{{ item.jefe }}</span>
                </div>
              </td>
              <td class="py-4 px-6 text-center">
                <span v-if="item.estado === 'Publicada'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {{ item.postulantes }}
                </span>
                <span v-else class="text-xs text-gray-400">-</span>
              </td>
              <td class="py-4 px-6 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button class="w-7 h-7 rounded-md bg-neutral text-gray-500 hover:bg-primary hover:text-white transition-colors flex items-center justify-center" title="Editar">
                    <v-icon icon="mdi-pencil-outline" size="16"></v-icon>
                  </button>
                  <button v-if="item.estado === 'Publicada'" class="w-7 h-7 rounded-md bg-neutral text-gray-500 hover:text-[#D16900] hover:bg-orange-50 transition-colors flex items-center justify-center" title="Archivar">
                    <v-icon icon="mdi-archive-arrow-down-outline" size="16"></v-icon>
                  </button>
                  <button v-if="item.estado === 'Borrador'" class="w-7 h-7 rounded-md bg-neutral text-gray-500 hover:text-success hover:bg-green-50 transition-colors flex items-center justify-center" title="Publicar">
                    <v-icon icon="mdi-send-outline" size="16"></v-icon>
                  </button>
                  <button v-if="item.estado === 'Archivada'" class="w-7 h-7 rounded-md bg-neutral text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors flex items-center justify-center" title="Restaurar">
                    <v-icon icon="mdi-restore" size="16"></v-icon>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredPasantias.length === 0">
              <td colspan="5" class="py-12 text-center text-gray-500 text-sm">
                No se encontraron pasantías en esta categoría.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="px-6 py-4 border-t border-gray-200 text-xs text-gray-500">
        Mostrando {{ filteredPasantias.length }} resultados
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('Publicada')
const tabs = [
  { id: 'Publicada', label: 'Publicadas' },
  { id: 'Borrador', label: 'Borradores' },
  { id: 'Archivada', label: 'Archivadas' }
]

const filters = ref({ titulo: '', area: '', jefe: '' })

const pasantias = ref([
  { id: 1, titulo: 'Desarrollador Frontend React/Vue', area: 'Desarrollo Web', jefe: 'Lic. María Fernández', postulantes: 5, estado: 'Publicada' },
  { id: 2, titulo: 'Analista de Datos y BI', area: 'Data Science', jefe: 'Ing. Carlos Mendoza', postulantes: 2, estado: 'Publicada' },
  { id: 3, titulo: 'Especialista en Marketing Digital', area: 'Marketing', jefe: 'Lic. Ana Rodríguez', postulantes: 8, estado: 'Publicada' },
  { id: 4, titulo: 'Diseñador UI/UX Senior', area: 'Diseño', jefe: 'Lic. María Fernández', postulantes: 0, estado: 'Borrador' },
  { id: 5, titulo: 'Soporte Técnico L1', area: 'Infraestructura', jefe: 'Ing. Carlos Mendoza', postulantes: 0, estado: 'Borrador' },
  { id: 6, titulo: 'Ingeniero DevOps', area: 'Sistemas', jefe: 'Lic. María Fernández', postulantes: 12, estado: 'Archivada' }
])

const filteredPasantias = computed(() => {
  return pasantias.value.filter(item => {
    if (item.estado !== activeTab.value) return false
    if (filters.value.titulo && !item.titulo.toLowerCase().includes(filters.value.titulo.toLowerCase())) return false
    if (filters.value.area && !item.area.toLowerCase().includes(filters.value.area.toLowerCase())) return false
    if (filters.value.jefe && !item.jefe.toLowerCase().includes(filters.value.jefe.toLowerCase())) return false
    return true
  })
})
</script>
