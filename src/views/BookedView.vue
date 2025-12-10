<template>
	<b-container v-if="booking" class="my-5 py-5 booking-result">
		<!-- Header Section -->
		<div class="text-center mb-5 fade-in">
			<h1 class="display-4 font-weight-bold mb-3 text-gradient">
				{{ route.query.new ? "Ihre Buchung war erfolgreich!" : "Ihre Buchung" }}
			</h1>

			<p class="lead text-muted">Vielen Dank! Wir freuen uns, Sie bald begrüßen zu dürfen.</p>
		</div>

		<!-- Main Card -->
		<b-card no-body class="booking-card shadow-xl border-0 p-0 overflow-hidden fade-in">
			<b-row no-gutters>
				<!-- Image -->
				<b-col cols="12" lg="5" class="image-col">
					<div class="image-wrapper">
						<img
							:src="`/images/rooms/${booking.room.id}.jpg`"
							alt="Zimmerbild"
							class="room-image"
						/>

						<!-- Floating Badge -->
						<div class="floating-badge shadow-sm">
							<i class="bi bi-calendar2-check"></i>
							Buchungs-ID: <b>{{ booking.bookingId }}</b>
						</div>
					</div>
				</b-col>

				<!-- Content -->
				<b-col cols="12" lg="7" class="p-4 p-lg-5 content-col">
					<!-- Room Title -->
					<h2 class="mb-2">{{ booking.room.name }}</h2>
					<p class="text-muted mb-4">
						Zimmer Nr. <b>{{ booking.room.number }}</b> • <b>{{ booking.room.beds }}</b> Bett(er) •
						<b>{{ booking.room.pricePerNight }} €</b>/Nacht
					</p>

					<!-- Booking Dates -->
					<div class="mb-4">
						<div>
							<i class="bi bi-arrow-right-circle"></i>
							<b> Anreise:</b> {{ booking.from }}
						</div>
						<div>
							<i class="bi bi-arrow-left-circle"></i>
							<b> Abreise:</b> {{ booking.to }}
						</div>
						<div>
							<i class="bi bi-egg-fried"></i>
							<b> Frühstück:</b> {{ store.fruehstueck ? "inklusive" : "nicht gebucht" }}
						</div>
					</div>

					<!-- Extras -->
					<h5 class="mt-4 mb-2">Ausstattung</h5>
					<div class="d-flex flex-wrap gap-2 mt-2">
						<small
							v-for="extra in booking.room.extras.filter(e => e.available)"
							:key="extra.name"
							class="d-flex align-items-center gap-1 text-secondary"
						>
							<i :class="extra.icon"></i>
							{{ extra.name }}
						</small>
					</div>

					<!-- Guests -->
					<div class="mt-4">
						<h5>Gastdaten</h5>
						<div v-for="(guest, index) in booking.guests" :key="index" class="mb-3">
							<div>
								<i class="bi bi-person-fill"></i> <b>{{ guest.firstname }} {{ guest.lastname }}</b>
							</div>
							<div><i class="bi bi-envelope"></i> {{ guest.email }}</div>
							<div><i class="bi bi-calendar"></i> Geboren am {{ guest.birthdate }}</div>
						</div>
					</div>
				</b-col>
			</b-row>
		</b-card>

<!-- CONTACT + DIRECTIONS + MAP -->
<b-row class="mt-4 directions-row">
  <!-- LEFT COLUMN: Contact + Directions + Maps Buttons -->
  <b-col cols="12" lg="6" class="left-col gap-1">
    <div class="left-content">
      <!-- Contact -->
      <h5><strong>Kontakt</strong></h5>
      <p class="mb-1"><i class="bi bi-telephone-fill"></i> +43 1 234 56 78</p>
      <p class="mb-1"><i class="bi bi-envelope"></i> info@hotel-vue.at</p>
      <p>
        Weitere Informationen finden Sie auch in unserem
        <b-link href="/impressum">Impressum</b-link>.
      </p>

      <!-- Directions -->
      <h5 class="mt-4"><strong>Anfahrt</strong></h5>
      <p>
        Das <strong>Hotel Vue</strong> befindet sich im historischen Zentrum Wiens,
        in der <strong>Weihburggasse 9</strong>, nur 10 Minuten Fahrt vom
        Wiener Hauptbahnhof mit der U1 entfernt.
      </p>
      <p>
        Nächstgelegene Haltestellen des öffentlichen Nahverkehrs:<br/>
        • U-Bahn U1 – Stephansplatz (300 m)<br/>
        • Wien Hauptbahnhof – 10 Minuten mit der U-Bahn
      </p>

      <!-- Maps Buttons -->
        <div class="mb-lg-0 mb-3">
  <b-button
    variant="primary"
    href="https://www.google.com/maps/place/Weihburggasse+9"
    target="_blank"
    class="mx-2 mt-2 mb-lg-0"
  >
    In Google Maps öffnen
  </b-button>

  <b-button
    variant="primary"
    href="https://maps.apple.com/place?address=Weihburggasse+9"
    target="_blank"
    class="mx-2 mt-2 mb-lg-0"
  >
    In Apple Maps öffnen
  </b-button>
      </div>
    </div>
  </b-col>

  <!-- RIGHT COLUMN: Map -->
  <b-col cols="12" lg="6" class="right-col gap-1">
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.9776251576336!2d16.373036799999998!3d48.207046899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079ee5a824e9%3A0x49c78b64e221bffb!2sWeihburggasse%209%2C%201010%20Wien!5e0!3m2!1sde!2sat!4v1765361627414!5m2!1sde!2sat"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
  </b-col>
