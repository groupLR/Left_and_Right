<script setup>
import axios from "axios"
import vueDanmaku from "vue3-danmaku"
import { useRoute, useRouter } from "vue-router"
import { onMounted, ref, computed, watch, onUnmounted } from "vue"
import { ElMessage } from "element-plus"
import { useSharedCartStore } from "@/stores/sharedCart"
import AddMember from "@/components/AddMember.vue"
import Warning from "@/components/Warning.vue"
import CartProduct from "@/components/CartProduct.vue"
import { webSocketService } from "@/websocket/websocket.js"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/cart"
import { useExchangeRateStore } from "@/stores/exchangeRates"

const cartStore = useCartStore()
const { countryList, paymentOptions, deliveryOptions } = storeToRefs(cartStore)
const SharedCartStore = useSharedCartStore()
const ExchangeRateStore = useExchangeRateStore()
const { currentRate } = storeToRefs(ExchangeRateStore)

const route = useRoute()
const router = useRouter()

// data
const products = ref([]) // 儲存後端返回的商品資料
const isSharedCart = ref(false) // 是不是共享購物車（用cart/後面有沒有帶 groupId 判斷 )
const sharedCartName = ref("") // 共享購物車名稱
const sharedCartMembers = ref([]) // 共享購物車成員
const userId = localStorage.getItem("UID")
const userName = ref("")
const danmus = ref([])
const copyDialogToggle = ref(false)
const selectMemberDialogToggle = ref(false)
const selectedMembers = ref([])
// 購物車完整路徑(共享購物車複製網址、發 Email 用)
const fullUrl = window.location.origin + router.currentRoute.value.fullPath

// 送貨表單
const selectedCountry = ref("TW")
const selectedDelivery = ref("home-delivery")
const selectedPayment = ref("credit-card")

// computed
const itemCount = computed(() => {
  return products.value.filter((item) => item.quantity > 0).length
})

const itemPrice = computed(() => {
  return products.value.reduce((total, item) => total + item.original_price * item.quantity, 0)
})

// method

// 複製路徑
const copyPath = async () => {
  await navigator.clipboard.writeText(`${fullUrl}`)
  ElMessage.success("網址複製成功")
}

// 發送 Email 選擇框
const sendEmail = async () => {
  selectMemberDialogToggle.value = true
}

