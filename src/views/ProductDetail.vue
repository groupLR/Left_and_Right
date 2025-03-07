<script setup>
import axios from "axios"
import Swiper from "swiper/bundle"
import Reviews from "@/components/Reviews.vue"
import AddSharedCart from "@/components/AddSharedCart.vue"
import "swiper/css/bundle"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { onMounted, ref, watch, computed, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage, ElSkeleton, ElSkeletonItem } from "element-plus"
import { Pagination, Navigation, Scrollbar } from "swiper/modules"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/cart"
import { useSharedCartStore } from "@/stores/sharedCart"
import { useExchangeRateStore } from "@/stores/exchangeRates"
import { webSocketService } from "@/websocket/websocket.js"
const SharedCartStore = useSharedCartStore()
const CartStore = useCartStore()
const ExchangeRateStore = useExchangeRateStore()
const { sharedCartList } = storeToRefs(SharedCartStore)
const { currentRate } = storeToRefs(ExchangeRateStore)
Swiper.use([Pagination, Navigation, Scrollbar])

const swiperInstance = ref(null)
const route = useRoute()
const router = useRouter()
const userId = localStorage.getItem("UID")
const API_URL = import.meta.env.VITE_API_URL
const userName = ref("")
const isDescription = ref(true)
const isReview = ref(false)
const isLoading = ref(true)

window.scrollTo(0, 0)

// onMounted
onMounted(async () => {
  const initializeSwiper = async () => {
    swiperInstance.value = new Swiper(".swiper", {
      modules: [Pagination, Navigation, Scrollbar],
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 1,
      loop: true,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    })

    // 設定 WebSocket
    webSocketService.connect()
    // 取得使用者名稱
    if (userId) {
      await fetchuserName()
    }
  }
  // 取得願望清單狀態
  fetchWishlist()
  initializeSwiper()
})

// onUnmounted
onUnmounted(() => {
  webSocketService.disconnect()
})

//獲取產品資料
const profile = ref("")
const mainImgs = ref([])
const desImgs = ref([])
const productId = ref(0)
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return ""
  const cleanedPath = imagePath.startsWith("./") ? imagePath.slice(1) : imagePath
  return `${API_URL}/${cleanedPath}`
}

const fetchProductDetail = async (product_id) => {
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const productProfile = await axios.get(`${API_URL}/products/profile/${product_id}`)
    const productMainImgs = await axios.get(`${API_URL}/products/mainImgs/${product_id}`)
    const productDesImgs = await axios.get(`${API_URL}/products/desImgs/${product_id}`)
    const productSpecs = await axios.get(`${API_URL}/products/specs/${product_id}`)
    profile.value = productProfile.data
    mainImgs.value = productMainImgs.data.map((img, index) => ({
      imgPath: getImageUrl(img.image_path),
      imgText: img.alt_text,
      colorText: productSpecs.data[index]?.color_text || null,
      colorSquare: productSpecs.data[index]?.color_square || null,
    }))
    desImgs.value = productDesImgs.data.map((img) => ({
      imgPath: getImageUrl(img.image_path),
      imgText: img.alt_text,
    }))
  } catch (err) {
    console.error("獲取商品詳情失敗:", err)
  } finally {
    isLoading.value = false
  }
}

// 監聽路由參數變化
watch(
  () => route.params.productId,
  async (NewProductId) => {
    try {
      // 如果沒有 productId 參數，使用空字串呼叫 API
      await fetchProductDetail(NewProductId)
      productId.value = NewProductId
    } catch (err) {
      // 處理錯誤
      console.error("載入產品詳情失敗", err)
    }
  },
  { immediate: true }
)

//轉換資料型別
const title = computed(() => {
  return profile.value.product_name || "無法顯示商品名稱"
})
const originalPrice = computed(() => {
  return profile.value.original_price || "無法顯示商品價格"
})
const salePrice = computed(() => {
  return profile.value.sale_price || "無法顯示商品價格"
})

//敘述換行
const addLine = (text) => {
  if (!text) return ""
  return text.replace(/●/g, "<br>●").trim()
}
const description = computed(() => addLine(profile.value.description))

//切換照片index
const selectedIndex = ref(0)
const selectedImage = computed(() => {
  // 如果 mainImgs.value 為空或 selectedIndex 超出範圍，返回一個預設對象
  if (!mainImgs.value.length || selectedIndex.value < 0 || selectedIndex.value >= mainImgs.value.length) {
    return {
      imgPath: "",
      imgText: "無法顯示圖片",
      colorText: "",
      colorSquare: "",
    }
  }
  return mainImgs.value[selectedIndex.value]
})

