<script setup>
import { RouterLink } from "vue-router"
import { ElMessage } from "element-plus"
import { useSharedCartStore } from "@/stores/sharedCart"
const SharedCartStore = useSharedCartStore()

const props = defineProps({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  member: {
    type: Array,
  },
})
// 處理換頁
const URL = `/Cart/${props.id}`
// 刪除共享購物車
const deleteSharedCart = async () => {
  await SharedCartStore.deleteSharedCart(props.id)
  await SharedCartStore.fetchSharedCartList()
  const message = props.name ? `刪除 ${props.name} 成功` : "刪除共享購物車成功"
  ElMessage.success(message)
}
</script>

<template>
  <RouterLink :to="URL">
    <div class="w-full box-border border-2 border-solid border-gray-100 rounded my-2 shadow-sm">
      <div class="w-full box-border flex justify-between p-4">
        <div class="flex flex-row mx-1 items-center flex-wrap" v-if="props.name == null">
          <span>你與</span>
          <span class="mx-1">{{ props.member[0] }}</span>
          <span v-if="props.member.length >= 2">與其他 {{ props.member.length - 1 }} 個人</span>
          <span>的共享購物車</span>
        </div>
        <div class="flex flex-row mx-1 items-center" v-else>
          <span>{{ props.name }}</span>
        </div>
        <div class="flex">
          <button class="hidden md:block border px-4 py-1 rounded bg-black text-white hover:bg-emerald-300">查看</button>
          <!-- 刪除按鈕 -->
          <button class="hidden md:block ml-6" @click.prevent="deleteSharedCart"><i class="fa-solid fa-trash text-gray-400 hover:text-red-400"></i></button>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