// 確認發送 Email
const handleConfirm = async () => {
  try {
    await SharedCartStore.sendMail(fullUrl, selectedMembers.value, userName.value)
    ElMessage.success("邀請發送成功")
    selectedMembers.value = []
    selectMemberDialogToggle.value = false
    copyDialogToggle.value = false
  } catch (err) {
    console.error("送信失敗", err)
    ElMessage.error("送信失敗，請稍候再試")
  }
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

// 加彈幕
const addDanmu = (message) => {
  // 創建一個新陣列，包含所有現有彈幕和新彈幕，不然只用 push 更新陣列的話會因為套件的特性會只顯示第一條
  danmus.value = [...danmus.value, message]
}

// 獲取購物車商品
const fetchCartItems = async () => {
  if (userId) {
    try {
      // 先把 localStorage 的商品加入購物車
      const localCart = JSON.parse(localStorage.getItem("cart")) || []
      if (localCart.length > 0) {
        // 使用 Promise.all 等待所有商品加入完成
        await Promise.all(localCart.map((products) => cartStore.addProduct(products.product_id, products.quantity, products.product_name)))
        // 清空 localStorage
        localStorage.removeItem("cart")
      }

      // 取得購物車
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/cartQuery`, {
        headers: {
          userId,
        },
      })
      products.value = response.data // 將 API 返回的資料存入 products
    } catch (error) {
      ElMessage({
        type: "error",
        message: "獲取購物車資料失敗",
        duration: 3000,
      })
    }
  } else {
    // 未登入時直接讀取 localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    products.value = storedCart
  }
}

// 刪除購物車商品的函式
const deleteProduct = async (id) => {
  if (userId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/cart/cartDelete/${id}`, {
        headers: {
          userId,
        },
      })
      .then(() => {
        return initializeCartPage()
      })
      .catch((error) => {
        console.error("刪除商品失敗:", error)
      })
  } else {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    const updatedCart = storedCart.filter((item) => item.product_id !== id)
    localStorage.setItem("cart", JSON.stringify(updatedCart)) //存回localstorage
    initializeCartPage()
  }
}

// 刪除商品（判斷是否共享）
const deleteProductFromCart = async (payload) => {
  if (isSharedCart.value) {
    try {
      await SharedCartStore.deleteProductInSharedCart(route.params.groupId, payload.id)
      // 發送 WebSocket 刪除訊息
      webSocketService.sendMessage("cartDelete", {
        userName: userName.value,
        groupId: route.params.groupId,
        itemId: payload.id,
        itemName: payload.name,
      })
      ElMessage.success("刪除商品成功")
      return initializeCartPage()
    } catch (err) {
      ElMessage.error({
        message: "從共享購物車刪除商品失敗",
        type: "error",
      })
      console.error("從共享購物車刪除商品失敗", err)
    }
  } else {
    try {
      await deleteProduct(payload.id)
      ElMessage.success(`刪除${payload.name}成功`)
    } catch (err) {
      ElMessage.error({
        message: "從購物車刪除商品失敗",
        type: "error",
      })
      console.error("從購物車刪除商品失敗", err)
    }
  }
}

// 更新購物車商品數量的函式
const updateQuantity = async ({ id, quantity }) => {
  if (quantity < 1) {
    ElMessage.error("數量不能小於 1")
    return
  }
  if (userId) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update-quantity`,
        {
          product_id: id,
          quantity,
        },
        {
          headers: { userId },
        }
      )
      if (response.data.success) {
        await initializeCartPage() // 重新獲取購物車列表
      } else {
        ElMessage.error("更新數量時出錯，請稍後再試")
      }
    } catch (error) {
      console.error("更新數量時出錯", error)
      ElMessage.error("更新數量時出錯，請稍後再試")
    }
  } else {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      //尋找欲修改商品
      const existingItem = storedCart.find((item) => item.product_id === id)
      if (existingItem) {
        // 直接設定新的數量
        existingItem.quantity = quantity
      }
      localStorage.setItem("cart", JSON.stringify(storedCart))
      await initializeCartPage()
    } catch (error) {
      console.error("本地存儲更新失敗", error)
      ElMessage.error("更新購物車失敗，請稍後再試")
    }
  }
}

// 更新商品數量（判斷是否共享）
const updateProductQty = async (payload) => {
  if (isSharedCart.value) {
    try {
      await SharedCartStore.updateProductQtyToSharedCart(route.params.groupId, payload.id, payload.quantity)
      // 發送 WebSocket 更新訊息
      webSocketService.sendMessage("cartUpdate", {
        userName: userName.value,
        groupId: route.params.groupId,
        itemId: payload.id,
        quantity: payload.quantity,
        itemName: payload.name,
      })
    } catch (err) {
      ElMessage.error({
        message: "更新共享購物車商品數量失敗：",
        type: "error",
      })
      console.error("更新共享購物車數量失敗：", err)
    }
  } else {
    try {
      await updateQuantity(payload)
    } catch (err) {
      ElMessage.error({
        message: "更新購物車商品數量失敗：" + (err.response?.data?.message || err.message),
        type: "error",
      })
      console.error("更新購物車數量失敗：", err)
    }
  }
}

// 前往結帳
const goToNext = async () => {
  try {
    selectedCountry.value && localStorage.setItem("country", selectedCountry.value)
    selectedDelivery.value && localStorage.setItem("delivery", selectedDelivery.value)
    selectedPayment.value && localStorage.setItem("payment", selectedPayment.value)
    if (isSharedCart.value) {
      await router.push(`/Debit/${route.params.groupId}`)
    } else {
      await router.push("/Debit")
    }
  } catch (err) {
    console.error("導航失敗:", err)
  }
}

// 刪除共享購物車
const deleteSharedCart = async () => {
  try {
    await SharedCartStore.deleteSharedCart(route.params.groupId)
    const message = sharedCartName.value ? `刪除 ${sharedCartName.value} 成功` : "刪除共享購物車成功"
    ElMessage.success(message)
    // 導航到共享購物車列表
    router.push("/sharedcartlist")
  } catch (error) {
    console.error("刪除購物車失敗:", error)
    ElMessage.error("刪除購物車失敗，請稍後再試")
  }
}
// 新增好友後重新渲染共享購物車
const refreshSharedCart = async () => {
  const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
  products.value = data.productDataList
  sharedCartMembers.value = data.info.memberName
}

const initializeCartPage = async () => {
  // 檢查路由是否包含 groupId 參數，有就抓共享購物車，沒有就抓自己的購物車
  if ("groupId" in route.params) {
    isSharedCart.value = true
    try {
      const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
      products.value = data.productDataList || []
      sharedCartName.value = data.info.cartName || ""
      sharedCartMembers.value = data.info.memberName || []
    } catch (error) {
      console.log(error.status)
      if (error.status === 403) {
        router.push("/empty")
        ElMessage.error("無訪問權限")
        return
      }
      ElMessage.error("發生錯誤")
    }
  } else {
    isSharedCart.value = false
    await fetchCartItems()
  }
}
// 優惠券

// 儲存優惠券
const coupons = ref([])

// 錯誤訊息
const error = ref(null)
// 運費
const shippingFee = 60

// 預設商品金額
const available = "available"

// 獲取有效優惠券
const validCoupon = computed(() => {
  if (coupons.value.length > 0) {
    const bestCoupn = coupons.value.sort((a, b) => b.discount_amount - a.discount_amount)
    return bestCoupn[0] // 透過排序優惠較高的價格後，返回第一個有效優惠券
  }
  return null // 如果沒有有效優惠券，返回 null
})

// 計算合計金額
const totalAmount = computed(() => {
  if (error.value) return "發生錯誤，無法計算金額" // 發生錯誤

  const discount = validCoupon.value ? validCoupon.value.discount_amount : 0
  const totalPrice = Math.max(0, itemPrice.value - discount)
  return totalPrice + shippingFee
})

// 獲取優惠券資料
const uid = localStorage.getItem("UID")

const fetchCoupons = async () => {
  if (!uid) {
    error.value = "UID 不存在於 localStorage"
    return
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/coupon/user/${uid}`)
    coupons.value = response.data
  } catch (err) {
    console.error("獲取優惠券失敗:", err.message)
    error.value = err.message // 儲存錯誤訊息
  }
}

