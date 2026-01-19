// src/services/api.js


import axios from 'axios'

const api = axios.create({
  baseURL: 'https://boutique-hotel.helmuth-lammer.at/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {}
  return config
}, (error) => Promise.reject(error))

export default api
