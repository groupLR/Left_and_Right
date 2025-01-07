<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import MemberNavbar from "../components/MemberNavbar.vue"
import MemberEmpty from "../components/MemberEmpty.vue"
import AddSharedCart from "@/components/AddSharedCart.vue"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import { useCartStore } from "@/stores/cart"
import { useSharedCartStore } from "@/stores/sharedCart"
const SharedCartStore = useSharedCartStore()
const CartStore = useCartStore()
const { sharedCartList } = storeToRefs(SharedCartStore)

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
const handleAddToCart = async (productId) => {
  await CartStore.addProduct(productId, 1)
  ElMessage.success("新增成功")
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
</script>

<template>
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
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
    <div class="wishlistMain mx-auto">
      <MemberEmpty v-if="wishlists.length === 0" class="lg:px-10" />
      <div v-else class="lg:px-10">
        <div class="wishlistMain mx-auto p-10">
          <div class="wishlistTitle grid grid-cols-12 items-center border-b pb-2 text-[12px] font-semibold">
            <div class="col-span-2 px-[15px]">
              <p>商品圖</p>
            </div>
            <div class="col-span-4 px-[15px]">
              <p>商品資訊</p>
            </div>
            <div class="col-span-3 px-[15px]">
              <p>價格</p>
            </div>
            <div class="col-span-2 px-[15px]">
              <p>狀態</p>
            </div>
            <div class="col-span-1 px-[15px]">
              <p>刪除</p>
            </div>
          </div>
        </div>
        <div
          v-for="item in wishlists"
          :key="item.id"
          class="commodityList grid grid-cols-12 items-center border-b py-[15px] mx-[-10px] bg-white hover:bg-[#F5F5F5]"
        >
          <div class="deleteIcon" @click="removeItem(item.id)">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="commodityImg col-span-2 px-[15px]">
            <router-link :to="{ name: 'products-detail(連後端)', params: { productId: item.products.product_id } }">
              <img
                v-if="item.products.product_images.length > 0"
                :src="getImageUrl(item.products.product_images[0].image_path)"
                :alt="item.products.product_images[0].alt_text || '商品圖片'"
                class="aspect-square object-cover"
              />
            </router-link>
          </div>
          <div class="commodityName col-span-4 px-[15px]">
            <p>{{ item.products.product_name }}</p>
            <p class="shape">
              {{ item.products.product_specs[0].spec_value }}
            </p>
          </div>
          <div class="commodityPrice col-span-3 px-[15px] text-[12px]">
            <p class="originalPrice">NT${{ item.products.original_price }}</p>
            <p class="salePrice">NT${{ item.products.sale_price }}</p>
          </div>
          <div class="commodityStatus col-span-2 px-[15px] text-[12px]">
            <button class="btn" v-if="item.products.status == 1" @click="handleAddToCart(item.wishlists_products_id)">加入購物車</button>
            <button class="btn mt-[10px]" v-if="item.products.status == 1" @click="showDialog(item.wishlists_products_id)">加入共享購物車</button>
            <p v-else>無法購買</p>
          </div>
          <div class="commodityDelete col-span-1 px-[15px]">
            <p>
              <font-awesome-icon :icon="['fas', 'trash']" class="cursor-pointer" @click="removeItem(item.id)" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333333;
}
.wishlistMain {
  border: 1px solid #ddd;
  max-width: 1358px;
  border-top: 1px solid #fff;
  background-color: white;
}
.wishlistTitle {
  border-bottom: 1px solid #ddd;
}
.commodityList {
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}
.btn {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background-color: #0f4662;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.btn:hover {
  background-color: #7994a0;
  border: #000 1px solid;
}

.shape {
  color: #80808099;
  font-size: 12px;
}
.fa-cart-shopping {
  display: none !important;
}
.originalPrice {
  font-size: 12px;
  color: #ddd;
  text-decoration: line-through;
}
.salePrice {
  font-size: 12px;
}
.deleteIcon {
  display: none;
}
@media (max-width: 1024px) and (min-width: 769px) {
  .fa-cart-shopping {
    display: block !important;
  }
}
@media (max-width: 768px) {
  .btn {
    margin: 5px auto;
  }
  .deleteIcon {
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .wishlistMain {
    width: 100%;
  }
  .wishlistTitle {
    display: none;
  }
  .commodityList {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    padding: 0;
    border: 1px solid #ddd;
    padding-top: 15px;
    position: relative;
  }
  .commodityList:nth-of-type(n + 2) {
    margin-top: 20px;
  }
  .commodityImg {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 25px;
    width: 80%;
  }
  .commodityImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 0;
    margin: 0;
  }
  .commodityName {
    width: 100%;
    font-size: 14px;
    color: #797979;
    text-align: left;
  }
  .commodityPrice {
    padding-top: 7px;
    padding-bottom: 7px;
    text-align: left;
    width: 100%;
  }
  .commodityStatus {
    width: 100%;
    background-color: #efefef;
    padding: 15px;
    text-align: center;
    line-height: 12px;
  }
  .commodityDelete {
    display: none;
  }
}
</style>
