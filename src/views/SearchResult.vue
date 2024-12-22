<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { debounce } from "lodash"

// 獲取當前路由
const route = useRoute()

// 定義產品列表的響應式變量
const products = ref([])

// 定義計算屬性來獲取當前的關鍵字
const keyword = computed(() => {
  const q = route.query.q || ""
  return q
})

// 定義一個防抖函數，用於獲取產品資料
const fetchProducts = debounce(async () => {
  if (keyword.value) {
    try {
      // 發送請求到後端 API 獲取產品資料
      const response = await fetch(`${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(keyword.value)}`) // 確保能正常地傳遞參數
      if (!response.ok) {
        throw new Error("API 請求失敗")
      }
      // 返回的 JSON 資料賦值給 products
      products.value = await response.json()
    } catch (error) {
      console.error("獲取產品資料失敗:", error)
    }
  }
}, 800) // 延遲800 ms

// 當元件掛載時自動加載資料
onMounted(() => {
  fetchProducts()
})

// 監視路由查詢的變化，並重新調用 API
watch(
  () => route.query.q,
  () => {
    fetchProducts()
  }
)
</script>

<template>
  <h2 class="px-6 pt-6 text-xl font-semibold">搜尋頁面為：{{ keyword }}</h2>
  <div class="container mx-auto px-4 py-8">
    <div class="product-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.product_name" class="productContainer">
        <a href="#">
          <div class="w-full bg-center bg-cover" :style="{ backgroundImage: `url(${product.image_path})` }">
            <img class="frontImg w-full object-cover aspect-square" :src="product.image_path" alt="商品圖片" />
          </div>
          <div class="px-2.5 pt-2.5 pb-7 mb-6 text-center lg:relative lg:mb-0">
            <p class="mb-1 text-sm">{{ product.product_name }}</p>
            <p class="text-base font-black">NT${{ product.sale_price }}</p>
            <p class="mb-1 text-base text-gray-500 line-through" v-if="product.original_price">NT${{ product.original_price }}</p>
            <button
              @click="handleAddToCart"
              class="cartButton absolute bottom-4 left-4 right-4 h-8 rounded bg-neutral-100 border-l-neutral-300 lg:bg-white lg:h-10 lg:left-8 lg:right-8 lg:top-[-50px] lg:hidden"
            >
              <i class="fa-solid fa-cart-shopping lg:hidden"></i>
              <p class="hidden lg:block lg:text-sm lg:py-3">加入購物車</p>
            </button>
          </div>
        </a>
      </div>
    </div>
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
    background-color: black;
    color: white;
    transition-duration: 500ms;
  }
}
</style>
