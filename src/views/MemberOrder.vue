<script setup>
import MemberNavbar from "../components/MemberNavbar.vue"
import MemberEmpty from "../components/MemberEmpty.vue"

import LogOut from "@/components/Logout.vue"
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

	try {
		const response = await axios.get(`${API_URL}/order/${userId}`)
		if (response.data.status === "Success") {
			const orderPromises = response.data.data.map(async (order) => {
				const details = await axios.get(`${API_URL}/order/details/${order.pu_id}`)
				const { productInfo } = details.data
				// 計算總數和總價
				const totalQuantity = productInfo.reduce((sum, product) => sum + product.quantity, 0)
				const totalPrice = productInfo.reduce((sum, product) => sum + product.sale_price * product.quantity, 0)

				const reviewPromises = productInfo.map(async (product) => {
					try {
						const reviewResponse = await axios.get(`${API_URL}/comment/reviews/${product.product_id}`)
						return reviewResponse.data.status === "Success" // 若有評論返回 true
					} catch {
						return false // 若無評論或出錯返回 false
					}
				})

				// 如果所有商品都有評論，則該訂單已評論
				const reviewStatuses = await Promise.all(reviewPromises)
				const isReviewed = reviewStatuses.every((status) => status)

				return {
					...order,
					productName: productInfo[0]?.product_name || "無商品名稱",
					totalQuantity,
					totalPrice,
					isReviewed,
				}
			})

			orders.value = await Promise.all(orderPromises)
		}
		if (orders.value.length === 0) {
			hasOrders.value = false
		}
	} catch (error) {
		hasOrders.value = false
	}
})
</script>

<template>
	<LogOut />
	<MemberNavbar />
	<div class="memberOrder">
		<div v-if="hasOrders">
			<div class="orderContainer">
				<div class="orderDetails">
					<table class="orderTable table-fixed">
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
								<td class="w-1/5">{{ order.pu_id }}</td>
								<td class="w-2/5">{{ order.productName }}...</td>
								<td class="w-1/5">NT${{ order.totalPrice }}</td>
								<td class="w-1/5">已完成</td>
								<td class="w-1/5 last">
									<RouterLink :to="`/OrderDetails/${order.pu_id}`"> <button class="btn">查閱</button> </RouterLink>
									<RouterLink :to="`/product_review_comments/${order.pu_id}`"> <button :disabled="order.isReviewed" class="btn">評論</button></RouterLink>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div v-else><MemberEmpty /></div>
	</div>
</template>
<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}
.memberOrder {
	margin: 0 auto;
	max-width: 1358px;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
	margin-bottom: 40px;
}
.orderContainer {
	font-family: Arial, sans-serif;
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
	background-color: #0f4662;
	color: #fff;
	padding: 5px 10px;
	border: 1px solid #0f4662;
	border-radius: 5px;
	cursor: pointer;
	width: calc(50% - 20px);
	flex-grow: 0;
}
.btn:hover {
	background-color: #7994a0;
	color: #fff;
	border: #000000 1px solid;
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
		margin: 0 40px;
		display: block;
		border: 1px solid #ddd;
	}
	.last {
		margin-bottom: 20px !important ;
	}
}
</style>
