<script setup>
import {RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>

<div class="d-flex flex-column justify-content-center min-vh-100">
  <Header />
</div>

 <main class="flex-fill container my-4 justify-content-center">
  <RouterView />
</main>

<div class="d-flex flex-column justify-content-center min-vh-100">
 <Footer />
</div>

</template>

<style scoped>
main{
    width: 100%;
    margin-bottom: 10vh;
    padding: 1rem;
    margin-top: 10vh;
    color: var(--color-accent);
}

/* Tablet and up */
@media (min-width: 600px) {
  main {
width: 100%;
    
  }
}

/* Desktop and up */
@media (min-width: 900px) {
  main {
width: 100%;
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  main {
width: 100%;
  }
}

/* Extra large desktop */
@media (min-width: 1800px) {
  main {
width: 80%;
  }
}
</style>
