import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {

  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function saveSession(tokenValue, userValue) {
    token.value = tokenValue
    user.value = userValue
    localStorage.setItem('token', tokenValue)
    localStorage.setItem('user', JSON.stringify(userValue))
  }

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const res = await api.post('https://boutique-hotel.helmuth-lammer.at/api/v1/login', credentials)
      saveSession(res.data.token, res.data.user)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Login fehlgeschlagen'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    error.value = null

    try {
      await api.post('https://boutique-hotel.helmuth-lammer.at/api/v1/register', data)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Registrierung fehlgeschlagen'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token,
    user,
    error,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  }
})
