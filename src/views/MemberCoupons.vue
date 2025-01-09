<script setup>
import axios from "axios"
import MemberNavbar from "../components/MemberNavbar.vue"
import { onMounted, ref } from "vue"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import { useExchangeRateStore } from "@/stores/exchangeRates"

const ExchangeRateStore = useExchangeRateStore()
const { currentRate } = storeToRefs(ExchangeRateStore)
const userId = localStorage.getItem("UID")
const coupons = ref([]) // 初始化優惠券列表為空

// 領取優惠券
const submitCoupon = async () => {
  try {
    // 先通過優惠券代碼查詢對應的優惠券 ID
    const fetchIdResponse = await axios.post(`${import.meta.env.VITE_API_URL}/coupon/code-to-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: couponCode.value }), // 使用 couponCode
    })

    if (!fetchIdResponse.ok) {
      throw new Error("無法找到該優惠券")
    }

    const responseData = await fetchIdResponse.json()
    const id = responseData.id // 確保從 API 響應中正確獲取 id

    // 使用查詢到的 ID 發起領取請求
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/coupon/${id}/claim`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // 使用者 ID
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(errorMessage || "領取優惠券失敗")
    }

    const result = await response.json()
    coupons.value.push(result) // 加入新優惠券
    couponCode.value = "" // 清空輸入框
    ElMessage.success("優惠券領取成功！")
  } catch (error) {
    console.error("領取優惠券失敗:", error.message)
    ElMessage.error(error.message || "領取優惠券失敗")
  }
}

// 取得優惠券列表
const fetchCoupons = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/coupon/user/${userId}`)
    if (!data) {
      throw new Error("取得優惠券列表失敗")
    } else {
      // 獲取優惠券資料，只有當 response.ok 為 true 時才會執行
      coupons.value = data.map((coupon) => ({
        ...coupon,
        claimed: coupon.claimed || false, // 預設為未領取
      }))
    }
  } catch (error) {
    ElMessage.error("無法獲取優惠券:", error.message)
  }
}

//領取優惠券
const claimed = async (couponId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/coupon/${couponId}/claim`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (response.status === 409) {
      ElMessage.error("優惠券已被領取")
    } else if (response.status === 200) {
      // 更新該優惠券的領取狀態
      coupons.value = coupons.value.map((coupon) => (coupon.id === couponId ? { ...coupon, claimed: true } : coupon))
      ElMessage.success("領取優惠券成功")
    }
  } catch (error) {
    if (error.response) {
      // 當後端返回錯誤的情況
      ElMessage.error(error.response.data || "領取優惠券失敗")
    } else {
      // 網絡錯誤或其他無法預測的錯誤
      ElMessage.error("領取優惠券失敗，請稍後再試")
    }
  }
}

onMounted(() => {
  fetchCoupons()
})
window.scrollTo(0, 0)
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
    <div class="max-w-[1358px] mx-auto">
      <div v-if="coupons.length === 0" class="py-10 lg:px-10 flex justify-center mx-auto bg-white">
        <div>
          <img src="../assets/member_center_list_empty.png" alt="" class="w-[121px] h-[129px]" />
          <p class="pl-2 pt-5 mx-auto text-sm text-gray-500">沒有任何優惠券唷</p>
        </div>
      </div>

      <div v-else class="memberCoupon bg-white px-10 md:px-5">
        <div class="w-full grid gap-5 justify-between my-10 mx-auto grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div v-for="coupon in coupons" :key="coupon.id" class="w-full max-w-[1100px] mx-auto bg-slate-100 hover:shadow-lg hover:cursor-pointer">
            <!-- 折扣券 -->
            <div class="w-full flex flex-1 justify-between max-w-64 h-20 pl-4 pt-5 pb-2 font-bold">
              <p class="pl-1 text-xl">{{ coupon.name }}</p>
              <div class="mt-1 flex w-16 h-6 bg-gray-200 justify-center text-gray-800 text-[10px] font-medium p-1 rounded-md">
                <p class="text-sm">限網店</p>
              </div>
            </div>
            <div class="h-10 lg:h-16 mx-auto flex justify-center">
              <p class="text-lg pt-4">
                消費滿<span class="text-amber-500 font-semibold">
                  {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(coupon.min_spend)).toLocaleString() }} </span
                >折抵<span class="text-green-600 font-semibold">
                  {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(coupon.discount_amount)).toLocaleString() }} </span
                >元
              </p>
            </div>
            <div class="separator">
              <span class="circle left"></span>
              <div class="dashedLine"></div>
              <span class="circle right"></span>
            </div>
            <div class="ml-2 px-4 pb-4 flex justify-between items-center">
              <span class="font-bold text-sm">L & R</span>
              <button @click="claimed(coupon.id)" class="bg-white px-4 py-1 rounded-lg hover:font-bold hover:shadow-md">
                {{ coupon.claimed ? "已領取" : "領取折扣碼" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memberCoupon {
  margin: 0 auto;
  max-width: 1358px;
  border: 1px solid #ddd;
  border-top: 1px solid #fff;
}

.btn {
  display: block;
  width: 60px;
  height: 32px;
  background-color: #000;
  color: #fff;
  border: 0.8;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 6px 12px 6px;
}

.separator {
  display: flex;
  align-items: center;
  position: relative;
  margin: 20px 0;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
}

.circle.left {
  left: -10px;
}

.circle.right {
  right: -10px;
}

.dashedLine {
  flex-grow: 1;
  border-top: 2px dashed #d1d5db;
  position: relative;
  z-index: 0;
}

@media (width<=768px) {
  .couponContent {
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .couponUl {
    justify-content: center;
    align-content: center;
  }
  .couponInput {
    justify-content: center;
    align-content: center;
    width: 100%;
  }

  .couponInput input {
    width: 100%;
  }
}
</style>