</b-row>

		<!-- Return Homepage Button -->
		<div class="text-center mt-5 fade-in">
			<b-button variant="primary" size="lg" href="/" class="px-5 py-3 return-btn">
				<i class="bi bi-house-door mr-2"></i>
				Zurück zur Startseite
			</b-button>
		</div>
	</b-container>
</template>


<script setup>
defineProps({
	id: String,
});

import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useBookingStore } from "../stores/booking";

const route = useRoute();
const store = useBookingStore();

const loading = ref(false);
const data = ref(null);
const error = ref(null);
const booking = computed(() => {
	if (data.value) {
		return mapBooking(data.value);
	}
	return null;
});

// watch the params of the route to fetch the data again
watch(() => route.params.id, fetchData, { immediate: true });

async function fetchData(id) {
	const url = `https://boutique-hotel.helmuth-lammer.at/api/v1/bookings/${id}`;

	error.value = booking.value = null;
	loading.value = true;

	try {
		const response = await fetch(url);
		data.value = await response.json();
	} catch (error) {
		error.value = error.toString();
	} finally {
		loading.value = false;
	}
}

/**
 * Map API response
 *
 * @param {Object} apiData - The raw booking object returned by the backend API.
 * @param {number} apiData.id
 * @param {string} apiData.bookingId
 * @param {string} apiData.from
 * @param {string} apiData.to
 * @param {Object} apiData.room
 * @param {number} apiData.room.id
 * @param {string} apiData.room.roomNumber
 * @param {string} apiData.room.roomName
 * @param {number} apiData.room.beds
 * @param {number} apiData.room.pricePerNight
 * @param {Array<Object>} apiData.room.extras
 * @param {Array<Object>} apiData.guests
 *
 * @returns {Object} A fully normalized booking object.
 * @returns {number} return.id
 * @returns {string} return.bookingId
 * @returns {string} return.from
 * @returns {string} return.to
 * @returns {Object} return.room
 * @returns {number} return.room.id
 * @returns {string} return.room.number
 * @returns {string} return.room.name
 * @returns {number} return.room.beds
 * @returns {number} return.room.pricePerNight
 * @returns {Array<{name: string, available: boolean}>} return.room.extras
 * @returns {Array<{id: number, firstname: string, lastname: string, email: string, birthdate: string}>} return.guests
 */

function mapBooking(apiData) {
	return {
		id: apiData.id,
		bookingId: apiData.bookingId,
		from: apiData.from,
		to: apiData.to,

		room: {
			id: apiData.room.id,
			number: apiData.room.roomNumber,
			name: apiData.room.roomName,
			beds: apiData.room.beds,
			pricePerNight: apiData.room.pricePerNight,

			// Deduplicate extras by name and convert "available" to boolean
			extras: Object.values(
				apiData.room.extras.reduce((acc, extra) => {
					acc[extra.name] = {
						name: extra.name,
						icon: icons[extra.name] || "bi bi-question-circle",
						available: Boolean(extra.available),
					};
					return acc;
				}, {})
			),
		},

		guests: apiData.guests.map(g => ({
			id: g.id,
			firstname: g.firstname,
			lastname: g.lastname,
			email: g.email,
			birthdate: g.birthdate,
		})),
	};
}

// Icon map
const icons = {
	bathroom: "bi bi-droplet",
	minibar: "bi bi-cup-straw",
	television: "bi bi-tv",
	livingroom: "bi bi-house-door",
	aircondition: "bi bi-snow",
	wifi: "bi bi-wifi",
	breakfast: "bi bi-egg-fried",
	"handicapped accessible": "fa-solid fa-wheelchair",
};
</script>


<style scoped>
/* --- Booking information card styles --- */
.text-gradient {
  background: linear-gradient(90deg, var(--color-secondary), var(--color-primary1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fade-in {
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.booking-card {
  border-radius: 20px;
  background: #ffffffdd;
  backdrop-filter: blur(10px);
}

.image-wrapper {
  position: relative;
  height: 100%;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.floating-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ffffffb0;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  backdrop-filter: blur(12px);
}

.return-btn {
  border-radius: 30px;
  font-size: 1.2rem;
}

.shadow-xl {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

/* --- Map, directions, and contact section --- */
/* Map container styling */
.map-container {
  border-radius: 12px;
  overflow: hidden;
  min-height: 300px; /* default for mobile */
}

/* Iframe fills container */
.map-container iframe {
  width: 100%;
  height: 100%;
  display: block;
}

/* Desktop layout: left text + right map, equal height */
@media (min-width: 768px) {
  .directions-row {
    display: flex;
    align-items: stretch;
  }

  .left-col,
  .right-col {
    display: flex;
  }

  .left-content,
  .map-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .map-container iframe {
    flex: 1;
  }
}

/* Mobile layout: stacked columns */
@media (max-width: 767px) {
  .directions-row {
    flex-direction: column;
  }

  .map-container {
    width: 100%;
    height: 50vh; /* adjust if you want bigger map */
    margin-top: 1rem; /* gap between buttons and map */
  }
}

/* Contact info spacing */
.contact-info p {
  margin-bottom: 0.5rem;
}
</style>
