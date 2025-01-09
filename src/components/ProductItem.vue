<script setup>
import { ElMessage } from "element-plus"
import { defineProps, computed } from "vue"
import { RouterLink } from "vue-router"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/cart"
import { useExchangeRateStore } from "@/stores/exchangeRates"
const CartStore = useCartStore()
const ExchangeRateStore = useExchangeRateStore()
const {} = storeToRefs(CartStore)
const { currentRate } = storeToRefs(ExchangeRateStore)

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  frontImg: {
    type: String,
  },
  backImg: {
    type: String,
  },
})

const URL = `/products/${props.id}`
// 加入購物車
const getCurrencySymbol = computed(() => {
  return currentRate.value.symbol || "NT"
})

const handleAddToCart = async () => {
  await CartStore.addProduct(props.id, 1, props.title, props.frontImg, props.price, props.originalPrice)
}
</script>

<template>
  <div
    class="productContainer rounded-lg text-yellow-950 bg-white duration-300 ease-in-out hover:text-white hover:bg-[#6A88BE] relative px-4 pt-4 lg:static shadow-md"
  >
    <RouterLink :to="URL">
      <div class="w-full bg-center bg-cover rounded-lg overflow-hidden" :style="{ backgroundImage: `url(${props.backImg})` }">
        <img class="frontImg w-full object-cover align-bottom aspect-square" :src="props.frontImg" alt="戒指" />
      </div>
      <div class="px-2.5 pt-2.5 pb-7 mb-6 text-center lg:relative lg:mb-0">
        <p class="text-sm my-2 lg:text-base font-semibold">{{ props.title }}</p>
        <p class="mt-4 text-sm lg:text-[18px] font-semibold text-amber-400">
          {{ getCurrencySymbol }} {{ ExchangeRateStore.calConvertedPrice(Number(props.price)).toLocaleString() }}
        </p>
        <p class="mt-2 text-xs lg:text-base text-slate-400 line-through decoration-slate-400">
          {{ getCurrencySymbol }} {{ ExchangeRateStore.calConvertedPrice(Number(props.originalPrice)).toLocaleString() }}
        </p>
        <button
          @click.prevent="handleAddToCart"
          class="cartButton absolute bottom-4 left-4 right-4 h-8 rounded bg-[#C9D9F0] hover:bg-[#a6caff] text-zinc-600 hover:text-white opacity-95 hover:opacity-100 font-semibold border-l-neutral-300 lg:h-10 lg:left-8 lg:right-8 lg:top-[-50px] lg:hidden"
        >
          <i class="fa-solid fa-cart-shopping lg:hidden"></i>
          <p class="hidden lg:block lg:text-sm lg:py-3">加入購物車</p>
        </button>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.productContainer:hover .frontImg {
  opacity: 0;
  transition-duration: 500ms;
}

.productContainer:hover .cartButton {
  display: block;
}

@media screen and (992px <=width) {
  .cartButton:hover {
    @apply bg-[#314e86] text-white duration-700;
  }
}
</style>
