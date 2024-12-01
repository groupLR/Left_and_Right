<template>
  <!-- 確保 Google 按鈕的容器一直存在 -->
  <div v-if="!isLoggedIn">
    <div id="googleButton"></div>
  </div>
  
  <div v-else class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <img :src="userData.picture" alt="profile" class="w-8 h-8 rounded-full"/>
      <span>{{ userData.name }}</span>
    </div>
    <button @click="handleLogout" class="w-12 h-6 bg-orange-200 rounded">登出</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

// CLIENT_ID
const CLIENT_ID = "201131820318-om98jaudikrjuraavdmt8o0jlitaf7b1.apps.googleusercontent.com"
// 後端 API 網址
const API_URL = 'http://localhost:3300'
// data 跟 computed
const userData = ref(null)  
const isLoggedIn = ref(false)  // 登入狀態

// Google 登入 callback fn
const onLogin = (res) => {
  // 確保後端允許跨域請求
  const axiosOptions = {
    headers: { 
      "Access-Control-Allow-Origin": window.location.origin 
    }
  }

  axios.post(`${API_URL}/auth/verify-token`, res, axiosOptions)
    .then((res) => {
      console.log("登入成功", res.data)
      console.log("res", res);
      userData.value = res.data;
      isLoggedIn.value = true
    })
    .catch((error) => {
      console.error("登入失敗", error)
    })
}

// 先自己加登出功能測試
const handleLogout = () => {
  userData.value = null
  isLoggedIn.value = false
  console.log("登出成功");
  
  // 等待 DOM 更新後再重新渲染按鈕
  setTimeout(() => {
    initializeGoogle()
  }, 0)
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

  // 渲染 Google 登入按鈕~~~ 可以選樣式啦
  window.google.accounts.id.renderButton(
    document.getElementById("googleButton"),
    { 
      theme: "outline",  // outline 或 filled_blue
      size: "large",     // large 或 medium
      shape: "pill", // rectangular 或 pill
      text: "signin_with", // signin_with 或 continue_with
      logo_alignment: "left"
    }
  )

}

onMounted(() => {
  // 如果 Google API 已載入就直接初始化，不然就等待載入完成
  if (window.google) {
    initializeGoogle()
  } else {
    window.onload = initializeGoogle
  }
})
</script>