import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref([])

  async function fetchBookings() {
    const res = await fetch('https://boutique-hotel.helmuth-lammer.at/api/bookings')
    if (!res.ok) throw new Error('Fehler beim Laden der Buchungen')
    bookings.value = await res.json()
  }

  async function createBooking(payload) {
    const res = await fetch('https://boutique-hotel.helmuth-lammer.at/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Fehler beim Erstellen der Buchung')
    const created = await res.json()
    bookings.value.push(created)
    return created
  }

  async function deleteBooking(id) {
    const res = await fetch(`https://boutique-hotel.helmuth-lammer.at/api/bookings/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Fehler beim Löschen')
    bookings.value = bookings.value.filter(b => b.id !== id)
  }

  return { bookings, fetchBookings, createBooking, deleteBooking }
})