// 前往購物
const goShop = () => {
  router.push("/categories/28")
}

// onMounted
onMounted(async () => {
  await initializeCartPage()
  if (userId) {
    await fetchuserName()
    await fetchCoupons()
  }
  // 連接 WebSocket
  webSocketService.connect()

  // 設定 WebSocket 訊息處理函式
  // 數量更新
  webSocketService.onMessage("cartUpdate", async ({ data }) => {
    // 確保只處理相同購物車的訊息
    if (data.groupId === route.params.groupId) {
      addDanmu(`${data.userName} 更新 ${data.itemName}數量為 ${data.quantity}`)
      await initializeCartPage()
    }
  })
  // 刪除商品
  webSocketService.onMessage("cartDelete", async ({ data }) => {
    if (data.groupId === route.params.groupId) {
      await initializeCartPage()
      addDanmu(`${data.userName} 刪除了 ${data.itemName}`)
    }
  })
  // 新增商品
  webSocketService.onMessage("addProduct", async ({ data }) => {
    if (data.groupId === route.params.groupId) {
      try {
        await initializeCartPage()
        addDanmu(`${data.userName} 新增了 ${data.itemName} 進入共享購物車`)
      } catch (error) {}
    } else {
      console.error("groupId 不符合")
    }
  })
})

