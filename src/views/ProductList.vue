<script setup>
import ProductItem from "@/components/ProductItem.vue"
import Sidebar from "@/components/Sidebar.vue"
import { watch } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useProductStore } from "@/stores/products"

const route = useRoute()
const ProductStore = useProductStore()
const { categoryTitle, productList, pageValue, sortValue, sortOptions, pageOptions, currentPage, pageSize, totalProductCount } = storeToRefs(ProductStore)

// 監聽路由參數變化
watch(
  () => route.params.category,
  async (newCategory) => {
    // 如果沒有 category 參數，使用空字串呼叫 API
    await ProductStore.fetchProductList(newCategory || "")
  },
  { immediate: true }
)
</script>

<template>
  <section class="px-4 flex max-w-[1340px] mx-auto justify-center">
    <Sidebar />
    <div class="flex-1">
      <div class="items-center px-1 mb-2 headerContainer md:flex">
        <h1 class="py-5 text-xl">{{ categoryTitle }}</h1>
        <!-- 排序 -->
        <div class="flex selectContainer">
          <div class="relative flex items-center flex-1 mr-3 pageSelectItem">
            <i class="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-arrow-up-short-wide left-3 top-1/2"></i>
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

          <div class="relative flex items-center flex-1 pageSelectItem">
            <i class="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-bars fa-rotate-90 left-3 top-1/2"></i>
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
          class="text-sm text-gray-500 md:absolute md:right-0"
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

<!-- 分頁的 style  -->
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
</style>

<!-- select 的 style -->
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

/* 去除邊框 */
:deep(.el-select__wrapper),
:deep(.el-select__wrapper.is-hovering) {
  box-shadow: 0 0 0 0px #fff inset;
}

:deep(.el-select__caret) {
  color: #000;
}

/* 去除 focused 時的邊框 */
:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 0px #fff inset;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)) {
  box-shadow: 0 0 0 0px #fff inset;
}

/* option 的 hover 樣式 */
.el-select-dropdown__item.is-selected {
  background-color: #f5f5f5;
  color: #000;
  font-weight: 400;
}

.el-select-dropdown__item.is-hovering {
  background-color: #000;
  color: #fff;
}

@media screen and (768px <=width) {
  .pageSelectItem {
    width: 200px;
    height: 50px;
  }

  .el-select--large .el-select__wrapper {
    padding: 4px;
  }
}
</style>
