<script setup>
import { ref } from "vue"
import axios from "axios"

const userId = localStorage.getItem("UID")

const props = defineProps({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  originalPrice: {
    type: String,
  },
  salePrice: {
    type: String,
  },
  imgPath: {
    type: String,
  },
  quantity: {
    type: Number,
  },
})

const emits = defineEmits(["updateQuantity", "deleteProduct"])
// 編輯購買數量
const counter = ref(props.quantity)
const increase = () => {
  counter.value++
  emits("updateQuantity", { id: props.id, quantity: counter.value })
}

const decrease = () => {
  if (counter.value > 1) {
    counter.value--
    emits("updateQuantity", { id: props.id, quantity: counter.value })
  }
}

// 刪除商品 - 只發送事件到父元件
const handleDelete = () => {
  emits("deleteProduct", props.id)
}
</script>
<template>
  <div class="flex p-4 md:p-5 border-b-2">
    <div class="min-w-[60px] w-[20%] align-bottom mr-4 flex text-xs md:text-base">
      <img class="object-cover aspect-square" :src="props.imgPath" :alt="props.name" />
    </div>
    <div class="w-[80%] flex flex-col gap-2 md:justify-between">
      <div class="flex justify-between items-center">
        <p class="text-sm md:text-lg">{{ props.name }}</p>
        <!-- 刪除按鈕 -->
        <button @click="handleDelete">
          <i class="fa-solid fa-trash m-2 text-sm md:text-xl text-red-400"></i>
        </button>
      </div>
      <div class="flex gap-2 items-center">
        <span class="font-black text-orange-500 text-sm md:text-base">NT${{ Number(props.salePrice).toLocaleString() }}</span>
        <span class="line-through text-gray-400 text-xs md:text-sm">NT${{ Number(props.originalPrice).toLocaleString() }}</span>
      </div>
      <!-- 數量 -->
      <div class="flex justify-end md:justify-end">
        <div class="max-w-[200px] w-full h-[24px] flex md:h-[36px] my-2.5">
          <button class="rounded-lg border border-gray-300 bg-gray-50 h-[24px] w-[45px] text-base md:h-[36px] md:text-[20px]" @click="decrease">-</button>
          <input type="number" min="1" v-model="counter" class="border border-x-0 border-gray-300 w-full text-center" />
          <button class="rounded-lg border border-gray-300 bg-gray-50 h-[24px] w-[45px] text-sm md:h-[36px] md:text-[20px]" @click="increase">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
