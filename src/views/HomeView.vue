<script setup>
</script>

<template>
  <div class="title-container position-relative text-center">
    <img class="title-img img-fluid" src="/images/about/lobby2.jpg" alt="Hotel Lobby" />

    <div class="title-text text-white d-flex flex-column align-items-center justify-content-center">
      <h1 class="title display-5 fw-bold mb-3">
        Eleganz seit 1476 – Willkommen im Hotel Vue
      </h1>
      <p class="title-p lead mb-4">
        Tradition, Charme und ein Gastgeber, der niemals schläft…
      </p>
      <div class="d-flex flex-wrap justify-content-center gap-2 w-100 px-3">
        <b-button variant="primary" class="btn flex-fill flex-md-grow-0">
          Zimmer buchen
        </b-button>
        <b-button variant="secondary" class="btn flex-fill flex-md-grow-0">
          Das Hotel entdecken
        </b-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  width: 100%;
  overflow: hidden;
}

.title-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
}

.title-text {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5); 
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  padding: 2rem;
}

.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

.title-p {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

.btn {
    width: auto;
    flex: 0 0 auto !important;
    display: inline-block;
  font-size: 1rem;
  min-width: 150px;
  padding: 0.75rem 1rem;
  border: none;
  white-space: nowrap;
}

.btn:hover{
    background-color: var(--color-primary1);
}

.btn-primary{
    background-color: var(--color-primary);
}

.btn-secondary{
    background-color: var(--color-secondary);
}

</style>
