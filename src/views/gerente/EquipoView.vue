<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-headline font-bold text-secondary">Equipo Coordinador</h2>
      <button class="bg-primary hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2 text-sm">
        <v-icon icon="mdi-account-plus" size="18"></v-icon>
        Invitar Jefe
      </button>
    </div>

    <!-- Lista de Tarjetas de Jefes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="jefe in equipo" 
        :key="jefe.id" 
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
        :class="{'ring-2 ring-primary border-primary': jefeSeleccionado?.id === jefe.id}"
        @click="seleccionarJefe(jefe)"
      >
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0 group-hover:bg-primary group-hover:text-white transition-colors"
                   :class="{'bg-primary text-white': jefeSeleccionado?.id === jefe.id}">
                {{ jefe.iniciales }}
              </div>
              <div>
                <h3 class="font-bold text-secondary text-[15px] group-hover:text-primary transition-colors">{{ jefe.nombre }}</h3>
                <p class="text-xs text-gray-500 mt-0.5">{{ jefe.area }}</p>
                <p class="text-xs text-gray-400 mt-1 flex items-center"><v-icon icon="mdi-email-outline" size="12" class="mr-1"></v-icon>{{ jefe.email }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex items-center gap-4 border-t border-gray-100 pt-4">
            <div class="flex-1 text-center">
              <span class="block text-xl font-bold text-secondary">{{ jefe.pasantiasActivas }}</span>
              <span class="block text-[10px] text-gray-500 uppercase tracking-wide">Pasantías</span>
            </div>
            <div class="w-px h-8 bg-gray-100"></div>
            <div class="flex-1 text-center">
              <span class="block text-xl font-bold text-success">{{ jefe.pasantesAsignados }}</span>
              <span class="block text-[10px] text-gray-500 uppercase tracking-wide">Pasantes</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla Desplegable de Pasantes (Aparece al hacer clic) -->
    <div v-if="jefeSeleccionado" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6 animate-fade-in-up">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
        <h3 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-account-hard-hat" size="20" class="text-primary"></v-icon>
          Pasantes a cargo de: <span class="text-primary">{{ jefeSeleccionado.nombre }}</span>
        </h3>
        <button @click="jefeSeleccionado = null" class="text-gray-400 hover:text-gray-600 transition-colors bg-white w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center">
          <v-icon icon="mdi-close" size="18"></v-icon>
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead class="bg-neutral border-b border-gray-200">
            <tr>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Estudiante</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Pasantía</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Progreso</th>
              <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="pasante in pasantesMock" :key="pasante.id" class="hover:bg-neutral/50 transition-colors">
              <td class="py-4 px-6 font-medium text-sm text-secondary">{{ pasante.nombre }}</td>
              <td class="py-4 px-6 text-sm text-gray-500">{{ pasante.pasantia }}</td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-full bg-gray-200 rounded-full h-1.5 max-w-[80px]">
                    <div class="bg-primary h-1.5 rounded-full" :style="{ width: pasante.progreso + '%' }"></div>
                  </div>
                  <span class="text-xs text-gray-500 font-medium">{{ pasante.progreso }}%</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-success/10 text-success">
                  {{ pasante.estado }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const equipo = ref([
  { id: 1, iniciales: 'MF', nombre: 'Lic. María Fernández', area: 'Recursos Humanos y TI', email: 'mfernandez@technova.com', pasantiasActivas: 2, pasantesAsignados: 22 },
  { id: 2, iniciales: 'CM', nombre: 'Ing. Carlos Mendoza', area: 'Desarrollo Frontend', email: 'cmendoza@technova.com', pasantiasActivas: 1, pasantesAsignados: 8 },
  { id: 3, iniciales: 'AR', nombre: 'Lic. Ana Rodríguez', area: 'Marketing Digital', email: 'arodriguez@technova.com', pasantiasActivas: 1, pasantesAsignados: 15 },
])

const jefeSeleccionado = ref(null)

const pasantesMock = ref([
  { id: 1, nombre: 'Ana López', pasantia: 'Desarrollador Frontend React/Vue', progreso: 45, estado: 'Activo' },
  { id: 2, nombre: 'Luis Blanco', pasantia: 'Desarrollador Frontend React/Vue', progreso: 80, estado: 'Activo' },
  { id: 3, nombre: 'María Quispe', pasantia: 'Diseñador UI/UX Junior', progreso: 10, estado: 'Activo' }
])

const seleccionarJefe = (jefe) => {
  if (jefeSeleccionado.value?.id === jefe.id) {
    jefeSeleccionado.value = null
  } else {
    jefeSeleccionado.value = jefe
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
