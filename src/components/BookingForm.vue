<template>
  <b-form>
    <!-- Booking Dates -->
    <b-form-group label="Ausgewählter Zeitraum">
      <div class="d-flex align-items-center gap-2">
        <b-form-input
          type="date"
          v-model="localDateFrom"
          class="w-auto"
          @input="validateNewFromDate($event)"
        />
        <span>bis</span>
        <b-form-input
          type="date"
          v-model="localDateTo"
          class="w-auto"
          @input="validateNewToDate($event)"
        />
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

// Keep last valid dates
const lastValidFrom = ref(props.dateFrom)
const lastValidTo = ref(props.dateTo)

// Sync local → parent
watch(localDateFrom, val => emit("update:dateFrom", val))
watch(localDateTo, val => emit("update:dateTo", val))

// Sync parent → local
watch(() => props.dateFrom, val => { localDateFrom.value = val; lastValidFrom.value = val })
watch(() => props.dateTo, val => { localDateTo.value = val; lastValidTo.value = val })


// Check room availability
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

// Validate new from date
async function validateNewFromDate(newDate) {
    if (newDate > localDateTo.value) {
    alert("Anreisedatum darf nicht nach dem Abreisedatum liegen.")
    localDateFrom.value = lastValidFrom.value
    return
  }
  const available = await isRoomAvailable(newDate, localDateTo.value)
  if (!available) {
    alert("Zimmer ist an diesem Datum nicht verfügbar.")
    localDateFrom.value = lastValidFrom.value
    return
  }
  localDateFrom.value = newDate
  lastValidFrom.value = newDate
  updateUrl()
}

// Validate new to date
async function validateNewToDate(newDate) {
     if (newDate < localDateFrom.value) {
    alert("Abreisedatum darf nicht vor dem Anreisedatum liegen.")
    localDateTo.value = lastValidTo.value
    return
  }
  const available = await isRoomAvailable(localDateFrom.value, newDate)
  if (!available) {
    alert("Zimmer ist an diesem Datum nicht verfügbar.")
    localDateTo.value = lastValidTo.value
    return
  }
  localDateTo.value = newDate
  lastValidTo.value = newDate
    updateUrl()
}
// Update URL query params
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
