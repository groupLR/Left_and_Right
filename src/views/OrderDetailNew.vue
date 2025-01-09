<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import ChatBox from "../components/chatbox.vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
const API_URL = import.meta.env.VITE_API_URL
const currentPage = ref(true)
const route = useRoute()
const router = useRouter()
const purchaseID = route.params.pu_id
const UID = localStorage.getItem("UID")

const pagetoggle = () => {
  currentPage.value = !currentPage.value
}

// 定義資料結構
const orderInfo = ref({})
const customerInfo = ref({})
const deliveryInfo = ref({})
const paymentInfo = ref({})
const productInfo = ref([])

const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return ""
  const cleanedPath = imagePath.startsWith("./") ? imagePath.slice(1) : imagePath
  return `${API_URL}/${cleanedPath}`
}
// 總價
const totalPrice = computed(() => {
  return productInfo.value.reduce((sum, product) => {
    return sum + product.sale_price * product.quantity
  }, 0)
})
// 商品數
const productCount = computed(() => {
  return productInfo.value.length
})
onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/order/details/${purchaseID}`)

    const data = response.data

    // 直接將返回的資料綁定給 productInfo
    productInfo.value = data.productInfo || []
    orderInfo.value = data.orderInfo?.[0] || {}
    customerInfo.value = data.customerInfo?.[0] || {}
    deliveryInfo.value = data.deliveryInfo || {}
    paymentInfo.value = data.paymentInfo || {}
  } catch (error) {
    console.error("API 請求失敗：", error)
  }
  const checkUID = productInfo.value.every((product) => product.user_id === UID)
  if (!checkUID) {
    ElMessage.error("訂單顯示錯誤")
    router.push("/MemberOrder")
  }
})
</script>
<template>
  <div class="bg-gray-200 lg:p-10 m-10">
    <!-- 訂單簡易資訊 -->
    <div class="bg-white rounded-lg px-4 text-sm">
      <p>訂單編號 : {{ purchaseID }}</p>
      <p>訂單狀態 : 已完成</p>
      <p>顧客姓名 : {{ customerInfo.cuName }}</p>
      <p>訂單金額 : {{ totalPrice }}</p>
    </div>
    <!-- 訂單商品 -->
    <!-- 訂單詳細資訊 -->
  </div>
</template>
