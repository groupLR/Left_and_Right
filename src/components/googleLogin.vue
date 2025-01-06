<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { ElMessage } from "element-plus"

const router = useRouter()
const route = useRoute()

// CLIENT_ID
const CLIENT_ID = "201131820318-om98jaudikrjuraavdmt8o0jlitaf7b1.apps.googleusercontent.com"

// localSrotage 的 key
const STORAGE_KEY = "UID"
const STORAGE_JWT_KEY = "TwT"

// data
const userData = ref(null)
const isLoggedIn = ref(false) // 登入狀態
const redirectUrl = ref("") // 用 ref 來存儲重定向 URL
const centerDialogVisible = ref(false) // 沒註冊過的帳號的註冊提醒
const googleLoginData = ref(null) // 存儲 Google 登入返回的資料

// methods
function loginProcess(response) {
  userData.value = response.data.user
  isLoggedIn.value = true // 註冊後直接登入
  localStorage.setItem(STORAGE_KEY, userData.value.userId) // UID 放在 localStorage
  localStorage.setItem(STORAGE_JWT_KEY, response.data.token) // JWT 放在 localStorage

  // 處理重定向
  const redirectPath = route.query.redirect || "/"
  router.push(redirectPath)
}

// 處理 google 註冊新用戶
const handleRegister = async () => {
  if (!googleLoginData.value) {
    ElMessage.error("登入資料無效，請重新登入")
    centerDialogVisible.value = false
    return
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, googleLoginData.value)
    centerDialogVisible.value = false
    loginProcess(response)
    ElMessage.success("註冊成功！")
  } catch (error) {
    console.error("註冊失敗:", error)
    ElMessage.error("註冊失敗，請稍後再試")
  }
}

// Google 登入 callback fn
const onLogin = (res) => {
  // 確保後端允許跨域請求
  const axiosOptions = {
    headers: {
      "Access-Control-Allow-Origin": window.location.origin,
    },
  }

  axios
    .post(`${import.meta.env.VITE_API_URL}/auth/verify-token`, res, axiosOptions)
    .then((res) => {
      if (res.data.exists) {
        // 用戶存在（可能是一般註冊或 Google 註冊），直接登入
        loginProcess(res)
      } else {
        // 用戶不存在，存儲 Google 資料並顯示註冊確認框
        googleLoginData.value = res.data.googleData
        centerDialogVisible.value = true
      }
    })
    .catch((error) => {
      console.error("登入失敗", error)
      ElMessage.error("登入失敗，請稍後再試")
    })
}

// 初始化 Google 登入
const initializeGoogle = () => {
  if (!window.google) {
    console.error("Google API 尚未載入")
    return
  }

  if (!CLIENT_ID) {
    console.error("找不到 Google Client ID")
    return
  }

  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: onLogin,
    cancel_on_tap_outside: true,
    context: "signin",
  })

  // 獲取容器寬度
  const container = document.querySelector(".googleBtnWrapper")
  const containerWidth = container?.offsetWidth || 800

  // 設定按鈕寬度（確保不小於最小值）
  const buttonWidth = containerWidth - 40

  // 渲染 Google 登入按鈕
  window.google.accounts.id.renderButton(document.getElementById("googleButton"), {
    theme: "outline", // outline 或 filled_blue
    size: "large", // large 或 medium
    shape: "pill", // rectangular 或 pill
    text: "signin_with", // signin_with 或 continue_with
    logo_alignment: "center",
    width: buttonWidth,
  })
}

onMounted(() => {
  // 如果有前一頁就把路徑存下來，不然就回首頁
  redirectUrl.value = route.query.redirect || "/"

  // 檢查登入狀態
  const isUserLoggedIn = localStorage.getItem(STORAGE_KEY)
  if (isUserLoggedIn) {
    isLoggedIn.value = true
  }
  const token = localStorage.getItem(STORAGE_JWT_KEY)
  if (token) {
    // 預設帶上標頭
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
  // 如果 Google API 載入完成，進行初始化；如果還沒，在頁面完全載入後才初始化
  if (window.google) {
    initializeGoogle()
  } else {
    window.onload = initializeGoogle
  }
})

// 添加 resize 事件監聽
window.addEventListener("resize", () => {
  // 使用 debounce 避免過於頻繁的重新渲染
  setTimeout(() => {
    initializeGoogle()
  }, 250)
})
</script>

<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="建立新帳號" width="80%" center class="max-w-[500px]">
      <span class="text-gray-700"> Google 帳號 {{ googleLoginData.email }} 還沒註冊過，要註冊一個新帳號嗎？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleRegister"> 建立帳號 </el-button>
        </div>
      </template>
    </el-dialog>
    <div v-if="!isLoggedIn">
      <div class="flex justify-center items-center w-full">
        <div id="googleButton"></div>
      </div>
    </div>
  </div>
</template>
