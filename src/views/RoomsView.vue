<template>
  <b-container class="rooms-view mt-120 mb-5">
    <h2 class="text-center mb-4">Unsere Zimmer</h2>

    <p>Wählen Sie hier Ihre Ruhestätte...</p>

     <b-row class="mb-4 justify-content-center">
    <b-col cols="12" md="3">
      <label for="fromDate" class="form-label">Anreise</label>
      <b-form-input
        id="fromDate"
        type="date"
        v-model="fromDate"
        class="mb-3"
      />
    </b-col>

    <b-col cols="12" md="3">
      <label for="toDate" class="form-label">Abreise</label>
      <b-form-input
        id="toDate"
        type="date"
        v-model="toDate"
        class="mb-3"
      />
    </b-col>
  </b-row>

  <div class="primary-bar d-flex flex-column justify-content-center align-items-center gap-3 py-3 mb-4">
    <b-button variant="primary" class="check-btn" @click="checkAllAvailability">
      Verfügbarkeit prüfen
    </b-button>

    <b-pagination
      v-model="currentPage"
      :total-rows="rooms.length"
      :per-page="perPage"
      size="sm"
      class="pagination"
    />
  </div>

<!-- Zimmerliste -->
    <b-row class="g-4 justify-content-center">
      <b-col
        v-for="room in paginatedRooms"
        :key="room.id"
        cols="12"
        md="6"
        lg="4"
      >
        <b-card
          class="h-100 shadow-sm room-card"
          :title="`Zimmer ${room.roomsNumber} – ${room.roomsName}`"
        >
        <div class="room-content">
          <!-- Zimmerbild -->
          <b-card-img
            :src="`/images/rooms/${room.id}.jpg`"
            alt="Zimmerbild"
            class="room-image"
          />

          <!-- Preis & Betten, <1: Bett, >1 Betten? -->
          <b-card-text class="mt-3">
            <strong>{{ room.beds }}</strong> Bett(en) <br />
            <strong>{{ room.pricePerNight }} €</strong> / Nacht
          </b-card-text>

          <!-- Extras mit Icons -->
          <div class="d-flex flex-wrap gap-2 mt-2">
            <span
              v-for="(extra, index) in roomExtras(room)"
              :key="index"
              class="d-flex align-items-center gap-1 text-secondary"
            >
              <i :class="extra.icon"></i>
              {{ extra.label }}
            </span>
          </div>

          <!-- Verfügbarkeit -->
          <div class="mt-3">
    <span
    v-if="availability[room.id] === true"
    class="badge bg-success"
  >
    Verfügbar
  </span>

  <span
    v-else-if="availability[room.id] === false"
    class="badge bg-danger"
  >
    Belegt
  </span>

  <span
    v-else
    class="badge bg-secondary"
  >
    Noch nicht geprüft
  </span>
          </div> </div>
          <!-- Button -->
         <div class="room-button">
  <div v-if="fromDate && toDate && availability[room.id] === true">
    <router-link
      :to="{
        path: `/booking/${room.id}`,
        query: { from: fromDate, to: toDate }
      }"
    >
      <b-button
        variant="primary"
        class="mt-3 w-100"
        @click="handleBooking(room.id, availability[room.id])"
      >
        Jetzt buchen
      </b-button>
    </router-link>
  </div>

  <div v-else>
    <b-button variant="primary" class="mt-3 w-100 btn-disabled" disabled>
      Jetzt buchen
    </b-button>
  </div>
</div>
        </b-card>
      </b-col>
    </b-row>
            </b-container>
    <b-modal
    v-model="dateErrorModalVisible"
    title="Achtung"
    ok-title="OK"
    ok-variant="primary"
    centered
  >
    Bitte An- und Abreisedatum wählen!
  </b-modal>

</template>


<script setup>
import { ref, computed, onMounted } from "vue"
import axios from "axios"

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const rooms = ref([])
const fromDate = ref(today.toISOString().substr(0, 10))
const toDate = ref(tomorrow.toISOString().substr(0, 10))
const availability = ref({})
const currentPage = ref(1)
const perPage = 5

const dateErrorModalVisible = ref(false)

//5 Zi pro Seite
const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return rooms.value.slice(start, start + perPage)
})

//Icons für Extras
const roomExtras = (room) => {
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

  return room.extras
    .filter((e) => Object.values(e)[0] === 1)
    .map((e) => {
      const key = Object.keys(e)[0]
      return { label: key, icon: icons[key] || "bi bi-question-circle" }
    })
}

//Daten vom Server laden
onMounted(async () => {
  try {
    const { data } = await axios.get(`https://boutique-hotel.helmuth-lammer.at/api/v1/rooms`)
    const uniqueRooms = [
      ...new Map(data.map(room => [room.id, room])).values()
    ]
    uniqueRooms.forEach(room => {
      
      const seen = new Set()
      const filtered = []

      for (const extra of room.extras) {
        const key = Object.keys(extra)[0] 
        if (!seen.has(key)) {
          seen.add(key)
          filtered.push(extra)
        }
      }
      room.extras = filtered
    })
    rooms.value = uniqueRooms
  } catch (error) {
    console.error("Fehler beim Laden der Zimmer:", error)
  }
})

//Verfügbarkeit prüfen
const checkAllAvailability = async () => {
  if (!fromDate.value || !toDate.value) {
    dateErrorModalVisible.value = true
    return
  }

for (const room of rooms.value) {
  const roomId = Number(room.id)

  try {
    const { data } = await axios.get(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${room.id}/from/${fromDate.value}/to/${toDate.value}`
    )

    availability.value[roomId] = data.available === true
      ? true
      : data.available === false
        ? false
        : undefined

  } catch (error) {
    console.error(`Fehler beim Laden für Room ${roomId}:`, error)
  }
}
}
</script>
