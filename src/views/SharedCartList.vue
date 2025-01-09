<script setup>
import SharedCartItem from "@/components/SharedCartItem.vue"
import AddSharedCart from "@/components/AddSharedCart.vue"
import { storeToRefs } from "pinia"
import { useSharedCartStore } from "@/stores/sharedCart"
import { onMounted } from "vue"
const SharedCartStore = useSharedCartStore()
const { sharedCartList } = storeToRefs(SharedCartStore)

onMounted(async () => {
  const userId = localStorage.getItem("UID")
  await SharedCartStore.fetchSharedCartList(userId)
})
</script>

<template>
  <div class="flex flex-col justify-center max-w-[1340px] mx-auto pt-5 pb-10 px-10">
    <div class="bg-gray-100 my-5 flex font-bold">
      <!-- <i class="fa-brands fa-shopify text-xl"></i> -->
      <h1 class="text-2xl ml-2">共享購物車</h1>
    </div>
    <div class="w-full p-4 flex justify-center border border-solid rounded-xl border-gray-100 min-h-80 bg-white">
      <div v-if="sharedCartList.length == 0" class="m-auto">
        <p class="text-[#314e86] mb-3 font-medium">您還沒有共享購物車</p>
        <div class="mx-auto flex justify-center"><AddSharedCart /></div>
      </div>
      <div v-else class="w-full">
        <div class="mx-auto flex justify-end mb-4">
          <AddSharedCart />
        </div>
        <SharedCartItem v-for="(item, _index) in sharedCartList" :key="item.id" :id="item.id" :name="item.name" :member="item.member" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
