<template>
    <div class="orders-main">
        <div class="panel-header">
            <h3>合計:NT$750</h3>
            <div @click="pagetoggle" class="Cart">
                <span>購物車(1件)</span
                ><font-awesome-icon
                    class="cartSwitch"
                    :icon="['fas', currentPage ? 'chevron-up' : 'chevron-down']"
                />
            </div>
        </div>
        <div class="panel-body">
            <transition name="slide-height">
                <div v-show="currentPage">
                    <div class="order-detail">
                        <div class="orders-title">
                            <div class="orders-title-name">商品資料</div>
                            <div class="orders-title-coupon">優惠</div>
                            <div class="orders-title-price">價格</div>
                            <div class="orders-title-quantity">數量</div>
                            <div class="orders-title-total">小計</div>
                        </div>
                        <div
                            v-for="product in productInfo"
                            :key="product.product_id"
                            class="items-card"
                        >
                            <div class="items-name">
                                <img :src="product.image_path" alt="商品圖片" />

                                {{ product.product_name }}
                                <p>Silver / 銀色</p>
                                <p>內圍直徑 1.7cm (#12)</p>
                            </div>
                            <div class="items-coupon"></div>
                            <div class="items-price">
                                NT${{ product.sale_price }}
                            </div>
                            <div class="items-quantity">
                                <span>數量:</span>{{ product.quantity }}
                            </div>
                            <div class="items-total">
                                {{ product.sale_price * product.quantity }}
                            </div>
                        </div>
                        <div class="coupon-used">
                            <h5>已使用之優惠</h5>
                            <span class="coupon-type">優惠促銷</span>
                            <p>限時全館$350免運</p>
                        </div>
                    </div>
                    <div class="orders-total">
                        <div class="orders-total-card">
                            <div class="subtotal">
                                小計:<span>{{ totalPrice }}</span>
                            </div>
                            <div class="delivery">運費:<span>免運</span></div>
                            <div class="total">合計:<span>NT$750</span></div>
                            <hr />
                            <div class="get-point">
                                訂單完成後獲得點數<span>+12點</span>
                            </div>
                        </div>
                    </div>
                    <div class="add-cart-again" @click="pagetoggle">
                        <font-awesome-icon
                            class="add-cart-up"
                            :icon="['fas', 'chevron-up']"
                        /><button class="btn">
                            <font-awesome-icon
                                :icon="['fas', 'cart-shopping']"
                            />再次加入購物車
                        </button>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="slide">
            <div class="other-imformation">
                <div class="order-imformation">
                    <h4>訂單資訊</h4>
                    <ul>
                        <li>訂單號碼:{{ orderInfo.purchaseID }}</li>
                        <li>訂單電郵:</li>
                        <li>訂單日期:</li>
                        <li>訂單狀態:</li>
                    </ul>
                </div>
                <div class="custom-imformation">
                    <h4>顧客資訊</h4>
                    <ul>
                        <li>名字: {{ customerInfo.cuName }}</li>
                        <li>電話: {{ customerInfo.cuPhone }}</li>
                        <li>性別: {{ customerInfo.gender || "未提供" }}</li>
                        <li>生日: 1990/01/01</li>
                    </ul>
                </div>
                <div class="delivery-imformation">
                    <h4>送貨資訊</h4>
                    <ul>
                        <li>送貨方式</li>
                        <li>送貨狀態</li>
                        <li>7-11</li>
                        <li>7-11</li>
                        <li>收件人名字: {{ deliveryInfo.acName }}</li>
                        <li>收件人電話: {{ deliveryInfo.acPhone }}</li>
                        <li>配送編號</li>
                        <li>配送地址: {{ deliveryInfo.addr }}</li>
                    </ul>
                </div>

                <div class="payment-imformation">
                    <h4>付款資訊</h4>
                    <ul>
                        <li>付款方式</li>
                        <li>卡片名稱: {{ paymentInfo?.cardName || "N/A" }}</li>
                        <li>
                            有效日期: {{ paymentInfo?.efficentDate || "N/A" }}
                        </li>
                        <li>付款狀態</li>
                        <li>付款指示</li>
                        <li>發票狀態</li>
                        <li>發票申請類型</li>
                        <li>發票載具類型</li>
                    </ul>
                </div>
            </div>
        </transition>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import ChatBox from "../components/chatbox.vue";

const currentPage = ref(true);

const pagetoggle = () => {
    currentPage.value = !currentPage.value;
};

// 定義資料結構
const orderInfo = ref({});
const customerInfo = ref({});
const deliveryInfo = ref({});
const paymentInfo = ref({});
const productInfo = ref([]);

// 測試用固定值
const purchaseID = "OR1734099868126658";

//總價
const totalPrice = computed(() => {
    return productInfo.value.reduce((sum, product) => {
        return sum + product.sale_price * product.quantity;
    }, 0);
});
onMounted(async () => {
    try {
        const response = await axios.get(
            `http://localhost:3300/order/details/${purchaseID}`
        );

        const data = response.data;

        // 直接將返回的資料綁定給 productInfo
        productInfo.value = data.productInfo || [];
        orderInfo.value = data.orderInfo || {};
        customerInfo.value = data.customerInfo || {};
        deliveryInfo.value = data.deliveryInfo || {};
        paymentInfo.value = data.paymentInfo || {};
    } catch (error) {
        console.error("API 請求失敗：", error);
    }
});
</script>

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

.orders-main {
    box-sizing: border-box;
    max-width: 1400px;
    padding: 25px 40px 25px 40px;
    margin: auto;
}
.panel-header {
    position: relative;
    overflow: hidden;
    text-align: center;
    font-size: 20px;
    padding: 24px;
    border: 1px solid #ddd;
    height: auto;
}
.panel-body {
    position: relative;
    overflow: hidden;
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
    border: none;

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
    position: relative;
    height: 50px;
    margin-bottom: 30px;
    text-align: center;
    justify-content: center; /* 文字水平居中 */

    align-items: center; /* 文字垂直居中 */
}

.add-cart-up {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    align-self: center;
}

.add-cart-again .btn {
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
.other-imformation {
    margin-top: 30px;
    padding: 15px;
    border: 1px solid #ddd;
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
    flex-direction: column;
    gap: 10px;
}

.social-btn {
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

.social-btn img {
    width: 20px;
    height: 20px;
}

.social-btn.line {
    color: #00c300;
}

.social-btn.line img {
    width: 24px;
    height: 24px;
}

.social-btn.messenger {
    color: #0078ff;
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
    padding: 10px 15px;
    margin: 0;
    border: 1px solid #ddd;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
}
.items-quantity span {
    display: none;
}

.cartSwitch {
    margin-left: 10px;
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
    .items-card {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }
    .items-coupon {
        display: none;
    }
    .items-name,
    .items-price,
    .items-quantity,
    .items-total {
        max-width: 50%;
        box-sizing: border-box;
        flex: 0 0 50%;
    }
    .items-price {
        display: flex;
        align-self: center;
        justify-content: end;
    }
    .items-quantity {
        display: flex;
        justify-content: start;
    }
    .items-quantity span {
        display: inline;
    }
    .coupon-used p {
        display: block;
        padding-left: 0;
    }
    .orders-total-card {
        width: 100%;
    }
    .add-cart-again {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        flex-direction: row;
        gap: 20px;
        height: auto;
    }
    .add-cart-again .btn {
        position: static;
        width: 100%;
        right: auto;
        top: auto;
        box-sizing: border-box;
    }
    .add-cart-up {
        display: block;
        width: 100%;
        margin: 10px 0;
    }
    .other-imformation {
        padding: 0;
    }
    .order-imformation,
    .delivery-imformation,
    .custom-imformation,
    .payment-imformation {
        box-sizing: border-box;
        width: 100%;
        border-top: #ddd 1px solid;
        padding: 10px 15px;
        margin: 0;
    }
    .order-imformation {
        border-top: none;
    }
    .order-chat h4 {
        padding-left: 15px;
    }
}
</style>
