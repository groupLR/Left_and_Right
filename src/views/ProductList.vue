<script setup>
import ProductItem from "@/components/ProductItem.vue"
import Sidebar from "@/components/Sidebar.vue"
import { ref, watch } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useProductStore } from "@/stores/products"
import { ElSkeleton, ElSkeletonItem } from "element-plus"

const route = useRoute()
const ProductStore = useProductStore()
const { categoryTitle, productList, pageValue, sortValue, sortOptions, pageOptions, currentPage, pageSize, totalProductCount } = storeToRefs(ProductStore)

// 監聽路由參數變化
watch(
  () => route.params.category,
  async (newCategory) => {
    isLoading.value = true
    try {
      await ProductStore.fetchProductList(newCategory || "")
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 500) // 添加一個小延遲確保數據都準備好了
    }
  },
  { immediate: true }
)
</script>

<template>
  <section class="px-4 flex max-w-[1340px] mx-auto justify-center">
    <Sidebar />
    <div class="flex-1">
      <div class="headerContainer px-1 mb-2 md:flex items-center">
        <h1 class="py-5 text-xl">{{ categoryTitle }}</h1>
        <!-- 排序 -->
        <div class="selectContainer flex">
          <div class="pageSelectItem flex items-center relative mr-3 flex-1">
            <i class="fa-solid fa-arrow-up-short-wide absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <el-select placement="bottom" :fallback-placements="['bottom-start']" v-model="sortValue" placeholder="商品排序" size="large" class="pl-10">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="ProductStore.handleSortChange(route.params.category, item.value)"
              />
            </el-select>
          </div>
          <!-- 每頁資料筆數 -->

          <div class="pageSelectItem flex items-center relative flex-1">
            <i class="fa-solid fa-bars fa-rotate-90 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <el-select placement="bottom" :fallback-placements="['bottom-start']" v-model="pageValue" placeholder="每頁顯示 12 個" size="large" class="pl-10">
              <el-option
                class="selectOption"
                v-for="item in pageOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @click="ProductStore.handlePageSizeChange(route.params.category, item.value)"
              />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 產品列表 -->
      <div class="flex flex-wrap">
        <ProductItem
          v-for="(item, index) in productList"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :price="item.price"
          :originalPrice="item.originalPrice"
          :frontImg="item.frontImg"
          :backImg="item.backImg"
        />
      </div>

      <!-- 分頁 -->
      <div class="flex justify-center md:relative md:mb-12">
        <vue-awesome-paginate
          class="md:absolute md:right-0 text-gray-500 text-sm"
          :total-items="totalProductCount"
          :items-per-page="pageSize"
          :max-pages-shown="5"
          v-model="currentPage"
          @click="ProductStore.paginationOnClickHandler(route.params.category, currentPage, 'list')"
          :hide-prev-next-when-ends="true"
        />
      </div>
    </div>
  </section>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  padding: 6px 12px;
  cursor: pointer;
  color: black;
}

.active-page {
  font-weight: 700;
  border-bottom: 2px solid black;
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
</style>

<style scoped>
.headerContainer {
  justify-content: space-between;
}

.pageSelectItem {
  border-bottom: 1px solid black;
}

:deep(.el-select__placeholder span) {
  color: #000;
}

:deep(.el-select__wrapper),
:deep(.el-select__wrapper.is-hovering) {
  box-shadow: 0 0 0 0px #fff inset;
}

:deep(.el-select__caret) {
  color: #000;
}

:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 0px #fff inset;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 0px #fff inset;
}

.el-select-dropdown__item.is-selected {
  background-color: #f5f5f5;
  color: #000;
  font-weight: 400;
}

.el-select-dropdown__item.is-hovering {
  background-color: #000;
  color: #fff;
}

/* Skeleton 相關樣式 */
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

@media screen and (768px <= width) {
  .pageSelectItem {
    width: 200px;
    height: 50px;
  }

  .el-select--large .el-select__wrapper {
    padding: 4px;
  }
}
</style>
