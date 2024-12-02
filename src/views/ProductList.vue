<script setup >
import ProductItem from "@/components/ProductItem.vue";
import { ref,computed } from "vue"
import { storeToRefs } from "pinia";
import { useProductStore } from '@/stores/products'
import SmallCart4 from "@/components/SmallCart4.vue";

const productStore = useProductStore()
const cartVisible = ref(false); // 控制 SmallCart 的顯示
const { productList, cartItems, coBrandingProductList } = storeToRefs(productStore)
const toggleCart = () => {
  cartVisible.value = !cartVisible.value;
};

// select package => Element plus
const sortValue = ref('')


const sortOptions = [
  {
    label: '上架時間：由新到舊',
    value: 'latest',
  },
  {
    label: '上架時間：由舊到新',
    value: 'oldest',
  },
  {
    label: '價格：由高至低',
    value: 'expensive',
  },
  {
    label: '價格：由低至高',
    value: 'cheap',
  },
  {
    label: '銷量：由高至低',
    value: 'popular',
  },
]

const pageOptions = [
  {
    label: '每頁顯示 24 個',
    value: 'pageItem24',
  },
  {
    label: '每頁顯示 48 個',
    value: 'pageItem48',
  },
  {
    label: '每頁顯示 72 個',
    value: 'pageItem72',
  },
]
// 购物车商品
//const cartItems = ref([]);  购物车商品的数组
// 模擬的商品列表（來自 Pinia Store）
// const coBrandingProductList = productStore.coBrandingProductList;
// 處理加入購物車的事件
const handleAddToCart = (product) => {
  // console.log('Adding item to cart, itemId:', itemId);  // 打印商品 id，確保它正確
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
// 分頁 package
const pageValue = ref('')
const onClickHandler = (page) => {
  console.log(page);
};
const currentPage = ref(1);
// console.log('Item ID in Parent Component:', item.id);
// console.log("coBrandingProductList:", coBrandingProductList.value);
// console.log("productList:", productList.value);
</script>


<template>
  <section class="px-4 py-3 ">
    <div class="items-center px-1 mb-2 headerContainer md:flex">
      <h1 class="py-5 text-xl ">戒指 / Rings</h1>
      <div class="flex selectContainer">
        <div class="relative flex items-center flex-1 mr-3 pageSelectItem">
          <i class="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-arrow-up-short-wide left-3 top-1/2"></i>
          <el-select placement="bottom" :fallback-placements="['bottom-start']" v-model="sortValue" placeholder="商品排序" size="large" class="pl-10">
            <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <div class="relative flex items-center flex-1 pageSelectItem">
          <i class="absolute text-gray-500 transform -translate-y-1/2 fa-solid fa-bars fa-rotate-90 left-3 top-1/2"></i>
          <el-select placement="bottom"  :fallback-placements="['bottom-start']" v-model="pageValue" placeholder="每頁顯示 24 個" size="large" class="pl-10">
            <el-option class="selectOption" v-for="item in pageOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>

    </div>

    <!-- 產品列表 -->
    <div class="flex flex-wrap">
  <!-- 顯示 coBrandingProductList 商品 -->
  <ProductItem
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
  />
</div>

<div class="flex flex-wrap">
  <!-- 顯示 productList 商品 -->
  <ProductItem
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
  />
</div>

<!-- 顯示小購物車，只顯示一次 -->
<SmallCart4 :visible="cartVisible" :cartItems="productStore.cartItems" />


    <!-- 分頁 -->
    <div class="flex justify-center md:relative md:mb-12">
      <vue-awesome-paginate class="text-sm text-gray-500 md:absolute md:right-0" :total-items="productList.length"
        :items-per-page="2" :max-pages-shown="5" v-model="currentPage" @click="onClickHandler"
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
  /* height: 40px; */
  /* width: 40px; */
  /* border-radius: 20px; */
  cursor: pointer;
  /* background-color: rgb(242, 242, 242); */
  /* border: 1px solid rgb(217, 217, 217); */
  color: black;
}

/* .paginate-buttons:hover {
    background-color: #d8d8d8;
  } */

.active-page {
  font-weight: 700;
  /* background-color: #3498db; */
  border-bottom: 2px solid black;
  /* color: white; */
}

/* .active-page:hover {
    background-color: #2988c8;
  } */
</style>


<!-- select 的 style -->
<style scoped>

.headerContainer{
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