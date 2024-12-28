<template>
  <LogOut />
  <MemberNavbar />
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
    <div
      v-for="item in wishlists"
      :key="item.id"
      class="commodityList grid grid-cols-12 items-center border-b py-[15px] mx-[-10px] bg-white hover:bg-[#F5F5F5]"
    >
      <div class="commodityImg col-span-2 px-[15px]">
        <router-link :to="{ name: 'products-detail(連後端)', params: { productId: item.products.product_id } }">
          <img
            v-if="item.products.product_images.length > 0"
            :src="getImageUrl(item.products.product_images[0].image_path)"
            :alt="item.products.product_images[0].alt_text || '商品圖片'"
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
        <button class="btn" v-if="item.products.status == 1">加入購物車</button>
        <button class="btn mt-[10px]" v-if="item.products.status == 1">
          <font-awesome-icon style="color: aliceblue" class="shoppingBag h-[16px] w-[16px] mr-[2px]" :icon="['fas', 'bag-shopping']" />立即結帳
        </button>
        <p v-else>無法購買</p>
      </div>
      <div class="commodityDelete col-span-1 px-[15px]">
        <p>
          <font-awesome-icon :icon="['fas', 'trash']" class="cursor-pointer" @click="removeItem(item.id)" />
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import MemberNavbar from "../components/MemberNavbar.vue"
import LogOut from "@/components/Logout.vue"

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
const removeItem = async (id) => {
  console.log(`刪除項目 ID: ${id}`)
  try {
    await axios.delete(`${API_URL}/wishlist/delete/${id}`)
    wishlists.value = wishlists.value.filter((item) => item.id !== id)
    console.log(`刪除成功: ${id}`)
  } catch (error) {
    console.error("刪除失敗", error)
  }
}
</script>

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
}
.wishlistTitle {
  border-bottom: 1px solid #ddd;
}
.commodityList {
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}
.btn {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background-color: #000;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #fff;
  color: #000;
  border: #000 1px solid;
}
.btn:hover > .shoppingBag {
  color: #000 !important;
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

@media (max-width: 1024px) and (min-width: 769px) {
  .btn {
    display: none;
  }
  .fa-cart-shopping {
    display: block !important;
  }
}
@media (max-width: 768px) {
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
