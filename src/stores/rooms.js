import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

const AMENITY_ICONS = {
  bathroom: { icon: 'bi bi-droplet-half', label: 'Badezimmer' },
  minibar: { icon: 'bi bi-cup-straw', label: 'Minibar' },
  television: { icon: 'bi bi-tv', label: 'Fernseher' },
  livingroom: { icon: 'bi bi-sofa', label: 'Wohnbereich' },
  aircondition: { icon: 'bi bi-snow', label: 'Klimaanlage' },
  wifi: { icon: 'bi bi-wifi', label: 'WLAN' },
  breakfast: { icon: 'bi bi-egg-fried', label: 'Frühstück' },
  'handicapped accessible': { icon: 'bi bi-universal-access', label: 'Barrierefrei' }
}

function mapRoomExtras(apiExtras) {
  const seen = new Set()

  return apiExtras
    .map(extra => {
      const key = Object.keys(extra)[0]
      if (extra[key] !== 1 || seen.has(key)) return null
      seen.add(key)

      return {
        key,
        ...AMENITY_ICONS[key]
      }
    })
    .filter(Boolean)
}

export const useRoomsStore = defineStore('rooms', () => {
  const rooms = ref([])
  const availability = ref({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchRooms() {
    loading.value = true
    try {
      const { data } = await api.get('/rooms')
      rooms.value = data.map(room => ({
        ...room,
        extras: mapRoomExtras(room.extras)
      }))
    } catch {
      error.value = 'Fehler beim Laden der Zimmer'
    } finally {
      loading.value = false
    }
  }

  async function checkAvailability(from, to) {
    for (const room of rooms.value) {
      try {
        const { data } = await api.get(
          `/room/${room.id}/from/${from}/to/${to}`
        )
        availability.value[room.id] = data.available
      } catch {
        availability.value[room.id] = undefined
      }
    }
  }

  return {
    rooms,
    availability,
    loading,
    error,
    fetchRooms,
    checkAvailability
  }
})

  