<script>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthModal from './AuthModal.vue'

export default {
  name: 'Header',
  components: { AuthModal },
  setup() {

    const auth = useAuthStore()
    const showAuthModal = ref(false)

    const displayName = computed(() => {
      if (!auth.user) return ''
      return `${auth.user.firstname ?? ''} ${auth.user.lastname ?? ''}`.trim()
    })

    const openAuthModal = () => {
      showAuthModal.value = true
    }

    const closeAuthModal = () => {
      showAuthModal.value = false
    }

    const logout = () => {
      auth.logout()
    }

    return {
      auth,
      showAuthModal,
      openAuthModal,
      closeAuthModal,
      displayName,
      logout
    }
  }
}
</script>

<template>
  <header>
    <b-navbar toggleable="lg" type="dark" class="modern-navbar">
      <!-- Brand -->
      <b-navbar-brand href="#" class="d-flex align-items-center brand">
      
        <img
          src="@/assets/logo-w.png"
          alt="Vue Hotel Logo"
          class="logo me-2"
        />
        
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" class="ml-auto"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Main navigation -->
        <b-navbar-nav class="nav-center">
          <b-nav-item to="/" tag="router-link" class="nav-animated">Home</b-nav-item>
          <b-nav-item to="/rooms" tag="router-link" class="nav-animated">Rooms</b-nav-item>
          <b-nav-item to="/about" tag="router-link" class="nav-animated">About</b-nav-item>
          <b-nav-item to="/impressum" tag="router-link" class="nav-animated">Impressum</b-nav-item>

          <!-- User icon -->
          <b-nav-item
            v-if="!auth.isAuthenticated"
            @click="openAuthModal"
            class="user-icon nav-animated"
          >
            <i class="bi bi-person"></i> User
          </b-nav-item>

          <!-- User info & logout -->
          <template v-else>
            <b-nav-item class="nav-animated user-icon">
              <i class="bi bi-person-check"></i> {{ displayName || 'User' }}
            </b-nav-item>

            <b-nav-item
              @click="logout"
              class="user-icon nav-animated"
            >
              <i class="bi bi-box-arrow-right"></i> Logout
            </b-nav-item>
          </template>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Auth modal -->
    <AuthModal
      v-if="showAuthModal"
      @close="closeAuthModal"
    />
  </header>
</template>

<style scoped>
/* ⚠️ NICHT VERÄNDERT */
header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
}

/* Navbar */
.modern-navbar {
  background-color: rgba(191, 93, 36, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.modern-navbar .navbar-brand,
.modern-navbar .nav-link,
.user-icon i {
  color: white !important;
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav-animated:hover,
.user-icon:hover i {
  color: var(--color-bg) !important;
  transform: scale(1.15);
}

.nav-animated {
  border-radius: 8px;
  transition: all 0.3s ease;
  padding: 0.4rem 0.8rem;
}

.nav-animated:hover {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}

.user-icon i {
  font-size: 1rem;
  cursor: pointer;
}

.user-inline-menu {
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
}

.user-inline-menu .nav-animated {
  margin: 0.2rem 0;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease;
  list-style: none;
}

.user-inline-menu .nav-animated:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-bg) !important;
}

@media (max-width: 991px) {

  .logo { height: 20px; }

  .nav-center {
    justify-content: center !important;
    text-align: center !important;
    width: 100%;
  }
  .nav-center .nav-item {
    width: 100%;
    text-align: center;
  }
  .user-inline-menu.d-lg-none {
    align-items: center;
    margin-left: 0;
    width: 100%;
  }
  .user-icon {
    margin-right: 0.6rem;
  }
}
</style>
