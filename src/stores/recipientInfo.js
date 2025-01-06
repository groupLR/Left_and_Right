import { ref } from "vue"
import axios from "axios"

export const useDeliverInfo = () => {
  const UID = localStorage.getItem("UID")
  const deliverInfo = ref({})

  // 抓取配送資料
  const fetchDeliverInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/getDeliverInfo`,
        {
          headers: { uid: UID },
        }
      )
      deliverInfo.value = res.data[0]
    } catch (error) {
      console.error("抓取送貨資料失敗：", error)
    }
  }

  // 更新配送資料
  const updateDeliverInfo = async (deliverInfo) => {
    try {
      const bodyData = {
        recipient: deliverInfo.recipient,
        recipient_phone: deliverInfo.recipient_phone,
        country: deliverInfo.country,
        city: deliverInfo.city,
        region: deliverInfo.region,
      }
      await axios.put(
        `${import.meta.env.VITE_API_URL}/updateDeliverInfo`,
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
            uid: UID,
          },
        }
      )
      await fetchDeliverInfo() // 更新後重新抓取資料
    } catch (error) {
      console.error("更新失敗：", error)
    }
  }

  return {
    deliverInfo,
    fetchDeliverInfo,
    updateDeliverInfo,
  }
}

export const validateRecipient = (event) => {
  const deliverErrors = {}

  if (event.recipient_phone && !/^\d{10}$/.test(event.recipient_phone)) {
    deliverErrors.recipient_phone = "手機號碼必須為 10 位數字"
  }
  return deliverErrors
}
