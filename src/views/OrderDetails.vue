<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import ChatBox from "../components/chatbox.vue"
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"

import { useExchangeRateStore } from "@/stores/exchangeRates"
const ExchangeRateStore = useExchangeRateStore()
const { currentRate } = storeToRefs(ExchangeRateStore)
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
  <div class="pb-10">
    <div class="p-5 mt-3 max-w-[1340px] mx-auto">
      <!-- 訂單簡易資訊 -->
      <div class="h-40 bg-white rounded-lg p-4 text-medium grid grid-rows-4 leading-9 justify-between">
        <p>訂單編號 : {{ purchaseID }}</p>
        <p>訂單狀態 : 已完成</p>
        <p>顧客姓名 : {{ customerInfo.cuName }}</p>
        <p>訂單金額 : {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalPrice)).toLocaleString() }}</p>
      </div>
      <!-- 訂單商品 -->
      <div class="bg-white rounded-lg p-4 mt-5 lg:hidden">
        <h2 class="text-lg font-semibold">訂單內容 ({{ productCount }}件)</h2>
        <div v-for="product in productInfo" :key="product.product_id" class="grid grid-cols-4">
          <div class="col-span-1">
            <img :src="getImageUrl(product.image_path.image_path)" alt="商品圖片" />
          </div>
          <div class="col-span-3">
            <p class="ml-4 pt-5">{{ product.product_name }}</p>
            <div class="grid grid-cols-2 mt-3 leading-8">
              <p class="ml-5">數量 : {{ product.quantity }}</p>
              <p class="mx-auto">
                價格 :{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(product.sale_price)).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 justify-between gap-1 leading-7 px-4">
          <p>小計 : {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalPrice)).toLocaleString() }}</p>
          <p>折扣 : - {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(200)).toLocaleString() }}</p>
          <p>運費 : {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(60)).toLocaleString() }}</p>
          <p>合計 : {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalPrice - 200 + 60)).toLocaleString() }}</p>
        </div>
      </div>
      <!-- 訂單詳細資訊 -->
    </div>
    <div class="ordersMain">
      <div class="bg-white mx-5 rounded-lg hidden lg:block lg:px-5">
        <div class="panelHeader">
          <h3>訂單內容 ({{ productCount }}件)</h3>
        </div>
        <div class="panelBody">
          <transition name="slide-height">
            <div v-show="currentPage">
              <div class="order-detail">
                <div class="ordersTitle">
                  <div class="ordersTitleName">商品資料</div>
                  <div class="ordersTitlePrice">價格</div>
                  <div class="ordersTitleQuantity">數量</div>
                  <div class="ordersTitleTotal">小計</div>
                </div>
                <div v-for="product in productInfo" :key="product.product_id" class="itemsCard">
                  <div class="itemsName">
                    <router-link :to="{ name: 'products-detail(連後端)', params: { productId: product.product_id } }">
                      <img :src="getImageUrl(product.image_path.image_path)" alt="商品圖片" />
                      {{ product.product_name }}
                    </router-link>
                  </div>
                  <div class="itemsPrice">
                    {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(product.sale_price)).toLocaleString() }}
                  </div>
                  <div class="itemsQuantity"><span>數量:</span>{{ product.quantity }}</div>
                  <div class="itemsTotal">
                    {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(product.sale_price * product.quantity)).toLocaleString() }}
                  </div>
                </div>
                <!-- <div class="couponUsed">
							<h5>已使用之優惠</h5>
							<span class="coupon-type">優惠促銷</span>
							<p>限時全館$350免運</p>
						</div> -->
              </div>
              <div class="ordersTotal mb-5">
                <div class="ordersTotalCard">
                  <div class="subtotal">
                    小計 : <span> {{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalPrice)).toLocaleString() }}</span>
                  </div>
                  <div class="coupon">
                    折扣 : <span>{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(200)).toLocaleString() }}</span>
                  </div>
                  <div class="delivery jus">
                    運費 : <span>{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(60)).toLocaleString() }}</span>
                  </div>
                  <div class="total">
                    合計 :
                    <span>{{ currentRate.symbol || "NT" }}{{ ExchangeRateStore.calConvertedPrice(Number(totalPrice - 200 + 60)).toLocaleString() }} </span>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="slide">
        <div class="mx-5 mb-5 lg:my-5 px-5 lg:px-4 bg-white rounded-lg grid grid-cols-1 lg:grid-cols-2">
          <div class="orderInformation">
            <h4>訂單資訊</h4>
            <ul>
              <li>訂單號碼:{{ purchaseID }}</li>
              <li>訂單狀態: 已完成</li>
            </ul>
          </div>
          <div class="customInformation">
            <h4>顧客資訊</h4>
            <ul>
              <li>名字: {{ customerInfo.cuName }}</li>
              <li>電話: {{ customerInfo.cuPhone }}</li>
              <li>性別: {{ customerInfo.gender === "o" ? "秘密" : customerInfo.gender === "f" ? "女" : customerInfo.gender === "m" ? "男" : "未知" }}</li>
            </ul>
          </div>
          <div class="deliveryInformation">
            <h4>送貨資訊</h4>
            <ul>
              <li>送貨方式: {{ orderInfo.DeliveryWay }}</li>
              <li>送貨狀態: 已完成</li>
              <li>收件人名字: {{ deliveryInfo.acName }}</li>
              <li>收件人電話: {{ deliveryInfo.acPhone }}</li>
              <li>配送地址: {{ deliveryInfo.addr }}</li>
            </ul>
          </div>

          <div class="paymentInformation">
            <h4>付款資訊</h4>
            <ul>
              <li>付款方式: {{ orderInfo.payWay }}</li>
              <li>卡片名稱: {{ paymentInfo?.cardName || "N/A" }}</li>
              <li>有效日期: {{ paymentInfo?.efficentDate || "N/A" }}</li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="mx-5 px-5 bg-white rounded-lg">
        <div><ChatBox /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-height-enter-active,
