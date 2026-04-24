import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/sistema',
      component: () => import('@/layouts/SystemLayout.vue'),
      children: [
        {
          path: '/estudiante/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/student/DashboardView.vue'),
          meta: { title: 'Panel Principal', subtitle: 'Resumen de tu progreso como estudiante' }
        },
        {
          path: '/estudiante/pasantias',
          name: 'Pasantias',
          component: () => import('@/views/student/PasantiasView.vue'),
          meta: { title: 'Explorar Pasantías', subtitle: 'Encuentra y postula a nuevas oportunidades' }
        },
        {
          path: '/estudiante/inscripcion',
          name: 'Inscripcion',
          component: () => import('@/views/student/InscripcionView.vue'),
          meta: { title: 'Mi Inscripción', subtitle: 'Gestiona el estado de tus postulaciones' }
        },
        {
          path: '/estudiante/bitacora',
          name: 'Bitacora',
          component: () => import('@/views/student/BitacoraView.vue'),
          meta: { title: 'Bitácora', subtitle: 'Revisa tus registros semanales y puntajes' }
        },
        {
          path: '/estudiante/hoja-vida',
          name: 'HojaVida',
          component: () => import('@/views/student/HojaVidaView.vue'),
          meta: { title: 'Mi Hoja de Vida', subtitle: 'Actualiza tu perfil profesional y habilidades' }
        },
        {
          path: '/estudiante/informe',
          name: 'InformeFinal',
          component: () => import('@/views/student/InformeFinalView.vue'),
          meta: { title: 'Mi Informe Final', subtitle: 'Revisa tu nota final y el informe emitido por la empresa' }
        },
        // --- RUTAS DEL TUTOR ---
        {
          path: '/tutor/dashboard',
          name: 'TutorDashboard',
          component: () => import('@/views/tutor/DashboardView.vue'),
          meta: { title: 'Panel de Tutor', subtitle: 'Resumen de estudiantes a cargo' }
        },
        {
          path: '/tutor/estudiantes',
          name: 'TutorEstudiantes',
          component: () => import('@/views/tutor/MisEstudiantesView.vue'),
          meta: { title: 'Mis Estudiantes', subtitle: 'Listado y estado de pasantes asignados' }
        },
        {
          path: '/tutor/seguimiento',
          name: 'TutorSeguimiento',
          component: () => import('@/views/tutor/SeguimientoView.vue'),
          meta: { title: 'Seguimiento de Estudiante', subtitle: 'Evaluación y revisión de avance' }
        },
        // --- RUTAS DEL JEFE DE PASANTES ---
        {
          path: '/jefe/dashboard',
          name: 'JefeDashboard',
          component: () => import('@/views/jefe/DashboardView.vue'),
          meta: { title: 'Panel Principal', subtitle: 'Resumen operativo' }
        },
        {
          path: '/jefe/inscripciones',
          name: 'JefeInscripciones',
          component: () => import('@/views/jefe/InscripcionesView.vue'),
          meta: { title: 'Inscripciones', subtitle: 'Bandeja de entrada de postulaciones' }
        },
        {
          path: '/jefe/pasantes',
          name: 'JefePasantes',
          component: () => import('@/views/jefe/MisPasantesView.vue'),
          meta: { title: 'Mis Pasantes', subtitle: 'Gestión del ciclo de vida de los estudiantes' }
        },
        {
          path: '/jefe/bitacoras',
          name: 'JefeBitacoras',
          component: () => import('@/views/jefe/BitacorasView.vue'),
          meta: { title: 'Revisión de Bitácoras', subtitle: 'Calificar actividades y registros semanales' }
        },
        {
          path: '/jefe/informes',
          name: 'JefeInformes',
          component: () => import('@/views/jefe/InformesFinalesView.vue'),
          meta: { title: 'Informes Finales', subtitle: 'Emisión de notas y evaluación final' }
        },
        {
          path: '/jefe/actividades',
          name: 'JefeActividades',
          component: () => import('@/views/jefe/ActividadesView.vue'),
          meta: { title: 'Asignación de Actividades', subtitle: 'Gestionar tareas para los pasantes' }
        },
        // --- RUTAS DEL GERENTE ---
        {
          path: '/gerente/dashboard',
          name: 'GerenteDashboard',
          component: () => import('@/views/gerente/DashboardView.vue'),
          meta: { title: 'Panel de Gerencia', subtitle: 'Visión general de la empresa y pasantías' }
        },
        {
          path: '/gerente/empresa',
          name: 'GerenteEmpresa',
          component: () => import('@/views/gerente/MiEmpresaView.vue'),
          meta: { title: 'Mi Empresa', subtitle: 'Perfil corporativo y configuración' }
        },
        {
          path: '/gerente/pasantias',
          name: 'GerentePasantias',
          component: () => import('@/views/gerente/PasantiasView.vue'),
          meta: { title: 'Gestión de Pasantías', subtitle: 'Convocatorias publicadas y borradores' }
        },
        {
          path: '/gerente/equipo',
          name: 'GerenteEquipo',
          component: () => import('@/views/gerente/EquipoView.vue'),
          meta: { title: 'Equipo de Jefes', subtitle: 'Administración del personal a cargo' }
        },
        {
          path: '/gerente/pasantes',
          name: 'GerentePasantes',
          component: () => import('@/views/gerente/PasantesActivosView.vue'),
          meta: { title: 'Pasantes Activos', subtitle: 'Visión global de todos los estudiantes en la empresa' }
        }
      ]
    }
  ],
})

export default router
