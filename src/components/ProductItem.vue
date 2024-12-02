<script setup>
import { defineProps, defineEmits, ref} from 'vue';

// 接收商品數據作為 props
const props = defineProps({
  id: {
    type: [String, Number,],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  frontImg: {
    type: String,
    required: true,
  },
  backImg: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// 定義事件，通知父組件「加入購物車」
const emit = defineEmits(['addToCart']);

// 用於跟踪鼠標懸停狀態，控制按鈕顯示
const hovered = ref(false);

// 定義商品數據結構
const product = {
  id: props.id,
  title: props.title,
  price: props.price,
  frontImg: props.frontImg,
  backImg: props.backImg,
  quantity: 1, // 默認數量
};

// 添加商品至購物車
const handleAddToCart = (event) => {
  event.preventDefault(); // 阻止 <a> 默认行为（页面滚动）
  emit('addToCart', product); // 通知父組件商品已添加
};

// console.log('ProductItem received id:', props.id);
// console.log(`[ProductItem] Received ID: ${id}`); // 確認接收到的 id
</script>



<template>
  <div class="productContainer relative px-1.5 pt-1.5 pb-4 col-6 md:col-4 lg:static" :id="id" @mouseover="hovered = true" @mouseleave="hovered = false">

    
        <a :href="`/product/${props.id}`" class="w-full bg-center bg-cover " :style="{ backgroundImage: `url(${props.backImg})` }">
          <img class="object-cover w-full align-bottom frontImg "
            :src="props.frontImg"
            alt="商品圖">
        </a>
        
        <div class="px-2.5 pt-2.5 pb-7 mb-6 text-center lg:relative lg:mb-0">
            <p class="mb-1 text-sm">{{ props.title }}</p>
            <p class="text-base font-black ">NT${{ props.price }}</p>
            <p class="mb-1 text-base text-gray-500 line-through decoration-slate-400 ">NT${{ props.originalPrice }}</p>
          <!-- 加入購物車按鈕 -->
            <button  v-if="hovered" @click.prevent="handleAddToCart" class="absolute h-8 rounded cartButton bottom-4 left-4 right-4 bg-neutral-100 border-l-neutral-300 lg:bg-white lg:h-10 lg:left-8 lg:right-8 lg:-top-50px lg:hidden">
            <i class="fa-solid fa-cart-shopping lg:hidden"></i>
            <button  v-if="hovered" @click.prevent="handleAddToCart" class="hidden lg:block lg:text-sm lg:py-3">加入購物車</button>
          </button>
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