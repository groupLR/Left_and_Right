<script setup>
import SharedCartItem from '@/components/SharedCartItem.vue';
import { storeToRefs } from "pinia";
import { useSharedCartStore } from '@/stores/sharedCart'
import { onMounted } from 'vue';
const SharedCartStore = useSharedCartStore()
const { sharedCartList } = storeToRefs(SharedCartStore)

onMounted(async() =>{
  await SharedCartStore.fetchSharedCartList()
})

function getId (id){
  console.log(id);
  
}
</script>

<template>
  <div class=" bg-gray-100 m-5 mb-[-20px] p-2 flex items-center">
    <i class="fa-solid fa-people-carry-box ml-4"></i>
    <h1 class=" text-lg font-bold ml-2">共享購物車</h1>
  </div>
  <div class=" p-4 flex flex-col border-2 border-solid border-gray-100 rounded-b m-5 min-h-80">
    <div v-if="sharedCartList.length == 0" class=" m-auto">
      <p class="text-gray-500">您還沒有共享購物車</p>
      <button class="bg-black text-white rounded px-4 py-2 mt-4">新增共享購物車</button>
    </div>
    <div v-else>
      <div class="flex justify-end mb-4">
        <button class="text-gray-500 border-gray-400 border-solid border-2 rounded px-4 py-1 max-w-40">新增共享購物車</button>
      </div>
      <SharedCartItem v-for="(item, index) in sharedCartList" :key="item.id" :id="item.id" :name="item.name"
      :member="item.member" @click="getId(item.id)" />
    </div>
  </div>
</template>

<style scoped></style>