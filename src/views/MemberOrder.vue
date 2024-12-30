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
			orders.value = response.data.data
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
					<table class="orderTable">
						<thead>
							<tr>
								<td>訂單號碼</td>
								<td>訂單日期</td>
								<td>合計</td>
								<td>訂單狀態</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="order in orders" :key="order.purchaseID">
								<td>{{ order.pu_id }}</td>
								<td>2023-10-25</td>
								<td>NT$310</td>
								<td>已完成<br />2023-10-27</td>
								<td class="last">
									<RouterLink :to="`/OrderDetails/${order.pu_id}`"> <button class="btn">查閱</button> </RouterLink>
									<RouterLink :to="`/product_review_comments/${order.pu_id}`"> <button class="btn">評論</button></RouterLink>
								</td>
							</tr>
						</tbody>
					</table>
					<p class="note">僅顯示 2 年內訂單</p>
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
	@apply my-[4px];
	background-color: #000;
	color: #fff;
	padding: 5px 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	width: 100%;
	flex-wrap: wrap;
	display: block;
}

.note {
	color: #888;
	font-size: 14px;
	margin-top: 10px;
	text-align: center;
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