// watch
watch(
  () => route.params,
  async () => {
    await initializeCartPage()
  }
)

// onUnmounted
onUnmounted(() => {
  webSocketService.disconnect()
})
</script>
<template>
  <div>
    <el-dialog class="w-[90%] md:[30%]" v-model="copyDialogToggle" title="請選擇分享方式">
      <div class="flex flex-col items-center">
        <button class="bg-[#0f4662] text-white w-[50%] p-2 m-2 rounded" @click="sendEmail">透過 Email 邀請</button>
        <button class="border-2 w-[50%] p-2 m-2 rounded" @click="copyPath">複製網址</button>
      </div>
    </el-dialog>
  </div>
  <div>
    <el-dialog v-model="selectMemberDialogToggle" title="選擇要發 Email 給哪個購朋友">
      <el-scrollbar height="200px">
        <el-checkbox-group v-model="selectedMembers">
          <div v-for="(member, index) in sharedCartMembers" :key="index">
            <el-checkbox :value="member" :label="member">
              {{ member }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectMemberDialogToggle = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">確認</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="fixed top-10 w-full z-[100] pointer-events-none">
    <vue-danmaku v-if="isSharedCart" v-model:danmus="danmus" :speeds="100" :channels="5" class="h-[100px] w-full" />
  </div>
  <section class="bg-gray-100 pb-[150px]">
    <section class="px-2 max-w-[1340px] mx-auto py-5 md:px-10">
      <section class="bg-gray-100 mt-5" v-if="isSharedCart">
        <div class="flex justify-between items-center">
          <div class="flex gap-4 items-center">
            <h1 class="text-2xl font-bold">共享購物車</h1>
            <button @click="copyDialogToggle = true">
              <i class="fa-solid fa-arrow-up-right-from-square align-center"></i>
            </button>
          </div>
          <div>
            <AddMember :groupId="route.params.groupId" :members="sharedCartMembers" @memberAdded="refreshSharedCart" />
            <Warning content="您確定要刪除共享購物車嗎？" @confirm="deleteSharedCart" />
          </div>
        </div>
        <div class="bg-[#C9D9F0] px-5 pb-5 rounded-xl pt-5 my-5">
          <div>
            <h2 class="text-xl font-extrabold text-[#314e86]">{{ sharedCartName }}</h2>
          </div>
          <div>
            <p class="font-medium">購朋友：{{ sharedCartMembers.join("、") }}</p>
          </div>
        </div>
      </section>
      <section v-else>
        <h1 class="text-2xl font-bold my-5 ml-2">購物車</h1>
      </section>

      <!-- 步驟 -->
      <section class="flex justify-center">
        <el-steps style="min-width: 300px" :active="1" align-center class="md:w-[600px]">
          <el-step title="購物車" />
          <el-step title="結帳" />
        </el-steps>
      </section>

      <!-- 主要內容區 -->
      <section class="flex flex-col mt-10 md:flex-row md:gap-5">
        <section class="md:w-2/3">
          <!-- 商品列表 -->
          <section class="bg-white rounded-xl flex flex-col items-center" v-if="products.length == 0">
            <el-empty description="購物車還是空的" />
            <button class="bg-[#314e86] px-4 text-white py-2 rounded hover:bg-[#6A88BE] mb-4" @click="goShop">前往購物</button>
          </section>
          <section class="bg-white rounded-xl" v-else>
            <CartProduct
              v-for="item in products"
              :key="item.product_id"
              :id="item.product_id"
              :name="item.product_name"
              :originalPrice="item.original_price"
              :salePrice="item.sale_price"
              :imgPath="item.image_path"
              :quantity="item.quantity"
              @updateQuantity="updateProductQty"
              @deleteProduct="deleteProductFromCart"
            />
          </section>
          <!-- 送貨及付款方式 -->
          <section class="bg-white rounded-xl px-5 py-5 mt-5" v-if="products.length !== 0">
            <div class="flex justify-between items-center my-4">
              <label class="shrink-0 mr-2">送貨地點</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedCountry"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <div class="flex justify-between items-center my-4">
              <label class="shrink-0 mr-2">送貨方式</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedDelivery"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="option in deliveryOptions" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
              </el-select>
            </div>
            <div class="flex justify-between items-center my-4">
              <label class="shrink-0 mr-2">付款方式</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedPayment"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="option in paymentOptions" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
              </el-select>
            </div>
            <div class="text-gray-500">
              <p>取貨通知：</p>
              <p>
                - 訂單到達超商七日內，每日皆會傳送取貨簡訊，並於第五日時撥打語音電話通知取貨哦！
                <br />
                - 現貨訂單狀態更改「已確認」後，2-3天寄出。 (不包含假日及國定假日)
                <br />
                <br />
                - 本公司產品享7天鑑賞期，30天保固維修
                <br />
                - 免付費電話：0800 000 004
                <br />
                - 預購與現貨一併出貨
              </p>
            </div>
          </section>
        </section>
        <!-- 優惠和小計區塊 -->
        <aside class="md:w-1/3 flex flex-col gap-5 mt-5 md:mt-0">
          <!-- 優惠區塊 -->
          <div class="sticky top-[70px] xl:top-[112px]">
            <div class="bg-white p-5 rounded-xl" v-if="products.length !== 0">
              <h2 class="text-xl font-bold">已享用之優惠</h2>
              <!-- 錯誤提示 -->
              <div v-if="error" class="text-red-500 text-center">{{ error }}</div>
              <div v-if="validCoupon" class="flex items-start flex-col">
                <p class="my-4 px-5 bg-green-100 text-center text-sm md:text-base">優惠促銷</p>
                <p class="text-sm md:text-base">
                  {{ validCoupon.name }} - 滿 {{ currentRate.symbol || "NT"
                  }}{{ ExchangeRateStore.calConvertedPrice(Number(validCoupon.min_spend)).toLocaleString() }} 元可用
                </p>
                <div class="w-full flex justify-end">
                  <p class="text-sm md:text-base text-green-600 font-bold">
                    - {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(validCoupon.discount_amount)).toLocaleString() }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 小計 -->
            <div class="bg-white p-5 rounded-xl mt-5">
              <h2 class="text-xl font-bold mb-2">訂單資訊</h2>
              <h3 class="mb-4">商品項目：{{ itemCount }} 件</h3>
              <div class="flex flex-col gap-3">
                <div class="flex justify-between">
                  <p>小計</p>
                  <p>{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(itemPrice)).toLocaleString() }}</p>
                </div>
                <div v-if="validCoupon" class="flex justify-between">
                  <p>折扣</p>
                  <p>{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(validCoupon.discount_amount)).toLocaleString() }}</p>
                </div>
                <div class="flex justify-between">
                  <p>運費</p>
                  <p v-if="products.length !== 0">
                    {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(shippingFee)).toLocaleString() }}
                  </p>
                  <p v-if="products.length == 0">{{ currentRate.symbol || "NT" }} 0</p>
                </div>
                <hr />
                <div class="flex justify-between">
                  <p>合計</p>
                  <p class="font-bold text-amber-500">
                    {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalAmount)).toLocaleString() }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </section>
    <!-- 前往結帳 -->
    <section class="fixed bottom-0 w-full bg-white shadow-2xl" v-if="products.length !== 0">
      <div class="flex gap-5 justify-end items-center m-5 max-w-[1365px]">
        <p class="text-amber-500 text-lg font-extrabold">
          合計：{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalAmount)).toLocaleString() }}
        </p>
        <button class="bg-[#314e86] hover:bg-[#6A88BE] px-2 py-1 text-white rounded md:px-10" @click="goToNext" :disabled="products.length === 0">
          前往結帳
        </button>
      </div>
    </section>
  </section>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

:deep(.el-step__title.is-finish) {
  @apply text-[#6A88BE] font-bold;
}

:deep(.el-step__head.is-finish) {
  @apply text-[#6A88BE] border-[#6A88BE];
}
</style>
