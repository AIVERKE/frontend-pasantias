<template>
  <div class="flex h-screen bg-neutral font-body text-secondary overflow-hidden">
    <!-- Barra Lateral Izquierda -->
    <aside class="w-[240px] bg-secondary text-white flex flex-col shrink-0 transition-all duration-300">
      <!-- Sección Superior: Logo -->
      <div class="h-28 flex items-center justify-center py-4 px-2 border-b border-white/10">
        <!-- Logo UMSA (logotipo_letras.png) -->
        <img src="/images/logotipo_letras.png" alt="Sistema de Gestión de Pasantías" class="h-full object-contain drop-shadow-md brightness-200 scale-125" />
      </div>

      <!-- Sección Media: Menú de Navegación -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <!-- Aquí irán los links dinámicos según el rol -->
        <router-link 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] transition-colors"
          active-class="bg-primary text-white border-l-[3px] border-l-white font-medium"
          :class="[$route.path === item.path ? '' : 'text-white/70 hover:text-white/90 hover:bg-white/5']"
        >
          <v-icon :icon="item.icon" size="20"></v-icon>
          <span>{{ item.label }}</span>
          
          <!-- Badge de pendientes -->
          <span v-if="item.badge" class="ml-auto bg-danger text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {{ item.badge }}
          </span>
        </router-link>
      </nav>

      <!-- Sección Inferior: Perfil y Cerrar Sesión -->
      <div class="p-4 border-t border-white/10 flex flex-col gap-3">
        <div class="flex items-center gap-3">
          <!-- Círculo Avatar -->
          <div class="w-9 h-9 rounded-full bg-white text-secondary flex items-center justify-center text-sm font-bold shrink-0">
            {{ userInitials }}
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-[13px] font-medium text-white truncate">{{ userName }}</span>
            <span class="text-[11px] text-white/60 truncate">{{ userRoleName }}</span>
          </div>
        </div>
        <button @click="logout" class="flex items-center gap-2 text-white/60 hover:text-white text-[12px] mt-2 transition-colors">
          <v-icon icon="mdi-logout" size="16"></v-icon>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Área de Contenido Derecha -->
    <main class="flex-1 flex flex-col min-w-0">
      <!-- Barra Superior -->
      <header class="h-[48px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <!-- Migas de pan -->
          <span>Pasantías UMSA</span>
          <v-icon icon="mdi-chevron-right" size="16"></v-icon>
          <span class="text-secondary font-medium">{{ currentRouteName }}</span>
        </div>
        <div class="w-64">
          <!-- Búsqueda Global -->
          <div class="relative">
            <v-icon icon="mdi-magnify" size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></v-icon>
            <input 
              type="text" 
              placeholder="Buscar..." 
              class="w-full bg-neutral text-sm rounded-md py-1.5 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary"
            />
          </div>
        </div>
      </header>

      <!-- Zona de Contenido Desplazable -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- Encabezado de Página -->
        <div class="mb-6">
          <h1 class="text-[24px] font-headline font-bold text-secondary">{{ pageTitle }}</h1>
          <p class="text-[14px] text-gray-500 mt-1">{{ pageSubtitle }}</p>
        </div>

        <!-- Renderiza la vista hija aquí -->
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Detectar rol actual basado en la ruta (Mock)
const isTutor = computed(() => route.path.includes('/tutor'))
const isJefe = computed(() => route.path.includes('/jefe'))
const isGerente = computed(() => route.path.includes('/gerente'))
const isAdmin = computed(() => route.path.includes('/admin'))

// Datos del usuario dinámicos
const userName = computed(() => {
  if (isAdmin.value) return 'Admin UMSA'
  if (isGerente.value) return 'Ing. Roberto Silva'
  if (isJefe.value) return 'Lic. María Fernández'
  if (isTutor.value) return 'Ing. Carlos Mendoza'
  return 'Juan Pérez'
})
const userInitials = computed(() => {
  if (isAdmin.value) return 'AU'
  if (isGerente.value) return 'RS'
  if (isJefe.value) return 'MF'
  if (isTutor.value) return 'CM'
  return 'JP'
})
const userRoleName = computed(() => {
  if (isAdmin.value) return 'Super Usuario'
  if (isGerente.value) return 'Gerente General'
  if (isJefe.value) return 'Jefe de Pasantes'
  if (isTutor.value) return 'Tutor UMSA'
  return 'Estudiante'
})

// Menús dinámicos
const menuItems = computed(() => {
  if (isAdmin.value) {
    return [
      { label: 'Panel Principal', path: '/admin/dashboard', icon: 'mdi-view-dashboard' },
      { label: 'Usuarios', path: '/admin/usuarios', icon: 'mdi-account-multiple' },
      { label: 'Empresas', path: '/admin/empresas', icon: 'mdi-domain', badge: '2' },
      { label: 'Pasantías', path: '/admin/pasantias', icon: 'mdi-bullhorn' }
    ]
  } else if (isGerente.value) {
    return [
      { label: 'Panel Principal', path: '/gerente/dashboard', icon: 'mdi-view-dashboard' },
      { label: 'Mi Empresa', path: '/gerente/empresa', icon: 'mdi-domain' },
      { label: 'Pasantías', path: '/gerente/pasantias', icon: 'mdi-bullhorn' },
      { label: 'Equipo', path: '/gerente/equipo', icon: 'mdi-account-group' },
      { label: 'Pasantes Activos', path: '/gerente/pasantes', icon: 'mdi-account-hard-hat' }
    ]
  } else if (isJefe.value) {
    return [
      { label: 'Panel Principal', path: '/jefe/dashboard', icon: 'mdi-view-dashboard' },
      { label: 'Inscripciones', path: '/jefe/inscripciones', icon: 'mdi-inbox-arrow-down', badge: '3' },
      { label: 'Mis Pasantes', path: '/jefe/pasantes', icon: 'mdi-account-hard-hat' },
      { label: 'Bitácoras', path: '/jefe/bitacoras', icon: 'mdi-notebook-check' },
      { label: 'Informes Finales', path: '/jefe/informes', icon: 'mdi-file-certificate' },
      { label: 'Actividades', path: '/jefe/actividades', icon: 'mdi-format-list-checks' }
    ]
  } else if (isTutor.value) {
    return [
      { label: 'Panel Principal', path: '/tutor/dashboard', icon: 'mdi-view-dashboard' },
      { label: 'Mis Estudiantes', path: '/tutor/estudiantes', icon: 'mdi-account-group' },
      { label: 'Seguimiento', path: '/tutor/seguimiento', icon: 'mdi-clipboard-check' }
    ]
  } else {
    return [
      { label: 'Panel Principal', path: '/estudiante/dashboard', icon: 'mdi-view-dashboard' },
      { label: 'Ver Pasantías', path: '/estudiante/pasantias', icon: 'mdi-bullhorn' },
      { label: 'Mi Inscripción', path: '/estudiante/inscripcion', icon: 'mdi-clipboard-text' },
      { label: 'Bitácora', path: '/estudiante/bitacora', icon: 'mdi-notebook' },
      { label: 'Mi Hoja de Vida', path: '/estudiante/hoja-vida', icon: 'mdi-file-document' },
      { label: 'Mi Informe Final', path: '/estudiante/informe', icon: 'mdi-chart-bar' }
    ]
  }
})

const currentRouteName = computed(() => route.meta.title || 'Inicio')
const pageTitle = computed(() => route.meta.title || 'Panel Principal')
const pageSubtitle = computed(() => route.meta.subtitle || 'Bienvenido al sistema')

const logout = () => {
  // Lógica de cerrar sesión
  router.push('/')
}
</script>
