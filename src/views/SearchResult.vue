<script setup>
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps({
  keyword: String,
});

const products = ref([]);

const fetchProducts = async () => {
  try {
    console.log('傳遞的關鍵字:',  props.keyword);
    const response = await fetch(`http://localhost:3001/search?q=${props.keyword}`);
    if (!response.ok) {
      throw new Error('API 請求失敗');
    }
    products.value = await response.json();
  } catch (error) {
    console.error('獲取產品資料失敗:', error);
  }
};

// 當元件掛載時自動加載資料
onMounted(() => {
  fetchProducts();
});
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Product Grid -->
    <div class="product-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.product_name"
        class="productContainer"
      >
      <a href="#">
        <div
          class="w-full bg-center bg-cover"
          :style="{ backgroundImage: `url(${product.image_path})`, height: '300px', width: '100%'  }"
        >
          <img class="frontImg w-full object-cover" :src="product.image_path" alt="商品圖片">
        </div>
        <div class="px-2.5 pt-2.5 pb-7 mb-6 text-center lg:relative lg:mb-0">
          <p class="mb-1 text-sm">{{ product.product_name }}</p>
          <p class="text-base font-black">NT${{ product.sale_price }}</p>
          <p class="mb-1 text-base text-gray-500 line-through" v-if="product.original_price">
            NT${{ product.original_price }}
          </p>
          <button class="cartButton absolute bottom-4 left-4 right-4 h-8 rounded bg-neutral-100 border-l-neutral-300 lg:bg-white lg:h-10  lg:left-8 lg:right-8 lg:-top-50px lg:hidden">
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
.productContainer:hover .frontImg{
  opacity: 0;
  transition-duration: 500ms;
}

.productContainer:hover .cartButton{
  display: block;
}

@media screen and (992px <= width) {
  
  .cartButton:hover{
    background-color: black;
    color: white;
    transition-duration: 500ms;
  }
}
  
</style>