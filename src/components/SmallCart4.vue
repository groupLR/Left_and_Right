<template>
    <div>
      <!-- 遮罩層 -->
      <div
        v-if="isCartOpen"
        class="overlay"
        @click="closeCart"
      ></div>
  
      <!-- 手提包按鈕 -->
      <div>
        <!-- 小購物車面板 -->
        <div v-if="isCartVisible" class="shoppingCart">
          <!-- 小購物車內容 -->
        </div>
      </div>
  
      <!-- 購物車面板 -->
      <div
        class="cartPanel"
        :class="{ active: isCartOpen }"
        @click.stop
      >
        <div class="cartHeader"></div>
  
        <div
          class="cartContent"
          :class="{ empty: cartItems.length === 0 }"
        >
          <!-- 如果購物車為空 -->
          <p
            v-if="cartItems.length === 0"
            class="emptyCart"
          >
            你的購物車是空的
          </p>
  
          <!-- 購物車內的商品 -->
          <div
            v-for="(item, index) in cartItems"
            :key="index"
            class="cartItem"
          >
            <a :href="item.link" target="_blank"><img :src="item.img" alt="商品圖片"></a>
            <span class="productName">{{ item.name }}</span>
            <br>
            <div class="price">
              <span>{{ item.quantity }} x </span>
              <span>$ {{ item.price.toFixed(2) }}</span>
              <span>{{ item.currency }}</span>
            </div>
            <button @click="removeItem(index)" class="removeBtn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
  
          <div class="cartFooter" v-if="cartItems.length > 0">
            <router-link to="/Cart" class="checkoutBtn">
              訂單結帳
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- <Cart/> -->
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Cart from "@/views/Cart.vue";
  // 接收父組件傳遞的 `isCartOpen` prop
  const props = defineProps({
    isCartOpen: Boolean,
  });
  
  // 購物車商品列表
  const cartItems = ref([
    {
      img: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671205b47fcc46000cc5dda1/200x200f.webp?source_format=jpg",
      name: "哥特蝴蝶夾式耳環 / Goth Butterfly Ear Clip",
      quantity: 1,
      price: 33.26,
      currency: "TWD",
      link: "https://www.bonnyread.com.tw/products/gothbutterflyearclip",
    },
    {
      img: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6710cd82fe19ec0011fb7f3a/400x400f.webp?source_format=jpg",
      name: "[預購] [銀針] 宇宙星鑽耳環 / Cosmic Diamond Earring",
      quantity: 1,
      price: 20.02,
      currency: "TWD",
      link: "https://www.bonnyread.com.tw/products/cosmicdiamondearring",
    },
    {
      img: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6710c5108e7459000d47f2a2/200x200f.webp?source_format=jpg",
      name: "[預購] [純銀] 紛亂世界戒指 / Chaotic World Ring",
      quantity: 1,
      price: 15.13,
      currency: "TWD",
      link: "https://www.bonnyread.com.tw/products/chaoticworldring",
    },
  ]);
  
  // 發送關閉購物車事件
  const emit = defineEmits(["updateCartStatus"]);
  // 修改開關購物車的邏輯
