<template>
  <b-col class="text-end">
    <b-button variant="primary" :disabled="!canBook" @click="openModal">
      Zimmer buchen
    </b-button>
  </b-col>

  <div ref="booking-modal" class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-light">
          <h1 class="display-6 text-gradient">Buchung bestätigen</h1>
          <button class="btn-close" @click="closeModal" />
        </div>

        <div class="modal-body">
            <!-- Guest details-->
          <p><b>Name:</b> {{ store.firstName }} {{ store.lastName }}</p>
          <p><b>E-Mail:</b> {{ store.email }}</p>
          <p><b>Geburtsdatum:</b> {{ store.formatDate(store.dob) }}</p><br>
<!-- Room details-->
          <p><b>Zimmer:</b> {{ store.roomNumber }} – {{ store.roomName }}</p>
                    <p><b>Bett(en):</b> {{ store.beds }}</p>
          <p><b>Zeitraum:</b> {{ store.formatDate(store.fromDate) }} – {{ store.formatDate(store.toDate) }}</p>
           <p><b>Frühstück:</b> {{ store.fruehstueck ? 'Ja' : 'Nein' }}</p><br>
          <p class="fs-5"><b>Gesamtpreis:</b> {{ store.totalPrice }} €</p>
        </div>

        <div class="modal-footer">
          <b-button variant="secondary" @click="closeModal">Zurück</b-button>
          <b-button variant="primary" @click="submitBooking">Bestätigen</b-button>
        </div>
      </div>
    </div>
  </div>

  <b-modal v-model="showAlert" title="Fehler" hide-footer>
    <p>{{ alertMessage }}</p>
    <b-button variant="primary" @click="showAlert = false">OK</b-button>
  </b-modal>
</template>

<script setup>
import { computed, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import * as bootstrap from 'bootstrap'
import { useBookingStore } from '@/stores/booking'

const store = useBookingStore()
const router = useRouter()

const bookingModal = useTemplateRef('booking-modal')
const showAlert = ref(false)
const alertMessage = ref('')

const canBook = computed(() =>
  store.firstName && store.lastName && store.email && store.dob
)

function openModal() {
  bootstrap.Modal.getOrCreateInstance(bookingModal.value).show()
}

function closeModal() {
  bootstrap.Modal.getOrCreateInstance(bookingModal.value).hide()
}

async function submitBooking() {
  try {
    const id = await store.submitBooking()
    closeModal()
    router.push({ name: 'booked', params: { id }, query: { new: true } })
  } catch {
    alertMessage.value = 'Fehler bei der Buchung.'
    showAlert.value = true
  }
}
</script>
