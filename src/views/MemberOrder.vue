<script setup>
import MemberNavbar from "../components/MemberNavbar.vue"
import MemberEmpty from "../components/MemberEmpty.vue"
import { RouterLink } from "vue-router"
import axios from "axios"
import { ref, onMounted } from "vue"
const API_URL = import.meta.env.VITE_API_URL
const orders = ref([])
const hasOrders = ref(true)

onMounted(async () => {
  const userId = localStorage.getItem("UID")
  if (!userId) {
    console.error("未找到 UID")
    return
  }
  // 先根據 UID 抓他有哪些訂單
  try {
    const response = await axios.get(`${API_URL}/order/${userId}`)
    if (response.data.status === "Success") {
      // 再根據訂單號碼抓訂單詳細資訊
      const orderPromises = response.data.data.map(async (order) => {
        try {
          const details = await axios.get(`${API_URL}/order/details/${order.pu_id}`)
          const { productInfo } = details.data
          // 計算總數和總價
          const totalQuantity = productInfo.reduce((sum, product) => sum + product.quantity, 0)
          const totalPrice = productInfo.reduce((sum, product) => sum + product.sale_price * product.quantity, 0)
          // 判斷這筆訂單是不是已經有評論了
          const reviewStatusResponse = await axios.get(`${API_URL}/order/isReviewed/${order.pu_id}`)
          const isReviewed = reviewStatusResponse.data.isReviewed // 從 API 返回的值會是布林值

          return {
            ...order,
            productName: productInfo[0]?.product_name || "無商品名稱",
            totalQuantity,
            totalPrice,
            isReviewed,
          }
        } catch (error) {
          return null
        }
      })

      orders.value = (await Promise.all(orderPromises)).filter((order) => order !== null)
    }
    if (orders.value.length === 0) {
      hasOrders.value = false // 如果沒訂單會顯示MemberEmpty頁面
    }
  } catch (error) {
    hasOrders.value = false
  }
  window.scrollTo(0, 0)
})
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10 pb-10">
    <div class="memberOrder">
      <div v-if="hasOrders">
        <div class="orderContainer">
          <h2 class="font-semibold text-xl my-5 hidden lg:block">訂單紀錄</h2>
          <table class="orderTable table-fixed rounded-md">
            <thead>
              <tr>
                <td class="w-1/5">訂單號碼</td>
                <td class="w-2/5">訂單商品</td>
                <td class="w-1/5">合計</td>
                <td class="w-1/5">訂單狀態</td>
                <td class="w-1/5"></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.purchaseID">
                <td class="w-1/5 text-white md:text-black bg-[#314e86] md:bg-white"><span class="lg:hidden">訂單編號 : </span>{{ order.pu_id }}</td>
                <td class="w-2/5">{{ order.productName }}...</td>
                <td class="w-1/5"><span>訂單金額 : </span>NT${{ order.totalPrice }}</td>
                <td class="w-1/5">已完成</td>
                <td class="w-1/5 last">
                  <RouterLink :to="`/OrderDetails/${order.pu_id}`"> <button class="btn bg-[#314e86] text-white">查閱</button> </RouterLink>
                  <RouterLink :to="`/product_review_comments/${order.pu_id}`">
                    <button :disabled="order.isReviewed" class="btn text-[#314e86]">評論</button></RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="mx-auto px-10 py-8 bg-white border-t-white">
        <div class="py-10 lg:px-10 flex justify-center mx-auto bg-white">
          <div class="flex flex-col justify-center mx-auto">
            <img src="../assets/member_center_list_empty.png" alt="" class="mx-auto w-[121px] h-[129px]" />
            <p class="pl-2 pt-5 mx-auto text-sm text-gray-500">沒有任何訂單呦</p>
            <p class="pl-2 mx-auto text-sm text-gray-500">快去逛逛吧！</p>
            <div class="flex mx-auto justify-center">
              <RouterLink to="/categories/31"
                ><button class="bg-[#314e86] hover:bg-[#6A88BE] w-[220px] h-8 text-white text-sm rounded-lg mt-4 px-2 py-1">馬上逛逛</button></RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.memberOrder {
  margin: 0 auto;
  max-width: 1358px;
  border: 1px solid #ddd;
  border-top: 1px solid #fff;
  background-color: white;
}
.orderContainer {
  margin: 20px auto;
  max-width: 1278px;
}

.orderTable {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
}

.orderTable th,
.orderTable td {
  padding: 10px;
  border: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;
  vertical-align: middle;
}
.orderTable th:first-child,
.orderTable td:first-child {
  border-left: 1px solid #ddd;
}

.orderTable th:last-child,
.orderTable td:last-child {
  border-right: 1px solid #ddd;
}
.orderTable thead th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.btn {
  display: inline-block; /* 設為行內區塊 */
  margin: 0 10px;
  padding: 5px 10px;
  border: 1px solid #314e86;
  border-radius: 5px;
  cursor: pointer;
  width: calc(50% - 20px);
  flex-grow: 0;
}
.btn:hover {
  background-color: #6a88be;
  color: #fff;
  border: #6a88be 1px solid;
  width: calc(50% - 20px);
}

.note {
  color: #888;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.btn:disabled {
  background-color: #ccc;
  color: #666;
  cursor: default;
  border: 1px solid #ccc;
}

@media (max-width: 768px) {
  .btn2 {
    width: 80%;
  }
  .orderTable thead {
    display: none;
  }
  .orderTable tbody td {
    margin: auto;
    display: block;
    border: 1px solid #ddd;
    width: 80%;
  }
  .last {
    margin-bottom: 20px !important ;
  }
}
</style>
