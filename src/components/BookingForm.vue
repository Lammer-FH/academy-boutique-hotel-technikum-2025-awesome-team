<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const store = useBookingStore()
const router = useRouter()

const showModal = ref(false)
const modalMessage = ref('')

function showAlert(msg) {
  modalMessage.value = msg
  showModal.value = true
}

async function validateDates() {
  if (!store.fromDate || !store.toDate) {
    showAlert('Bitte beide Daten auswählen.')
    return
  }

  if (store.fromDate > store.toDate) {
    showAlert('Anreisedatum darf nicht nach dem Abreisedatum liegen.')
    return
  }

  const available = await store.checkAvailability()
  if (!available) {
    showAlert('Zimmer ist in diesem Zeitraum nicht verfügbar.')
    return
  }

  router.replace({
    query: {
      ...router.currentRoute.value.query,
      from: store.fromDate,
      to: store.toDate
    }
  })

  showAlert('Zimmer ist in diesem Zeitraum verfügbar!')
}
</script>

<template>
  <b-form>
    <b-modal v-model="showModal" title="Hinweis" hide-footer>
      <p>{{ modalMessage }}</p>
      <b-button variant="primary" @click="showModal = false">OK</b-button>
    </b-modal>

    <b-form-group label="Ausgewählter Zeitraum">
  <div class="d-flex flex-column flex-sm-row align-items-sm-center gap-2">
    <b-form-input type="date" v-model="store.fromDate" />
    <span class="d-none d-sm-inline">bis</span>
    <b-form-input type="date" v-model="store.toDate" />
    <b-button variant="primary" @click="validateDates">Prüfen</b-button>
  </div>
</b-form-group>

 <div class="row g-2">
    <div class="col-12 col-sm-6">
      <b-form-group label="Vorname">
        <b-form-input v-model="store.firstName" />
      </b-form-group>
    </div>

    <div class="col-12 col-sm-6">
      <b-form-group label="Nachname">
        <b-form-input v-model="store.lastName" />
      </b-form-group>
    </div>
  </div>

<div class="row g-2">
    <div class="col-12 col-sm-6">
    <b-form-group label="E-Mail">
      <b-form-input type="email" v-model="store.email" />
    </b-form-group>
</div>

    <div class="col-12 col-sm-6">
    <b-form-group label="Geburtsdatum">
      <b-form-input type="date" v-model="store.dob" />
    </b-form-group>
</div>
</div>

    <b-form-group label="Frühstück">
        <div class="d-flex align-items-start gap-4">
      <b-form-radio v-model="store.fruehstueck" :value="true">Ja</b-form-radio>
      <b-form-radio v-model="store.fruehstueck" :value="false">Nein</b-form-radio>
      </div>
    </b-form-group>
  </b-form>
</template>