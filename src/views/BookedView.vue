<template>
  <b-container class="mt-5 pt-5 mb-5">
    <div class="text-center">
      <h1>Buchung erfolgreich!</h1>

      <div v-if="booking">
        <p><strong>Name:</strong> {{ booking.firstname }} {{ booking.lastname }}</p>
        <p><strong>E-Mail:</strong> {{ booking.email }}</p>
        <p><strong>Geburtsdatum:</strong> {{ booking.dob }}</p>
        <p><strong>Zimmer:</strong> {{ booking.roomTitle }}</p>
        <p><strong>Zeitraum:</strong> {{ booking.from }} bis {{ booking.to }}</p>
        <p><strong>Frühstück:</strong> {{ booking.fruehstueck ? "Ja" : "Nein" }}</p>

        <p v-if="booking.bookingId">
          <strong>Buchungs-ID:</strong> {{ booking.bookingId }}
        </p>
      </div>

      <p class="lead">Vielen Dank für Ihre Buchung. Wir freuen uns, Sie bald bei uns begrüßen zu dürfen.</p>
      <b-button variant="primary" href="/">Zurück zur Startseite</b-button>
    </div>
  </b-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/bookingStore'

const router = useRouter()
const bookingStore = useBookingStore()

// Must be computed — otherwise it reads before store updates
const booking = computed(() => bookingStore.bookingData)

// If the user refreshes the page or comes directly → redirect
if (!booking.value) {
  router.push('/')
}
</script>

