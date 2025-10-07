<script setup>
import {RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
<div id="app-container">
  <Header/>

<main>
  <RouterView />
</main>

  <Footer />
</div>
</template>

<style scoped>
main{
    width: 100%;
    margin-bottom: 10vh;
    padding: 1rem;
}

/* Mobile-first styles (default) */
#app-container {
  width: 100%;
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-secondary);
   font-family: var(--font-paragraph);
}

/* Tablet and up */
@media (min-width: 600px) {
  #app-container {
width: 100%;
    
  }
}

/* Desktop and up */
@media (min-width: 900px) {
  #app-container {
width: 100%;
  }
}

/* Large desktop */
@media (min-width: 1200px) {
  #app-container {
width: 80%;
  }
}

/* Extra large desktop */
@media (min-width: 1800px) {
  #app-container {
width: 80%;
  }
}
</style>
