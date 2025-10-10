<template>
  <div class="carousel">
    <div class="slides">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :alt="'Hotel Bild ' + (index + 1)"
        :class="{ active: index === currentIndex }"
      />
    </div>

    <button class="prev" @click="prev" aria-label="Vorheriges Bild">‹</button>
    <button class="next" @click="next" aria-label="Nächstes Bild">›</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  '/images/hotel1.jpg',
  '/images/hotel2.jpg',
  '/images/hotel3.jpg'
]

const currentIndex = ref(0)
let intervalId = null

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}

onMounted(() => {
  intervalId = setInterval(next, 5000)
})
onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  max-width: 800px;
  margin: auto;
}
.slides img {
  width: 100%;
  display: none;
  transition: opacity 0.4s ease;
}
.slides img.active {
  display: block;
  opacity: 1;
}
.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  font-size: 1.5rem;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
}
.prev {
  left: 0.5rem;
}
.next {
  right: 0.5rem;
}
</style>
