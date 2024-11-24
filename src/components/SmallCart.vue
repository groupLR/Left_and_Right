<template>
  <div>
    <!-- 遮罩層 -->
    <div
      v-if="isCartOpen"
      class="overlay"
      @click="closeCart"
    ></div>
    
    <!-- 手提包按鈕 -->
    <div
      class="cart-icon"
      @click="openCart"
    >
      👜
    </div>

    <!-- 購物車面板 -->
    <div
      class="cart-panel"
      :class="{ active: isCartOpen }"
      @click.stop
    >
      <div class="cart-header">
        <!-- <h2>購物車</h2> -->
        
      </div>

      <div
        class="cart-content"
        :class="{ empty: cartItems.length === 0 }"
      >
        <!-- 如果購物車為空 -->
        <p
          v-if="cartItems.length === 0"
          class="empty-cart"
        >
          你的購物車是空的
        </p>

        <!-- 購物車內的商品 -->
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="cart-item"
        >
        <a :href="item.link" target="_blank"><img :src="item.img" alt="商品圖片"></a>
        <span>{{ item.name }}</span>
        <br>
        <div class="price">
          <span>{{ item.quantity}} x </span>
          <span>$ {{ item.price.toFixed(2) }}</span>
          <span>{{ item.currency }}</span>
         </div>
         <button @click="removeItem(index)" class="remove-btn">
          <i class="fas fa-trash"></i> 
         </button>
      </div>

      <div
        class="cart-footer"
        v-if="cartItems.length > 0"
      >
        <button class="checkout-btn">訂單結帳</button>
      </div>
    </div>
  </div>
</div>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
</template>

<script setup>
import { ref } from "vue";
// import { useCartStore } from '@/stores/cart'  =>獲取使用者購買資料的代碼

// const cartStore = useCartStore()
// const cartItems = computed(() => cartStore.cartItems)
// 控制購物車顯示與隱藏
const isCartOpen = ref(false);

