import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const AMENITY_ICONS = {
    bathroom: { icon: 'bi bi-droplet-half', label: 'Badezimmer' },
    minibar: { icon: 'bi bi-cup-straw', label: 'Minibar' },
    television: { icon: 'bi bi-tv', label: 'Fernseher' },
    livingroom: { icon: 'bi bi-sofa', label: 'Wohnbereich' },
    aircondition: { icon: 'bi bi-snow', label: 'Klimaanlage' },
    wifi: { icon: 'bi bi-wifi', label: 'WLAN' },
    breakfast: { icon: 'bi bi-egg-fried', label: 'Frühstück' },
    'handicapped accessible': {
        icon: 'bi bi-universal-access',
        label: 'Barrierefrei'
    }
}

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
    const roomNumber = ref('')
    const roomName = ref('')
    const beds = ref(0)
    const pricePerNight = ref(0)

    // Result / state
    const booking = ref(null)
    const bookingId = ref(null)
    const loading = ref(false)
    const error = ref(null)

    function setDates(from, to) {
        fromDate.value = from
        toDate.value = to
    }

    const nights = computed(() => {
        if (!fromDate.value || !toDate.value) return 0
        const from = new Date(fromDate.value)
        const to = new Date(toDate.value)
        return Math.max(
            Math.ceil((to - from) / (1000 * 60 * 60 * 24)),
            0
        )
    })

    const totalPrice = computed(() => {
        let total = nights.value * pricePerNight.value
        if (fruehstueck.value) {
            total += nights.value
        }
        return total
    })


    function setRoom(room) {
        roomId.value = room.id
        roomNumber.value = room.roomNumber
        roomName.value = room.roomName
        beds.value = room.beds
        pricePerNight.value = room.pricePerNight
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

    const roomAmenities = computed(() => {
        if (!booking.value?.room?.extras) return []

        const seen = new Set()

        return booking.value.room.extras
            .filter(extra => extra.available === 1)
            .filter(extra => {
                if (seen.has(extra.name)) return false
                seen.add(extra.name)
                return true
            })
            .map(extra => ({
                name: extra.name,
                icon: AMENITY_ICONS[extra.name]?.icon,
                label: AMENITY_ICONS[extra.name]?.label ?? extra.name
            }))
            .filter(extra => extra.icon)
    })

    function formatDate(dateStr) {
        if (!dateStr) return ''
        const [year, month, day] = dateStr.split('-')
        return `${day}.${month}.${year}`
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
        roomNumber.value = ''
        roomName.value = ''
        beds.value = 0
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
        roomNumber,
        roomName,
        beds,
        pricePerNight,
        booking,
        bookingId,
        loading,
        error,
        // computed
        nights,
        totalPrice,
        roomAmenities,
        // actions
        setDates,
        setRoom,
        checkAvailability,
        submitBooking,
        fetchBooking,
        resetBooking,
        formatDate,
    }
})
