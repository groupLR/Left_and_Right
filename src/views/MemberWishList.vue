<template>
	<MemberNavbar />
	<div class="wishlist-main mx-auto p-10">
		<div
			class="wishlist-title grid grid-cols-12 items-center border-b-[1px] pb-2 text-[12px] font-semibold"
		>
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
			class="commodity-list grid grid-cols-12 items-center border-b-[1px] py-[15px] mx-[-10px] bg-white hover:bg-[#F5F5F5]"
		>
			<div class="commodity-img col-span-2 px-[15px]">
				<img
					class="px-[15px]"
					src="https://picsum.photos/id/184/184/184"
					alt=""
				/>
			</div>
			<div class="commodity-name col-span-4 px-[15px]">
				<p>【限時促銷】[寶可夢/鍍白金] 立體造型吊墜 / 銀色 / 8款</p>
				<p class="shape">款式 : 立體精靈球</p>
			</div>
			<div class="commodity-price col-span-3 px-[15px] text-[12px]">NT$456</div>
			<div class="commodity-status col-span-2 px-[15px] text-[12px]">
				<p>無法購買</p>
			</div>
			<div class="commodity-delete col-span-1 px-[15px]">
				<p><i class="fa-solid fa-trash"></i></p>
			</div>
		</div>
		<div
			class="commodity-list grid grid-cols-12 items-center border-b-[1px] py-[15px] mx-[-10px] bg-white hover:bg-[#F5F5F5]"
		>
			<div class="commodity-img col-span-2 px-[15px]">
				<img
					class="px-[15px]"
					src="https://picsum.photos/id/184/184/184"
					alt=""
				/>
			</div>
			<div class="commodity-name col-span-4 px-[15px]">
				<p>【限時促銷】[寶可夢/鍍白金] 立體造型吊墜 / 銀色 / 8款</p>
				<p class="shape">款式 : 立體精靈球</p>
			</div>
			<div class="commodity-price col-span-3 px-[15px] text-[12px]">NT$456</div>
			<div class="commodity-status col-span-2 px-[15px] text-[12px]">
				<i class="fa-solid fa-cart-shopping"></i>
				<button class="btn">加入購物車</button>
				<button class="btn my-[10px]">
					<i class="fa-solid fa-bag-shopping"></i>立即購買
				</button>
			</div>
			<div class="commodity-delete col-span-1 px-[15px]">
				<p><i class="fa-solid fa-trash"></i></p>
			</div>
		</div>
	</div>
</template>

<script setup>
import MemberNavbar from "./MemberNavbar.vue"
</script>
<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}
.wishlist-main {
	border: 1px solid #ddd;
	max-width: 1358px;
	border-top: 1px solid #fff;
}
.btn {
	width: 160px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px 12px;
	background-color: #000;
	color: #fff;
	border: none;
	border-radius: 20px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.3s ease;
}
.shape {
	color: #80808099;
}
.fa-cart-shopping {
	display: none !important;
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
	.wishlist-main {
		width: 100%;
	}
	.wishlist-title {
		display: none;
	}
	.commodity-list {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: auto;
		padding: 0;
		border: 1px solid #ddd;
		padding-top: 15px;
	}
	.commodity-list:nth-of-type(n + 2) {
		margin-top: 20px;
	}
	.commodity-img {
		padding-left: 15px;
		padding-right: 15px;
		margin-bottom: 25px;
		width: 80%;
	}
	.commodity-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		padding: 0;
		margin: 0;
	}
	.commodity-name {
		width: 100%;
		font-size: 14px;
		color: #797979;
		text-align: left;
	}
	.commodity-price {
		padding-top: 7px;
		padding-bottom: 7px;
		text-align: left;
		width: 100%;
	}
	.commodity-status {
		width: 100%;
		background-color: #efefef;
		padding: 15px;
		text-align: center;
		line-height: 12px;
	}
	.commodity-delete {
		display: none;
	}
}
</style>
