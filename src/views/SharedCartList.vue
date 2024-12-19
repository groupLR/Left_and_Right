<script setup>
import SharedCartItem from "@/components/SharedCartItem.vue"
import AddSharedCart from "@/components/AddSharedCart.vue"
import { storeToRefs } from "pinia"
import { useSharedCartStore } from "@/stores/sharedCart"
import { onMounted } from "vue"
const SharedCartStore = useSharedCartStore()
const { sharedCartList } = storeToRefs(SharedCartStore)

onMounted(async () => {
  await SharedCartStore.fetchSharedCartList()
})
</script>

<template>
  <div class="bg-gray-100 m-5 mb-[-20px] p-2 flex items-center">
    <i class="fa-brands fa-shopify ml-4 text-xl"></i>
    <h1 class="text-lg font-bold ml-2">共享購物車</h1>
  </div>
  <div class="p-4 flex flex-col border-2 border-solid border-gray-100 rounded-b m-5 min-h-80">
    <div v-if="sharedCartList.length == 0" class="m-auto">
      <p class="text-gray-500">您還沒有共享購物車</p>
      <AddSharedCart />
    </div>
    <div v-else>
      <div class="flex justify-end mb-4">
        <AddSharedCart />
      </div>
      <SharedCartItem v-for="(item, index) in sharedCartList" :key="item.id" :id="item.id" :name="item.name" :member="item.member" />
    </div>
  </div>
</template>

<style scoped></style>
