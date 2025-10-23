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

<b-button
  class="carousel-btn prev"
  @click="prev"
  variant="dark"
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13 15L7 10L13 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</b-button>

<b-button
  class="carousel-btn next"
  @click="next"
  variant="dark"
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 5L13 10L7 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</b-button>


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
        'public/images/about/lobby1.jpg',
        'public/images/about/lobby2.jpg',
        'public/images/about/saal1.jpg',
        'public/images/about/saal2.jpg',
        'public/images/about/spa1.jpg'
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
      this.timer = setInterval(this.next, 4000);
    }
  }
};
</script>

<style>
.carousel {
  position: relative;
  width: 100%;
  height: auto;
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

.carousel-btn {
    background-color: var(--color-secondary1);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 0 !important;
  line-height: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
 opacity: 0.8;
  border: none;
}

.carousel-btn:hover {
  transform: translateY(-50%) scale(1.1);
  background-color: var(--color-secondary1);
}

.carousel-btn.prev { left: 10px; }
.carousel-btn.next { right: 10px; }

.carousel-btn svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 576px) {
  .carousel-btn {
    width: 40px;
    height: 40px;
  }
  .carousel-btn svg {
    width: 16px;
    height: 16px;
  }
}

</style>
