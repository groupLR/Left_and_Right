<script setup>
import { ref, onMounted, watch, computed } from "vue"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL
const reviews = ref([])

const props = defineProps({
  productId: {
    type: [Number],
    required: true,
  },
})
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}

// 獲取評論
const fetchReviews = async (productId) => {
  if (!productId || productId === "0") {
    return
  }
  try {
    const response = await axios.get(`${API_URL}/comment/reviews/${productId}`)
    if (response.data.status === "Success") {
      reviews.value = response.data.data
      calculateRatingDistribution(reviews.value)
    } else {
      console.error("無法獲取評論資料:", response.data.message)
    }
  } catch (error) {
    console.error("API 請求錯誤:", error.message)
  }
}
//進度條相關
const ratingDistribution = ref({
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
})
//計算各評論占總評論比例
const calculateRatingDistribution = (reviews) => {
  //把打回來的review.sku值丟進去distribution這裡
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((review) => {
    if (review.sku >= 1 && review.sku <= 5) {
      distribution[review.sku] += 1
    }
  })
  //計算各星評價除以總評價數是占幾成，算完後丟回去ratingDistribution再拿去前端算長度
  const total = reviews.length
  for (let key in distribution) {
    distribution[key] = total > 0 ? (distribution[key] / total) * 100 : 0
  }
  ratingDistribution.value = distribution
}
//計算這個商品評論平均幾顆星，無條件進位
const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const totalScore = reviews.value.reduce((sum, review) => {
    return sum + (review.sku || 0)
  }, 0)
  return Math.ceil(totalScore / reviews.value.length)
})
onMounted(() => {
  fetchReviews(props.productId)
})

watch(
  () => props.productId,
  (newProductId) => {
    fetchReviews(newProductId)
  }
)
</script>
<template>
  <div class="flex space-x-6 p-6 max-w-[700px] mx-auto">
    <!-- 評分與進度條 -->
    <div class="flex-1">
      <!-- 標題與總評價 -->
      <div class="flex items-center">
        <el-rate :model-value="averageRating" :max="5" disabled class="text-yellow-500 text-2xl"></el-rate>
        <span class="text-gray-500 ml-2">{{ reviews.length }} 個評價</span>
      </div>

      <!-- 評價分佈進度條 -->
      <div class="mt-4">
        <!-- 進度條1 -->
        <div v-for="score in [5, 4, 3]" :key="score" class="flex items-center mb-2">
          <span class="text-gray-700 w-10">{{ score }} 分</span>
          <div class="flex-1 bg-gray-200 rounded h-3 mx-2">
            <div class="bg-yellow-500 h-3 rounded" :style="{ width: `${ratingDistribution[score]}%` }"></div>
          </div>
          <span class="text-gray-700">{{ Math.round(ratingDistribution[score]) }}%</span>
        </div>
        <!-- 進度條2 -->
        <!-- <div class="flex items-center mb-2">
          <span class="text-gray-700 w-10">4 分</span>
          <div class="flex-1 bg-gray-200 rounded h-3 mx-2">
            <div class="bg-yellow-500 h-3 rounded" style="width: 6%"></div>
          </div>
          <span class="text-gray-700">6%</span>
        </div> -->
        <!-- 進度條3 -->
        <!-- <div class="flex items-center">
          <span class="text-gray-700 w-10">3 分</span>
          <div class="flex-1 bg-gray-200 rounded h-3 mx-2">
            <div class="bg-yellow-500 h-3 rounded" style="width: 1%"></div>
          </div>
          <span class="text-gray-700">1%</span>
        </div> -->
      </div>
    </div>

    <!-- 下拉選單 -->
    <!-- <div class="flex-shrink-0">
      <label for="source" class="block text-gray-700 font-medium mb-2">評價來源</label>
      <select id="source" class="w-48 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>評價來源：此店</option>
      </select>
    </div> -->
  </div>

  <!-- 顧客評價列表 -->
  <div class="mt-6 p-6 max-w-[1000px] mx-auto">
    <div class="flex border-t pt-4" v-for="review in reviews" :key="review.comment_time">
      <div class="w-10 h-10 rounded-full overflow-hidden">
        <img src="https://i.imgur.com/AR0bXqA.jpeg" alt="User" class="w-full h-full object-cover" />
      </div>
      <div class="ml-3">
        <h3 class="font-bold text-gray-800">{{ review.username }}</h3>
        <p class="text-sm text-gray-500">
          {{ formatTimestamp(review.comment_time) }}
        </p>
        <p><el-rate :model-value="review.sku" :max="5" disabled></el-rate></p>
        <p class="text-gray-700 mt-2">
          {{ review.comment }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-icon) {
  color: #ffffff;
}
</style>
