import { defineStore } from "pinia"
import { ref, watch, computed } from "vue"
import axios from "axios"

export const useExchangeRateStore = defineStore("rate", () => {
  const rates = ref([])
  const selectedCurrency = ref("TWD")
  const STORAGE_SELECTED_CURRENCY_KEY = "SCU"
  const STORAGE_RATES_TIME_KEY = "GRT"

  //拿到資料庫匯率
  const getAllCurrency = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/exchangeRate`)

      rates.value = data
      localStorage.setItem(STORAGE_SELECTED_CURRENCY_KEY, selectedCurrency.value)
      localStorage.setItem(
        STORAGE_RATES_TIME_KEY,
        new Date().toLocaleString("zh-TW", {
          timeZone: "Asia/Taipei",
        })
      )
    } catch (err) {
      console.error("無法從資料庫提取匯率資料:", err)
    }
  }
  // 根據選擇幣種找到其匯率
  const currentRate = computed(() => {
    return rates.value.find((rate) => rate.currency === selectedCurrency.value)
  })
  // 根據匯率計算價格
  const calConvertedPrice = (price) => {
    if (currentRate.value) {
      const intCurrency = ["JPY", "KRW", "VND", "IDR"]
      if (intCurrency.includes(currentRate.value.currency)) {
        return Math.round(Number(price * currentRate.value.rate))
      } else {
        return Number((price * currentRate.value.rate).toFixed(2))
      }
    }
    return price // 如果找不到匯率，返回原價
  }
  // 從 localStorage 讀取選擇的貨幣
  const initCurrency = () => {
    const storedCurrency = localStorage.getItem(STORAGE_SELECTED_CURRENCY_KEY)
    if (storedCurrency) {
      selectedCurrency.value = storedCurrency // 如果有，設置為選擇的貨幣
    } else {
      selectedCurrency.value = "TWD" // 如果沒有設置預設值為 'TWD'
    }
  }

  // 監聽 selectedCurrency 的變化並更新 localStorage
  watch(selectedCurrency, (newValue) => {
    localStorage.setItem(STORAGE_SELECTED_CURRENCY_KEY, newValue)
  })

  return {
    rates,
    selectedCurrency,
    currentRate,
    getAllCurrency,
    calConvertedPrice,
    initCurrency,
  }
})
