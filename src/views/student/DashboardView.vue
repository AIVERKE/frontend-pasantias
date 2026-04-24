<template>
  <div>
    <!-- Dashboard Mockup -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Pasantías Activas</h3>
        <div class="text-3xl font-headline font-bold text-secondary">0</div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Horas Completadas</h3>
        <div class="text-3xl font-headline font-bold text-secondary">0 <span class="text-sm font-body text-gray-400 font-normal">/ 120</span></div>
      </div>
      <div class="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary">
        <h3 class="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Evaluación Promedio</h3>
        <div class="text-3xl font-headline font-bold text-secondary">-</div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-headline font-bold text-secondary">Actividades Recientes</h2>
      </div>
      <div class="p-8 text-center text-gray-500 text-sm">
        No hay actividades recientes registradas en tu bitácora.
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
