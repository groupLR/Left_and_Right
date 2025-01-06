<script setup>
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"

const STORAGE_KEY = "UID"
const STORAGE_JWT_KEY = "TwT"
const STORAGE_SELECTED_CURRENCY_KEY = "SCU"
const STORAGE_RATES_TIME_KEY = "GRT"
const router = useRouter()

const handleLogOut = () => {
  ElMessageBox.confirm("確定要登出嗎?", {
    confirmButtonText: "確認",
    cancelButtonText: "取消",
  })
    .then(() => {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STORAGE_JWT_KEY)
      ElMessage({
        type: "success",
        message: "登出成功",
      })
      //導向首頁
      router.push({
        name: "home",
      })
    })
    .catch(() => {
      ElMessage({
        type: "error",
        message: "登出失敗",
      })
    })
}
</script>
<template>
  <div class="flex my-5 px-5 justify-end mx-auto lg:px-0 lg:max-w-[1358px]">
    <div
      class="text-white underline p-2 text-xs hover:cursor-pointer border-0 border-solid border-red-400 rounded-md bg-red-700 hover:font-bold hover:bg-red-400 hover:border"
      @click="handleLogOut"
    >
      <p><span>登出</span><font-awesome-icon :icon="['fas', 'right-from-bracket']" class="ml-2" /></p>
    </div>
  </div>
</template>
