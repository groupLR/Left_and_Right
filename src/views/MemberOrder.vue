<template>
    <LogOut />
    <MemberNavbar />
    <div class="memberOrder">
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
                        <tr>
                            <td>20231024171032226</td>
                            <td>2023-10-25</td>
                            <td>NT$310</td>
                            <td>已完成<br />2023-10-27</td>
                            <td>
                                <RouterLink to="/OrderDetails"
                                    ><button class="btn">
                                        查閱
                                    </button></RouterLink
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="note">僅顯示 2 年內訂單</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import MemberNavbar from "../components/MemberNavbar.vue";
import LogOut from "@/components/Logout.vue";
import { RouterLink } from "vue-router";
</script>

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
    background-color: #000;
    color: #fff;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
}

.note {
    color: #888;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}

@media (width<=768px) {
    .btn2 {
        width: 80%;
    }
}
</style>
