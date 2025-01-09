<script setup>
import { useRoute, RouterView } from "vue-router"
import { computed } from "vue"
import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"
const route = useRoute()

const shouldShowFooter = computed(() => {
  return !route.path.startsWith("/Cart") && !route.path.startsWith("/Debit")
})
</script>

<template>
  <header>
    <NavBar />
  </header>
  <div class="bg-slate-100">
    <RouterView />
  </div>

  <el-backtop :right="50" :bottom="50" />
  <Footer v-if="shouldShowFooter" />
</template>

<style scoped>
:deep(.el-icon) {
  color: #000;
}
</style>
