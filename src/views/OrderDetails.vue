<template>
	<div class="orders-main">
		<div class="panel-header">
			<h3>合計:NT$750</h3>
			<div class="Cart">
				<span>購物車(1件)</span
				><font-awesome-icon :icon="['fas', 'chevron-up']" />
			</div>
		</div>
		<div class="order-detail">
			<div class="orders-title">
				<div class="orders-title-name">商品資料</div>
				<div class="orders-title-coupon">優惠</div>
				<div class="orders-title-price">價格</div>
				<div class="orders-title-quantity">數量</div>
				<div class="orders-title-total">小計</div>
			</div>
			<div class="items-card">
				<div class="items-name">
					<img
						src="data:image/webp;base64,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"
						alt=""
					/>
					[寶可夢/鍍18K厚金] 皮卡丘戒指 / 2色 / 4 size
					<p>Silver / 銀色</p>
					<p>內圍直徑 1.7cm (#12)</p>
				</div>
				<div class="items-coupon"></div>
				<div class="items-price">NT$750</div>
				<div class="items-quantity">1</div>
				<div class="items-total">NT$750</div>
			</div>
			<div class="coupon-used">
				<h5>已使用之優惠</h5>
				<span class="coupon-type">優惠促銷</span>
				<p>限時全館$350免運</p>
			</div>
		</div>
		<div class="orders-total">
			<div class="orders-total-card">
				<div class="subtotal">小計:<span>NT$750</span></div>
				<div class="delivery">運費:<span>免運</span></div>
				<div class="total">合計:<span>NT$750</span></div>
				<hr />
				<div class="get-point">訂單完成後獲得點數<span>+12點</span></div>
			</div>
		</div>
		<div class="add-cart-again">
			<i class="fa-solid fa-chevron-up"></i
			><button class="btn">
				<i class="fa-solid fa-cart-shopping"></i>再次加入購物車
			</button>
		</div>
		<div class="other-imformation">
			<div class="order-imformation">
				<h4>訂單資訊</h4>
				<ul>
					<li>訂單號碼:</li>
					<li>訂單電郵:</li>
					<li>訂單日期:</li>
					<li>訂單狀態:</li>
				</ul>
			</div>
			<div class="custom-imformation">
				<h4>顧客資訊</h4>
				<ul>
					<li>名字</li>
					<li>電話</li>
					<li>性別</li>
					<li>生日</li>
				</ul>
			</div>
			<div class="delivery-imformation">
				<h4>送貨資訊</h4>
				<ul>
					<li>送貨方式</li>
					<li>送貨狀態</li>
					<li>7-11</li>
					<li>7-11</li>
					<li>收件人名字</li>
					<li>收件人電話</li>
					<li>配送編號</li>
					<li>門市地址</li>
				</ul>
			</div>

			<div class="payment-imformation">
				<h4>付款資訊</h4>
				<ul>
					<li>付款方式</li>
					<li>付款狀態</li>
					<li>付款指示</li>
					<li>發票狀態</li>
					<li>發票申請類型</li>
					<li>發票載具類型</li>
				</ul>
			</div>
		</div>
		<div class="order-status-notify">
			<h4>訂單狀態通知</h4>
			<button class="social-btn line">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
					alt="LINE"
				/>
				傳送到 LINE
			</button>
			<button class="social-btn messenger">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
					alt="Messenger"
				/>
				傳送到 Messenger
			</button>
		</div>
		<div class="order-chat">
			<h4>賣家和顧客訂單通訊</h4>
			<ChatBox />
		</div>
	</div>
</template>

<script setup>
import ChatBox from "../components/chatbox.vue"
</script>

<style scoped>
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
.orders-main {
	box-sizing: border-box;
	max-width: 1400px;
	padding: 25px 40px 25px 40px;
	margin: auto;
}
.panel-header {
	text-align: center;
	font-size: 20px;
	padding: 24px;
	border: 1px solid #ddd;
}
.panel-header h3 {
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
.orders-title,
.items-card {
	display: flex;
	padding: 15px 0;
	border: 1px solid #ddd;
	border-top: none;
}
.orders-title-name,
.items-name {
	width: 33%;
	padding-left: 15px;
	padding-right: 15px;
}
.orders-title-coupon,
.items-coupon {
	width: 16%;
	padding-left: 15px;
	padding-right: 15px;
}
.orders-title-price,
.items-price {
	text-align: center;
	width: 16%;
	padding-left: 15px;
	padding-right: 15px;
}
.orders-title-quantity,
.items-quantity {
	text-align: center;
	width: 16%;
	padding-left: 15px;
	padding-right: 15px;
}
.orders-title-total,
.items-total {
	text-align: end;
	width: 16%;
	padding-left: 15px;
	padding-right: 15px;
}
.items-name img {
	height: 150px;
	width: 150px;
	object-fit: cover;
	float: left;
}
.items-name p {
	color: #777777;
	font-size: 13px;
	padding: 0;
	margin: 0;
}
.coupon-used {
	padding: 30px;
	border: 1px solid #ddd;
	border-top: none;
	padding-top: 10px;
}
.coupon-used h5 {
	font-size: 14px;
	margin: 10px 0;
}
.coupon-used span {
	display: inline-block;
	width: 140px;
	padding: 5px;
	line-height: 11px;
	font-size: 11px;
	background-color: #e8f8e8;
	text-align: center;
}
.coupon-used p {
	display: inline;
	padding: 5px 15px;
	line-height: 20px;
}
.orders-total {
	border: 1px solid #ddd;
	border-top: none;
}
.orders-total-card {
	justify-self: end;
	width: 40%;
	padding: 15px;
}
.subtotal,
.delivery,
.total,
.get-point {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
.subtotal span,
.delivery span,
.total span,
.get-point span {
	text-align: right;
}
hr {
	border: none; /* 移除預設邊框 */

	margin: 20px 0;
	border-top: 1px solid #ddd;
}
.total {
	font-weight: 600;
}

.add-cart-again {
	padding: 10px;
	border: 1px solid #ddd;
	border-top: none;
	position: relative; /* 讓內部元素可以基於父容器進行定位 */
	height: 50px; /* 設定高度，讓內容在垂直方向有對齊基準 */
}

.add-cart-again > i {
	position: absolute; /* 讓圖標固定在中間 */
	top: 50%; /* 垂直方向居中 */
	left: 50%; /* 水平方向居中 */
	transform: translate(-50%, -50%); /* 修正位置，使圖標完全居中 */
	font-size: 14px; /* 調整圖標大小 */
}

.add-cart-again .btn {
	position: absolute; /* 讓按鈕固定在右下角 */
	right: 10px; /* 距離右側的距離 */
	top: 50%; /* 按鈕在垂直方向居中 */
	transform: translateY(-50%); /* 修正垂直方向的偏移 */
	font-size: 14px;
	padding: 6px 12px;
	background-color: #555; /* 按鈕背景顏色 */
	color: #fff;
	border: none;
	border-radius: 10px;
	cursor: pointer;
}
.fa-cart-shopping {
	color: #fff !important;
}
.other-imformation {
	padding: 15px;
	border: 1px solid #ddd;
	border-top: none;
	display: flex;
	flex-wrap: wrap;
}
.order-imformation,
.delivery-imformation,
.custom-imformation,
.payment-imformation {
	box-sizing: border-box;
	width: 50%;
	padding: 0 15px;
	margin-top: 10px;
	margin-bottom: 15px;
}

.order-imformation ul,
.delivery-imformation ul,
.custom-imformation ul,
.payment-imformation ul {
	list-style: none !important;
	padding: 0;
	margin: 0;
}

.social-buttons {
	display: flex;
	flex-direction: column; /* 按鈕縱向排列 */
	gap: 10px; /* 按鈕之間的距離 */
}

.social-btn {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 10px; /* 圖標與文字的距離 */
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

.social-btn img {
	width: 20px;
	height: 20px;
}

.social-btn.line {
	color: #00c300; /* LINE 的文字顏色 */
}

.social-btn.line img {
	width: 24px;
	height: 24px;
}

.social-btn.messenger {
	color: #0078ff; /* Messenger 的文字顏色 */
}

.social-btn.messenger img {
	width: 24px;
	height: 24px;
}

.social-btn:hover {
	background-color: #f5f5f5;
}
.order-status-notify {
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
	padding: 0 15px;
}
.order-chat h4 {
	padding: 10px 0px;
	margin: 0;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
	border-bottom: 1px solid #fff;
}
@media (max-width: 768px) {
	.panel-header {
		display: flex;
		justify-content: space-between;
	}
	.Cart span {
		display: none;
	}
	.orders-title {
		display: none;
	}
	.item-card {
		display: flex;
	}
	.items-coupon {
		display: none;
	}
	.items-name,
	.items-price,
	.items-quantity,
	.items-total {
		width: 50%;
		box-sizing: border-box;
	}
}
</style>
