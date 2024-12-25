import { defineStore } from "pinia"
import axios from "axios"

export const useCartStore = defineStore("cart", () => {
  // 新增商品到購物車 API
  const addProduct = async (productId, quantity = 1) => {
    try {
      const userId = localStorage.getItem("UID")
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart/cartInsert`, {
        user_id: userId,
        product_id: productId,
        quantity,
      })
      return data
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return {
    addProduct,
  }
})
