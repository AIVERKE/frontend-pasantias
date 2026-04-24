<template>
  <div class="space-y-6">
    <!-- Tarjetas de Estadísticas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-success flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
        <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
          <v-icon icon="mdi-account-hard-hat" size="24"></v-icon>
        </div>
        <div>
          <p class="text-[12px] font-medium text-gray-500 uppercase tracking-wider">Pasantes Activos</p>
          <h3 class="text-[32px] font-headline font-bold text-secondary leading-none mt-1">45</h3>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-success flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
        <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
          <v-icon icon="mdi-bullhorn" size="24"></v-icon>
        </div>
        <div>
          <p class="text-[12px] font-medium text-gray-500 uppercase tracking-wider">Pasantías Publicadas</p>
          <h3 class="text-[32px] font-headline font-bold text-secondary leading-none mt-1">8</h3>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-success flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default">
        <div class="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
          <v-icon icon="mdi-account-group" size="24"></v-icon>
        </div>
        <div>
          <p class="text-[12px] font-medium text-gray-500 uppercase tracking-wider">Equipo (Jefes)</p>
          <h3 class="text-[32px] font-headline font-bold text-secondary leading-none mt-1">4</h3>
        </div>
      </div>
    </div>

    <!-- Lista de Pasantías Activas Recientes -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="font-headline font-bold text-secondary text-lg flex items-center gap-2">
          <v-icon icon="mdi-briefcase-outline" size="20" class="text-primary"></v-icon>
          Resumen Operativo Reciente
        </h2>
        <router-link to="/gerente/pasantias" class="text-sm font-medium text-primary hover:text-blue-700 transition-colors flex items-center gap-1">
          Ver todas las pasantías <v-icon icon="mdi-arrow-right" size="16"></v-icon>
        </router-link>
      </div>
      <div class="p-0">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-neutral border-b border-gray-200">
              <tr>
                <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Título de Pasantía</th>
                <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Jefe a Cargo</th>
                <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center">Pasantes</th>
                <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase text-center">Postulantes</th>
                <th class="py-3 px-6 font-body text-xs font-semibold text-gray-500 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="item in pasantiasRecientes" :key="item.id" class="hover:bg-neutral/50 transition-colors">
                <td class="py-4 px-6 font-medium text-sm text-secondary">{{ item.titulo }}</td>
                <td class="py-4 px-6 text-sm text-gray-500">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                      {{ item.jefe.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() }}
                    </div>
                    {{ item.jefe }}
                  </div>
                </td>
                <td class="py-4 px-6 text-sm text-secondary font-bold text-center">{{ item.pasantes }}</td>
                <td class="py-4 px-6 text-sm text-secondary font-bold text-center">
                  <span class="bg-danger/10 text-danger px-2 py-0.5 rounded-full">{{ item.postulantes }}</span>
                </td>
                <td class="py-4 px-6">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-success/10 text-success">
                    <v-icon icon="mdi-check-circle" size="12" class="mr-1"></v-icon> Publicada
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pasantiasRecientes = ref([
  { id: 1, titulo: 'Desarrollador Frontend React/Vue', jefe: 'María Fernández', pasantes: 12, postulantes: 5 },
  { id: 2, titulo: 'Analista de Datos y BI', jefe: 'Carlos Mendoza', pasantes: 8, postulantes: 2 },
  { id: 3, titulo: 'Especialista en Marketing Digital', jefe: 'Ana Rodríguez', pasantes: 15, postulantes: 8 },
  { id: 4, titulo: 'Diseñador UI/UX Junior', jefe: 'María Fernández', pasantes: 10, postulantes: 12 }
])
</script>
