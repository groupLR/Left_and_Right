import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';

export const useProductStore = defineStore('cart', () => {
  const API_URL = 'http://localhost:3300'

  
// 购物车商品
const cartItems = ref([]); // 购物车商品的数组
const isCartVisible = ref(false);
// 添加商品到购物车
const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1; // 如果商品已在购物车中，数量加1
  } else {
    cartItems.value.push({ ...product, quantity: 1 }); // 否则新增商品
  }
  isCartVisible.value = true; // 每次添加商品後顯示購物車
};
const toggleCartVisibility = (visible) => {
  if (visible !== undefined) {
    isCartVisible.value = visible; // 明确控制显示/隐藏
  } else {
    isCartVisible.value = !isCartVisible.value; // 切换状态
  }
   // 控制背景滚动条
   if (isCartVisible.value) {
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
  } else {
    document.body.style.overflow = 'auto'; // 恢复背景滚动
  }
};

// 从购物车删除商品
const removeFromCart = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);
};

// 更新购物车商品数量
const updateQuantity = (itemId, newQuantity) => {
  const item = cartItems.value.find(item => item.id === itemId);
  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      // 可選：自動從購物車中移除數量為 0 的商品
      removeFromCart(itemId);
    }
  }
};


// 计算购物车内商品的总数量
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});


  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    isCartVisible,
    toggleCartVisibility,
  }
})