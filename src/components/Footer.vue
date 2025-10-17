<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const showFooter = ref(false)

    // Function to check if mouse is near bottom
    const handleMouseMove = (e) => {
      const threshold = 50 // px from bottom
      const windowHeight = window.innerHeight
      if (windowHeight - e.clientY <= threshold) {
        showFooter.value = true
      } else {
        showFooter.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', handleMouseMove)
    })

    return { showFooter }
  }
}
</script>

<template>
  <footer
    class="modern-footer"
    :class="{ 'footer-visible': showFooter }"
  >
    <p class="text-black text-uppercase fw-bold mb-1 big">© Hotel Name</p>
    <div class="footer-content">
      <p class="mb-1 text-black small">Follow us on:</p>
      <div class="social-icons">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="facebook">
          <i class="fab fa-facebook-f fa-2x"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="instagram">
          <i class="fab fa-instagram fa-2x"></i>
        </a>
        <a href="https://x.com" target="_blank" aria-label="X (Twitter)" class="twitter">
          <i class="fab fa-x-twitter fa-2x"></i>
        </a>
        <a href="mailto:your@email.com" aria-label="Gmail" class="google">
          <i class="fab fa-google fa-2x"></i>
        </a>
        <a href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp" class="whatsapp">
          <i class="fab fa-whatsapp fa-2x"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
:root {
  --color-primary: #BF5D24;
  --color-bg: #F2F2F2;
}

.modern-footer {
  background-color: rgba(191, 93, 36, 0.4);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: -100px; /* hide by default */
  left: 0;
  padding: 0.1rem 0.9rem;
  font-size: 13px;
  transition: bottom 0.3s ease;
  z-index: 1000;
}

.footer-visible {
  bottom: 0; /* slide up when visible */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.3rem;
}

.social-icons a {
  transition: transform 0.3s ease, color 0.3s ease;
}

/* Default icon colors */
.facebook i { color: #3b5998; }
.instagram i { color: #ac2bac; }
.twitter i { color: #000000; }
.google i { color: #dd4b39; }
.whatsapp i { color: #25d366; }

/* Hover effects */
.social-icons a:hover {
  transform: scale(1.25);
}

.facebook:hover i { color: #5e77d0; }
.instagram:hover i { color: #d66ad0; }
.twitter:hover i { color: #444; }
.google:hover i { color: #ff6b57; }
.whatsapp:hover i { color: #4fff8c; }
</style>
