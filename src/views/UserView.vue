<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div class="container mt-5 pt-5">
    <h1>My Profile</h1>

    <div v-if="auth.user">
      <p><strong>First name:</strong> {{ auth.user.firstname }}</p>
      <p><strong>Last name:</strong> {{ auth.user.lastname }}</p>
      <p><strong>Email:</strong> {{ auth.user.email }}</p>
  
    </div>

    <p v-else>Loading user data…</p>
  </div>
</template>
