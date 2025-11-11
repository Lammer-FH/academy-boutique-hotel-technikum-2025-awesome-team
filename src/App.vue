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

.btn-primary{
    background-color: var(--color-primary);
    border: none;
      white-space: nowrap;
}

.btn-primary:hover{
    background-color: var(--color-primary1);
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}

:deep(.dp__input) {
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}

.primary-bar {
  background-color: var(--color-primary);
  border-radius: 12px;
  color: #fff;
}

.primary-bar .check-btn {
  background-color: #fff;
  color: var(--color-primary);
  border: none;
  font-weight: 600;
}

.primary-bar .check-btn:hover {
  background-color: var(--color-primary1);
  color: #fff;
}

/* Pagination in der Leiste */
:deep(.primary-bar .pagination .page-link) {
  background-color: #fff;
  color: var(--color-primary);
  border: none;
  font-weight: 500;
}

:deep(.primary-bar .pagination .active .page-link),
:deep(.primary-bar .pagination .page-link:hover) {
  background-color: var(--color-primary1);
  color: #fff;
}

</style>

