<script setup>
import { RouterLink } from "vue-router"
import { ElMessage } from "element-plus"
import Warning from "./Warning.vue"
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
const userId = localStorage.getItem("UID")
const deleteSharedCart = async () => {
  await SharedCartStore.deleteSharedCart(props.id)
  await SharedCartStore.fetchSharedCartList(userId)
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
          <button class="hidden md:block border px-4 py-1 rounded border-solid border-[#6A88BE] bg-[#C9D9F0] text-black hover:bg-[#6A88BE] hover:text-white">
            查看
          </button>

          <!-- 刪除按鈕 -->
          <div class="hidden md:block" @click.prevent>
            <Warning content="您確定要刪除共享購物車嗎？" @confirm="deleteSharedCart" />
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
