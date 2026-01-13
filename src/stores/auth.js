import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

/**
 * Decode JWT payload (Base64)
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
  const error = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function saveSession(tokenValue) {
  token.value = tokenValue

  const decoded = decodeJwt(tokenValue)

  user.value = decoded
    ? { clientId: decoded.sub } // email from JWT
    : null

  localStorage.setItem('token', tokenValue)
  localStorage.setItem('user', JSON.stringify(user.value))
}


  async function login({ email, password }) {
  loading.value = true
  error.value = null

  try {
    const res = await axios.post(
      'https://boutique-hotel.helmuth-lammer.at/api/v1/login',
      {
        clientId: email.trim(),
        secret: password
      },
      {
        headers: { Accept: 'application/json' }
      }
    )

    // 🔹 IMPORTANT: if API returns { token: '...' }, use res.data.token
    const jwt = typeof res.data === 'string' ? res.data : res.data.token
    if (!jwt) throw new Error("No token returned")

    saveSession(jwt)
    return true
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    error.value =
      err.response?.data?.message || 'E-Mail oder Passwort falsch'
    return false
  } finally {
    loading.value = false
  }
}



  async function register(data) {
    loading.value = true
    error.value = null

    try {
      await axios.post(
        'https://boutique-hotel.helmuth-lammer.at/api/v1/register',
        data,
        { headers: { Accept: 'application/json' } }
      )
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
    error,
    loading,
    isAuthenticated,
    login,
    register,
    logout
  }
})
