import { defineStore } from 'pinia'

export const useBookingStore = defineStore('bookingStore', {
    state: () => ({
        bookingData: null
    }),

    actions: {
        setBookingData(data) {
            this.bookingData = data
        }
    }
})
