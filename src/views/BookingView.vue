<template>
  <b-container fluid class="my-5 pt-md-4 px-2 px-md-4" style="max-width: 900px;">
    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <b-spinner label="Loading..." />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center text-danger">
      <p>{{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else-if="room">
      <b-row class="justify-content-center flex-column">
        <!-- Room Card -->
        <b-card class="shadow-sm mb-4 p-0">
          <b-row no-gutters>
            <!-- Image -->
            <b-col cols="12" md="4">
              <b-card-img
                :src="`/images/rooms/${room.id}.jpg`"
                alt="Zimmerbild"
                class="h-100 w-100"
                style="object-fit: cover;"
              />
            </b-col>

            <!-- Details -->
            <b-col cols="12" md="8" class="p-3">
              <b-card-title>
                <strong>Zimmer {{ room.roomNumber }} – {{ room.roomName }}</strong>
              </b-card-title>

              <b-card-text class="mt-3">
                <strong>{{ room.beds }}</strong> Bett(en)<br />
                <strong>{{ room.pricePerNight }} €</strong> / Nacht

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
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>

        <!-- Booking -->
        <BookingForm />
        <BookingModal />
      </b-row>
    </div>
  </b-container>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BookingForm from '@/components/BookingForm.vue'
import BookingModal from '@/components/BookingModal.vue'
import { useRoomsStore } from '@/stores/rooms'
import { useBookingStore } from '@/stores/booking'

const route = useRoute()
const roomsStore = useRoomsStore()
const bookingStore = useBookingStore()

const loading = computed(() => roomsStore.loading)
const error = computed(() => roomsStore.error)

const roomId = Number(route.params.roomId)

const room = computed(() =>
  roomsStore.rooms.find(r => r.id === roomId)
)

onMounted(async () => {
  if (!roomsStore.rooms.length) {
    await roomsStore.fetchRooms()
  }

  const { from, to } = route.query
  if (from && to) {
    bookingStore.setDates(from, to)
  }

  if (room.value) {
    bookingStore.setRoom(room.value)
  }
})

watch(room, r => {
  if (r) bookingStore.setRoom(r)
})

</script>