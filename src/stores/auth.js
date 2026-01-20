import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')))
    const error = ref(null)

    const isAuthenticated = computed(() => !!user.value)

    async function login(credentials) {
        error.value = null

        const savedUser = JSON.parse(localStorage.getItem('registeredUser'))

        if (
            savedUser &&
            savedUser.email === credentials.email &&
            savedUser.password === credentials.password
        ) {
            user.value = savedUser
            localStorage.setItem('user', JSON.stringify(savedUser))
            window.location.reload()
            return true
        }

        error.value = 'Invalid login'
        return false
    }

    async function register(data) {
        error.value = null

        // Simulated backend register
        const newUser = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password
        }

        // save user (mock backend)
        localStorage.setItem('registeredUser', JSON.stringify(newUser))

        //AUTO LOGIN AFTER REGISTER
        user.value = newUser
        localStorage.setItem('user', JSON.stringify(newUser))

        return true
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
        sessionStorage.clear()
        window.location.reload()
    }

    return {
        user,
        error,
        isAuthenticated,
        login,
        register,
        logout
    }
})
