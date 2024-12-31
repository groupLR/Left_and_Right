import { ref } from "vue"

export const useUsersInformation = () => {
  const UID = localStorage.getItem("UID") // 從 localStorage 獲取用戶 ID
  const information = ref({}) // 用於儲存用戶資訊

  // 抓取用戶資訊
  const fetchInformation = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/memberInformation?uid=${UID}`
      )
      if (!res.ok) throw new Error("無法獲取用戶資料")
      const data = await res.json()
      information.value = data
      if (data.birthday) {
        const date = new Date(data.birthday)
        data.birthday = date.toISOString().split("T")[0] // 轉換為 yyyy-MM-dd 格式
      }
      if (data.phone) {
        data.phone = data.phone.toString()
      }
      if (data.mobile_phone) {
        data.mobile_phone = data.mobile_phone.toString()
      }
    } catch (error) {
      console.error("請求失敗：", error)
      alert("抓取用戶資料失敗。")
    }
  }

  // 更新用戶資訊
  const updateInformation = async (information) => {
    console.log("要傳送的 information:", information)
    try {
      const bodyData = {
        uid: UID,
        username: information.username,
        email: information.email,
        phone: information.phone,
        birthday: information.birthday,
        mobile_phone: information.mobile_phone,
        from_store: information.from_store,
        introduced_by: information.introduced_by,
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/updateInformation`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData), // 傳送 UID 和更新的資料
        }
      )
      if (!res.ok) throw new Error("更新用戶資料失敗")
      alert("資料已成功更新！") // 成功提示
      await fetchInformation() // 更新後重新抓取資料，確保畫面與資料庫同步
    } catch (error) {
      console.error("更新失敗：", error)
      alert("更新用戶資料失敗，請稍後再試。")
    }
  }

  return {
    information, // 用戶資訊
    fetchInformation, // 抓取資料的方法
    updateInformation, // 更新資料的方法
  }
}

export const selected = async () => {
  const selectedValue = ref("") // 綁定的選中值
  const selectedText = ref("") // 選中選項的顯示文字

  const onChange = (event) => {
    selectedText.value = event.target.options[event.target.selectedIndex].text
    selectedValue.value = event.target.value // 更新 selectedValue
  }

  return {
    selectedValue,
    selectedText,
    onChange,
  }
}
export const onlyNum = () => {
  // 不需要重新創建 information，可以使用父組件的 information
  const validateNumber = (event) => {
    const value = event.target.value
    // 使用正則表達式替換非數字字符
    event.target.value = value.replace(/\D/g, "")
  }

  return {
    validateNumber,
  }
}
