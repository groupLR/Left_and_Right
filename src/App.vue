<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';
import Footer from './views/Footer.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      | 
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <RouterLink to="/products">products</RouterLink>
      |
      <RouterLink to="/store-info">store-info</RouterLink>
      |
      <RouterLink to="/users/edit"><i class="fa-solid fa-user"></i></RouterLink>
    </nav>
  </header>
  <RouterView />
  <Footer />
</template>

<style scoped></style>
