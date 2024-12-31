<script setup>
import { ref, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import axios from "axios"
import { ElMessage } from "element-plus"

const API_URL = import.meta.env.VITE_API_URL

const route = useRoute()
const router = useRouter()
const products = ref([])
const purchaseID = route.params.pu_id
const user_id = ref("")
const username = ref("")
const getImageUrl = (imagePath) => {
	if (!imagePath || typeof imagePath !== "string") return ""
	const cleanedPath = imagePath.startsWith("./") ? imagePath.slice(1) : imagePath
	return `${API_URL}/${cleanedPath}`
}
//獲取商品資訊
onMounted(async () => {
	try {
		const response = await axios.get(`${API_URL}/comment/info/${purchaseID}`)

		if (response.data.status === "Success") {
			user_id.value = response.data.user_id
			username.value = response.data.username
			products.value = response.data.data.map((product) => ({
				...product,
				commentText: "",
				sku: 5,
			}))
		} else {
			console.error("無法獲取商品資訊:", response.data.message)
		}
	} catch (error) {
		console.error("API 請求錯誤:", error.message)
	}
})

// 提交評論
const submitComment = async () => {
	const checkComments = products.value.filter((product) => !product.commentText)
	if (checkComments.length > 0) {
		ElMessage.warning("所有商品評論完才能送出喔")
		return
	}

	try {
		const responses = await Promise.all(
			products.value.map((product) => {
				return axios.post(`${API_URL}/comment/addcomment`, {
					purchase_id: purchaseID,
					product_id: product.product_id,
					comment: product.commentText,
					sku: product.sku,
					user_id: user_id.value,
					username: username.value,
				})
			})
		)

		// 確認所有請求是否成功
		const allSuccess = responses.every((response) => response.data.status === "Success")
		if (allSuccess) {
			console.log(products.value)

			ElMessage.success("評論已成功發佈！")
			// 清空所有商品的評論輸入框
			products.value.forEach((product) => (product.commentText = ""))
			router.push("/MemberOrder") // 跳轉到會員訂單頁
		}
	} catch (err) {
		console.error("提交評論錯誤:", err.message)
		ElMessage.error("提交評論時發生錯誤，請稍後再試！")
	}
}
</script>
<template>
	<div class="reviewMain mx-auto">
		<div class="givingComment w-full pb-[15px]">
			<div class="awaitingCommentTitle border py-[10px] pl-[15px] font-semibold text-[18px]">
				<h4>給予評價</h4>
			</div>
			<div class="commentContent p-[15px]">
				<span class="text-[11px]">訂單編號：{{ purchaseID }}</span>
				<hr class="my-[20px]" />
				<div class="mb-[20px] commodityImformation" v-for="product in products" :key="product.product_id">
					<div class="w-1/5 commodityImg px-[15px]">
						<img :src="getImageUrl(product.image_paths[0])" alt="商品圖片" />
					</div>
					<div class="w-4/5">
						<div>
							<h5 class="font-semibold text-[14px]">
								{{ product.product_name }}
							</h5>
						</div>
						<div class="py-[15px] text-[14px] flex items-center gap-2">
							評價
							<el-rate v-model="product.sku" :max="5"></el-rate>
						</div>
						<div class="commentInput text-[14px]">
							內容<br />
							<textarea v-model="product.commentText" class="h-[92px] w-full px-[12px] py-[6px]" placeholder="評價內容"></textarea>
						</div>
					</div>
				</div>
				<hr class="my-[20px]" />
				<div class="postButton text-right">
					<button @click="submitComment" class="postBtn">發佈</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scope>
* {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
	font-size: 14px;
	color: #333333;
}
.reviewMain {
	max-width: 1400px;
	display: flex;
	gap: 30px;
}
.awaitingCommentTitle {
	background-color: #f5f5f5;
	border: solid 1px #ddd;
}
.orderNumbers {
	padding: 15px;
	border: solid 1px #ddd;
	border-top: solid 1px #fff;
}
.commentContent {
	border: solid 1px #ddd;
	border-top: solid 1px #fff;
}
.commodityImg {
	box-sizing: content-box;
	float: left;
}
.commodityImg img {
	height: 100%;
	width: 100%;
	object-fit: cover;
}
.commodityImformation {
	display: flex;
}
textarea {
	border: 1px solid #ddd;
	resize: none;
	border-radius: 3px;
}
.postBtn {
	background-color: #0f4662;
	color: #fff;
	padding: 6px 12px;
	border: #000000 1px solid;
	border-radius: 10px;
	cursor: pointer;
	width: 40px;
	height: 20px;
	box-sizing: content-box;
	font-size: 14px;
}
.postBtn:hover {
	background-color: #7994a0;
	color: #fff;
	border: #000000 1px solid;
}
@media (max-width: 768px) {
	.reviewMain {
		display: flex;
		flex-direction: column-reverse;
		padding: 10px 15px;
	}
	.awaitingComment {
		width: 100%;
		padding: 15px;
		padding-top: 0;
	}
	.givingComment {
		width: 100%;
		padding: 15px;
		padding-top: 0;
	}
}
@media (max-width: 320px) {
	.commodityImformation {
		display: block;
	}
}
</style>
