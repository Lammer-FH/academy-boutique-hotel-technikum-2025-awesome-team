<template>
  <b-container  fluid class="my-5 pt-md-4 pt-lg-5 px-2 px-md-4"  style="max-width: 900px;">

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <b-spinner label="Loading..."></b-spinner>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
    </div>

    <!-- Room Content -->
    <div v-else>
      <b-row class="justify-content-center flex-column">
        
          <!-- Room Card -->
          <b-card class="shadow-sm mb-4 p-0">
            <b-row no-gutters>
              <!-- Image: full width on mobile, 1/3 on md+ -->
              <b-col cols="12" md="4">
  <b-card-img
    :src="`/images/rooms/${store.roomId}.jpg`"
    alt="Zimmerbild"
    class="h-100 w-100"
    style="object-fit: cover;"
  />
</b-col>

              <!-- Room Details: full width on mobile, 2/3 on md+ -->
              <b-col cols="12" md="8" class="p-3">
                <b-card-title class="room-card-title"><strong>Zimmer {{store.roomNumber}} – {{store.roomName}}</strong></b-card-title>

                <b-card-text class="mt-3">
                  <strong>{{ store.beds }}</strong> Bett(en)<br>
                  <strong>{{ store.pricePerNight }} €</strong> / Nacht

                  <!-- Extras -->
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <span
                      v-for="extra in extrasComputed"
                      :key="extra.label"
                      class="d-flex align-items-center gap-1 text-secondary"
                    >
                      <i :class="extra.icon"></i>
                      {{ extra.label }}
                    </span>
                  </div>
                </b-card-text>
              </b-col>
            </b-row>
          </b-card>

          <!-- Booking Block -->
          <BookingForm/>
            <BookingModal />
          
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import BookingForm from '../components/BookingForm.vue'
import BookingModal from '../components/BookingModal.vue'
import { useBookingStore } from '../stores/booking'

const route = useRoute()
const store = useBookingStore()

store.roomId = route.params.roomId
store.fromDate = ref(route.query.from || '')
store.toDate = ref(route.query.to || '')

const loading = ref(true)
const error = ref(null)

// Icon map
const icons = {
  bathroom: "bi bi-droplet",
  minibar: "bi bi-cup-straw",
  television: "bi bi-tv",
  livingroom: "bi bi-house-door",
  aircondition: "bi bi-snow",
  wifi: "bi bi-wifi",
  breakfast: "bi bi-egg-fried",
  "handicapped accessible": "bi bi-wheelchair"
}

// Helper: make extras unique
function normalizeExtras(extras) {
  if (!Array.isArray(extras)) return []
  const seen = new Set()
  return extras
    .filter(e => !seen.has(e.name) && seen.add(e.name))
    .map(e => ({
      label: e.name,
      icon: icons[e.name] || "bi bi-question-circle"
    }))
}

// Computed values - room extras
const extrasComputed = computed(() => normalizeExtras(store.extras))

// Fetch room data
onMounted(async () => {
  try {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/rooms/${store.roomId}`
    )

    if (!res.ok) throw new Error('Fehler beim Laden')

    const roomValue = await res.json()
    store.roomNumber = roomValue.roomNumber
    store.roomName = roomValue.roomName
    store.beds = roomValue.beds
    store.pricePerNight = roomValue.pricePerNight
    store.extras = roomValue.extras
  } catch (err) {
    console.error(err)
    error.value = 'Konnte das Zimmer nicht laden.'
  } finally {
    loading.value = false
  }
})
</script>