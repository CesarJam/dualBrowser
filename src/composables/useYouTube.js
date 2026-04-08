import { ref } from 'vue'

export function useYouTube() {
  const videos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const activeVideoId = ref(null) // Guardará el ID del video que el usuario decida reproducir

  const searchVideos = async (query) => {
    if (!query.trim()) return
    
    loading.value = true
    error.value = null
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Error al conectar con YouTube')
      const data = await response.json()
      videos.value = data.items
    } catch (err) {
      error.value = err.message
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const playVideo = (videoId) => {
    activeVideoId.value = videoId
  }

  return { 
    videos, 
    loading, 
    error, 
    activeVideoId, 
    searchVideos, 
    playVideo 
  }
}