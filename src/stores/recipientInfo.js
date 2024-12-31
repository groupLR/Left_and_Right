import { ref } from "vue"

export const useDeliverInfo = () => {
  const UID = localStorage.getItem("UID")
  console.log(UID)
  const deliverInfo = ref({})
  const fetchDeliverInfo = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/getDeliverInfo?uid=${UID}`
      )
      if (!res.ok) throw new Error("無法獲取送貨資料")
      const data = await res.json()
      deliverInfo.value = data[0]
    } catch (error) {
      console.error("抓取送貨資料失敗：", error)
    }
  }
  const updateDeliverInfo = async (deliverInfo) => {
    console.log("要傳送的 deliverInfo:", deliverInfo)
    try {
      const bodyData = {
        uid: UID,
        phone: deliverInfo.phone,
        recipient: deliverInfo.recipient,
        recipient_phone: deliverInfo.recipient_phone,
        country: deliverInfo.country,
        city: deliverInfo.city,
        region: deliverInfo.region,
        address: deliverInfo.address,
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/updateDeliverInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      )
      if (!res.ok) throw new Error("更新配送資料失敗")
      alert("資料已成功更新！")
      await fetchDeliverInfo()
    } catch (error) {
      console.error("更新失敗：", error)
      alert("更新配送資料失敗，請稍後再試。")
    }
  }
  return {
    deliverInfo,
    fetchDeliverInfo,
    updateDeliverInfo,
  }
}
