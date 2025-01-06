<script setup>
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { debounce } from "lodash"
import ProductItem from "@/components/ProductItem.vue"
// import Sidebar from "@/components/Sidebar.vue"

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
    <div class="product-list grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :title="product.product_name"
        :price="product.sale_price"
        :originalPrice="product.original_price"
        :frontImg="product.front_image_path"
        :backImg="product.back_image_path"
        class="h-full"
      />
    </div>
  </div>
</template>

<style scoped>
.product-list {
  display: grid;
  gap: 2rem;
}

.productContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.productContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.productContainer:hover .cartButton {
  display: block;
}
.productContainer:hover img {
  opacity: 0;
  transition-duration: 500ms;
}
</style>
