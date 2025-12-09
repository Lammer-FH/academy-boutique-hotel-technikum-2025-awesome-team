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
          v-model="localDateFrom"
          class="w-100 w-sm-auto"
        />

        <span class="mx-sm-2">bis</span>

        <b-form-input
          type="date"
          v-model="localDateTo"
          class="w-100 w-sm-auto"
        />

        <!-- Validate button -->
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
      <!-- First Name -->
      <b-col cols="12" sm="6">
        <b-form-group
          label="Vorname"
          :state="firstNameError ? false : null"
          :invalid-feedback="firstNameError"
        >
          <b-form-input
            placeholder="Vorname"
            :value="firstName"
            @input="$emit('update:firstName', $event)"
            :state="firstNameError ? false : null"
            required
          />
        </b-form-group>
      </b-col>

      <!-- Last Name -->
      <b-col cols="12" sm="6">
        <b-form-group
          label="Nachname"
          :state="lastNameError ? false : null"
          :invalid-feedback="lastNameError"
        >
          <b-form-input
            placeholder="Nachname"
            :value="lastName"
            @input="$emit('update:lastName', $event)"
            :state="lastNameError ? false : null"
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <!-- Email -->
      <b-col cols="12" sm="6">
        <b-form-group
          label="E-Mail"
          :state="emailError ? false : null"
          :invalid-feedback="emailError"
        >
          <b-form-input
            placeholder="E-Mail"
            type="email"
            :value="email"
            @input="$emit('update:email', $event)"
            :state="emailError ? false : null"
            required
          />
        </b-form-group>
      </b-col>

      <!-- Date of Birth -->
      <b-col cols="12" sm="6">
        <b-form-group label="Geburtsdatum">
          <b-form-input
            type="date"
            :value="dob"
            @input="$emit('update:dob', $event)"
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Breakfast Option -->
    <b-form-group label="Frühstück">
      <div class="d-flex gap-3">
        <b-form-radio
          :checked="fruehstueck"
          @change="$emit('update:fruehstueck', true)"
        >
          Ja
        </b-form-radio>

        <b-form-radio
          :checked="!fruehstueck"
          @change="$emit('update:fruehstueck', false)"
        >
          Nein
        </b-form-radio>
      </div>
    </b-form-group>
  </b-form>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  fruehstueck: Boolean,
  dateFrom: String,
  dateTo: String,
  roomId: String
})

const emit = defineEmits([
  "update:firstName",
  "update:lastName",
  "update:email",
  "update:dob",
  "update:fruehstueck",
  "update:dateFrom",
  "update:dateTo"
])

const router = useRouter()

// Local reactive dates
const localDateFrom = ref(props.dateFrom)
const localDateTo = ref(props.dateTo)

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

// Sync parent -> local
watch(() => props.dateFrom, val => localDateFrom.value = val)
watch(() => props.dateTo, val => localDateTo.value = val)

// API call
async function isRoomAvailable(from, to) {
  try {
    const url = `https://boutique-hotel.helmuth-lammer.at/api/v1/room/${props.roomId}/from/${from}/to/${to}`
    const res = await fetch(url)
    const data = await res.json()
    return data.available
  } catch (err) {
    console.error("Fehler beim Prüfen der Verfügbarkeit", err)
    return false
  }
}

// Button-based validation for dates
async function validateDates() {
  const from = localDateFrom.value
  const to = localDateTo.value

  if (!from || !to) {
    showAlert("Bitte beide Daten auswählen.")
    return
  }

  if (from > to) {
    showAlert("Anreisedatum darf NICHT nach dem Abreisedatum liegen.")
    return
  }

  const available = await isRoomAvailable(from, to)
  if (!available) {
    showAlert("Zimmer ist in diesem Zeitraum NICHT verfügbar.")
    return
  }

  emit("update:dateFrom", from)
  emit("update:dateTo", to)
  updateUrl()
  showAlert("Zimmer ist in diesem Zeitraum VERFÜGBAR!")
}

function updateUrl() {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      from: localDateFrom.value,
      to: localDateTo.value
    }
  })
}

// FORM VALIDATION

const emailError = ref("")
const firstNameError = ref("")
const lastNameError = ref("")

function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value)
}

// Watchers for real-time validation
watch(() => props.email, val => {
  if (!val) emailError.value = "E-Mail ist erforderlich."
  else if (!validateEmail(val)) emailError.value = "Bitte eine gültige E-Mail-Adresse eingeben."
  else emailError.value = ""
})

watch(() => props.firstName, val => {
  firstNameError.value = val ? "" : "Vorname ist erforderlich."
})

watch(() => props.lastName, val => {
  lastNameError.value = val ? "" : "Nachname ist erforderlich."
})
</script>

<style>
/* Styling for form inputs and radios */
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
