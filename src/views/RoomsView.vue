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

  <div class="primary-bar d-flex flex-wrap justify-content-center align-items-center gap-3 py-3 mb-4">
    <b-button variant="primary" class="check-btn" @click="checkAllAvailability">
      Verfügbarkeit prüfen
    </b-button>

    <b-pagination
      v-model="currentPage"
      :total-rows="rooms.length"
      :per-page="perPage"
      size="sm"
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
          class="h-100 shadow-sm"
          :title="`Zimmer ${room.roomsNumber} – ${room.roomsName}`"
        >
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
          <div v-if="availability[room.id] !== undefined" class="mt-3">
            <span
              v-if="availability[room.id]"
              class="badge bg-success"
            >
              Verfügbar
            </span>
            <span
              v-else
              class="badge bg-danger"
            >
              Belegt
            </span>
          </div>

          <!-- Button -->
            <div v-if="fromDate && toDate && availability[room.id] !== false">
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
  <b-button variant="primary" class="mt-3 w-100" disabled>
    Jetzt buchen
  </b-button>
</div>
        </b-card>
      </b-col>
    </b-row>
            </b-container>
</template>


<script setup>
import { ref, computed, onMounted } from "vue"

const rooms = ref([])
const fromDate = ref(null)
const toDate = ref(null)
const availability = ref({})
const currentPage = ref(1)
const perPage = 5


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
  const res = await fetch("https://boutique-hotel.helmuth-lammer.at/api/v1/rooms")
  rooms.value = await res.json()
})

//Verfügbarkeit prüfen
const checkAllAvailability = async () => {
  if (!fromDate.value || !toDate.value) {
    alert("Bitte An- und Abreisedatum wählen!")
    return
  }

  const formattedFrom = formatDate(fromDate.value)
  const formattedTo = formatDate(toDate.value)

  for (const room of rooms.value) {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${room.id}/from/${formattedFrom}/to/${formattedTo}`
    )
    const data = await res.json()
    availability.value[room.id] = data.available
  }
}

//Datumsformat anpassen (11-11-25)
const formatDate = (date) => {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = String(d.getFullYear()).slice(-2)
  return `${day}-${month}-${year}`
}

</script>
