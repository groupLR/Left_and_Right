<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const goHome = () => {
  router.push("/")
}
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <el-empty image="/LRlogo.jpg" />
    <el-button class="mb-60" type="primary" @click="goHome">返回首頁</el-button>
  </div>
</template>
