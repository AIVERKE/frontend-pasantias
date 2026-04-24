<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
    <div class="overflow-x-auto flex-1">
      <table class="w-full text-left border-collapse whitespace-nowrap min-w-max">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th 
              v-for="col in columns" 
              :key="col.key" 
              class="py-3 px-4 align-top"
              :class="col.align === 'right' ? 'text-right' : 'text-left'"
            >
              <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{{ col.label }}</div>
              
              <!-- Filtro Inline -->
              <input 
                v-if="col.filterable !== false" 
                v-model="filters[col.key]" 
                type="text" 
                class="w-full min-w-[120px] text-xs p-1.5 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white transition-colors" 
                placeholder="Filtrar..." 
              />
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length" class="py-8 text-center text-gray-500 text-sm">
              No se encontraron resultados para los filtros aplicados.
            </td>
          </tr>
          <tr 
            v-for="(row, index) in filteredData" 
            :key="row.id || index" 
            class="hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="col in columns" 
              :key="col.key" 
              class="py-3 px-4 text-sm"
              :class="col.align === 'right' ? 'text-right' : 'text-left'"
            >
              <slot :name="col.key" :item="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between shrink-0">
      <span>Mostrando {{ filteredData.length }} registros</span>
      <span>Total de registros: {{ data.length }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
    // Array of objects: { key: 'name', label: 'Name', filterable: true/false, align: 'left'/'right' }
  },
  data: {
    type: Array,
    required: true
  }
})

// Initialize filters
const filters = ref({})
props.columns.forEach(col => {
  if (col.filterable !== false) {
    filters.value[col.key] = ''
  }
})

const filteredData = computed(() => {
  return props.data.filter(row => {
    // Check every filter
    return Object.keys(filters.value).every(filterKey => {
      const filterValue = filters.value[filterKey].toLowerCase()
      if (!filterValue) return true // No filter applied for this column
      
      const cellValue = String(row[filterKey] || '').toLowerCase()
      return cellValue.includes(filterValue)
    })
  })
})
</script>