.slide-height-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}
.slide-height-enter-from,
.slide-height-leave-to {
  max-height: 0;
}
.slide-height-enter-to,
.slide-height-leave-from {
  max-height: 1000px;
  opacity: 1;
}
h4 {
  font-size: 18px;
  font-weight: 600;
}

.ordersMain {
  box-sizing: border-box;
  max-width: 1340px;
  margin: auto;
}
.panelHeader {
  position: relative;
  overflow: hidden;
  text-align: center;
  font-size: 20px;
  padding: 24px;
  border-bottom: 1px solid #ddd;
  height: auto;
}
.panelBody {
  position: relative;
  overflow: hidden;
}

.panelHeader h3 {
  line-height: 25px;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}
.Cart {
  line-height: 25px;
  font-size: 20px;

  padding: 0;
  margin: 0;
}
.ordersTitle,
.itemsCard {
  display: flex;
  padding: 15px 0;
  border: 1px solid #ddd;
  border-top: none;
  justify-content: space-between;
}

.ordersTitleName,
.itemsName {
  width: 33%;
  padding-left: 15px;
  padding-right: 15px;
}
.ordersTitleCoupon,
.itemsCoupon {
  width: 16%;
  padding-left: 15px;
  padding-right: 15px;
}
.ordersTitlePrice,
.itemsPrice {
  text-align: center;
  width: 16%;
  padding-left: 15px;
  padding-right: 15px;
}
.ordersTitleQuantity,
.itemsQuantity {
  text-align: center;
  width: 16%;
  padding-left: 15px;
  padding-right: 15px;
}
.ordersTitleTotal,
.itemsTotal {
  text-align: end;
  width: 16%;
  padding-left: 15px;
  padding-right: 15px;
}
.itemsName img {
  height: 150px;
  width: 150px;
  object-fit: cover;
  float: left;
}
.itemsName p {
  color: #777777;
  font-size: 13px;
  padding: 0;
  margin: 0;
}
.couponUsed {
  padding: 30px;
  border: 1px solid #ddd;
  border-top: none;
  padding-top: 10px;
}
.couponUsed h5 {
  font-size: 14px;
  margin: 10px 0;
}
.couponUsed span {
  display: inline-block;
  width: 140px;
  padding: 5px;
  line-height: 11px;
  font-size: 11px;
  background-color: #e8f8e8;
  text-align: center;
}
.couponUsed p {
  display: inline;
  padding: 5px 15px;
  line-height: 20px;
}
.ordersTotal {
  border: 1px solid #ddd;
  border-top: none;
}
.ordersTotalCard {
  justify-self: end;
  width: 40%;
  padding: 15px;
}
.subtotal,
.delivery,
.coupon,
.total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.subtotal span,
.delivery span,
.total span {
  text-align: right;
}
hr {
  border: none;
  margin: 20px 0;
  border-top: 1px solid #ddd;
}
.total {
  font-weight: 600;
}

.addCartAgain {
  display: flex;
  padding: 10px;
  border: 1px solid #ddd;
  border-top: none;
  position: relative;
  height: 50px;
  margin-bottom: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.addCartAgain .btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  padding: 6px 12px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.fa-cart-shopping {
  color: #fff !important;
}
.otherInformation {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}
.orderInformation,
.deliveryInformation,
.customInformation,
.paymentInformation {
  box-sizing: border-box;
  width: 50%;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 15px;
}

.orderInformation ul,
.deliveryInformation ul,
.customInformation ul,
.paymentInformation ul {
  list-style: none !important;
  padding: 0;
  margin: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.socialBtn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
  margin: 12px 0px;
}

.orderStatusNotify {
  border: 1px solid #ddd;
  border-top: 1px solid #ddd;
  padding: 0 15px;
}

.itemsQuantity span {
  display: none;
}

.cartSwitch {
  margin-left: 10px;
}
@media (max-width: 768px) {
  .panelHeader {
    display: flex;
    justify-content: space-between;
  }
  .Cart span {
    display: none;
  }
  .ordersTitle {
    display: none;
  }
  .itemsCard {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .itemsCard img {
    width: 100%;
    height: auto;
  }
  .itemsCoupon {
    display: none;
  }
  .itemsName,
  .itemsPrice,
  .itemsQuantity,
  .itemsTotal {
    max-width: 50%;
    box-sizing: border-box;
    flex: 0 0 50%;
  }
  .itemsPrice {
    display: flex;
    align-self: center;
    justify-content: end;
  }
  .itemsQuantity {
    display: flex;
    justify-content: start;
  }
  .itemsQuantity span {
    display: inline;
  }
  .couponUsed p {
    display: block;
    padding-left: 0;
  }
  .ordersTotalCard {
    width: 100%;
  }
  .addCartAgain {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    height: auto;
  }
  .addCartAgain .btn {
    position: static;
    width: 100%;
    right: auto;
    top: auto;
    box-sizing: border-box;
  }
  .addCartUp {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
  .otherInformation {
    padding: 0;
  }
  .orderInformation,
  .deliveryInformation,
  .customInformation,
  .paymentInformation {
    box-sizing: border-box;
    width: 100%;
    border-top: #ddd 1px solid;
    padding: 28px 16px;
    margin: 0;
  }
  .orderInformation {
    border-top: none;
  }
}
</style>
