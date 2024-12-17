import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';

export const useCartStore = defineStore('cart', () => {
  const API_URL = 'http://localhost:3300'

  // 新增商品到購物車 API
  const addProduct = async (productId) => {
    try {
      const userId = localStorage.getItem('UID')
      const {data} = await axios.post(`${API_URL}/cart/cartInsert`,
        {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        }
      )
      return data      
    } catch (err) {
      console.log("加入購物車失敗", err);
      return err
    }
  }


  return {
    addProduct,
  }
})