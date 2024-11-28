<template>
	<MemberNavbar />

	<div class="member-coupon">
		<div class="mx-[40px] mt-[20px]">
			<div class="go-coupon-center text-right mb-[24px] pr-[10px] mt-[20px]">
				<i class="-rotate-45 fa fa-ticket"> </i>前往領券中心
			</div>
			<div class="coupon-content flex">
				<div class="coupon-nav w-full">
					<ul class="coupon-ul flex leading-[32px] mt-[10px] mb-[32px]">
						<li class="pl-6 pr-5">即將開始</li>
						<li
							class="pl-5 pr-5 border-solid border-l border-r border-gray-100"
						>
							可使用
						</li>
						<li class="pl-5">已失效</li>
					</ul>
				</div>
				<div class="coupon-input flex justify-end w-full mt-[10px] mb-[32px]">
					<input
						class="h-[32px] border w-50% px-[10px] mx-[15px] border border-black"
						type="text"
						placeholder="輸入優惠券代碼"
					/>
					<button class="btn">領取</button>
				</div>
			</div>
			<div
				class="member-coupon-list flex gap-10 max-w-[1100px] pb-[30px] mx-auto"
			>
				<!-- 折扣券 -->
				<div class="w-[340px] coupon-cards">
					<div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
						<h5>
							贈品券<br />
							LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
						</h5>
						<div
							class="w-[38px] h-[22px] bg-gray-200 text-gray-800 text-[10px] font-medium px-[4px] py-1 rounded-md mt-[24px]"
						>
							<span>限網店</span>
						</div>
					</div>
					<div class="separator">
						<span class="circle left"></span>
						<div class="dashed-line"></div>
						<span class="circle right"></span>
					</div>
					<div
						class="coupon-code px-[16px] pt-[8px] pb-[16px] flex justify-between items-center"
					>
						<span class="font-bold text-[16px]">line88</span>
						<button class="coupon-code-btn">複製折扣碼</button>
					</div>
				</div>
				<!-- 折扣券 -->
				<!-- 折扣券 -->
				<div class="w-[340px] coupon-cards">
					<div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
						<h5>
							贈品券<br />
							LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
						</h5>
						<div
							class="w-[38px] h-[22px] bg-gray-200 text-gray-800 text-[10px] font-medium px-[4px] py-1 rounded-md mt-[24px]"
						>
							<span>限網店</span>
						</div>
					</div>
					<div class="separator">
						<span class="circle left"></span>
						<div class="dashed-line"></div>
						<span class="circle right"></span>
					</div>
					<div
						class="coupon-code px-[16px] pt-[8px] pb-[16px] flex justify-between items-center"
					>
						<span class="font-bold text-[16px]">line88</span>
						<button class="coupon-code-btn">複製折扣碼</button>
					</div>
				</div>
				<!-- 折扣券 -->
				<!-- 折扣券 -->
				<div class="w-[340px] coupon-cards">
					<div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
						<h5>
							贈品券<br />
							LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
						</h5>
						<div
							class="w-[38px] h-[22px] bg-gray-200 text-gray-800 text-[10px] font-medium px-[4px] py-1 rounded-md mt-[24px]"
						>
							<span>限網店</span>
						</div>
					</div>
					<div class="separator">
						<span class="circle left"></span>
						<div class="dashed-line"></div>
						<span class="circle right"></span>
					</div>
					<div
						class="coupon-code px-[16px] pt-[8px] pb-[16px] flex justify-between items-center"
					>
						<span class="font-bold text-[16px]">line88</span>
						<button class="coupon-code-btn">複製折扣碼</button>
					</div>
				</div>
				<!-- 折扣券 -->
			</div>
			<!-- <p class="text-center pb-[20px]">沒有可使用的優惠券</p> -->
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

.member-coupon {
	margin: 0 auto;
	max-width: 1358px;
	border: 1px solid #ddd;
	border-top: 1px solid #fff;
}

.btn {
	display: block;
	width: 60px;
	height: 32px;
	background-color: #000;
	color: #fff;
	border: 0.8;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	padding: 12px 6px 12px 6px;
}

.coupon-cards {
	background-color: #f5f5f5;
}
.separator {
	display: flex;
	align-items: center;
	position: relative;
	margin: 20px 0;
}

.circle {
	width: 20px;
	height: 20px;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	z-index: 1;
}

.circle.left {
	left: -10px;
}

.circle.right {
	right: -10px;
}

.dashed-line {
	flex-grow: 1;
	border-top: 2px dashed #d1d5db;
	position: relative;
	z-index: 0;
}
.coupon-code-btn {
	background-color: #fff;
	padding: 5px 16px 5px 16px;
	border-radius: 10px;
}
@media (769px<= width <=1200px) {
	.member-coupon-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}
	.coupon-cards {
		flex: 0 0 calc(50% - 20px);
		box-sizing: border-box;
	}
}

@media (width<=768px) {
	.coupon-content {
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
	.coupon-ul {
		justify-content: center;
		align-content: center;
	}
	.coupon-input {
		justify-content: center;
		align-content: center;
		width: 100%;
	}
	.member-coupon-list {
		flex-direction: column;
		gap: 20px;
	}
	.coupon-cards {
		width: 100% !important;
	}

	.coupon-input input {
		width: 100%;
	}
}
</style>
