<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const showFooter = ref(false)

    const handleMouseMove = (e) => {
      const threshold = 50
      const windowHeight = window.innerHeight
      showFooter.value = windowHeight - e.clientY <= threshold
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
    <div class="footer-row">
      <p class="text-black text-uppercase fw-bold mb-1 big">© Hotel Vue</p>

      <p class="  text-black fw-bold mb-1 big follow-label">Follow us on:</p>

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

.modern-footer {
  background-color: rgba(191, 93, 36, 0.4);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 100%;
  position: fixed;
  bottom: -100px;
  left: 0;
  padding: 0.35rem 1rem; /* slightly smaller footer height */
  font-size: 13px;
  transition: bottom 0.3s ease;
  z-index: 1000;
}

.footer-visible {
  bottom: 0;
}

/* NEW — everything in one line */
.footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  width: 100%;
}

.follow-label {
  margin: 0;
}

/* Disable old stacked layout */
.footer-content {
  display: none;
}

.social-icons {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

/* adjust footer when mobile */
@media (max-width: 767px) {
  .follow-label {
    display: none;
  }

  .footer-row {
    gap: 0.5rem;
  }
  .modern-footer .big {
    font-size: 10px;
  }
}
</style>
