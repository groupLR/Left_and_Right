<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';
import Footer from './views/Footer.vue'
import Carousel2 from './components/Carousel2.vue';
import StoreInfo4 from './components/StoreInfo4.vue';
</script>

<template>
  <header>
    <nav>
      <!-- <RouterLink to="/">Home</RouterLink> -->
      | 
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <!-- <RouterLink to="/products">products</RouterLink>
      |
      <RouterLink to="/store-info">store-info</RouterLink> -->
    </nav>
  </header>
  <!-- <RouterView /> -->
  <!-- <Carousel2/> -->
  <StoreInfo4/>
  <!-- <Footer /> -->
</template>

<style scoped></style>
