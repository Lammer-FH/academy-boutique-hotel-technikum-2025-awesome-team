<template>
  <div class="booking-form">
    <h1>Zimmer buchen</h1>

    <form @submit.prevent="submit">
      <label>
        Name*:
        <input v-model="form.name" required />
      </label>

      <label>
        E-Mail*:
        <input v-model="form.email" type="email" required />
      </label>

      <label>
        Anreise*:
        <input v-model="form.checkin" type="date" required />
      </label>

      <label>
        Abreise*:
        <input v-model="form.checkout" type="date" required />
      </label>

      <label>
        Gäste:
        <input v-model.number="form.guests" type="number" min="1" />
      </label>

      <label>
        Zimmerart:
        <select v-model="form.roomType">
          <option value="single">Einzelzimmer</option>
          <option value="double">Doppelzimmer</option>
          <option value="suite">Suite</option>
        </select>
      </label>

      <button type="submit">Buchung abschicken</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '../stores/bookings'

const router = useRouter()
const store = useBookingStore()

const form = ref({
  name: '',
  email: '',
  checkin: '',
  checkout: '',
  guests: 1,
  roomType: 'single'
})

async function submit() {
  try {
    if (!form.value.name || !form.value.email) {
      alert('Bitte alle Pflichtfelder ausfüllen.')
      return
    }
    await store.createBooking(form.value)
    router.push({ name: 'booking-confirm' })
  } catch (err) {
    alert('Fehler bei der Buchung: ' + err.message)
  }
}
</script>

<style scoped>
.booking-form {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}
button {
  margin-top: 1rem;
  padding: 0.6rem;
  background: #444;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
