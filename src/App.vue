<template>
  <Header />

  <main>
  <RouterView />
</main>

<div>
 <Footer />
</div>

</template>


<script setup>
import {RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>


<style>
.room-card {
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.room-content {
  flex: 1;       
  display: flex;
  flex-direction: column;
}

.room-button {  
  margin-top: auto;
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.primary-bar {
  background-color: var(--color-primary1);
  border-radius: 12px;
  padding: 12px 20px !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
</style>

