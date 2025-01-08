<script setup>
import axios from "axios"
import { ref, onMounted, watch, computed } from "vue"
import { useRoute } from "vue-router"
import { debounce } from "lodash"
import ProductItem from "@/components/ProductItem.vue"
import Sidebar from "@/components/Sidebar.vue"
import { ElSkeleton, ElSkeletonItem } from "element-plus"

// 獲取當前路由
const route = useRoute()

// 定義產品列表的響應式變量
const products = ref([])
const noResult = ref(false)
const isLoading = ref(true)

// 定義計算屬性來獲取當前的關鍵字
const keyword = computed(() => {
  const q = route.query.q || ""
  return q
})

// 定義一個防抖函數，用於獲取產品資料
const fetchProducts = debounce(async () => {
  if (keyword.value) {
    isLoading.value = true
    try {
      // 發送請求到後端 API 獲取產品資料
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(keyword.value)}`)
      if (!data) {
        throw new Error("API 請求失敗")
      }

      noResult.value = false
      products.value = []

      if (data.message === "查無資料") {
        noResult.value = true
      }
      products.value = data
    } catch (error) {
      console.error("獲取產品資料失敗:", error)
    } finally {
      // 添加小延遲使 loading 效果更流暢
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }
}, 800)

// 當元件掛載時自動加載資料
onMounted(() => {
  noResult.value = false
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
  <section class="flex max-w-[1340px] justify-center mx-auto">
    <Sidebar />

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="flex-1 px-6">
      <!-- 搜尋關鍵字 Skeleton -->
      <div class="pt-4">
        <el-skeleton animated>
          <template #template>
            <el-skeleton-item variant="text" style="width: 200px; height: 32px" />
          </template>
        </el-skeleton>
      </div>

      <!-- 商品列表 Skeleton -->
      <div class="container mx-auto py-5">
        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="h-full">
            <el-skeleton animated>
              <template #template>
                <div class="product-skeleton">
                  <!-- 商品圖片 Skeleton -->
                  <el-skeleton-item variant="image" class="w-full aspect-square" />
                  <!-- 商品標題 Skeleton -->
                  <div class="mt-3">
                    <el-skeleton-item variant="text" style="width: 80%; height: 20px" />
                  </div>
                  <!-- 商品價格 Skeleton -->
                  <div class="mt-2 flex gap-2">
                    <el-skeleton-item variant="text" style="width: 40%; height: 20px" />
                    <el-skeleton-item variant="text" style="width: 40%; height: 20px" />
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </div>
      </div>
    </div>

    <!-- 實際內容 -->
    <div v-else-if="noResult" class="w-full h-full">
      <h1 class="px-6 pt-4 text-xl font-medium">搜尋頁面為：{{ keyword }}</h1>
      <el-empty description="查無結果" class="h-[500px] flex justify-center items-center" />
    </div>
    <div v-else class="flex-1">
      <div class="px-1 mb-2">
        <h1 class="px-6 pt-4 text-xl font-medium">搜尋頁面為：{{ keyword }}</h1>
        <div class="container mx-auto px-4 py-5">
          <div class="product-list grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductItem
              v-for="product in products"
              :key="product.product_id"
              :id="product.product_id"
              :title="product.product_name"
              :price="product.sale_price"
              :originalPrice="product.original_price"
              :frontImg="product.front_image_path"
              :backImg="product.back_image_path"
              class="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
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

/* Skeleton 相關樣式 */
.product-skeleton {
  @apply flex flex-col;
}

:deep(.el-skeleton__paragraph) {
  padding: 0;
}

:deep(.el-skeleton__text) {
  background-color: #f3f4f6;
  height: 100%;
}

:deep(.el-skeleton__image) {
  background-color: #f3f4f6;
}

/* Skeleton 動畫效果 */
@keyframes skeleton-loading {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.7;
  }
}

:deep(.el-skeleton) {
  width: 100%;
}

:deep(.el-skeleton__item) {
  background: #f2f2f2;
}

:deep(.el-skeleton.is-animated .el-skeleton__item) {
  animation: skeleton-loading 1.4s ease infinite;
}

/* Product Skeleton 圖片比例 */
.product-skeleton :deep(.el-skeleton__image) {
  aspect-ratio: 1;
  width: 100%;
}
</style>
