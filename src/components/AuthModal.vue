<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close'])
const auth = useAuthStore()

const isLogin = ref(true)
const message = ref('')
const error = ref('')
const loginForm = ref({ email: '', password: '' })

const registerForm = ref({
  firstname: '', lastname: '',
  email: '', password: '', confirm: ''
})

async function handleLogin() {
  error.value = ''
  message.value = ''

  const success = await auth.login(loginForm.value)

  if (success) {
    message.value = 'Login erfolgreich ✅'
    setTimeout(() => emit('close'), 800)
  } else {
    error.value = auth.error
  }
}


async function handleRegister() {
  if (registerForm.value.password !== registerForm.value.confirm) {
    error.value = 'Passwörter stimmen nicht überein'
    return
  }

  const success = await auth.register({
    firstname: registerForm.value.firstname,
    lastname: registerForm.value.lastname,
    email: registerForm.value.email,
    password: registerForm.value.password
  })

  if (success) {
    message.value = 'Registrierung erfolgreich ✅'
    isLogin.value = true
  } else {
    error.value = auth.error
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <div class="modal-backdrop d-block bg-dark bg-opacity-25 backdrop-blur"></div>


  <div class="modal d-block">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-header">
          <h5>{{ isLogin ? 'Login' : 'Registrieren' }}</h5>
          <button class="btn-close" @click="close"></button>
        </div>

        <div class="modal-body">

          <div v-if="message" class="alert alert-success">{{ message }}</div>
          <div v-if="error" class="alert alert-danger">{{ error }}</div>

          <!-- LOGIN FORM -->
          <form v-if="isLogin" @submit.prevent="handleLogin">

            <input class="form-control my-2" v-model="loginForm.email" placeholder="E-Mail" required>
            <input class="form-control my-2" type="password" v-model="loginForm.password" placeholder="Passwort" required>

            <button class="btn btn-primary w-100">Login</button>

            <small class="d-block mt-2 text-center" @click="isLogin = false" style="cursor:pointer">
              Noch kein Konto?
            </small>
          </form>

          <!-- REGISTER FORM -->
          <form v-else @submit.prevent="handleRegister">

            <input class="form-control my-2" v-model="registerForm.firstname" placeholder="Vorname" required>
            <input class="form-control my-2" v-model="registerForm.lastname" placeholder="Nachname" required>
            <input class="form-control my-2" v-model="registerForm.email" placeholder="E-Mail" required>

            <input class="form-control my-2" type="password" v-model="registerForm.password" placeholder="Passwort" required>
            <input class="form-control my-2" type="password" v-model="registerForm.confirm" placeholder="Passwort bestätigen" required>

            <button class="btn btn-success w-100">Registrieren</button>

            <small class="d-block mt-2 text-center" style="cursor:pointer" @click="isLogin = true">
              Schon registriert?
            </small>
          </form>

        </div>

      </div>
    </div>
  </div>
</template>
