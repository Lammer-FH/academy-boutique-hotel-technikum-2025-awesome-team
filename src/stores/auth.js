import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE = 'https://boutique-hotel.helmuth-lammer.at/api/v1'

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: 'application/json'
  }
})

/**
 * JWT Interceptor
 * → erfüllt U7 DoD
 */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/**
 * Decode JWT payload
 */
function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')))
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  function saveSession(jwt) {
    token.value = jwt

    const decoded = decodeJwt(jwt)
    user.value = decoded
      ? { clientId: decoded.sub }
      : null

    localStorage.setItem('token', jwt)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  async function login({ email, password }) {
    loading.value = true
    error.value = null

    try {
      const res = await api.post('/login', {
        clientId: email.trim(),
        secret: password
      })

      const jwt = typeof res.data === 'string'
        ? res.data
        : res.data.token

      if (!jwt) throw new Error('No token returned')

      saveSession(jwt)
      return true
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        'E-Mail oder Passwort falsch'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    error.value = null

    try {
      await api.post('/register', {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        username: data.email, // 🔹 REQUIRED by API
        password: data.password
      })
      return true
    } catch (err) {
      error.value =
        err.response?.data?.message ||
        'Registrierung fehlgeschlagen'
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
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    api // export für weitere Calls
  }
})
