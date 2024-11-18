<script setup>

import { createRouter, createWebHistory } from 'vue-router'
import Footer from './views/Footer.vue'
import AboutView from './views/AboutView.vue';
// import StoreInfo from './views/StoreInfo.vue';



import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue';


</script>

<template>
<div>

    <router-view></router-view>
<AboutView />
    <!-- 頁尾 -->
    <Footer />
    
  </div>


   <!-- <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        留兩個分頁給大家參考
      </nav>
  </header> -->

</template>
=======
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

