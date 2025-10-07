<template>
  <div class="carousel">
    <div class="slides">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="{ active: index === currentIndex }"
      />
    </div>

    <button class="prev" @click="prev">‹</button>
    <button class="next" @click="next">›</button>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  data() {
    return {
      currentIndex: 0,
      timer: null,
      images: [
        'public/images/hotel1.jpg',
        'public/images/hotel2.jpg',
        'public/images/hotel3.jpg'
      ]
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoplay() {
      this.timer = setInterval(this.next, 3500);
    }
  }
};
</script>

<style>
.carousel {
  position: relative;
  max-width: 600px;
  margin: auto;
  overflow: hidden;
}

.slides img {
  width: 100%;
  display: none;
  transition: opacity 0.5s ease;
}

.slides img.active {
  display: block;
}

.carousel button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0 10px;
  cursor: pointer;
}

.carousel .prev { left: 0; }
.carousel .next { right: 0; }
</style>
