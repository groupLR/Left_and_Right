<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';

</script>

<template>
  <header>
    <nav>
      <!-- <RouterLink to="/">Home</RouterLink> -->
      <!-- <RouterLink to="/about">About</RouterLink> -->
    </nav>

  </header>
  <main>
    <HomeView />
  </main>
  <!-- <RouterView /> -->
</template>

<style scoped></style>
