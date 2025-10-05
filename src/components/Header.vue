<script>
import { RouterLink} from 'vue-router'

export default {
  name: 'Header'
}
</script>

<template>
      <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/impressum">Impressum</RouterLink>
      </nav>
  </header>
</template>

<style scoped>
header {
        background-color: lightgray;
  width: 100%;
  position: fixed;
  top: 0;
z-index: 1;
border-bottom: solid black;

}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>