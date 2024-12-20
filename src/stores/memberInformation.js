import { ref } from "vue"
export const useUsersInformation = () => {
  // 抓取登入者資料
  const UID = localStorage.getItem("UID")
  const information = ref({}) // 用於儲存用戶資訊
  const fetchInformation = async () => {
    try {
      const res = await fetch(
        `http://localhost:3300/memberInformation?uid=${UID}`
      )
      const data = await res.json()
      information.value = data
    } catch (error) {
      console.error("請求失敗：", error)
    }
  }
  return {
    information, // 返回用戶資訊
    fetchInformation, // 返回方法，供外部重新加載數據
  }
}
