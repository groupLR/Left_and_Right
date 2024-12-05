<script setup>
import ProductItem from "@/components/ProductItem.vue";
import { ref,computed,onMounted, watch } from "vue"
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'
import SmallCart4 from "@/components/SmallCart4.vue";

const route = useRoute()
const productStore = useProductStore()
const cartVisible = ref(false); // 控制 SmallCart 的顯示
const { categoryTitle,productList, pageValue, sortValue, sortOptions, pageOptions, currentPage, itemsPerPage, paginatedProducts, paginationOnClickHandler  } = storeToRefs(productStore)
const toggleCart = () => {
  cartVisible.value = !cartVisible.value;
};

// 監聽路由參數變化
watch(() => route.params.category, async (newCategory) => {
  // 如果沒有 category 參數，使用空字串呼叫 API
  await ProductStore.fetchProductList(newCategory || '')
}, { immediate: true })

onMounted(async () => {
  const category = route.params.category || ''
  await ProductStore.fetchProductList(category)
})

// 處理加入購物車的事件
const handleAddToCart = (product) => {
  productStore.addToCart(product); // 呼叫 Pinia store 的方法
  productStore.toggleCartVisibility(true); // 確保購物車被顯示
};
// 从购物车删除商品
const removeFromCart = (itemId) => {
  productStore.removeFromCart(itemId);  // 使用 Pinia store 的方法从购物车中删除商品
};


// 更新购物车商品数量
const updateQuantity = (itemId, quantity) => {
  productStore.updateQuantity(itemId, quantity);  // 使用 Pinia store 的方法更新商品数量
};

// 计算购物车内商品的总数量
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});



</script>


<template>
  <section class=" px-4 py-3">
    <div class="headerContainer px-1 mb-2 md:flex items-center">
      <h1 class=" py-5 text-xl">{{ categoryTitle }}</h1>
      <!-- 排序 -->
      <div class="flex selectContainer">
        <div class="relative flex items-center flex-1 mr-3 pageSelectItem">
          <i class="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-arrow-up-short-wide left-3 top-1/2"></i>
          <el-select placement="bottom" :fallback-placements="['bottom-start']" v-model="sortValue" placeholder="商品排序" size="large" class="pl-10">
            <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <!-- 每頁資料筆數 -->
        <div class="pageSelectItem  flex items-center relative flex-1">
          <i class="fa-solid fa-bars fa-rotate-90 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <el-select placement="bottom" :fallback-placements="['bottom-start']" v-model="pageValue"
            placeholder="每頁顯示 6 個" size="large" class="pl-10">
            <el-option class="selectOption" v-for="item in pageOptions" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </div>

    </div>

    <!-- 產品列表 -->
    <div class="flex flex-wrap">
      <ProductItem v-for="(item, index) in paginatedProducts" :key="item.id" :id="item.id" :title="item.title" :price="item.price"
      :originalPrice="item.originalPrice" :frontImg="item.frontImg" :backImg="item.backImg" @addToCart="handleAddToCart"
    @removeFromCart="removeFromCart"
    @updateQuantity="updateQuantity"
    class="md:col-6 lg:col-3"/>
      <!-- 顯示 coBrandingProductList 商品 -->
  <!-- <ProductItem
    v-for="item in coBrandingProductList"
    :key="item.id"
    :id="item.id"
    :title="item.title"
    :price="item.price"
    :originalPrice="item.originalPrice"
    :frontImg="item.frontImg"
    :backImg="item.backImg"
    @addToCart="handleAddToCart"
    @removeFromCart="removeFromCart"
    @updateQuantity="updateQuantity"
    class="md:col-6 lg:col-3"
  /> -->
</div>

<div class="flex flex-wrap">
  <!-- 顯示 productList 商品 -->
  <!-- <ProductItem
    v-for="item in productList"
    :key="item.id"
    :id="item.id"
    :title="item.title"
    :price="item.price"
    :originalPrice="item.originalPrice"
    :frontImg="item.frontImg"
    :backImg="item.backImg"
    @addToCart="handleAddToCart"
    @removeFromCart="removeFromCart"
    @updateQuantity="updateQuantity"
    class="md:col-6 lg:col-3"
  /> -->
</div>

<!-- 顯示小購物車，只顯示一次 -->
<SmallCart4 :visible="cartVisible" :cartItems="productStore.cartItems" />


    <!-- 分頁 -->
    <div class="flex justify-center md:relative md:mb-12">
      <vue-awesome-paginate class="text-sm text-gray-500 md:absolute md:right-0" :total-items="productList.length"
        :items-per-page="itemsPerPage" :max-pages-shown="5" v-model="currentPage" @click="paginationOnClickHandler"
        :hide-prev-next-when-ends="true" link-url="/products?page=[page]" />
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


:deep(.el-select__placeholder span){
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
:deep(.el-select__wrapper.is-focused){
  box-shadow: 0 0 0 0px #fff inset;
}

:deep(.el-select__wrapper.is-hovering:not(.is-focused)){
  box-shadow: 0 0 0 0px #fff inset;
}

/* option 的 hover 樣式 */
.el-select-dropdown__item.is-selected {
  background-color: #f5f5f5;
  color: #000;
  font-weight: 400;
}



.el-select-dropdown__item.is-hovering{
  background-color: #000;
  color: #fff;
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