const openCart = () => {
  emit('updateCartStatus', true); // 通知父組件開啟購物車
  document.body.style.overflow = 'hidden'; // 禁止背景滾動
};
  // 控制購物車開關
  const closeCart = () => {
    emit("updateCartStatus", false);
    document.body.style.overflow = ""; // 恢復背景滾動
  };
  
  // 移除指定商品
  const removeItem = (index) => {
    cartItems.value.splice(index, 1);
  };
  </script>
  
  <style>
  /* 添加遮罩層樣式 */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
  }
  
  /* 基本樣式 */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  /* 手提包按鈕 */
  .cartIcon {
    position: fixed;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    z-index: 1000;
  }
  
  /* 購物車面板 */
  .cartPanel {
    position: fixed;
    top: 240px;
    right: -100%;
    width: 300px;
    max-height: 80vh;
    background-color: #ffffff;
    transition: right 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    z-index: 999;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    min-height: 160px;
  }
  
  .cartPanel.active {
    right: 80px;
  }
  
  /* 購物車頭部 */
  .cartHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cartHeader h2 {
    margin: 0;
    font-size: 18px;
  }
  
  /* 關閉按鈕 */
  .closeBtn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  /* 購物車內容 */
  .cartContent {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 0px 20px;
    position: relative;
    max-height: calc(80vh - 100px);
  }
  
  .cartContent.empty {
    max-width: 298px;
    max-height: 160px;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
  }
  
  /* 購物車底部 */
  .cartFooter {
    padding: 15px;
    flex-shrink: 0;
    position: sticky;
    background-color: #ffffff;
    bottom: 0;
  }
  
  .checkoutBtn {
    width: 100%;
    height: auto;
    max-width: 268px;
    max-height: 38px;
    padding: 6 12px;
    border: none;
    border-radius: 8px;
    font-size: 14pt;
    background-color: black;
    color: white;
    text-align: center;
    border: 1px solid #888;
  }
  
  .checkoutBtn:hover {
    background-color: white;
    color: black;
  }
  
  /* 購物車商品 */
  .cartItem {
    justify-content: space-between;
    align-items: center;
    font-size: calc(13px * var(--font-size-paragraph, 1));
    color: hsla(var(--page-text-h, 0deg), var(--page-text-s, 0%), 60%, 1);
    position: relative;
    padding-bottom: 50px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .price {
    position: absolute;
    font-size: calc(14px * var(--font-size-paragraph, 1));
    color: var(--page-text, #333);
    bottom: 10px;
    margin-top: 0;
  }
  
  .emptyCart {
    text-align: center;
    margin-top: 35px;
  }
  
  .removeBtn {
    font-family: FontAwesome;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  /* 手機版 (螢幕寬度小於768px) */
@media (max-width: 767px) {
  .cartPanel {
    width: 66.66%; /* 2/3寬度 */
    left: -66.66%;
    position: fixed;
    top: 0;
    min-height: 100vh; /* 高度延伸到螢幕底部，扣掉結帳按鈕高度 */ 
    max-height: 100vh; /* 限制高度不超過視窗高度 */
    transition: left 0.3s ease-in-out;
    z-index: 999;
    overflow-y: auto; /* 如果內容過多，允許滾動 */
  }
  .cartPanel.active {
    left: 0;
  }
  .checkoutBtn {
    max-height: 68px;
    max-width: 280px;
    width: 100%;
    height: auto;
    background-color: black;
    color: white;
    outline: none; /* 去除按鈕外框 */
    box-shadow: none; /* 去除陰影 */
  }
  .cartFooter {
    flex-shrink: 0; /* 修改：防止底部被壓縮 */
    position: sticky;
    bottom: 15px; /*與 padding: 15px; 相對應 */
    background-color: #ffffff;
    z-index: 1;
  }
  .cartContent {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 0px 20px;
    position: relative;
    scrollbar-width: thin;
  }
  .cartContent.empty {
    max-width: 298px;
    max-height: 160px;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
  }
  .emptyCart {
    text-align: center;
    margin-top: 35px;
  }
}

/* 平板版 (螢幕寬度介於768px到1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .cartPanel {
    width: 33.33%; /* 1/3寬度 */
    left: -33.33%;
    min-height: 100vh; /* 高度延伸到螢幕底部，扣掉結帳按鈕高度 */ 
    max-height: 100vh; /* 限制高度不超過視窗高度 */
    position: fixed;
    top: 0;
  }
  .cartPanel.active {
    left: 0;
  }
  .cartContent.empty {
    max-width: 298px;
    max-height: 160px;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
  }
  .emptyCart {
    text-align: center;
    margin-top: 35px;
  }
  .cartContent {
    flex: 1;
    overflow-y: auto;
    padding: 20px 20px 0px 20px;
    position: relative;
    scrollbar-width: thin;
  }
}

  </style>
  