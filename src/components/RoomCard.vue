<template>
    <b-card no-body class="room-card h-100 d-flex flex-column">
        <div class="card-body">
            <!-- Image -->
            <b-card-img :src="`/images/rooms/${room.id}.jpg`" alt="Zimmerbild" class="room-image" />

            <!-- Content -->
            <div class="room-content p-3">
                <h5>Zimmer {{ room.roomNumber }} – {{ room.roomName }}</h5>

                <p class="mb-2">
                    <strong>{{ room.beds }}</strong> Bett(en)<br />
                    <strong>{{ room.pricePerNight }} €</strong> / Nacht
                </p>

                <!-- Extras -->
                <div class="d-flex flex-wrap gap-2 mt-2">
                    <span v-for="extra in room.extras" :key="extra.key"
                        class="d-flex align-items-center gap-1 text-secondary">
                        <i :class="extra.icon"></i>
                        {{ extra.label }}
                    </span>
                </div>

                <!-- Availability -->
                <div class="card-availability mt-3">
                    <span v-if="availability[room.id] === true" class="badge bg-success">Verfügbar</span>
                    <span v-else-if="availability[room.id] === false" class="badge bg-danger">Belegt</span>
                    <span v-else class="badge bg-secondary">Noch nicht geprüft</span>
                </div>
            </div>

            <!-- Button at bottom -->
            <div>
                <router-link v-if="fromDate && toDate && availability[room.id] === true"
                    :to="{ path: `/booking/${room.id}`, query: { from: fromDate, to: toDate } }">
                    <b-button variant="primary" class="w-100">Jetzt buchen</b-button>
                </router-link>

                <b-button v-else variant="primary" class="w-100" disabled>
                    Jetzt buchen
                </b-button>
            </div>
        </div>

    </b-card>
</template>

<script setup>
defineProps({
    room: { type: Object, required: true },
    availability: { type: Object, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true }
})
</script>

<style scoped>
.room-card {
    height: 100%;
}

.card-body {
    display: flex;
    flex-direction: column;
}

.room-content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.room-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
}

.card-availability {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
}
</style>
