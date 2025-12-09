import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookingStore = defineStore('booking', () => {
    // **Guest Info**
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const dob = ref('')
    const fruehstueck = ref(false)

    // **Booking Info**
    const fromDate = ref('')
    const toDate = ref('')
    const roomId = ref('')
    const roomNumber = ref('')
    const roomName = ref('')
    const roomBeds = ref(0)
    const roomPricePerNight = ref(0)
    const roomExtras = ref([])

    // Reset function
    function resetBooking() {
        firstName.value = ''
        lastName.value = ''
        email.value = ''
        dob.value = ''
        fruehstueck.value = false
        fromDate.value = ''
        toDate.value = ''
        roomId.value = ''
        roomNumber.value = ''
        roomName.value = ''
        roomBeds.value = 0
        roomPricePerNight.value = 0
        roomExtras.value = []
    }

    return {
        firstName,
        lastName,
        email,
        dob,
        fruehstueck,
        fromDate,
        toDate,
        roomId,
        roomNumber,
        roomName,
        roomBeds,
        roomPricePerNight,
        roomExtras,
        resetBooking
    }
})
