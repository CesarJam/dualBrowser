<template>
  <div class="flex h-screen w-full overflow-hidden">
    
    <div class="w-1/2 h-full border-r border-gray-300 bg-white flex flex-col">
      <header class="bg-red-600 text-white p-4 font-bold text-lg shadow-md shrink-0">
        YouTube Player
      </header>
      <main class="flex-1 overflow-hidden">
        <YouTubePanel />
      </main>
    </div>

    <div class="w-1/2 h-full bg-white flex flex-col">
      <header class="bg-blue-600 text-white p-4 font-bold text-lg shadow-md flex justify-between items-center shrink-0">
        <span>Navegador Local</span>
      </header>
      <main class="flex-1 overflow-hidden">
        <BrowserPanel />
      </main>
    </div>

  </div>
</template>

<script setup>
import YouTubePanel from './components/YouTubePanel.vue'
import BrowserPanel from './components/BrowserPanel.vue'
</script>