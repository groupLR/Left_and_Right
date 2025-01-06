import axios from "axios"
import { ElMessage } from "element-plus"
import { ref } from "vue"

export const useUsersInformation = () => {
  const UID = localStorage.getItem("UID")
  const information = ref({})
  const memberErrors = ref({})
  const deliverErrors = ref({})

  // 抓取用戶資訊
  const fetchInformation = async () => {
    memberErrors.value = {}
    deliverErrors.value = {}
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/memberInformation?uid=${UID}`
      )
      const data = res.data
      information.value = data
      if (data.birthday) {
        const date = new Date(data.birthday)
        data.birthday = date.toISOString().split("T")[0]
      }
      if (data.phone) data.phone = data.phone.toString()
      if (data.mobile_phone) data.mobile_phone = data.mobile_phone.toString()
    } catch (error) {
      console.error("請求失敗：", error)
    }
  }
  // 更新用戶資訊
  const updateInformation = async (information) => {
    if (!information.username || information.username.trim() === "") {
      ElMessage("使用者名稱不可為空")
      return
    }
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
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/updateInformation`,
        bodyData // 將資料作為第二個參數傳遞
      )
      if (res.status !== 200) throw new Error("更新用戶資料失敗")
      await fetchInformation()
    } catch (error) {
      console.error("更新失敗：", error)
      ElMessage.error("更新用戶資料失敗")
    }
  }

  return {
    information,
    fetchInformation,
    updateInformation,
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

// 驗證輸入資訊
export const validateInformation = (event) => {
  const memberErrors = {}
  if (!event.username || event.username.trim() === "") {
    memberErrors.username = "使用者名稱不可為空"
  }
  if (
    !event.email ||
    !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(
      event.email
    )
  ) {
    memberErrors.email = "請輸入有效的電子郵件"
  }
  if (event.phone && !/^\d{10}$/.test(event.phone)) {
    memberErrors.phone = "電話號碼必須為 10 位數字"
  }
  if (event.mobile_phone && !/^\d{10}$/.test(event.mobile_phone)) {
    memberErrors.mobile_phone = "手機號碼必須為 10 位數字"
  }
  if (event.birthday) {
    const today = new Date() // 取得今天的日期
    const inputDate = new Date(event.birthday)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(event.birthday)) {
      memberErrors.birthday = "請輸入有效的生日"
    } else if (inputDate > today) {
      memberErrors.birthday = "請輸入有效的生日"
    }
  }
  return memberErrors
}

export const onlyNum = () => {
  const validateNumber = (event) => {
    const value = event.target.value
    // 使用正則表達式替換非數字字符
    event.target.value = value.replace(/\D/g, "")
  }

  return {
    validateNumber,
  }
}
