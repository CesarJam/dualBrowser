import { ref, watch } from 'vue'

export function useFavorites() {
  // Inicializamos leyendo de localStorage o con un arreglo vacío
  const favorites = ref(JSON.parse(localStorage.getItem('dual-browser-favs')) || [])

  // Observamos cambios en el arreglo para guardarlos automáticamente en localStorage
  watch(favorites, (newFavs) => {
    localStorage.setItem('dual-browser-favs', JSON.stringify(newFavs))
  }, { deep: true })

  const addFavorite = (url) => {
    if (!url.trim()) return
    // Evitamos duplicados
    if (!favorites.value.find(f => f.url === url)) {
      favorites.value.push({ url, title: url })
    }
  }

  const removeFavorite = (url) => {
    favorites.value = favorites.value.filter(f => f.url !== url)
  }

  return { favorites, addFavorite, removeFavorite }
}