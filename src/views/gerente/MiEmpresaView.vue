<template>
  <div class="space-y-6">
    <!-- Perfil de la Empresa (Editable) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-domain" size="20" class="text-primary"></v-icon>
          Perfil Corporativo
        </h2>
        <button class="text-sm font-medium bg-primary text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
          <v-icon icon="mdi-content-save" size="16"></v-icon>
          Guardar Cambios
        </button>
      </div>
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Logo de la Empresa -->
          <div class="flex flex-col items-center gap-3">
            <div class="w-32 h-32 rounded-xl bg-neutral border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 overflow-hidden relative group cursor-pointer hover:bg-gray-100 transition-colors">
              <v-icon icon="mdi-camera-plus" size="32" class="group-hover:scale-110 transition-transform"></v-icon>
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white text-xs font-bold">Cambiar Logo</span>
              </div>
            </div>
            <p class="text-[11px] text-gray-400 text-center max-w-[120px]">JPG, PNG o SVG. Max 2MB.</p>
          </div>

          <!-- Formulario de Datos -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Nombre de la Empresa / Razón Social</label>
              <input type="text" v-model="empresa.nombre" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium text-secondary" />
            </div>
            
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Rubro / Industria</label>
              <input type="text" v-model="empresa.rubro" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">NIT</label>
              <input type="text" v-model="empresa.nit" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary" />
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Dirección Principal</label>
              <input type="text" v-model="empresa.direccion" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary" />
            </div>

            <div class="col-span-1 md:col-span-2">
              <label class="block text-xs font-semibold text-gray-500 mb-1.5">Descripción de la Empresa</label>
              <textarea v-model="empresa.descripcion" rows="4" class="w-full bg-neutral border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary leading-relaxed"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección Equipo (Jefes de Pasantes) -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-account-tie" size="20" class="text-primary"></v-icon>
          Equipo Coordinador (Jefes de Pasantes)
        </h2>
        <router-link to="/gerente/equipo" class="text-sm font-medium text-primary hover:text-blue-700 transition-colors flex items-center gap-1">
          Gestionar equipo <v-icon icon="mdi-arrow-right" size="16"></v-icon>
        </router-link>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <!-- Tarjeta de Jefe -->
          <div v-for="jefe in equipo" :key="jefe.id" class="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:border-primary/30 transition-colors bg-neutral/50">
            <div class="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary font-bold text-lg shadow-sm shrink-0">
              {{ jefe.iniciales }}
            </div>
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-secondary truncate">{{ jefe.nombre }}</h4>
              <p class="text-xs text-gray-500 mt-0.5 truncate">{{ jefe.area }}</p>
            </div>
          </div>
          
          <!-- Botón Añadir -->
          <button class="border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center gap-2 text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-blue-50/50 transition-all">
            <v-icon icon="mdi-plus" size="20"></v-icon>
            <span class="text-sm font-medium">Invitar Jefe</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const empresa = ref({
  nombre: 'TechNova Solutions S.R.L.',
  rubro: 'Desarrollo de Software y Tecnología',
  nit: '4928371029',
  direccion: 'Av. Arce #2450, Edificio Multicentro, Piso 12, La Paz',
  descripcion: 'Empresa líder en desarrollo de soluciones tecnológicas innovadoras para el sector financiero y educativo. Contamos con un equipo multidisciplinario altamente calificado.'
})

const equipo = ref([
  { id: 1, iniciales: 'MF', nombre: 'Lic. María Fernández', area: 'Recursos Humanos y TI' },
  { id: 2, iniciales: 'CM', nombre: 'Ing. Carlos Mendoza', area: 'Desarrollo Frontend' },
  { id: 3, iniciales: 'AR', nombre: 'Lic. Ana Rodríguez', area: 'Marketing Digital' },
])
</script>
