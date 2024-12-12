<script setup>
import SharedCartItem from '@/components/SharedCartItem.vue';
</script>

<template>
  <div class=" bg-gray-100 m-5 mb-[-20px] p-2 flex items-center">
    <i class="fa-solid fa-people-carry-box ml-4"></i>
    <h1 class=" text-lg font-bold ml-2">共享購物車</h1>
  </div>
  <div class=" p-4 flex flex-col border-2 border-solid border-gray-100 rounded-b m-5">
    <SharedCartItem />
    <SharedCartItem />
  </div>
</template>

<style scoped>
</style>