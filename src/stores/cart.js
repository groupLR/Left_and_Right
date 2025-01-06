import { defineStore } from "pinia"
import axios from "axios"

export const useCartStore = defineStore("cart", () => {
  // 初始化購物車資料
  const cartItems = ref([]) // Pinia 的反應式資料

  // 新增商品到購物車
  const addProduct = async (productId, quantity = 1) => {
    const userId = localStorage.getItem("UID")

    if (userId) {
      // 已登入，將商品存入資料庫
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/cart/cartInsert`,
          {
            user_id: userId,
            product_id: productId,
            quantity,
          }
        )
        console.log("商品已成功新增至資料庫:", data)
      } catch (err) {
        console.error("新增商品到資料庫失敗:", err)
      }
    } else {
      // 未登入，將商品存入 localStorage
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []

        // 檢查購物車中是否已有該商品
        const existingItem = storedCart.find(
          (item) => item.product_id === productId
        )
        if (existingItem) {
          // 如果商品已存在，增加數量
          existingItem.quantity += quantity
        } else {
          // 如果商品不存在，新增到購物車
          storedCart.push({ product_id: productId, quantity })
        }

        // 更新到 localStorage
        localStorage.setItem("cart", JSON.stringify(storedCart))

        // 同步更新 Pinia 狀態
        cartItems.value = storedCart
        console.log("商品已成功新增至 localStorage:", storedCart)
      } catch (err) {
        console.error("暫存商品到 localStorage 失敗:", err)
      }
    }
  }

  return {
    addProduct
  }
})
