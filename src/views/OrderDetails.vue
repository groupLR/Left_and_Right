<script setup>
import { ref, onMounted, computed } from "vue"
import axios from "axios"
import ChatBox from "../components/chatbox.vue"
import { useRoute } from "vue-router"

const API_URL = import.meta.env.VITE_API_URL
const currentPage = ref(true)
const route = useRoute()
const purchaseID = route.params.pu_id

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
//總價
const totalPrice = computed(() => {
	return productInfo.value.reduce((sum, product) => {
		return sum + product.sale_price * product.quantity
	}, 0)
})
//商品數
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
})
</script>

<template>
	<div class="ordersMain">
		<div class="panelHeader">
			<h3>合計:NT{{ totalPrice }}</h3>
			<div @click="pagetoggle" class="Cart">
				<span>購物車({{ productCount }}件)</span><font-awesome-icon class="cartSwitch" :icon="['fas', currentPage ? 'chevron-up' : 'chevron-down']" />
			</div>
		</div>
		<div class="panelBody">
			<transition name="slide-height">
				<div v-show="currentPage">
					<div class="order-detail">
						<div class="ordersTitle">
							<div class="ordersTitleName">商品資料</div>
							<div class="ordersTitleCoupon">優惠</div>
							<div class="ordersTitlePrice">價格</div>
							<div class="ordersTitleQuantity">數量</div>
							<div class="ordersTitleTotal">小計</div>
						</div>
						<div v-for="product in productInfo" :key="product.product_id" class="itemsCard">
							<div class="itemsName">
								<img :src="getImageUrl(product.image_path.image_path)" alt="商品圖片" />
								{{ product.product_name }}
								<p>Silver / 銀色</p>
								<p>內圍直徑 1.7cm (#12)</p>
							</div>
							<div class="itemsCoupon"></div>
							<div class="itemsPrice">NT${{ product.sale_price }}</div>
							<div class="itemsQuantity"><span>數量:</span>{{ product.quantity }}</div>
							<div class="itemsTotal">
								{{ product.sale_price * product.quantity }}
							</div>
						</div>
						<div class="couponUsed">
							<h5>已使用之優惠</h5>
							<span class="coupon-type">優惠促銷</span>
							<p>限時全館$350免運</p>
						</div>
					</div>
					<div class="ordersTotal">
						<div class="ordersTotalCard">
							<div class="subtotal">
								小計:<span>{{ totalPrice }}</span>
							</div>
							<div class="delivery">運費:<span>免運</span></div>
							<div class="total">
								合計:<span>{{ totalPrice }}</span>
							</div>
						</div>
					</div>
					<div class="addCartAgain" @click="pagetoggle"><font-awesome-icon class="addCartUp" :icon="['fas', 'chevron-up']" /></div>
				</div>
			</transition>
		</div>
		<transition name="slide">
			<div class="otherImformation">
				<div class="orderImformation">
					<h4>訂單資訊</h4>
					<ul>
						<li>訂單號碼:{{ purchaseID }}</li>
						<li>訂單狀態: 已完成</li>
					</ul>
				</div>
				<div class="customImformation">
					<h4>顧客資訊</h4>
					<ul>
						<li>名字: {{ customerInfo.cuName }}</li>
						<li>電話: {{ customerInfo.cuPhone }}</li>
						<li>性別: {{ customerInfo.gender || "未提供" }}</li>
					</ul>
				</div>
				<div class="deliveryImformation">
					<h4>送貨資訊</h4>
					<ul>
						<li>送貨方式: {{ orderInfo.DeliveryWay }}</li>
						<li>送貨狀態: 已完成</li>
						<li>收件人名字: {{ deliveryInfo.acName }}</li>
						<li>收件人電話: {{ deliveryInfo.acPhone }}</li>
						<li>配送地址: {{ deliveryInfo.addr }}</li>
					</ul>
				</div>

				<div class="paymentImformation">
					<h4>付款資訊</h4>
					<ul>
						<li>付款方式: {{ orderInfo.payWay }}</li>
						<li>卡片名稱: {{ paymentInfo?.cardName || "N/A" }}</li>
						<li>有效日期: {{ paymentInfo?.efficentDate || "N/A" }}</li>
					</ul>
				</div>
			</div>
		</transition>
		<div class="orderChat">
			<h4>賣家和顧客訂單通訊</h4>
			<ChatBox />
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
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}
h4 {
	margin: 10px 0;
	font-size: 18px;
	font-weight: 600;
}

.ordersMain {
	box-sizing: border-box;
	max-width: 1400px;
	padding: 25px 40px 25px 40px;
	margin: auto;
}
.panelHeader {
	position: relative;
	overflow: hidden;
	text-align: center;
	font-size: 20px;
	padding: 24px;
	border: 1px solid #ddd;
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
.total,
.getPoint {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
.subtotal span,
.delivery span,
.total span,
.getPoint span {
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

.addCartUp {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 14px;
	align-self: center;
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
.otherImformation {
	margin-top: 30px;
	padding: 15px;
	border: 1px solid #ddd;
	display: flex;
	flex-wrap: wrap;
}
.orderImformation,
.deliveryImformation,
.customImformation,
.paymentImformation {
	box-sizing: border-box;
	width: 50%;
	padding: 0 15px;
	margin-top: 10px;
	margin-bottom: 15px;
}

.orderImformation ul,
.deliveryImformation ul,
.customImformation ul,
.paymentImformation ul {
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

.socialBtn img {
	width: 20px;
	height: 20px;
}

.socialBtn.line {
	color: #00c300;
}

.socialBtn.line img {
	width: 24px;
	height: 24px;
}

.socialBtn.messenger {
	color: #0078ff;
}

.socialBtn.messenger img {
	width: 24px;
	height: 24px;
}

.socialBtn:hover {
	background-color: #f5f5f5;
}
.orderStatusNotify {
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
	padding: 0 15px;
}
.orderChat h4 {
	padding: 10px 15px;
	margin: 0;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
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
	.otherImformation {
		padding: 0;
	}
	.orderImformation,
	.deliveryImformation,
	.customImformation,
	.paymentImformation {
		box-sizing: border-box;
		width: 100%;
		border-top: #ddd 1px solid;
		padding: 10px 15px;
		margin: 0;
	}
	.orderImformation {
		border-top: none;
	}
	.orderChat h4 {
		padding-left: 15px;
	}
}
</style>
