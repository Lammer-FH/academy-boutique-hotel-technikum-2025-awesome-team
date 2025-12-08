<template>
  <button type="button" class="btn btn-primary" @click="openModal" :disabled="!canBook">
    Zimmer buchen
  </button>

  <div ref="booking-modal" class="modal fade" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Buchung bestätigen</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p><strong>Name:</strong> {{ firstName }} {{ lastName }}</p>
          <p><strong>E-Mail:</strong> {{ email }}</p>
          <p><strong>Geburtsdatum:</strong> {{ dob }}</p>
          <p><strong>Zimmer:</strong> {{ roomTitle }}</p>
          <p><strong>Zeitraum:</strong> {{ fromDate }} bis {{ toDate }}</p>
          <p><strong>Frühstück: </strong>{{ fruehstueck ? 'Ja' : 'Nein' }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Daten ändern</button>
          <button type="button" class="btn btn-primary" @click="submitBooking">Buchung bestätigen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, useTemplateRef } from 'vue'
import { useRouter} from 'vue-router'
import * as bootstrap from 'bootstrap';

const router = useRouter()

const props = defineProps({
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  fruehstueck: Boolean,
  roomTitle: String,
  fromDate: String,
  toDate: String,
  roomId: String
})

const bookingId = ref(null)
const error = ref(null)

const bookingModal = useTemplateRef('booking-modal');

const openModal = () => {
    const modal = bootstrap.Modal.getOrCreateInstance(bookingModal.value);
    modal.show();
};

const closeModal = () => {
    const modal = bootstrap.Modal.getOrCreateInstance(bookingModal.value);
    modal.hide();
};

const submitBooking = async () => {
  const available = await isRoomAvailable()

  if (!available) {
    alert("Das ausgewählte Zimmer ist im gewählten Zeitraum nicht verfügbar. Bitte wählen Sie andere Daten.")
    return
  }

  console.log("Zimmer ist verfügbar, sende Buchung...")

  try {
    const res = await fetch(
      `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${props.roomId}/from/${props.fromDate}/to/${props.toDate}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: props.firstName,
          lastname: props.lastName,
          email: props.email,
          birthdate: props.dob
        })
      }
    )

    if (!res.ok) throw new Error('Fehler beim Absenden der Buchung')

    const data = await res.json()
    bookingId.value = data.id
    console.log('Buchung erfolgreich, ID:', bookingId.value)

    closeModal()

    // 🔥 Clean redirect (no long query string)
    router.push({ name: 'booked', params: { id: data.id }, query: { new: true } })
  } catch (err) {
    console.error(err)
    error.value = 'Fehler bei der Buchung. Bitte versuchen Sie es erneut.'
  }
}


const canBook = computed(() => {
  return props.firstName && props.lastName && props.email && props.dob
})

// Check room availability
async function isRoomAvailable() {
  try {
    const url = `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${props.roomId}/from/${props.fromDate}/to/${props.toDate}`
    const res = await fetch(url)
    const data = await res.json()
    return data.available
  } catch (err) {
    console.error("Fehler beim Prüfen der Verfügbarkeit", err)
    return false
  }
}
</script>
