<template>
    <b-col class="d-flex align-items-right justify-content-end mt-3">
  <button type="button" class="btn btn-primary" @click="openModal" :disabled="!canBook">
    Zimmer buchen
  </button>
</b-col>

  <!-- Booking Confirmation Modal -->
  <div ref="booking-modal" class="modal fade" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Buchung bestätigen</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p><strong>Name:</strong> {{ store.firstName }} {{ store.lastName }}</p>
          <p><strong>E-Mail:</strong> {{ store.email }}</p>
          <p><strong>Geburtsdatum:</strong> {{ store.dob }}</p>
          <p><strong>Zimmer:</strong> {{store.roomNumber}} – {{store.roomName}}</p>
          <p><strong>Zeitraum:</strong> {{store.fromDate }} bis {{ store.toDate }}</p>
          <p><strong>Frühstück: </strong>{{ store.fruehstueck ? 'Ja' : 'Nein' }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Daten ändern</button>
          <button type="button" class="btn btn-primary" @click="submitBooking">Buchung bestätigen</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Alert Modal -->
  <b-modal v-model="showAlertModal" title="Hinweis" hide-footer>
    <p>{{ alertMessage }}</p>
    <b-button variant="primary" @click="closeAlert">OK</b-button>
  </b-modal>
</template>

<script setup>
import { ref, computed, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import * as bootstrap from 'bootstrap'
import { useBookingStore } from '../stores/booking'

const router = useRouter()
const store = useBookingStore()

const bookingId = ref(null)
const error = ref(null)

// Booking modal reference
const bookingModal = useTemplateRef('booking-modal')

const openModal = () => {
  const modal = bootstrap.Modal.getOrCreateInstance(bookingModal.value)
  modal.show()
}

const closeModal = () => {
  const modal = bootstrap.Modal.getOrCreateInstance(bookingModal.value)
  modal.hide()
}

// Alert modal state
const showAlertModal = ref(false)
const alertMessage = ref("")

function showAlert(message) {
  alertMessage.value = message
  showAlertModal.value = true
}

function closeAlert() {
  showAlertModal.value = false
}

const submitBooking = async () => {
  const available = await isRoomAvailable()

  if (!available) {
    showAlert("Das ausgewählte Zimmer ist im gewählten Zeitraum nicht verfügbar. Bitte wählen Sie andere Daten.")
    return
  }

  console.log("Zimmer ist verfügbar, sende Buchung...")

  try {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${store.roomId}/from/${store.fromDate}/to/${store.toDate}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: store.firstName,
          lastname: store.lastName,
          email: store.email,
          birthdate: store.dob
        })
      }
    )

    if (!res.ok) throw new Error('Fehler beim Absenden der Buchung')

    const data = await res.json()
    bookingId.value = data.id
    console.log('Buchung erfolgreich, ID:', bookingId.value)
    closeModal()
    router.push({ name: 'booked', params: { id: data.id }, query: { new: true } })
  } catch (err) {
    console.error(err)
    showAlert('Fehler bei der Buchung. Bitte versuchen Sie es erneut.')
  }
}

const canBook = computed(() => {
  return store.firstName && store.lastName && store.email && store.dob
})

// Check room availability
async function isRoomAvailable() {
  try {
    const url = `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${store.roomId}/from/${store.fromDate}/to/${store.toDate}`
    const res = await fetch(url)
    const data = await res.json()
    return data.available
  } catch (err) {
    console.error("Fehler beim Prüfen der Verfügbarkeit", err)
    return false
  }
}
</script>