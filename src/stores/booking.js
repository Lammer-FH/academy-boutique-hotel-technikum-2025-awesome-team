import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useBookingStore = defineStore('booking', () => {
  // Guest input
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const dob = ref('')
  const fruehstueck = ref(false)

  // Booking data
  const fromDate = ref('')
  const toDate = ref('')
  const roomId = ref(null)

  // Result / state
  const booking = ref(null)
  const bookingId = ref(null)
  const loading = ref(false)
  const error = ref(null)

  function setDates(from, to) {
    fromDate.value = from
    toDate.value = to
  }

  async function checkAvailability() {
    if (!roomId.value || !fromDate.value || !toDate.value) return false

    const { data } = await api.get(
      `/room/${roomId.value}/from/${fromDate.value}/to/${toDate.value}`
    )

    return data.available === true
  }

  async function submitBooking() {
    loading.value = true
    error.value = null

    try {
      const { data } = await api.post(
        `/room/${roomId.value}/from/${fromDate.value}/to/${toDate.value}`,
        {
          firstname: firstName.value,
          lastname: lastName.value,
          email: email.value,
          birthdate: dob.value
        }
      )

      bookingId.value = data.id
      return data.id
    } catch (err) {
      error.value = 'Fehler beim Absenden der Buchung'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchBooking(id) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/bookings/${id}`)
      booking.value = data
    } catch (err) {
      error.value = err.message || 'Buchung konnte nicht geladen werden'
    } finally {
      loading.value = false
    }
  }

  function resetBooking() {
    booking.value = null
    bookingId.value = null
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    dob.value = ''
    fruehstueck.value = false
    fromDate.value = ''
    toDate.value = ''
    roomId.value = null
  }

  return {
    // states
    firstName,
    lastName,
    email,
    dob,
    fruehstueck,
    fromDate,
    toDate,
    roomId,
    booking,
    bookingId,
    loading,
    error,
    // actions
    setDates,
    checkAvailability,
    submitBooking,
    fetchBooking,
    resetBooking
  }
})
