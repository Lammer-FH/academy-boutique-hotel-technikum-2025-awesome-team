<template>
  <b-form>
    <!-- Alert Modal -->
    <b-modal v-model="showModal" title="Hinweis" hide-footer>
      <p>{{ modalMessage }}</p>
      <b-button variant="primary" @click="closeModal">OK</b-button>
    </b-modal>

    <!-- Booking Dates -->
    <b-form-group label="Ausgewählter Zeitraum">
      <div class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
        <b-form-input
          type="date"
          v-model="store.fromDate"
          class="w-100 w-sm-auto"
        />

        <span class="mx-sm-2">bis</span>

        <b-form-input
          type="date"
          v-model="store.toDate"
          class="w-100 w-sm-auto"
        />

        <b-button 
          variant="primary" 
          @click="validateDates"
          class="w-100 w-sm-auto"
        >
          Prüfen
        </b-button>
      </div>
    </b-form-group>

    <b-row>
      <b-col cols="12" sm="6">
        <b-form-group
          label="Vorname"
          :state="firstNameError ? false : null"
          :invalid-feedback="firstNameError"
        >
          <b-form-input
            placeholder="Vorname"
            v-model="store.firstName"
            :state="firstNameError ? false : null"
            required
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="6">
        <b-form-group
          label="Nachname"
          :state="lastNameError ? false : null"
          :invalid-feedback="lastNameError"
        >
          <b-form-input
            placeholder="Nachname"
            v-model="store.lastName"
            :state="lastNameError ? false : null"
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" sm="6">
        <b-form-group
          label="E-Mail"
          :state="emailError ? false : null"
          :invalid-feedback="emailError"
        >
          <b-form-input
            placeholder="E-Mail"
            type="email"
            v-model="store.email"
            :state="emailError ? false : null"
            required
          />
        </b-form-group>
      </b-col>

      <b-col cols="12" sm="6">
        <b-form-group label="Geburtsdatum">
          <b-form-input
            type="date"
            v-model="store.dob"
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group label="Frühstück">
      <div class="d-flex gap-3">
        <b-form-radio v-model="store.fruehstueck" :value="true">Ja</b-form-radio>
        <b-form-radio v-model="store.fruehstueck" :value="false">Nein</b-form-radio>
      </div>
    </b-form-group>
  </b-form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/booking'
import { useAuthStore } from '@/stores/auth'

const store = useBookingStore()
const auth = useAuthStore()
const router = useRouter()

/**
 * AUTO-FILL USER DATA AFTER LOGIN / REGISTRATION
 */
onMounted(() => {
  if (auth.isAuthenticated && auth.user) {
    store.firstName = auth.user.firstname
    store.lastName = auth.user.lastname
    store.email = auth.user.email
  }
})


// Modal state
const showModal = ref(false)
const modalMessage = ref("")

function showAlert(message) {
  modalMessage.value = message
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

// Button-based validation for dates
async function validateDates() {
  if (!store.fromDate || !store.toDate) {
    showAlert("Bitte beide Daten auswählen.")
    return
  }

  if (store.fromDate > store.toDate) {
    showAlert("Anreisedatum darf NICHT nach dem Abreisedatum liegen.")
    return
  }

  const available = await store.checkAvailability()
  if (!available) {
    showAlert("Zimmer ist in diesem Zeitraum NICHT verfügbar.")
    return
  }

  updateUrl()
  showAlert("Zimmer ist in diesem Zeitraum VERFÜGBAR!")
}

function updateUrl() {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      from: store.fromDate,
      to: store.toDate
    }
  })
}

// Validation
const emailError = ref("")
const firstNameError = ref("")
const lastNameError = ref("")

function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value)
}

watch(() => store.email, val => {
  if (!val) emailError.value = "E-Mail ist erforderlich."
  else if (!validateEmail(val)) emailError.value = "Bitte eine gültige E-Mail-Adresse eingeben."
  else emailError.value = ""
})

watch(() => store.firstName, val => {
  firstNameError.value = val ? "" : "Vorname ist erforderlich."
})

watch(() => store.lastName, val => {
  lastNameError.value = val ? "" : "Nachname ist erforderlich."
})
</script>

<style>
.form-check-input:checked{
  background-color: var(--color-primary);
  border-color: var(--color-secondary);
}
.form-check-input:focus-within{
  box-shadow: none
}
.form-control:focus{
  box-shadow: none;
  border-color: var(--color-secondary);
}
</style>
