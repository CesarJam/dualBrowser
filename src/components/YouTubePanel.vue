<template>
  <div class="flex flex-col h-full">
    <div v-if="activeVideoId" class="w-full aspect-video bg-black flex-shrink-0">
      <iframe 
        class="w-full h-full"
        :src="`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
    <div v-else class="w-full aspect-video bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-400">
      <span>Busca y selecciona un video</span>
    </div>

    <div class="p-4 border-b border-gray-200 shrink-0">
      <form @submit.prevent="handleSearch" class="flex gap-2">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar música, podcasts..." 
          class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
        />
        <button 
          type="submit" 
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Buscando...' : 'Buscar' }}
        </button>
      </form>
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div 
        v-for="video in videos" 
        :key="video.id.videoId"
        @click="playVideo(video.id.videoId)"
        class="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded transition"
      >
        <img :src="video.snippet.thumbnails.medium.url" alt="Thumbnail" class="w-32 h-20 object-cover rounded" />
        <div class="flex flex-col overflow-hidden">
          <h3 class="font-bold text-sm text-gray-800 line-clamp-2" v-html="video.snippet.title"></h3>
          <span class="text-xs text-gray-500 mt-1">{{ video.snippet.channelTitle }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useYouTube } from '../composables/useYouTube'

const searchQuery = ref('')
const { videos, loading, error, activeVideoId, searchVideos, playVideo } = useYouTube()

const handleSearch = () => {
  searchVideos(searchQuery.value)
}
</script>