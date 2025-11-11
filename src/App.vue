<script setup>
import {RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />

  <main>
  <RouterView />
</main>

<div>
 <Footer />
</div>

</template>

<style>
.mt-120 {
  margin-top: 120px;
}
</style>

