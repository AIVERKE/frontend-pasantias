<template>
  <div class="w-full">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-headline font-bold text-secondary">Iniciar Sesión</h2>
      <p class="text-gray-500 mt-2 font-medium">Accede a tu cuenta de Pasantías UMSA</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label class="block text-sm font-bold text-secondary mb-1">Correo electrónico</label>
        <div class="relative">
          <v-icon icon="mdi-email-outline" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></v-icon>
          <input 
            type="email" 
            placeholder="ejemplo@umsa.bo" 
            class="w-full bg-neutral text-sm rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-secondary mb-1">Contraseña</label>
        <div class="relative">
          <v-icon icon="mdi-lock-outline" size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></v-icon>
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="••••••••" 
            class="w-full bg-neutral text-sm rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-transparent focus:border-primary transition-all"
            required
          />
          <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            <v-icon :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'" size="20"></v-icon>
          </button>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <router-link to="/auth/recuperar-password" class="text-sm font-bold text-primary hover:text-blue-700 hover:underline transition-colors">
          ¿Olvidaste tu contraseña?
        </router-link>
      </div>

      <button type="submit" class="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex justify-center items-center gap-2 mt-4">
        Iniciar Sesión
        <v-icon icon="mdi-login" size="20"></v-icon>
      </button>
    </form>

    <div class="mt-8 text-center pt-8 border-t border-gray-100">
      <p class="text-gray-500">¿No tienes una cuenta?</p>
      <router-link to="/auth/bienvenida" class="inline-block mt-2 text-primary font-bold hover:text-blue-700 hover:underline transition-colors">
        Crear una cuenta nueva
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)

const handleLogin = () => {
  // Simulando login y redirigiendo al dashboard de estudiante por defecto para la demo
  router.push('/estudiante/dashboard')
}
</script>
