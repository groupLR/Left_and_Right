<script setup>
import MemberNavbar from "../components/MemberNavbar.vue"
</script>

<template>
  <MemberNavbar />
  <div class="lg:px-10">
    <div class="memberCoupon">
      <div class="mx-[40px] mt-[20px]">
        <div class="memberCouponList flex gap-10 max-w-[1100px] py-[30px] mx-auto">
          <!-- 折扣券 -->
          <div class="w-[340px] couponCards">
            <div class="h-[150px] px-[16px] font-bold">
              <h5>
                贈品券<br />
                LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
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
              <span class="font-bold text-[16px]">line88</span>
              <button class="couponCodeBtn">複製折扣碼</button>
            </div>
          </div>
          <!-- 折扣券 -->
          <!-- 折扣券 -->
          <div class="w-[340px] couponCards">
            <div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
              <h5>
                贈品券<br />
                LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
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
              <span class="font-bold text-[16px]">line88</span>
              <button class="couponCodeBtn">複製折扣碼</button>
            </div>
          </div>
          <!-- 折扣券 -->
          <!-- 折扣券 -->
          <div class="w-[340px] couponCards">
            <div class="h-[150px] px-[16px] pt-[12px] pb-[8px] font-bold">
              <h5>
                贈品券<br />
                LINE好友限定 - 耳環收納組 (收納夾鏈袋 / 耳扣一組)
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
              <span class="font-bold text-[16px]">line88</span>
              <button class="couponCodeBtn">複製折扣碼</button>
            </div>
          </div>
          <!-- 折扣券 -->
        </div>
        <!-- <p class="text-center pb-[20px]">沒有可使用的優惠券</p> -->
      </div>
    </div>
  </div>
</template>

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
