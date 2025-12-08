<template>
  <b-form>
    <!-- Alert Modal -->
    <b-modal v-model="showModal" title="Hinweis" hide-footer>
      <p>{{ modalMessage }}</p>
      <b-button variant="primary" @click="closeModal">OK</b-button>
    </b-modal>

    <!-- Booking Dates -->
    <b-form-group label="Ausgewählter Zeitraum">
      <div class="d-flex align-items-center gap-2">
        <b-form-input
          type="date"
          v-model="localDateFrom"
          class="w-auto"
        />
        <span>bis</span>
        <b-form-input
          type="date"
          v-model="localDateTo"
          class="w-auto"
        />

        <!-- Validate button -->
        <b-button variant="primary" @click="validateDates">
          Prüfen
        </b-button>
      </div>
    </b-form-group>

    <b-row>
      <b-col>
        <!-- User Info -->
        <b-form-group label="Vorname">
          <b-form-input
            placeholder="Vorname"
            :value="firstName"
            @input="$emit('update:firstName', $event)"
            required
          />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group label="Nachname">
          <b-form-input
            placeholder="Nachname"
            :value="lastName"
            @input="$emit('update:lastName', $event)"
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form-group label="E-Mail">
          <b-form-input
            placeholder="E-Mail"
            type="email"
            :value="email"
            @input="$emit('update:email', $event)"
            required
          />
        </b-form-group>
      </b-col>

      <b-col>
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
import { defineProps, defineEmits, ref, watch } from 'vue'
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

// Button-based validation
async function validateDates() {
  const from = localDateFrom.value
  const to = localDateTo.value

  // Basic checks
  if (!from || !to) {
    showAlert("Bitte beide Daten auswählen.")
    return
  }

  if (from > to) {
    showAlert("Anreisedatum darf NICHT nach dem Abreisedatum liegen.")
    return
  }

  // Check availability
  const available = await isRoomAvailable(from, to)

  if (!available) {
    showAlert("Zimmer ist in diesem Zeitraum NICHT verfügbar.")
    return
  }

  // Save to parent now that both dates are valid
  emit("update:dateFrom", from)
  emit("update:dateTo", to)

  updateUrl()

  showAlert("Zimmer ist in diesem Zeitraum VERFÜGBAR!")
}

// Update URL
function updateUrl() {
  router.replace({
    query: {
      ...router.currentRoute.value.query,
      from: localDateFrom.value,
      to: localDateTo.value
    }
  })
}
</script>
