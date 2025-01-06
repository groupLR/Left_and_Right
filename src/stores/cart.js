import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"

export const useCartStore = defineStore("cart", () => {
  // 國家選單
  const countryList = ref([
    { value: "AU", label: "澳大利亞" },
    { value: "BE", label: "比利時" },
    { value: "CA", label: "加拿大" },
    { value: "CN", label: "中國" },
    { value: "FR", label: "法國" },
    { value: "DE", label: "德國" },
    { value: "HK", label: "香港" },
    { value: "ID", label: "印度尼西亞" },
    { value: "IT", label: "意大利" },
    { value: "JP", label: "日本" },
    { value: "KR", label: "韓國" },
    { value: "MO", label: "澳門" },
    { value: "MY", label: "馬來西亞" },
    { value: "NL", label: "荷蘭" },
    { value: "NZ", label: "新西蘭" },
    { value: "PW", label: "帕勞" },
    { value: "PE", label: "秘魯" },
    { value: "PH", label: "菲律賓" },
    { value: "SG", label: "新加坡" },
    { value: "TW", label: "台灣" },
    { value: "TH", label: "泰國" },
    { value: "GB", label: "英國" },
    { value: "US", label: "美國" },
    { value: "VN", label: "越南" },
  ])

  // 付款方式選單
  const paymentOptions = ref([
    {
      value: "cash-on-delivery",
      label: "貨到付款",
    },
    {
      value: "credit-card",
      label: "信用卡 (Visa / MasterCard / JCB / 銀聯卡)",
    },
    {
      value: "dbs-card",
      label: "↳ 刷星展卡滿 3,000 送 100 刷卡金",
      disabled: true,
    },
  ])

  // 配送方式選單
  const deliveryOptions = ref([
    {
      value: "overseas-ems",
      label: "海外運送 (3-7天到貨，採EMS寄送)",
      disabled: false,
    },
    {
      value: "overseas-dhl",
      label: "海外運送 (3-7天到貨，DHL運送)",
      disabled: false,
    },
    {
      value: "7-11",
      label: "7-11",
    },
    {
      value: "home-delivery",
      label: "宅配到府",
    },
    {
      value: "store-delivery",
      label: "到店取貨",
    },
  ])

  // 新增商品到購物車 API
  // 初始化購物車資料
  const cartItems = ref([])

  // 新增商品到購物車
  const addProduct = async (productId, quantity = 1, name, image, salePrice, originalPrice) => {
    const userId = localStorage.getItem("UID")

    if (userId) {
      // 已登入，將商品存入資料庫
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart/cartInsert`, {
          user_id: userId,
          product_id: productId,
          quantity,
        })
        console.log("商品已成功新增至資料庫:", data)
      } catch (err) {
        console.error("新增商品到資料庫失敗:", err)
      }
    } else {
      // 未登入，將商品存入 localStorage
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []

        // 檢查購物車中是否已有該商品
        const existingItem = storedCart.find((item) => item.product_id === productId)
        if (existingItem) {
          // 如果商品已存在，增加數量
          existingItem.quantity += quantity
        } else {
          // 如果商品不存在，新增到購物車
          storedCart.push({ product_id: productId, quantity, product_name: name, image_path: image, sale_price: salePrice, original_price: originalPrice })
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
    countryList,
    paymentOptions,
    deliveryOptions,
    addProduct,
  }
})
