<template>
	<LogOut />
	<MemberNavbar />

	<div class="memberCoupon">
		<div class="mx-[40px] mt-[20px]">
			<div v-for="coupon in coupons" :key="coupon.id" class="memberCouponList flex gap-10 max-w-[1100px] pb-[30px] mx-auto">
				<!-- 折扣券 -->
				<div class="w-[340px] couponCards">
					<div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
						<h5>
							贈品券
							<br />
							{{ coupon.name }}
						</h5>
						<div class="w-[38px] h-[22px] bg-gray-200 text-gray-800 text-[10px] font-medium px-[4px] py-1 rounded-md mt-[24px]">
							<p class="note">限網店</p>
						</div>
					</div>
					<div class="separator">
						<span class="circle left"></span>
						<div class="dashedLine"></div>
						<span class="circle right"></span>
					</div>
					<div class="couponCode px-[16px] pt-[8px] pb-[16px] flex justify-between items-center">
						<span class="font-bold text-[16px]">L&R</span>
						<button @click="claimed(coupon.id)" class="couponCodeBtn">{{ coupon.claimed ? "已領取" : "領取折扣碼" }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import MemberNavbar from "../components/MemberNavbar.vue"
import LogOut from "@/components/Logout.vue"
const userId = localStorage.getItem("UID")
import { ref, onMounted } from "vue"
import { ElMessage } from "element-plus"
// 儲存優惠券
const coupons = ref([])
const couponCode = ref("")

// 領取優惠券
const submitCoupon = async () => {
	try {
		// 先通過優惠券代碼查詢對應的優惠券 ID
		const fetchIdResponse = await fetch(`${import.meta.env.VITE_API_URL}/coupon/code-to-id`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ code: couponCode.value }), // 使用 couponCode
		})

		if (!fetchIdResponse.ok) {
			throw new Error("無法找到該優惠券")
		}

		const responseData = await fetchIdResponse.json()
		const id = responseData.id // 確保從 API 響應中正確獲取 id

		// 使用查詢到的 ID 發起領取請求
		const response = await fetch(`${import.meta.env.VITE_API_URL}/coupon/${id}/claim`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId }), // 使用者 ID
		})

		if (!response.ok) {
			const errorMessage = await response.text()
			throw new Error(errorMessage || "領取優惠券失敗")
		}

		const result = await response.json()
		coupons.value.push(result) // 加入新優惠券
		couponCode.value = "" // 清空輸入框
		ElMessage.success("優惠券領取成功！")
	} catch (error) {
		console.error("領取優惠券失敗:", error.message)
		ElMessage.error(error.message || "領取優惠券失敗")
	}
}

// 取得優惠券列表
const fetchCoupons = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/coupon/user/${userId}`)
		if (!response.ok) {
			throw new Error("取得優惠券列表失敗")
		}
		// 獲取優惠券資料，只有當 response.ok 為 true 時才會執行
		const data = await response.json()
		coupons.value = data.map((coupon) => ({
			...coupon,
			claimed: coupon.claimed || false, // 預設為未領取
		}))
	} catch (error) {
		console.log("優惠券出錯", error)
		ElMessage.error("無法獲取優惠券")
	}
}

//領取優惠券
const claimed = async (couponId) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/coupon/${couponId}/claim`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId: userId, couponId }),
		})
		if (!response.ok) {
			const { message } = await response.json()
			throw new Error(message || "領取優惠券失敗")
		}
		// 更新該優惠券的領取狀態
		coupons.value = coupons.value.map((coupon) => (coupon.id === couponId ? { ...coupon, claimed: true } : coupon))
		ElMessage.success("領取優惠券成功")
	} catch (error) {
		console.log("領取優惠券失敗", error)
	}
	console.log(JSON.stringify({ userId, couponId }))
}

onMounted(() => {
	fetchCoupons()
})
</script>

<style scoped>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: #333333;
}

.memberCoupon {
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

.couponCards {
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

.dashedLine {
	flex-grow: 1;
	border-top: 2px dashed #d1d5db;
	position: relative;
	z-index: 0;
}
.couponCodeBtn {
	cursor: pointer !important;
	background-color: #fff;
	padding: 5px 16px 5px 16px;
	border-radius: 10px;
}
.note {
	font-size: 10px;
}
@media (769px<= width <=1200px) {
	.memberCouponList {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: space-between;
	}
	.couponCards {
		flex: 0 0 calc(50% - 20px);
		box-sizing: border-box;
	}
}

@media (width<=768px) {
	.couponContent {
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
	.couponUl {
		justify-content: center;
		align-content: center;
	}
	.couponInput {
		justify-content: center;
		align-content: center;
		width: 100%;
	}
	.memberCouponList {
		flex-direction: column;
		gap: 20px;
	}
	.couponCards {
		width: 100% !important;
	}

	.couponInput input {
		width: 100%;
	}
}
</style>
