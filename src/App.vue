<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';

</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
       | 
      <!-- <RouterLink to="/about">About</RouterLink> -->
      <RouterLink to="/products">products</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped></style>
