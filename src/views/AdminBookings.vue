<template>
  <div class="admin-bookings">
    <h1>Buchungsübersicht</h1>

    <button @click="load">Aktualisieren</button>

    <table v-if="bookings.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Anreise</th>
          <th>Abreise</th>
          <th>Zimmer</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in bookings" :key="b.id">
          <td>{{ b.name }}</td>
          <td>{{ b.email }}</td>
          <td>{{ b.checkin }}</td>
          <td>{{ b.checkout }}</td>
          <td>{{ b.roomType }}</td>
          <td><button @click="remove(b.id)">Löschen</button></td>
        </tr>
      </tbody>
    </table>

    <p v-else>Keine Buchungen gefunden.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBookingStore } from '../stores/bookings'

const store = useBookingStore()
const bookings = store.bookings

async function load() {
  try {
    await store.fetchBookings()
  } catch (err) {
    alert('Fehler: ' + err.message)
  }
}

async function remove(id) {
  if (confirm('Buchung wirklich löschen?')) {
    await store.deleteBooking(id)
  }
}

onMounted(load)
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  background: #c0392b;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 4px;
}
</style>
