<template>
  <b-container fluid class="py-5 mt-4">

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
      <b-row class="justify-content-center">
        <b-col cols="12" style="max-width: 900px;">

          <!-- Room Card -->
          <b-card class="shadow-sm">
            <b-row no-gutters>

              <!-- Left Image -->
              <b-col cols="4">
                <b-card-img
                  :src="`/images/rooms/${room.id}.jpg`"
                  alt="Zimmerbild"
                  class="h-100"
                />
              </b-col>

              <!-- Room Details -->
              <b-col cols="8" class="p-3">
                <b-card-title>{{ roomTitle }}</b-card-title>

                <b-card-text class="mt-3">
                  <strong>{{ room.beds }}</strong> Bett(en)<br>
                  <strong>{{ room.pricePerNight }} €</strong> / Nacht

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
          <div class="mt-4">
            <p>Ausgewählter Zeitraum:
             
              <strong>{{ fromDate }}</strong> bis
              <strong>{{ toDate }}</strong>
            </p>

<BookingForm
  v-model:firstName="firstName"
  v-model:lastName="lastName"
  v-model:email="email"
  v-model:dob="dob"
  v-model:fruehstueck="fruehstueck"
/>
<BookingModal
 v-model:firstName="firstName"
  v-model:lastName="lastName"
  v-model:email="email"
  v-model:dob="dob"
  v-model:fruehstueck="fruehstueck"
  v-model:roomTitle="roomTitle"
  v-model:fromDate="fromDate"
    v-model:toDate="toDate"
    v-model:roomId="roomId"
/>
          </div>
        </b-col>
      </b-row>
    </div>
    
  </b-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import BookingForm from '../components/BookingForm.vue'
import BookingModal from '../components/BookingModal.vue'


const route = useRoute()

const roomId = route.params.roomId
const fromDate = route.query.from || ''
const toDate = route.query.to || ''

const room = ref(null)
const loading = ref(true)
const error = ref(null)

const firstName = ref("")
const lastName = ref("")
const email = ref("")
const dob = ref("")
const fruehstueck = ref(false)

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


// Computed values
const roomTitle = computed(() =>
  room.value
    ? `Zimmer ${room.value.roomNumber} – ${room.value.roomName}`
    : ''
)

const extrasComputed = computed(() =>
  room.value ? normalizeExtras(room.value.extras) : []
)

// Fetch room data
onMounted(async () => {
  try {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/rooms/${roomId}`
    )

    if (!res.ok) throw new Error('Fehler beim Laden')

    room.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Konnte das Zimmer nicht laden.'
  } finally {
    loading.value = false
  }
})
</script>