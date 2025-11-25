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

    <!-- Room Info & Booking Form -->
    <div v-else-if="room">
      <b-row class="justify-content-center mt-4">
        <b-col cols="12" style="max-width: 900px;">
          <b-card
            class="h-100 shadow-sm"
            :title="`Zimmer ${room.roomNumber} – ${room.roomName}`"
          >
            <!-- Room Image -->
            <b-card-img
              :src="`/images/rooms/${room.id}.jpg`"
              alt="Zimmerbild"
              class="room-image"
            />

            <!-- Price & Beds -->
            <b-card-text class="mt-3">
              <strong>{{ room.bed }}</strong> Bett(en) <br />
              <strong>{{ room.pricePerNight }} €</strong> / Nacht
            </b-card-text>

            <!-- Extras -->
            <div class="d-flex flex-wrap gap-2 mt-2">
              <span
                v-for="(extra, index) in roomExtras(room.extras)"
                :key="index"
                class="d-flex align-items-center gap-1 text-secondary"
              >
                <i :class="extra.icon"></i>
                {{ extra.label }}
              </span>
            </div>

            <!-- Booking Form -->
            <div class="mt-4">
              <p>
                Möchten Sie das Zimmer von <strong>{{ fromDate }}</strong> bis <strong>{{ toDate }}</strong> buchen? Bitte geben Sie Ihre Daten ein:
              </p>

              <b-form @submit.prevent="submitBooking">
                <b-form-group label="Vorname:" label-for="first-name">
                  <b-form-input
                    id="first-name"
                    v-model="firstName"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Nachname:" label-for="last-name">
                  <b-form-input
                    id="last-name"
                    v-model="lastName"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="E-Mail:" label-for="email">
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group label="Geburtsdatum:" label-for="dob">
                  <b-form-input
                    id="dob"
                    type="date"
                    v-model="dob"
                    required
                  ></b-form-input>
                </b-form-group>

                <!-- Submit Button -->
                <div class="text-center mt-4">
                  <b-button
                    type="submit"
                    variant="primary"
                    class="btn flex-fill flex-md-grow-0"
                    :disabled="posting"
                  >
                    {{ posting ? 'Buchung läuft...' : 'Zimmer buchen' }}
                  </b-button>
                </div>
              </b-form>
            </div>

          </b-card>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const roomId = route.params.roomId
const fromDate = route.query.from || ''
const toDate = route.query.to || ''

const room = ref(null)
const loading = ref(true)
const error = ref(null)
const posting = ref(false) // for POST request state

// Form fields
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const dob = ref('')

// Icons mapping
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

// Process extras
const roomExtras = (extras) => {
  if (!Array.isArray(extras)) return []
  return extras.map(e => ({
    label: e.name,
    icon: icons[e.name] || "bi bi-question-circle"
  }))
}

// Fetch room data
onMounted(async () => {
  try {
    const res = await fetch(`https://boutique-hotel.helmuth-lammer.at/api/v1/rooms/${roomId}`)
    if (!res.ok) throw new Error('Failed to fetch room')
    room.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Konnte das Zimmer nicht laden.'
  } finally {
    loading.value = false
  }
})

// Submit booking
const submitBooking = async () => {
  if (!fromDate || !toDate) {
    alert("Bitte wählen Sie An- und Abreisedatum!")
    return
  }

  posting.value = true
  try {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${roomId}/from/${fromDate}/to/${toDate}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          birthdate: dob.value
        })
      }
    )

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.message || 'Buchung fehlgeschlagen')
    }
    const data = await res.json()
    alert('Buchung war erfolgreich! Buchungsnummer: ' + data.id)
    router.push('/booked')
  } catch (err) {
    console.error(err)
    alert('Buchung war nicht erfolgreich: ' + err.message)
  } finally {
    posting.value = false
  }
}
</script>

<style scoped>
.room-image {
  max-height: 300px;
  object-fit: cover;
  width: 100%;
}
</style>
