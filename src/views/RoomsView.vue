<template>
  <b-container class="rooms-view mt-2 mb-5">
    <div class="text-center fade-in">
    <h1 class="display-5 font-weight-bold text-gradient">Unsere Zimmer</h1>
    <p>Wählen Sie hier Ihre Ruhestätte...</p>
</div>
    <!-- Date Picker -->
    <b-row class="mb-4 justify-content-center">
      <b-col cols="12" md="3">
        <label class="form-label">Anreise</label>
        <b-form-input type="date" v-model="fromDate" />
      </b-col>

      <b-col cols="12" md="3">
        <label class="form-label">Abreise</label>
        <b-form-input type="date" v-model="toDate" />
      </b-col>
    </b-row>

    <!-- Actions -->
    <div class="primary-bar d-flex flex-column align-items-center pt-3 gap-2 mb-3">
      <b-button variant="primary" @click="checkAllAvailability">
        Verfügbarkeit prüfen
      </b-button>

      <b-pagination
        v-model="currentPage"
        :total-rows="rooms.length"
        :per-page="perPage"
        size="sm"
      />
    </div>

    <!-- Room List -->
    <b-row class="g-4 justify-content-center">
      <b-col
        v-for="room in paginatedRooms"
        :key="room.id"
        cols="12"
        md="6"
        lg="4"
      >
        <b-card class="room-card h-100 shadow-sm d-flex flex-column">
          <!-- Image -->
          <b-card-img
            :src="`/images/rooms/${room.id}.jpg`"
            alt="Zimmerbild"
            class="room-image"
          />

          <!-- Content -->
          <div class="flex-grow-1 p-3">
            <h5>Zimmer {{ room.roomNumber }} – {{ room.roomName }}</h5>

            <p class="mb-2">
              <strong>{{ room.beds }}</strong> Bett(en)<br />
              <strong>{{ room.pricePerNight }} €</strong> / Nacht
            </p>

            <!-- Extras -->
            <div class="d-flex flex-wrap gap-2 mt-2">
              <span
                v-for="extra in room.extras"
                :key="extra.key"
                class="d-flex align-items-center gap-1 text-secondary"
              >
                <i :class="extra.icon"></i>
                {{ extra.label }}
              </span>
            </div>

            <!-- Availability -->
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
              <span v-else class="badge bg-secondary">
                Noch nicht geprüft
              </span>
            </div>
          </div>

          <!-- Action -->
          <div class="p-3 pt-0">
            <router-link
              v-if="fromDate && toDate && availability[room.id] === true"
              :to="{
                path: `/booking/${room.id}`,
                query: { from: fromDate, to: toDate }
              }"
            >
              <b-button variant="primary" class="w-100">
                Jetzt buchen
              </b-button>
            </router-link>

            <b-button
              v-else
              variant="primary"
              class="w-100"
              disabled
            >
              Jetzt buchen
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!-- Modal -->
    <b-modal
      v-model="dateErrorModalVisible"
      title="Achtung"
      ok-title="OK"
      centered
    >
      Bitte An- und Abreisedatum wählen!
    </b-modal>
  </b-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoomsStore } from '@/stores/rooms'

const roomsStore = useRoomsStore()

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const fromDate = ref(today.toISOString().slice(0, 10))
const toDate = ref(tomorrow.toISOString().slice(0, 10))

const currentPage = ref(1)
const perPage = 5
const dateErrorModalVisible = ref(false)

const rooms = computed(() => roomsStore.rooms)
const availability = computed(() => roomsStore.availability)

const paginatedRooms = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return rooms.value.slice(start, start + perPage)
})

const checkAllAvailability = () => {
  if (!fromDate.value || !toDate.value) {
    dateErrorModalVisible.value = true
    return
  }
  roomsStore.checkAvailability(fromDate.value, toDate.value)
}

onMounted(() => {
  roomsStore.fetchRooms()
})
</script>

<style scoped>
.room-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.room-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
}

.primary-bar {
  background-color: var(--color-primary1);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>