// 過濾產品顏色
const filterColor = computed(() => mainImgs.value.filter((color) => color.colorSquare))

//圖片點擊
const selectImage = (index) => {
  selectedIndex.value = index
}

//編輯購買數量
const counter = ref(1)
const increase = () => {
  counter.value++
}
const decrease = () => {
  if (counter.value > 1) {
    counter.value--
  }
}

//選擇顏色
const selectColor = (index) => {
  selectedIndex.value = index
}
//追蹤清單轉換
const isSubscribe = ref(false)
const heartColor = computed(() => ({
  color: isSubscribe.value ? "red" : "black",
}))
const toggleHeart = () => {
  isSubscribe.value = !isSubscribe.value
}

// 獲取使用者本人名稱
const fetchuserName = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/singleUserData`, {
      params: {
        userId,
      },
    })
    userName.value = data.username
  } catch (err) {
    console.error("獲取使用者資料失敗", err)
  }
}

// 加入購物車
const handleAddToCart = async () => {
  await CartStore.addProduct(Number(productId.value), counter.value, title.value, mainImgs.value[0].imgPath, salePrice.value, originalPrice.value)
}
// 共享購物車相關
const selectedCarts = ref([])
const dialogToggle = ref(false)
const sharedCartNames = ref([])

// 顯示共享購物車列表
const showDialog = async () => {
  if (userId) {
    dialogToggle.value = true
    await SharedCartStore.fetchSharedCartList(userId)
    sharedCartNames.value = sharedCartList.value.map((cart) => ({
      id: cart.id,
      name: cart.name || `您與 ${cart.member[0]} 與其他 ${cart.member.length - 1} 人共享的購物車`,
    }))
    selectedCarts.value = []
  } else {
    ElMessage.error("請先登入，即將跳轉...")
    setTimeout(() => {
      router.push("/users/sign-in")
    }, 1000)
  }
}

// 處理確認加入共享購物車按鈕點擊
const handleConfirm = async () => {
  if (selectedCarts.value.length === 0) {
    ElMessage.warning("請至少選擇一個購物車")
    return
  }

  try {
    // 使用 Promise.all 等待所有操作完成
    await Promise.all(
      selectedCarts.value.map(async (cartId) => {
        // 先加入購物車
        await SharedCartStore.addProductToSharedCart(cartId, productId.value, counter.value)

        // API 成功後發送 WebSocket 消息
        return webSocketService.sendMessage("addProduct", {
          groupId: cartId,
          itemId: Number(productId.value),
          quantity: counter.value,
          itemName: profile.value.product_name,
          userName: userName.value,
        })
      })
    )

    // 所有操作完成後才關閉對話框和顯示成功訊息
    dialogToggle.value = false
    ElMessage.success(`成功把 ${counter.value} 個此商品加入 ${selectedCarts.value.length} 個共享購物車`)
  } catch (error) {
    console.error("加入共享購物車失敗:", error)
    ElMessage.error("加入共享購物車失敗")
  }
}

// 創建共享購物車後重新取得列表
const refreshSharedCartList = async () => {
  await SharedCartStore.fetchSharedCartList(userId)
  sharedCartNames.value = sharedCartList.value.map((cart) => ({
    id: cart.id,
    name: cart.name || `您與 ${cart.member[0]} 與其他 ${cart.member.length - 1} 人共享的購物車`,
  }))
  dialogToggle.value = true
}

// 切換描述、評論
const toggleDescription = () => {
  isDescription.value = true
  isReview.value = false
}
const toggleReview = () => {
  isDescription.value = false
  isReview.value = true
}
// 追蹤清單
const wishlist = ref([])
// 檢查這個商品是不是已經在願望清單裡ㄌ
const fetchWishlist = async () => {
  try {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`)
    wishlist.value = response.data.data // 回傳這個會員有哪些商品在願望清單裡
  } catch (error) {
    wishlist.value = []
  }
}
// 檢查願望清單的商品是不是當前瀏覽的商品
const isInWishlist = computed(() => {
  return wishlist.value.some((item) => item.wishlists_products_id === Number(productId.value)) // 這會返回一個布林值
})
// 加入刪除願望清單ㄉ方法
const toggleWishlist = async () => {
  if (!userId) {
    ElMessage.warning("請先登入以使用願望清單功能")
    return
  }
  // 如果現在看的商品有在願望清單裡的話就刪除
  if (isInWishlist.value) {
    try {
      const wishlistItem = wishlist.value.find((item) => item.wishlists_products_id === Number(productId.value))
      if (!wishlistItem) return
      await axios.delete(`${API_URL}/wishlist/delete/${wishlistItem.id}`)
      wishlist.value = wishlist.value.filter((item) => item.id !== wishlistItem.id)
      ElMessage.success("已從願望清單移除")
    } catch (error) {
      console.error("無法移除商品：", error.response || error.message)
      ElMessage.error("移除失敗")
    }
  } else {
    // 如果不在願望清單就post進去資料庫
    try {
      const response = await axios.post(`${API_URL}/wishlist`, {
        wishlists_members_id: userId,
        wishlists_products_id: Number(productId.value),
      })
      wishlist.value.push(response.data.data)
      ElMessage.success("已加入願望清單")
    } catch (error) {
      console.error("無法加入商品：", error.response || error.message)
      ElMessage.error("加入失敗")
    }
  }
}
// 評論頁
const props = defineProps({
  productId: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <section>
    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="max-w-full my-4">
      <div class="profile lg:flex lg:max-w-[985px] lg:justify-center lg:mx-auto lg:my-0">
        <!-- 商品圖片區 Skeleton -->
        <div class="lg:max-w-[550px] lg:w-full">
          <el-skeleton animated>
            <template #template>
              <!-- 手機版輪播圖 Skeleton -->
              <div class="md:hidden">
                <el-skeleton-item variant="image" style="width: 100%; height: 500px" />
              </div>
              <!-- 電腦版圖片區 Skeleton -->
              <div class="hidden lg:flex">
                <div class="min-w-[120px] h-[400px] mr-5 pl-5">
                  <div v-for="n in 4" :key="n" class="mb-[10px]">
                    <el-skeleton-item variant="image" style="width: 72px; height: 72px" />
                  </div>
                </div>
                <el-skeleton-item variant="image" style="width: 415px; height: 415px" />
              </div>
            </template>
          </el-skeleton>
        </div>

        <!-- 商品資訊區 Skeleton -->
        <div class="m-4 mt-5 lg:max-w-[435px] lg:w-full">
          <el-skeleton animated :rows="3">
            <template #template>
              <!-- 標題 -->
              <el-skeleton-item variant="text" style="width: 100%; height: 32px; margin-bottom: 20px" />

              <!-- 價格區 -->
              <div class="flex gap-4 mb-4">
                <el-skeleton-item variant="text" style="width: 120px; height: 24px" />
                <el-skeleton-item variant="text" style="width: 120px; height: 24px" />
              </div>

              <!-- 優惠資訊 -->
              <div class="mb-4">
                <el-skeleton-item v-for="n in 3" :key="n" variant="text" style="width: 90%; height: 16px; margin-bottom: 8px" />
              </div>

              <!-- 顏色選擇區 -->
              <div class="my-4">
                <el-skeleton-item variant="text" style="width: 60px; margin-bottom: 8px" />
                <div class="flex gap-2">
                  <el-skeleton-item v-for="n in 4" :key="n" variant="text" style="width: 48px; height: 48px" />
                </div>
              </div>

              <!-- 數量選擇區 -->
              <div class="my-4">
                <el-skeleton-item variant="text" style="width: 200px; height: 40px" />
              </div>

              <!-- 按鈕區 -->
              <div class="grid grid-cols-2 gap-5 my-5">
                <el-skeleton-item variant="button" style="width: 100%; height: 40px" />
                <el-skeleton-item variant="button" style="width: 100%; height: 40px" />
              </div>
            </template>
          </el-skeleton>
        </div>
      </div>

      <!-- 商品描述區 Skeleton -->
      <div class="descriptionProfile mt-8">
        <el-skeleton animated :rows="5">
          <template #template>
            <!-- 選項欄 -->
            <div class="flex justify-center gap-8 mb-6">
              <el-skeleton-item variant="text" style="width: 100px" />
              <el-skeleton-item variant="text" style="width: 100px" />
            </div>

            <!-- 描述內容 -->
            <div class="px-4">
              <el-skeleton-item variant="h3" style="width: 200px; margin: 0 auto 20px" />
              <el-skeleton-item v-for="n in 4" :key="n" variant="text" style="margin-bottom: 12px" />
              <el-skeleton-item variant="image" style="width: 100%; height: 300px; margin: 20px 0" />
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
    <!-- 共享購物車選擇對話框 -->
    <div v-if="sharedCartList.length === 0">
      <el-dialog v-model="dialogToggle" title="您還沒有共享購物車" width="30%">
        <AddSharedCart @createdSharedCart="refreshSharedCartList" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogToggle = false">取消</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div v-else>
      <el-dialog v-model="dialogToggle" title="選擇共享購物車">
        <el-checkbox-group v-model="selectedCarts">
          <div v-for="cart in sharedCartNames" :key="cart.id" class="cart-item">
            <el-checkbox :value="cart.id" :label="cart.name">
              {{ cart.name }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogToggle = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">確認</el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div class="loading bg-lightBlue-300 my-4 max-w-full">
      <div class="profile">
        <!-- 輪播圖 -->
        <div class="swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(image, index) in mainImgs" :key="index">
              <img :src="image.imgPath" :alt="image.imgText" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="carousel">
          <div class="min-w-[120px] h-[400px] mr-5 pl-5">
            <div
              class="mb-[10px] cursor-pointer max-w-[72px] max-h-[72px]"
              v-for="(image, index) in mainImgs"
              :key="index"
              @click="selectImage(index)"
              :class="{ 'outline outline-2 outline-black': selectedIndex === index }"
            >
              <img :src="image.imgPath" :alt="image.imgText" class="w-[72px] h-[72px] object-cover" />
            </div>
          </div>
          <div class="w-[415px] h-[415px] block">
            <img :src="selectedImage.imgPath" :alt="selectedImage.title" class="w-[415px] h-[415px] object-cover" />
          </div>
        </div>
        <!-- 商品概訊 -->
        <div class="m-4 mt-5">
          <h1 class="text-[28px]">{{ title }}</h1>
          <div class="flex">
            <h2 class="my-5 text-[20px] font-extrabold">
              {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(salePrice)).toLocaleString() }}
            </h2>
            <h2 class="ml-5 mt-6 text-s font-bold text-gray-400 line-through">
              {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(originalPrice)).toLocaleString() }}
            </h2>
          </div>
          <div class="font-extralight text-[16px]">
            <p>
              全館任選兩件88折，優惠後特價 {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(salePrice) * 0.88).toLocaleString() }}
            </p>
            <p>
              全館任選三件85折，優惠後特價 {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(salePrice) * 0.85).toLocaleString() }}
            </p>
            <p>
              全館任選四件82折，優惠後特價 {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(salePrice) * 0.82).toLocaleString() }}
            </p>
          </div>

          <div class="mt-5">
            <p class="text-[14px] font-extralight" v-if="filterColor.length > 0">顏色 :{{ selectedImage.colorText }}</p>
            <div class="flex">
              <div v-for="(color, index) in filterColor" :key="color.title">
                <input type="radio" name="my-10" class="colorCheckbox hidden" :id="`color-${index}`" :checked="index === 0" />
                <div
                  class="colorBox m-[20px] ml-0 border border-[#eaeaea] bg-[#fcfcfc] w-[48px] h-[48px] flex cursor-pointer transition-all duration-100 ease-out"
                  @click="selectColor(index)"
                >
                  <label
                    :for="`color-${index}`"
                    class="w-10 h-10 flex justify-center m-auto cursor-pointer"
                    :style="{ backgroundColor: color.colorSquare }"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <p class="text-[14px] font-extralight">數量</p>
            <div class="max-w-full w-full flex h-[40px] my-2.5">
              <button class="rounded-lg border border-gray-300 bg-gray-50 w-[45px] h-[40px] text-[20px]" @click="decrease">-</button>
              <input type="number" min="1" value="1" class="border border-x-0 border-gray-300 w-full text-center" v-model="counter" />
              <button class="rounded-lg border border-gray-300 bg-gray-50 w-[45px] h-[40px] text-[20px]" @click="increase">+</button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5 my-5">
            <button class="bg-black text-gray-50 border border-black rounded-lg text-lg p-1" @click="handleAddToCart">加入購物車</button>
            <button class="bg-black text-gray-50 border border-black rounded-lg text-lg p-1" @click="showDialog">
              <i class="fa-brands fa-shopify ml-4 text-xl"></i>
              加入共享購物車
            </button>
          </div>
          <div class="mx-auto my-5 flex justify-center text-sm hover:cursor-pointer">
            <p :class="{ active: isSubscribe }" @click="toggleWishlist">
              <i class="p-1" :class="isInWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>加入追蹤清單
            </p>
          </div>
          <div class="promotionalContainer relative mx-5 mt-5">
            <p class="mx-[7px] text-sm pl-[10px]">
              <span class="text-[#B69490]">期間限定</span>
              <span>全館$350免運！</span>
            </p>
            <p class="mx-[7px] text-sm pl-[10px]">
              <span class="text-[#B69490]">限時優惠</span>
              <span>全館兩件88折,三件85折,四件82折(buy2 for 12% off,3 for 15% off,4 for 18% off)</span>
            </p>
            <p class="mx-[7px] text-sm pl-[10px]">
              <span class="text-[#B69490]">KURT聯名</span>
              <span>系列新品8折</span>
            </p>
            <p class="mx-[7px] text-sm pl-[10px]">
              <span class="text-[#B69490]">KURT限量滿額贈</span>
              <span>滿$990贈 花happen刺繡布貼；滿2000贈 黑心帆布袋</span>
            </p>
            <p class="mx-[7px] text-sm pl-[10px]">
              <span class="text-[#B69490]">by.Lab支線</span>
              <span>設計師大賽實體化 新品限時9折</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 商品描述 -->
      <div class="descriptionProfile">
        <div class="p-5">
          <div class="navbar">
            <div
              id="navbarProductDescription"
              @click="toggleDescription"
              class="font-medium"
              :class="{ 'text-black': isDescription, description: isDescription }"
            >
              商品描述
            </div>
            <div id="navbarRate" @click="toggleReview" class="font-medium" :class="{ 'text-black': isReview }">顧客評價</div>
          </div>
          <div>
            <Reviews :product-id="productId" v-if="isReview" />
          </div>
          <div v-if="isDescription">
            <div class="descriptionTitle mx-10 my-auto flex justify-center relative">
              <h3 class="text-2xl tracking-widest mt-5">商品描述</h3>
            </div>
            <div class="flex m-auto justify-center my-10">
              <p v-html="description" class="px-[5px] text-sm"></p>
            </div>
            <div class="descriptionTitle mx-10 my-auto flex justify-center relative">
              <h3 class="text-2xl tracking-widest mt-5">了解更多</h3>
            </div>
            <div class="flex justify-center mx-auto my-0 max-w-[655px] w-full flex-wrap">
              <img
                v-for="(image, index) in desImgs"
                :key="index"
                :src="image.imgPath"
                :alt="image.imgText"
                class="object-contain w-full my-10 mx-0 lg:max-w-[655px] lg:w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
