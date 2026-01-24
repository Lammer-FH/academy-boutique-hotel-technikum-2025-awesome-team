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
.mt-120 {
  margin-top: 120px;
  margin-bottom: 120px;
}

.btn-primary, .btn-primary:visited{
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
  color: white !important;
}

.btn-primary:hover{
    background-color: var(--color-primary1)!important;
    border-color: white ;
    color: var(--color-text)!important;
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.room-card {
  display: flex;
  flex-direction: column;
}

.room-content {
  flex-grow: 1;        
  display: flex;
  flex-direction: column;
}


:deep(.dp__input) {
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}

.primary-bar {
  background-color: var(--color-primary1);
  border-radius: 12px;
  padding: 12px 20px !important;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.btn-disabled{
   background-color: var(--color-bg1) !important;
  border-color: var(--color-bg1) !important;
  color: #999 !important;
  opacity: 1 !important;
  cursor: not-allowed !important;
}

.check-btn {
  background-color: var(--color-primary);
  border: none;
  color: #fff;
  padding: 8px 18px;
  font-weight: 600;
  border-radius: 8px;
  transition: 0.2s ease; 
}

.check-btn:hover {
  background-color: var(--color-secondary);
  color: #fff;
}

.pagination {
  --bs-pagination-font-size: 0.9rem;
  --bs-pagination-border-radius: 8px;
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.45rem;
}

.primary-bar .pagination .check-btn {
  display: flex;
  align-items: center;
  margin: 0 !important;
}

.btn-secondary,
.btn-secondary:visited {
  background-color: var(--color-primary1) !important;
  border-color: var(--color-primary1) !important;
  color: white !important;
}

.btn-secondary:hover {
  background-color: var(--color-secondary1) !important;
  border-color: var(--color-secondary1) !important;
}

.btn-secondary:active,
.btn-secondary:focus {
  background-color: var(--color-accent) !important;
  border-color: var(--color-accent) !important;
  box-shadow: none !important;
}

.modal-content {
  border: 2px solid var(--color-primary) !important;
}

.modal-header {
  background-color: var(--color-bg1) !important;
}

.page-item .page-link {
  background-color: var(--color-bg);
  border: 1px solid var(--color-primary1);
  color: var(--color-text);
  transition: 0.2s ease;
  border-radius: 6px !important;
}

.page-item .page-link:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.page-item.active .page-link {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  font-weight: 600;
}

.page-item.disabled .page-link {
  background-color: var(--color-bg1);
  border-color: var(--color-bg1);
  color: #999;
}

.room-card {
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.room-content {
  flex: 1;       
}

.room-button {  
  margin-top: auto;
}
</style>