// 購物車商品列表
const cartItems = ref([ { img:"https://shoplineimg.com/53eb2bccb32b41ef6e000007/671205b47fcc46000cc5dda1/200x200f.webp?source_format=jpg",name: "哥特蝴蝶夾式耳環 / Goth Butterfly Ear Clip",quantity: 1, price: 33.26,currency: "TWD",link: "https://www.bonnyread.com.tw/products/gothbutterflyearclip" },
    { img: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6710cd82fe19ec0011fb7f3a/400x400f.webp?source_format=jpg", name: "[預購] [銀針] 宇宙星鑽耳環 / Cosmic Diamond Earring", quantity: 1, price: 20.02, currency: "TWD", link: "https://www.bonnyread.com.tw/products/cosmicdiamondearring" },
    { img: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6710c5108e7459000d47f2a2/200x200f.webp?source_format=jpg", name: "[預購] [純銀] 紛亂世界戒指 / Chaotic World Ring", quantity: 1, price: 15.13, currency: "TWD", link: "https://www.bonnyread.com.tw/products/chaoticworldring" },]);

// 修改開關購物車的邏輯
const openCart = () => {
  isCartOpen.value = true;
  document.body.style.overflow = 'hidden'; // 禁止背景滾動
};

const closeCart = () => {
  isCartOpen.value = false;
  document.body.style.overflow = ''; // 恢復背景滾動
};

// 移除指定商品
const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};
</script>

<style scoped>
/* 添加遮罩層樣式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  z-index: 998;
}

/* 基本樣式 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* 手提包按鈕 */
.cart-icon {
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
.cart-panel {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  max-height: 80vh; /* 修改：設定最大高度為視窗高度的 80% */
  /* max-height: calc(-186px + 100vh); */
  background-color: #ffffff;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  min-height: 160px;
}

.cart-panel.active {
  right: 80px;
}

/* 購物車頭部 */
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid transparent;
  flex-shrink: 0; /* 修改：防止頭部被壓縮 */
}

.cart-header h2 {
  margin: 0;
  font-size: 18px;
}

/* 關閉按鈕 */
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* 購物車內容 */
.cart-content {
  flex: 1;
  overflow-y: auto;
  /* padding: 15px; */
  position: relative;
  max-height: calc(80vh - 100px); /* 修改：減去頭部和底部的高度 */
  scrollbar-width: thin;
  
}
.cart-content::-webkit-scrollbar-thumb {
  display: none;
}

.cart-content::-webkit-scrollbar-button {
  display: none;
}
.cart-content.empty {
  max-width: 298px;
  max-height: 160px;
  width: 100%;
  height: auto;
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

/* 購物車底部 */
.cart-footer {
  padding: 15px;
  flex-shrink: 0; /* 修改：防止底部被壓縮 */
  position: sticky;
  bottom: 15px; /* 與 padding: 15px; 相對應 */
  background-color: #ffffff;
  z-index: 1;
  bottom: 0; /* 設定為 0，完全貼合底部 */
}

.checkout-btn {
  width: 100%;
  height: auto;
  max-width: 268px;
  max-height: 38px;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background-color: black;
  color: white;
}

/* 購物車商品 */
.cart-item {
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
  font-size: calc(13px* var(--font-size-paragraph, 1));
  color: hsla(var(--page-text-h, 0deg), var(--page-text-s, 0%), 60%, 1);
  position: relative;
  padding-bottom: 50px; /* 為價格預留空間 */
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.price{
  position: absolute;
  font-size: calc(14px* var(--font-size-paragraph, 1));
  color: var(--page-text, #333);
  bottom: 10px; /* 調整到底部 */
  left: 10px;
  /* bottom: 10px; */
  font-size: 14px;
  /* margin-top: 20px; */
  margin-top: 0; /* 移除原有的 margin-top */
  margin-left:10px;
}
/* 空購物車提示 */
.empty-cart {
  text-align: center;
  margin-top: 35px;
}
.remove-btn{
  content: '\f014';
  font-family: FontAwesome;
  position: absolute;
  /* right: 2px; */
  text-indent: 0;
  margin-top: 20px;
  /* margin-right:20px; */
  bottom: 10px; /* 與價格對齊 */
  right: 10px;
  margin-top: 0; /* 移除原有的 margin-top */
}
/* 手機版 (螢幕寬度小於768px) */
@media (max-width: 767px) {
  .cart-panel {
    width: 66.66%; /* 2/3寬度 */
    left: -66.66%;
    position: fixed;
    top: 0;
    min-height: 100vh;  /* 高度延伸到螢幕底部，扣掉結帳按鈕高度 */ 
    max-height: 100vh; /* 限制高度不超過視窗高度 */
    transition: left 0.3s ease-in-out;
    z-index: 999;
    overflow-y: auto; /* 如果內容過多，允許滾動 */
  }
  .cart-panel.active {
    left: 0;
  }
  .checkout-btn{
    max-height: 68px;
    max-width: 280px;
    width: 100%;
    height: auto;
    background-color: black;
    color: white;
    outline: none; /* 去除按鈕外框 */
    box-shadow: none; /* 去除陰影 */
  }
  .cart-footer {
  /* padding: 15px; */
  flex-shrink: 0; /* 修改：防止底部被壓縮 */
  position: sticky;
  bottom: 15px; /*與 padding: 15px; 相對應  */
  background-color: #ffffff;
  z-index: 1;
  bottom: 0; /* 設定為 0，完全貼合底部 */
}
.cart-content.empty {
  max-width: 298px;
  max-height: 160px;
  width: 100%;
  height: auto;
  /* display: flex; */
  align-items: center;
  justify-content: center;
}
.empty-cart {
  text-align: center;
  margin-top: 35px;
}


}

/* 平板版 (螢幕寬度介於768px到1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .cart-panel {
    width: 33.33%; /* 1/3寬度 */
    left: -33.33%;
    min-height: 100vh;  /* 高度延伸到螢幕底部，扣掉結帳按鈕高度 */ 
    max-height: 100vh; /* 限制高度不超過視窗高度 */
    position: fixed;
  }
  .cart-panel.active {
    left: 0;
  }
  /* .cart-content.empty {
  max-width: 298px;
  max-height: 160px;
  width: 100%;
  height: auto;
  /* display: flex; */
  /* align-items: center;
  justify-content: center;
} */ 
.empty-cart {
  text-align: center;
  margin-top: 35px;
}
}
</style>
