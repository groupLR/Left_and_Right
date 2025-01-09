<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import MemberNavbar from "../components/MemberNavbar.vue"
import AddSharedCart from "@/components/AddSharedCart.vue"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/cart"
import { useSharedCartStore } from "@/stores/sharedCart"
import { useExchangeRateStore } from "@/stores/exchangeRates"
const SharedCartStore = useSharedCartStore()
const CartStore = useCartStore()
const ExchangeRateStore = useExchangeRateStore()
const { sharedCartList } = storeToRefs(SharedCartStore)
const { currentRate } = storeToRefs(ExchangeRateStore)

const API_URL = import.meta.env.VITE_API_URL
const userId = localStorage.getItem("UID")
const wishlists = ref([])
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") return ""
  const cleanedPath = imagePath.startsWith("./") ? imagePath.slice(1) : imagePath
  return `${API_URL}/${cleanedPath}`
}

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`)
    if (response.data.status === "Success") {
      wishlists.value = response.data.data
    } else {
      console.error("API回傳錯誤: ", response.data.message)
    }
  } catch (error) {
    console.error("無法獲取願望清單資料：", error)
  }
})
// 刪除願望清單的方法
const removeItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/wishlist/delete/${id}`)
    wishlists.value = wishlists.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error("刪除失敗", error)
  }
}

// 加入購物車
const handleAddToCart = async (productId, productName) => {
  productId = Number(productId)
  await CartStore.addProduct(productId, 1, productName)
}

// 共享購物車相關
const selectedCarts = ref([])
const dialogToggle = ref(false)
const sharedCartNames = ref([])
const seletedProduct = ref(null)

// 顯示共享購物車列表
const showDialog = async (productId) => {
  dialogToggle.value = true
  await SharedCartStore.fetchSharedCartList(userId)
  sharedCartNames.value = sharedCartList.value.map((cart) => ({
    id: cart.id,
    name: cart.name || `您與 ${cart.member[0]} 與其他 ${cart.member.length - 1} 人共享的購物車`,
  }))
  selectedCarts.value = []
  seletedProduct.value = productId
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
        await SharedCartStore.addProductToSharedCart(cartId, seletedProduct.value, 1)
      })
    )

    // 所有操作完成後才關閉對話框和顯示成功訊息
    dialogToggle.value = false
    ElMessage.success(`成功把商品加入 ${selectedCarts.value.length} 個共享購物車`)
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
window.scrollTo(0, 0)
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
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
          <div v-for="cart in sharedCartNames" :key="cart.id">
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

    <!-- 主要內容區 -->
    <div class="max-w-[1358px] mx-auto mb-10 px-10 py-8 bg-white border border-[#ddd] border-t-white">
      <div v-if="wishlists.length === 0" class="py-10 lg:px-10 flex justify-center mx-auto bg-white">
        <div class="flex flex-col justify-center mx-auto">
          <img src="../assets/member_center_list_empty.png" alt="" class="mx-auto w-[121px] h-[129px]" />
          <p class="pl-2 pt-5 mx-auto text-sm text-gray-500">沒有任何追蹤商品呦</p>
          <p class="pl-2 mx-auto text-sm text-gray-500">快去逛逛吧！</p>
          <div class="flex mx-auto justify-center">
            <RouterLink to="/categories/31"
              ><button class="bg-[#314e86] hover:bg-[#6A88BE] w-[220px] h-8 text-white text-sm rounded-lg mt-4 px-2 py-1">馬上逛逛</button></RouterLink
            >
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="text-xl font-bold mb-4">追蹤清單</h1>
        <!-- 商品列表 -->
        <div class="grid grid-cols-1 gap-4 justify-between">
          <div
            v-for="item in wishlists"
            :key="item.id"
            class="grid grid-cols-12 items-center border rounded-lg lg:border-b border-[#ddd] py-4 hover:bg-[#F5F5F5] transition-colors relative"
          >
            <!-- 手機版刪除按鈕 -->
            <button class="md:hidden absolute top-4 right-5 cursor-pointer" @click="removeItem(item.id)">
              <font-awesome-icon :icon="['fas', 'trash']" class="text-red-400 hover:text-gray-600" />
            </button>

            <!-- 商品圖片 -->
            <div class="col-span-12 md:col-span-2 px-4">
              <router-link :to="{ name: 'products-detail(連後端)', params: { productId: item.products.product_id } }">
                <img
                  v-if="item.products.product_images.length > 0"
                  :src="getImageUrl(item.products.product_images[0].image_path)"
                  :alt="item.products.product_images[0].alt_text || '商品圖片'"
                  class="aspect-square object-cover w-full"
                />
              </router-link>
            </div>

            <!-- 商品資訊 -->
            <div class="col-span-12 md:col-span-4 px-4 mt-4 md:mt-0">
              <p class="text-black font-medium text-sm md:text-base">{{ item.products.product_name }}</p>
              <!-- <p class="text-[#80808099] text-xs">{{ item.products.product_specs[0].spec_value }}</p> -->
            </div>

            <!-- 價格 -->
            <div class="col-span-12 md:col-span-2 px-4 mt-2 md:mt-0">
              <p class="text-[#ddd] text-xs line-through md:text-base">
                {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(item.products.original_price)).toLocaleString() }}
              </p>
              <p class="text-black text-sm md:text-base">
                {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(item.products.sale_price)).toLocaleString() }}
              </p>
            </div>

            <!-- 操作按鈕 -->
            <div class="grid grid-cols-2 px-4 lg:px-0 col-span-12 md:col-span-3 mt-4 lg:mt-2 md:mt-0 gap-1">
              <button
                v-if="item.products.status == 1"
                class="flex items-center justify-center px-3 py-2 bg-[#314e86] text-white rounded-xl text-sm font-bold border border-[#314e86] hover:bg-[#6A88BE] hover:border-[#6A88BE] transition-colors whitespace-nowrap overflow-hidden"
                @click="handleAddToCart(item.wishlists_products_id, item.products.product_name)"
              >
                加入購物車
              </button>
              <button
                v-if="item.products.status == 1"
                class="flex items-center justify-center px-3 py-2 bg-[#fff] text-[#314e86] rounded-xl text-sm font-bold border border-[#314e86] hover:bg-[#6A88BE] hover:border-[#6A88BE] hover:text-white transition-colors whitespace-nowrap overflow-hidden"
                @click="showDialog(item.wishlists_products_id)"
              >
                加入共享購物車
              </button>
              <p v-else class="text-xs">無法購買</p>
            </div>

            <!-- 桌面版刪除按鈕 -->
            <div class="hidden md:block col-span-1 px-4 text-center">
              <font-awesome-icon :icon="['fas', 'trash']" class="cursor-pointer text-gray-400 hover:text-red-600" @click="removeItem(item.id)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-dialog) {
  @apply rounded-lg;
}

:deep(.el-checkbox__label) {
  @apply text-gray-700;
}

@media (max-width: 768px) {
  .commodityList {
    @apply flex flex-col w-4/5 mx-auto py-4 border border-[#ddd] relative;
  }
}
</style>
