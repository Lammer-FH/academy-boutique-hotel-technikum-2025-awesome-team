<script>
import { ref } from 'vue'

export default {
  name: 'AuthModal',
  setup() {
    const showModal = ref(false)
    const isLogin = ref(true)
    const isAuthenticated = ref(false) // user logged in state

    const loginForm = ref({ email: '', password: '' })
    const registerForm = ref({ name: '', email: '', password: '', confirmPassword: '' })

    const toggleForm = () => { isLogin.value = !isLogin.value }

    const submitLogin = () => {
      console.log('Login:', loginForm.value)
      isAuthenticated.value = true
      showModal.value = false
    }

    const submitRegister = () => {
      console.log('Register:', registerForm.value)
      isAuthenticated.value = true
      showModal.value = false
    }

    const logout = () => {
      console.log('Logged out')
      isAuthenticated.value = false
      isLogin.value = true
    }

    return { 
      showModal, isLogin, loginForm, registerForm, 
      toggleForm, submitLogin, submitRegister, 
      isAuthenticated, logout 
    }
  }
}
</script>

<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :class="{ show: showModal }" style="display: block;" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content modern-modal rounded-3 shadow">
          <div class="modal-header border-0">
            <h5 class="modal-title text-white fw-bold">
              {{ isAuthenticated ? 'Welcome!' : (isLogin ? 'Login' : 'Register') }}
            </h5>
            <button type="button" class="btn-close btn-close-white" @click="showModal = false"></button>
          </div>
          <div class="modal-body">

            <!-- If user is logged in -->
            <div v-if="isAuthenticated" class="d-flex flex-column align-items-center gap-3">
              <p class="text-white">You are logged in.</p>
              <button class="btn btn-header w-50" @click="logout">Log Out</button>
            </div>

            <!-- Login -->
            <form v-else-if="isLogin" @submit.prevent="submitLogin">
              <div class="mb-3">
                <label class="form-label text-white">Email</label>
                <input type="email" class="form-control form-control-dark" v-model="loginForm.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-white">Password</label>
                <input type="password" class="form-control form-control-dark" v-model="loginForm.password" required>
              </div>
              <button type="submit" class="btn btn-header w-100">Login</button>
              <div class="text-center mt-2">
                <small class="text-white">Don't have an account? 
                  <a href="#" @click.prevent="toggleForm" class="text-decoration-none text-warning">Register</a>
                </small>
              </div>
            </form>

            <!-- Register -->
            <form v-else @submit.prevent="submitRegister">
              <div class="mb-3">
                <label class="form-label text-white">Full Name</label>
                <input type="text" class="form-control form-control-dark" v-model="registerForm.name" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-white">Email</label>
                <input type="email" class="form-control form-control-dark" v-model="registerForm.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-white">Password</label>
                <input type="password" class="form-control form-control-dark" v-model="registerForm.password" required>
              </div>
              <div class="mb-3">
                <label class="form-label text-white">Confirm Password</label>
                <input type="password" class="form-control form-control-dark" v-model="registerForm.confirmPassword" required>
              </div>
              <button type="submit" class="btn btn-header w-100">Register</button>
              <div class="text-center mt-2">
                <small class="text-white">Already have an account? 
                  <a href="#" @click.prevent="toggleForm" class="text-decoration-none text-warning">Login</a>
                </small>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div class="modal-backdrop fade show" v-if="showModal"></div>
  </div>
</template>

<style scoped>
.modern-modal {
  background-color: rgba(191, 93, 36, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-header {
  background-color: #BF5D24;
  border-color: #BF5D24;
  color: white;
  transition: all 0.3s ease;
}

.btn-header:hover {
  background-color: #A64521;
  border-color: #A64521;
  transform: scale(1.03);
}

.form-control-dark {
  background-color: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  border-radius: 0.5rem;
}

.form-control-dark:focus {
  background-color: rgba(255,255,255,0.15);
  border-color: #BF5D24;
  color: white;
  box-shadow: 0 0 5px rgba(255, 93, 36, 0.5);
}

.btn-close-white {
  filter: invert(1);
}
</style>
