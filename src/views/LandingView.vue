<template>
  <div class="bg-dark-bg selection:bg-blue-900/50 min-h-screen">
    <!-- TopAppBar -->
    <header class="fixed top-0 w-full z-50 bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 shadow-sm h-20 transition-all duration-300">
      <nav class="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 h-full">
        <div class="flex items-center gap-3">
          <img alt="Logo UMSA" class="h-12 w-auto brightness-200 hover:opacity-90 transition-opacity drop-shadow-md" src="https://lh3.googleusercontent.com/aida/ADBb0uhufMYcjE9vghqBA2dYHLTimtBB_91Q71N-X-mIrA0nnE17kt6kZ2KYU0MK6EoD1CuewY0_8CM5RFU1GsJd9VRQCyNgngXSKZSU6y7vUOPSyi-GhOz-eQr3yw7ASgGK7ranMBeob7DnlnQ-RW_WEYwtJW0TzvriN5Giw3LJrMQm3jYRAfeTVqqrvaKY55EibSY2hpeq55ntFzfYyaLfZja5REan3sc2-uq9-kR6TXvHs4cXyoznkSwOCKgy3bImPeAjd3HtWVc4_qo" />
        </div>
        <div class="hidden md:flex items-center space-x-10">
          <a v-for="item in menuItems" :key="item.href" :href="item.href" class="relative text-slate-300 hover:text-white font-headline font-semibold tracking-tight transition-colors duration-300 group">
            {{ item.label }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <div class="flex items-center gap-4">
          <button class="px-7 py-2.5 rounded-full bg-highlight text-white font-bold hover:bg-[#B35900] hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(209,105,0,0.39)] hover:shadow-[0_6px_20px_rgba(209,105,0,0.23)] transition-all duration-300 text-sm tracking-wide border border-[#E67300]/50">
            Iniciar Sesión
          </button>
        </div>
      </nav>
    </header>

    <main class="pt-20">
      <!-- Hero Section -->
      <section class="relative min-h-[600px] flex items-center justify-center px-8 text-center hero-pattern">
        <div class="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center mt-8">
          <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-[1.15] tracking-tighter mb-6 drop-shadow-lg">
            Sistema de Gestión de <br /> <span class="text-primary font-light italic">Pasantías</span> UMSA
          </h1>
          <p class="text-lg text-slate-300 max-w-2xl leading-relaxed font-body mb-10 drop-shadow-md font-medium">
            Facilitamos el puente entre la excelencia académica y el mundo profesional, brindando a los estudiantes de la Universidad Mayor de San Andrés las mejores oportunidades de crecimiento.
          </p>
          <div class="flex justify-center gap-6">
            <button class="px-8 py-3.5 rounded-full bg-primary text-white font-bold text-lg hover:bg-blue-600 hover:-translate-y-0.5 shadow-lg hover:shadow-primary/30 transition-all duration-300">
              Iniciar Sesión
            </button>
            <button class="px-8 py-3.5 rounded-full border border-slate-600 bg-slate-800/50 backdrop-blur-sm text-slate-200 font-bold text-lg hover:bg-slate-700 hover:text-white transition-all duration-300">
              Explorar
            </button>
          </div>
        </div>
      </section>

      <!-- Bento Grid for Mision, Vision, Objetivos, Quienes Somos -->
      <section class="max-w-7xl mx-auto px-8 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Misión -->
          <div class="p-10 rounded-[2.5rem] bg-[#222B40] border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center flex flex-col items-center h-full" id="mision">
            <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span class="material-symbols-outlined text-primary text-2xl">track_changes</span>
            </div>
            <div class="relative z-10 flex flex-col flex-grow">
              <h2 class="text-2xl font-extrabold text-white mb-4 font-headline">Misión</h2>
              <p class="text-base text-slate-400 leading-relaxed font-body max-w-md mx-auto">
                {{ info?.mision || 'Nuestra misión es gestionar y promover programas de pasantías de alta calidad que integren el conocimiento teórico con la práctica profesional.' }}
              </p>
            </div>
          </div>

          <!-- Visión -->
          <div class="p-10 rounded-[2.5rem] bg-[#222B40] border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center flex flex-col items-center h-full" id="vision">
            <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span class="material-symbols-outlined text-primary text-2xl">visibility</span>
            </div>
            <div class="relative z-10 flex flex-col flex-grow">
              <h2 class="text-2xl font-extrabold text-white mb-4 font-headline">Visión</h2>
              <p class="text-base text-slate-400 leading-relaxed font-body max-w-md mx-auto">
                {{ info?.vision || 'Ser el referente nacional en la gestión de talento joven, reconocidos por nuestra eficiencia en la vinculación académica-empresarial.' }}
              </p>
            </div>
          </div>

          <!-- Objetivos -->
          <div class="p-10 rounded-[2.5rem] bg-[#222B40] border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center flex flex-col items-center h-full" id="objetivos">
            <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span class="material-symbols-outlined text-primary text-2xl">flag</span>
            </div>
            <div class="relative z-10 flex flex-col flex-grow">
              <h2 class="text-2xl font-extrabold text-white mb-4 font-headline">Nuestros Objetivos</h2>
              <p class="text-base text-slate-400 leading-relaxed font-body max-w-md mx-auto">
                {{ info?.objetivos || 'Estructuramos cada paso del proceso para garantizar que tu transición al mercado laboral sea exitosa y significativa.' }}
              </p>
            </div>
          </div>

          <!-- Quiénes Somos -->
          <div class="p-10 rounded-[2.5rem] bg-[#222B40] border border-white/5 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 text-center flex flex-col items-center h-full" id="quienes-somos">
            <div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span class="material-symbols-outlined text-primary text-2xl">groups</span>
            </div>
            <div class="relative z-10 flex flex-col flex-grow">
              <h2 class="text-2xl font-extrabold text-white mb-4 font-headline">¿Quiénes Somos?</h2>
              <div class="space-y-4 text-base text-slate-400 leading-relaxed font-body max-w-md mx-auto">
                <p v-if="info?.quienes_somos">{{ info.quienes_somos }}</p>
                <template v-else>
                  <p>La Unidad de Gestión de Pasantías de la UMSA es el órgano encargado de articular las necesidades del sector productivo con el talento emergente.</p>
                  <p>Con más de dos décadas de experiencia, aseguramos que cada pasantía sea una experiencia transformadora.</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empresas Aliadas Section -->
      <section v-if="empresas.length" class="max-w-7xl mx-auto px-8 py-20 border-t border-white/5">
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-12 font-headline text-center tracking-tighter">
          Empresas en <span class="text-primary">Convenio</span>
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div v-for="empresa in empresas" :key="empresa.id_empresa" class="p-6 rounded-2xl bg-[#222B40]/50 border border-white/5 hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center group">
            <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-primary text-xl">business</span>
            </div>
            <h3 class="text-sm font-bold text-white text-center">{{ empresa.nombre }}</h3>
            <p class="text-xs text-slate-500 mt-1">{{ empresa.rubro }}</p>
          </div>
        </div>
      </section>

      <!-- CTAs -->
      <section class="max-w-5xl mx-auto px-8 pb-20">
        <div class="bg-gradient-to-b from-[#222B40] to-[#1A2233] border border-white/5 shadow-2xl rounded-[2.5rem] p-12 lg:p-16 text-center">
          <h2 class="text-3xl lg:text-4xl font-extrabold mb-4 font-headline text-white tracking-tighter">¿Listo para dar el primer paso?</h2>
          <p class="text-lg mb-10 text-slate-400 max-w-xl mx-auto font-body">Regístrate hoy y accede a la red de pasantías más prestigiosa de Bolivia.</p>
          <div class="flex flex-col sm:flex-row justify-center gap-5">
            <button class="px-8 py-3.5 rounded-full bg-primary text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-primary/20">Registrarse</button>
            <button class="px-8 py-3.5 rounded-full border border-slate-600 bg-slate-800/30 text-slate-300 font-bold text-lg hover:bg-slate-700 hover:text-white transition-all">Portal de Empresas</button>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-full py-12 border-t border-white/5 bg-[#151B29]">
      <div class="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto space-y-6 md:space-y-0">
        <div class="flex items-center gap-3">
          <span class="font-headline font-extrabold text-white text-2xl tracking-tight">UMSA <span class="text-primary font-light italic">Pasantías</span></span>
        </div>
        <div class="flex flex-wrap justify-center gap-8 font-body text-sm font-semibold text-slate-400">
          <a class="hover:text-primary transition-colors duration-200" href="#">Privacidad</a>
          <a class="hover:text-primary transition-colors duration-200" href="#">Términos</a>
          <a class="hover:text-primary transition-colors duration-200" href="#">Contacto</a>
        </div>
        <div class="text-slate-500 text-sm font-body font-medium">
          © 2026 UMSA
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const info = ref(null)
const empresas = ref([])

const menuItems = [
  { label: 'Misión', href: '#mision' },
  { label: 'Visión', href: '#vision' },
  { label: 'Objetivos', href: '#objetivos' },
  { label: 'Quiénes Somos', href: '#quienes-somos' }
]

const fetchData = async () => {
  try {
    // Fetch institucional info
    const infoRes = await axios.get('/informacion-empresa')
    if (infoRes.data && infoRes.data.length > 0) {
      info.value = infoRes.data[0] // Tomamos el primer registro
    }

    // Fetch empresas
    const empresasRes = await axios.get('/empresas')
    empresas.value = empresasRes.data.slice(0, 10) // Mostramos las primeras 10
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.hero-pattern {
  background-image: linear-gradient(rgba(26, 34, 51, 0.8), rgba(26, 34, 51, 0.95)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCM3CZgUTYO9CLHkrFfbvGmL3PLmQflFm2DTdJ_AwL7mhvPu8DZvE62ROnF4h-b-t93hwfs6Q4IiR9BxB3B3M86O3UO43engBfN1BY2GxiEmGZIXPy1-HlNSBI9W8P1caShtGIH_oLrHcou8O7vzlw9jMric0ylhoNtpjBXYWQeA9F60zqTglqz2nqq8O2HkDQIBRzYFTqS1dcBzjOFOHzmPRTatPt9l0fcqppGWoX_uZtRmNcJvsbews7ZpWg7GC3YQOOnwAWsdVMg);
  background-size: cover;
  background-position: center;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
