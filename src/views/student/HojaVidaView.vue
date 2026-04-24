<template>
  <div class="h-full flex flex-col max-w-5xl mx-auto w-full">
    
    <!-- Tarjeta Principal del Perfil -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-center gap-6">
        <div class="w-24 h-24 rounded-full bg-neutral border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0">
          <v-icon icon="mdi-account" size="48" class="text-gray-300"></v-icon>
        </div>
        <div>
          <h2 class="text-2xl font-headline font-bold text-secondary">Juan Pérez</h2>
          <p class="text-gray-500 font-medium">Estudiante de Ingeniería de Sistemas</p>
          <div class="flex gap-2 mt-2">
            <span class="px-2 py-1 bg-blue-50 text-primary rounded text-[11px] font-bold tracking-wider uppercase border border-blue-100">8vo Semestre</span>
            <span class="px-2 py-1 bg-gray-50 text-gray-600 rounded text-[11px] font-bold tracking-wider uppercase border border-gray-200">Inglés B2</span>
          </div>
        </div>
      </div>
      
      <!-- Campo para Link a CV en Drive -->
      <div class="w-full md:w-1/3">
        <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enlace a CV en Drive</label>
        <div class="flex gap-2">
          <div class="relative flex-1">
            <v-icon icon="mdi-google-drive" size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-primary"></v-icon>
            <input 
              v-model="cvLink"
              type="url" 
              placeholder="https://drive.google.com/..." 
              class="w-full bg-neutral text-sm rounded-lg py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
            />
          </div>
          <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-sm shadow-primary/30 shrink-0">
            Guardar
          </button>
        </div>
      </div>
    </div>

    <!-- Pestañas del Formulario -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
      <div class="flex border-b border-gray-200 bg-gray-50 pt-2 px-4 shrink-0">
        <button 
          @click="activeTab = 'resumen'"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === 'resumen' ? 'text-primary bg-white rounded-t-lg border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-secondary'"
        >
          Resumen Profesional
          <div v-if="activeTab === 'resumen'" class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"></div>
        </button>
        <button 
          @click="activeTab = 'habilidades'"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === 'habilidades' ? 'text-primary bg-white rounded-t-lg border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-secondary'"
        >
          Habilidades
          <div v-if="activeTab === 'habilidades'" class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"></div>
        </button>
        <button 
          @click="activeTab = 'historial'"
          class="px-6 py-3 text-sm font-medium transition-colors relative"
          :class="activeTab === 'historial' ? 'text-primary bg-white rounded-t-lg border-t border-l border-r border-gray-200' : 'text-gray-500 hover:text-secondary'"
        >
          Historial Académico
          <div v-if="activeTab === 'historial'" class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"></div>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:p-8">
        
        <!-- Tab: Resumen -->
        <div v-if="activeTab === 'resumen'" class="space-y-6 max-w-3xl">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Sobre mí</label>
            <textarea 
              v-model="perfil.sobreMi"
              rows="6"
              class="w-full bg-neutral text-sm rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all resize-none"
              placeholder="Escribe un breve resumen de tu perfil profesional, intereses y objetivos..."
            ></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Intereses de Pasantía</label>
            <input 
              v-model="perfil.intereses"
              type="text" 
              class="w-full bg-neutral text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
              placeholder="Ej. Desarrollo Web, Bases de Datos, Seguridad..."
            />
          </div>
        </div>

        <!-- Tab: Habilidades -->
        <div v-if="activeTab === 'habilidades'" class="space-y-6 max-w-3xl">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Habilidades Técnicas</label>
            <div class="flex gap-2 mb-3">
              <input 
                v-model="nuevaHabilidad"
                @keyup.enter="agregarHabilidad"
                type="text" 
                class="flex-1 bg-neutral text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary transition-all"
                placeholder="Añadir habilidad (Ej. Vue.js, Python, SQL)..."
              />
              <button @click="agregarHabilidad" class="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                Añadir
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="(hab, index) in perfil.habilidades" 
                :key="index"
                class="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 border border-primary/20"
              >
                <span>{{ hab }}</span>
                <button @click="removerHabilidad(index)" class="hover:text-danger transition-colors">
                  <v-icon icon="mdi-close" size="14"></v-icon>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Historial -->
        <div v-if="activeTab === 'historial'" class="space-y-6 max-w-3xl">
          <div class="border-l-2 border-gray-200 ml-3 pl-6 space-y-6">
            
            <!-- Item Historial -->
            <div class="relative">
              <div class="absolute w-3 h-3 bg-primary rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
              <h3 class="font-bold text-secondary">Ingeniería de Sistemas</h3>
              <p class="text-sm text-gray-500 mb-2">Universidad Mayor de San Andrés (2022 - Presente)</p>
              <p class="text-sm text-gray-600 bg-neutral p-3 rounded-lg border border-gray-100">Estudiante regular de 8vo semestre. Participación en la feria de ciencias con proyecto de inteligencia artificial.</p>
            </div>

            <!-- Item Historial -->
            <div class="relative">
              <div class="absolute w-3 h-3 bg-gray-300 rounded-full -left-[31px] top-1.5 ring-4 ring-white"></div>
              <h3 class="font-bold text-secondary">Diplomado en Desarrollo Web</h3>
              <p class="text-sm text-gray-500 mb-2">Instituto de Tecnologías (2024)</p>
              <p class="text-sm text-gray-600 bg-neutral p-3 rounded-lg border border-gray-100">Curso intensivo de 6 meses sobre tecnologías Frontend y Backend.</p>
            </div>

          </div>
          
          <button class="mt-4 flex items-center gap-2 text-primary text-sm font-bold hover:underline">
            <v-icon icon="mdi-plus" size="18"></v-icon>
            Añadir entrada académica
          </button>
        </div>

      </div>

      <!-- Pie del formulario -->
      <div class="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
        <button class="px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          Descartar
        </button>
        <button class="px-8 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm shadow-primary/30">
          Guardar Cambios
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('resumen')
const cvLink = ref('https://drive.google.com/file/d/1A2B3C4D5E6F/view')

const perfil = reactive({
  sobreMi: 'Soy un estudiante apasionado por el desarrollo de software y las nuevas tecnologías. Busco mi primera experiencia profesional en una empresa donde pueda aportar mis conocimientos y seguir aprendiendo de profesionales con experiencia.',
  intereses: 'Desarrollo Web Fullstack, Arquitectura de Software, Cloud Computing',
  habilidades: ['JavaScript', 'Vue.js', 'Node.js', 'PostgreSQL', 'Git', 'HTML/CSS']
})

const nuevaHabilidad = ref('')

const agregarHabilidad = () => {
  if (nuevaHabilidad.value.trim() !== '') {
    perfil.habilidades.push(nuevaHabilidad.value.trim())
    nuevaHabilidad.value = ''
  }
}

const removerHabilidad = (index) => {
  perfil.habilidades.splice(index, 1)
}
</script>
