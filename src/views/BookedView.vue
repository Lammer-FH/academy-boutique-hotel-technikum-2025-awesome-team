<template>
  <b-container class="my-5">
    <div class="text-center">
      <h1>Buchung erfolgreich!</h1>
      <div>
          <p><strong>Name:</strong> {{ firstName }} {{ lastName }}</p>
          <p><strong>E-Mail:</strong> {{ email }}</p>
          <p><strong>Geburtsdatum:</strong> {{ dob }}</p>
          <p><strong>Zimmer:</strong> {{ roomTitle }}</p>
          <p><strong>Zeitraum:</strong> {{ fromDate }} bis {{ toDate }}</p>
          <p><strong>Frühstück: </strong>{{ fruehstueck}}</p>
          <p v-if="bookingId"><strong>Buchungs-ID:</strong> {{ bookingId }}</p>
      </div>
      <p class="lead">Vielen Dank für Ihre Buchung. Wir freuen uns, Sie bald bei uns begrüßen zu dürfen.</p>
      <b-button variant="primary" href="/">Zurück zur Startseite</b-button>
    </div>
  </b-container>
  </template>

  <script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const bookingId = route.query.bookingId
const firstName = route.query.firstname
const lastName = route.query.lastname
const roomTitle = route.query.roomTitle
const fromDate = route.query.from
const toDate = route.query.to
</script>
  