:deep(.el-dialog) {
  @apply w-[90%] md:w-[50%];
}

.loading {
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-name: appearing;
}
@keyframes appearing {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.colorCheckbox:checked + .colorBox {
  @apply border-2 border-black border-solid;
}
/* 手機輪播圖區塊 */
.swiper {
  @apply flex max-w-[768px] max-h-[500px] w-full h-full relative;
}
.swiper-slide {
  @apply justify-center content-center;
}
.swiper-slide img {
  @apply max-w-[768px] max-h-[500px] w-full h-full object-contain;
}
.swiper-pagination {
  @apply w-full absolute bottom-[20px] right-[10px];
}
:deep(.swiper-pagination-bullet) {
  @apply bg-black border border-[#ccc] cursor-pointer bottom-0;
}
/* 電腦輪播圖區塊 */
.carousel {
  @apply hidden;
}
.nav-button {
  @apply cursor-pointer text-2xl mt-[10px];
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

.navbar {
  @apply grid text-xl border-b-[3px] border-[#f3f3f3] grid-cols-2 max-w-[1310px] w-full py-5 font-light text-[#dadbdb] content-center mx-auto justify-center;
}
.navbar div {
  @apply flex justify-center mx-0 my-auto text-center max-w-[655px] w-full;
}
.navbar div:hover {
  @apply cursor-pointer text-black;
}

.promotionalContainer::before {
  @apply bg-black block absolute left-0;
  content: " ";
  height: 100%;
  width: 3px;
}
.description::after {
  @apply bg-black block absolute top-0;
  content: "    ";
  width: 40px;
  height: 3px;
}

.descriptionTitle::after {
  @apply bg-black block absolute bottom-[-12px] left-1/2 translate-x-[-50%];
  content: "    ";
  width: 40px;
  height: 3px;
}

@media screen and (1024px <= width) {
  .swiper {
    @apply hidden;
  }
  .profile {
    @apply flex max-w-[985px] justify-center mx-auto my-0;
  }
  .carousel {
    @apply flex max-w-[550px] w-full justify-center pr-5;
  }
  .descriptionProfile {
    @apply max-w-[1340px] w-full justify-center my-0 mx-auto;
  }
}
</style>
