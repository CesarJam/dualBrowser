<template>
  <div class="flex flex-col h-full bg-white relative">
    
    <div class="p-4 border-b border-gray-200 shrink-0 bg-gray-50 flex gap-2 items-center">
      <form @submit.prevent="loadUrl" class="flex flex-1 gap-2">
        <input 
          v-model="inputUrl" 
          type="text" 
          placeholder="Ej: https://es.vuejs.org o escribe un enlace..." 
          class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
        />
        <button type="submit" class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Ir
        </button>
      </form>
      <button 
        @click="addFavorite(currentUrl)" 
        title="Agregar a favoritos"
        class="text-yellow-500 hover:bg-yellow-100 p-2 rounded transition disabled:opacity-50"
        :disabled="!currentUrl"
      >
        ★
      </button>
      <button 
        @click="showFavorites = !showFavorites" 
        class="text-sm bg-blue-100 text-blue-800 px-3 py-2 rounded hover:bg-blue-200 transition font-medium"
      >
        Favoritos ({{ favorites.length }})
      </button>
    </div>

    <div class="flex-1 relative overflow-hidden">
      
      <div v-if="showFavorites" class="absolute inset-0 bg-white z-10 p-4 overflow-y-auto">
        <h2 class="text-lg font-bold mb-4 text-gray-800">Tus Favoritos</h2>
        <div v-if="favorites.length === 0" class="text-gray-500 text-center mt-10">
          Aún no tienes favoritos guardados.
        </div>
        <ul class="space-y-2">
          <li v-for="fav in favorites" :key="fav.url" class="flex justify-between items-center p-3 border border-gray-200 rounded hover:bg-gray-50">
            <span class="truncate flex-1 text-blue-600 cursor-pointer" @click="openFavorite(fav.url)">
              {{ fav.url }}
            </span>
            <button @click="removeFavorite(fav.url)" class="text-red-500 text-sm ml-4 hover:underline">
              Eliminar
            </button>
          </li>
        </ul>
      </div>

      <div v-else class="h-full flex flex-col">
        <div v-if="currentUrl" class="bg-yellow-50 p-2 text-xs text-center border-b border-yellow-200 text-yellow-800 flex justify-center items-center gap-2">
          <span>¿La página no carga o sale en gris? (Bloqueo de seguridad)</span>
          <a :href="currentUrl" target="_blank" class="bg-yellow-500 text-white px-2 py-1 rounded font-bold hover:bg-yellow-600">
            Abrir en Split View ↗
          </a>
        </div>
        
        <iframe 
          v-if="currentUrl"
          class="w-full flex-1"
          :src="currentUrl" 
          frameborder="0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        ></iframe>
        <div v-else class="flex-1 flex items-center justify-center text-gray-400">
          Ingresa una URL para comenzar a navegar
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const { favorites, addFavorite, removeFavorite } = useFavorites()

const inputUrl = ref('')
const currentUrl = ref('')
const showFavorites = ref(false)

const loadUrl = () => {
  let finalUrl = inputUrl.value.trim()
  if (!finalUrl) return
  
  // Autocompletar https:// si el usuario lo omite
  if (!/^https?:\/\//i.test(finalUrl)) {
    finalUrl = 'https://' + finalUrl
  }
  
  currentUrl.value = finalUrl
  inputUrl.value = finalUrl // Actualizamos el input para reflejar la URL real
  showFavorites.value = false // Ocultamos favoritos si estábamos ahí
}

const openFavorite = (url) => {
  inputUrl.value = url
  loadUrl()
}
</script>