<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
const redirectUrl = ref("") // 用 ref 來存儲重定向 URL

// CLIENT_ID
const CLIENT_ID =
  "201131820318-om98jaudikrjuraavdmt8o0jlitaf7b1.apps.googleusercontent.com"
// localSrotage 的 key
const STORAGE_KEY = "UID"
const STORAGE_JWT_KEY = "TwT"
// data
const userData = ref(null)
const isLoggedIn = ref(false) // 登入狀態
// methods
function loginProcess(response) {
  userData.value = response.data.user
  isLoggedIn.value = true // 註冊後直接登入
  localStorage.setItem(STORAGE_KEY, userData.value.userId) // UID 放在 localStorage
  localStorage.setItem(STORAGE_JWT_KEY, response.data.token) // JWT 放在 localStorage

  // 設置 axios 預設標頭
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.token}`

  // 處理重定向
  const redirectPath = route.query.redirect || "/"
  router.push(redirectPath)
}

// 處理 google 註冊新用戶
const handleRegister = async (googleData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      googleData
    )

    loginProcess(response)
  } catch (error) {
    console.error("註冊失敗", error)
    Swal.fire({
      title: "註冊失敗",
      text: error.message,
      confirmButtonText: "確認",
      confirmButtonColor: "#000000", // 註冊按鈕設為黑色背景
      customClass: {
        confirmButton: "swal2-confirm-custom", // 自定義class
      },
    })
  }
}

// Google 登入 callback fn
const onLogin = (res) => {
  console.log("Google Response:", res)
  // 確保後端允許跨域請求
  const axiosOptions = {
    headers: {
      "Access-Control-Allow-Origin": window.location.origin,
    },
  }

  axios
    .post(
      `${import.meta.env.VITE_API_URL}/auth/verify-token`,
      res,
      axiosOptions
    )
    .then((res) => {
      if (res.data.exists) {
        // 用戶存在（可能是一般註冊或 Google 註冊），直接登入
        loginProcess(res)
      } else {
        // 用戶不存在，詢問是否要註冊，目前先用 sweetalert
        Swal.fire({
          title: "註冊確認",
          text: `此 email 尚未註冊，是否要註冊新帳號？ \n ${res.data.googleData.email}`,
          showCancelButton: true,
          confirmButtonText: "註冊",
          cancelButtonText: "取消",
          confirmButtonColor: "#000000", // 註冊按鈕設為黑色背景
          customClass: {
            confirmButton: "swal2-confirm-custom", // 自定義class
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handleRegister(res.data.googleData)
          }
        })
      }
    })
    .catch((error) => {
      console.error("登入失敗", error)
      Swal.fire({
        title: "登入失敗",
        text: "登入失敗，請稍後再試或連繫客服人員",
        confirmButtonText: "確認",
        confirmButtonColor: "#000000", // 註冊按鈕設為黑色背景
        customClass: {
          confirmButton: "swal2-confirm-custom", // 自定義class
        },
      })
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
  window.google.accounts.id.renderButton(
    document.getElementById("googleButton"),
    {
      theme: "outline", // outline 或 filled_blue
      size: "large", // large 或 medium
      shape: "pill", // rectangular 或 pill
      text: "signin_with", // signin_with 或 continue_with
      logo_alignment: "center",
      width: buttonWidth,
    }
  )
}

onMounted(() => {
  redirectUrl.value = route.query.redirect || "/"

  // 檢查登入狀態
  const isUserLoggedIn = localStorage.getItem(STORAGE_KEY)
  if (isUserLoggedIn) {
    // 這邊可以呼叫 API 重新獲取用戶資料
    // 或是導向登入頁面重新登入
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
  <div v-if="!isLoggedIn">
    <div class="googleBtnWrapper">
      <div id="googleButton"></div>
    </div>
  </div>
</template>

<style scoped>
.googleBtnWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.swal2-confirm-custom {
  color: #ffffff !important;
}
</style>
