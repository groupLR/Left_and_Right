<template>
    <div class="reviewMain mx-auto">
        <!-- 左邊那塊待評價列表 -->
        <div class="awaitingComment w-1/4">
            <div
                class="awaitingCommentTitle border py-[10px] pl-[15px] font-semibold text-[18px]"
            >
                <h4>待評價訂單</h4>
            </div>
            <div class="orderNumbers text-[14px]">
                <h5 class="my-[10px]">訂單編號</h5>
                <p class="pb-[10px]">20241123060952668</p>
            </div>
        </div>
        <!-- 評價頁面本體 -->
        <div class="givingComment w-3/4 pb-[15px]">
            <div
                class="awaitingCommentTitle border py-[10px] pl-[15px] font-semibold text-[18px]"
            >
                <h4>給予評價</h4>
            </div>
            <div class="commentContent p-[15px]">
                <span class="text-[11px]">訂單編號：</span>
                <hr class="my-[20px]" />
                <div
                    class="commodityInformation flex"
                    v-for="product in products"
                    :key="product.product_id"
                >
                    <div class="commodityImg px-[15px]">
                        <img
                            v-if="product.first_image_path"
                            :src="product.first_image_path"
                            alt="商品圖片"
                        />
                    </div>
                    <div class="w-full">
                        <div>
                            <h5 class="font-semibold text-[14px]">
                                {{ product.product_name }}
                            </h5>
                        </div>
                        <div class="py-[15px] text-[14px]">評價</div>
                        <div class="commentInput text-[14px]">
                            內容<br />
                            <textarea
                                v-model="products.commentText"
                                class="h-[92px] w-full px-[12px] py-[6px]"
                                placeholder="評價內容"
                            ></textarea>
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

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API_URL = "http://localhost:3300";

const router = useRouter();
const products = ref([]);
const purchaseID = "PU1734101319888458"; //訂單編號先寫死
const sku = 5; // SKU寫死
const user_id = ref("");
const username = ref("");

//獲取商品資訊
onMounted(async () => {
    try {
        const response = await axios.get(
            `http://localhost:3300/comment/info/${purchaseID}`
        );

        if (response.data.status === "Success") {
            user_id.value = response.data.user_id;
            username.value = response.data.username;
            //把路徑的.換掉，不知道有什麼方法可以讓這邊乾淨一點
            products.value = response.data.data.map((product) => ({
                ...product,
                first_image_path: product.image_paths?.[0]
                    ? `${API_URL}${product.image_paths[0].replace("./", "/")}`
                    : null,
                commentText: "",
            }));
        } else {
            console.error("無法獲取商品資訊:", response.data.message);
        }
    } catch (error) {
        console.error("API 請求錯誤:", error.message);
    }
});

// 提交評論
const submitComment = async () => {
    if (!products) {
        alert("找不到對應的商品數據！");
        console.error("商品數據為空");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:3300/comment/addcomment",
            {
                purchase_id: purchaseID,
                product_id: products.value.product_id,
                comment: products.value.commentText,
                sku,
                user_id: user_id.value,
                username: username.value,
            }
        );

        if (response.data.status === "Success") {
            alert("評論已成功發佈！");
            router.push("/MemberOrder");
        } else {
            alert(`發佈失敗：${response.data.message}`);
        }
    } catch (err) {
        console.error("提交評論錯誤:", err.message);
        alert("提交評論時發生錯誤，請稍後再試。");
    }
};
</script>

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
    max-height: 215px;
    max-width: 215px;
    box-sizing: content-box;
    float: left;
}
.commodityImg img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
textarea {
    border: 1px solid #ddd;
    resize: none;
    border-radius: 3px;
}
.postBtn {
    background-color: #000;
    color: #fff;
    padding: 6px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 28px;
    height: 20px;
    box-sizing: content-box;
    font-size: 14px;
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
}
.givingComment {
    width: 100%;
    padding: 15px;
    padding-top: 0;
}
</style>
