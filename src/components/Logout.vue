<script setup>
import { useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from "element-plus"

const STORAGE_KEY = "UID"
const STORAGE_JWT_KEY = "TwT"
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
  <div class="pt-6 pb-2 lg:py-5 lg:px-10">
    <div class="flex justify-end lg:max-w-[1358px] lg:mx-auto">
      <div class="text-white underline p-2 text-xs hover:cursor-pointer rounded-md bg-red-700 hover:font-bold hover:bg-red-400" @click="handleLogOut">
        <p><span>登出</span><font-awesome-icon :icon="['fas', 'right-from-bracket']" class="ml-2" /></p>
      </div>
    </div>
  </div>
</template>
