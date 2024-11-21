<template>
  <div class="p-10 my-10 mx-auto w-full justify-center flex-auto container">
      <div class="w-[90%] flex-auto my-0 mx-auto justify-center bg-white p-10 flex-wrap border lg:w-full">
          <div class="user">
              <i class="fa-solid fa-circle-user"></i>
              <h2>使用者姓名</h2>
              <span class="bg-amber-500 rounded-xl text-white py-1 px-2">一般會員</span>
          </div>
          <div class="grid grid-cols-1 gap-5 mt-5 leading-7 lg:grid-cols-2">
              <div class="bg-[#EEEEEE] p-2.5">
                  <p class="font-extrabold"><i class="fa-solid fa-star pr-2.5"></i>升級至VIP會員</p>
                  <p>24 個月內累積消費額達 NT$4000即可升級</p>
                  <a href="" class="text-blue-600">查看所有會員等級規則</a>
              </div>
              <div class="p-2.5">
                  <h2 class="font-extrabold"><i class="fa-solid fa-flag pr-2.5"></i>24 個月內累積消費額</h2>
                  <p class="text-sm text-gray-500">自動更新時間為訂單完成付款後的隔日凌晨，若因取消訂單或退貨未達成升級條件則不會升級。</p>
              </div>
          </div>
          <div class="block w-full my-10 leading-5 pl-[5px] lg:pl-0">
              <h2 class="mb-4 font-extrabold"><i class="fa-solid fa-circle-user pr-2.5"></i>會員推薦優惠</h2>
              <p class="text-base">推薦好友一起賺！領免費購物金: 複製並分享連結給朋友，推薦對象和你將獲得購物金。<a class="text-blue-600">活動規則說明</a></p>
              <p>https://www.bonnyread.com.tw/?sl-mref=Q6Bto<a class="text-blue-600"><i class="fa-solid fa-link"></i>複製連結</a></p>
          </div>
          <div class="grid w-full grid-cols-1 gap-5 justify-between lg:grid-cols-2">
              <div class="w-full p-[25px_21px] pb-5 border ">
                  <div class="font-extrabold">
                      <h2><i class="fa-solid fa-circle-user pr-2.5"></i>會員資料</h2>
                  </div>
                  <div class="name">
                      <label>姓名</label>
                      <input type="text" name="" id="">
                  </div>
                  <div class="email">
                      <label for="">電子郵件</label>
                      <input type="email" name="" id="">
                  </div>
                  <div class="cellphone">
                      <label for="">手機號碼</label>
                      <select></select>
                      <input type="number" name="" id="">
                  </div>
                  <div class="gender">
                      <label for="">性別</label>
                      <select>
                          <option selected disabled>請選擇</option>
                          <option>女</option>
                          <option>男</option>
                          <option>不透露</option>
                      </select>
                  </div>
                  <div class="birthday">
                      <label for="">生日日期</label>
                  </div>
                  <div class="phone">
                      <label for="">行動電話(選填)</label>
                      <input type="number" name="" id="">
                  </div>
                  <div class="store">
                      <label for="">來自門市(選填)</label>
                      <select name="" id="">
                          <option value="" selected disabled>來自門市</option>
                          <option value="">台北 信義威秀門市</option>
                          <option value="">台中 新光三越櫃位</option>
                          <option value="">台南 新光三越百貨小西門櫃位</option>
                          <option value="">高雄 夢時代櫃位</option>
                      </select>
                  </div>
                  <div class="introducer">
                      <label for="">由誰介紹(選填)</label>
                      <input type="text" name="" id="">
                  </div>
                  <div class="password">
                      <p>密碼</p>
                      <a href="https://www.bonnyread.com.tw/users/edit" class="blue">設定新的密碼</a>
                  </div>
                  <div class="third-party-registration">
                      <p>第三方註冊</p>
                  </div>
              </div>
              <div class="flex flex-col">
                  <div class="subscribe-area">
                      <h2 class="mb-2 text-lg font-extrabold"><i class="fa-solid fa-bell pr-2.5"></i>訂閱</h2>
                      <div class="grid grid-cols-1 lg:grid-cols-2">
                          <div class="publicity">
                              <h3>優惠宣傳</h3>
                              <div class="subscribe-item">
                                  <p>電郵</p>
                                  <button>訂閱</button>
                              </div>
                              <div class="subscribe-item">
                                  <p>SMS</p>
                                  <button>訂閱</button>
                              </div>
                              <div class="subscribe-item">
                                  <p>Line</p>
                                  <button>訂閱</button>
                              </div>
                              <div class="subscribe-item">
                                  <p>Facebook</p>
                                  <button>訂閱</button>
                              </div>
                          </div>
                          <div class="mt-5 pl-0 lg:pl-5">
                              <h3>訂閱通知</h3>
                              <div class="subscribe-item">
                                  <p>Line</p>
                                  <button>訂閱</button>
                              </div>
                              <div class="subscribe-item">
                                  <p>Facebook</p>
                                  <button>訂閱</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="payment">
                      <h2 class="font-extrabold"><i class="fa-solid fa-circle-user pr-2.5"></i>送貨與付款資料</h2>
                      <div class="cellphone">
                          <label for="">聯絡電話(選填)</label>
                          <select ></select>
                          <input type="number" name="" id="">
                      </div>
                      <div class="address">
                          <p>儲存的地址(選填)</p>
                          <div class="address-right-area">
                              <p class="text-blue-600">新增送貨地址</p>
                              <ul>
                                  <li>
                                      <p>收件人</p>
                                      <input type="text" name="" id="">
                                  </li>
                                  <li>
                                      <p>收件人電話號碼</p>
                                      <div>
                                          <select>
                                              <option value="" selected>台灣+886</option>
                                          </select>
                                          <input type="number" name="" id="">
                                      </div>
                                      
                                  </li>
                                  <li>
                                      <p>送貨地點</p>
                                      <select name="" id="">
                                          <option value="" selected>台灣</option>
                                      </select>
                                  </li>
                                  <li>
                                      <p>城市/縣</p>
                                      <select name="" id="">
                                          <option value="" selected disabled>請選擇</option>
                                      </select>
                                  </li>
                                  <li>
                                      <p>地區</p>
                                      <select name="" id="">
                                          <option value="" selected disabled>請選擇</option>
                                      </select>
                                  </li>
                                  <li>
                                      <p>地址</p>
                                      <input type="text">
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="credit-card">
                          <p>信用卡</p>
                          <div class="credit-card-right-area">
                              <p class="text-blue-600">新增信用卡</p>
                          </div>
                      </div>
                  </div>
                  <div class="btn-area">
                      <button>取消</button>
                      <button>儲存變更</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<style scoped>
.container{ 
max-width: 1438px;
}
.border {
border: 1px solid #EEEEEE;
}
input,select{
border: 1px solid #EEEEEE;
padding-inline: 8px;
}
.user{
width: 100%;
display: flex;
gap:10px;
align-items: center;
font-weight: 800;
}
.name,
.email,
.cellphone,
.gender,
.birthday,
.phone,
.store,
.introducer,
.password,
.third-party-registration,
.address {
display: grid;
grid-template-columns: 1fr 2fr;
margin: 20px 0;
font-size: 16px;
line-height: 44px;
}
.cellphone {
display: grid;
grid-template-columns: 33.3% 14.7% 52%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}


.subscribe-area {
border: 1px solid #EEEEEE;
padding: 20px;
}


.publicity {
margin-top: 20px;
border-right: 1px solid #EEEEEE;
padding-right: 20px;
}


.subscribe-item {
display: flex;
width: 100%;
justify-content: space-between;
margin: 20px 0;
height: 34px;
line-height: 34px;
}


.subscribe-item button {
border: 1px solid #EEEEEE;
border-radius: 10%;
font-size: 14px;
line-height: 30px;
height: 30px;
padding: 0 5px;
}

.subscribe-item button:hover {
border: 1px solid black;
}

.payment {
margin: 20px 0;
border: 1px solid #EEEEEE;
padding: 20px;
}

.address-right-area input,
select {
width: 100%;
height: 44px;
}
.address-right-area li:nth-child(2) div,
.credit-card {
display: grid;
grid-template-columns: 1fr 2fr;
}
.btn-area {
display: flex;
justify-content: end;
line-height: 36px;
gap: 20px;
text-align: center;
}
.btn-area button {
border-radius: 10px;
border: 1px solid #EEEEEE;
padding: 0 10px;
text-align: center;
}
.btn-area button:nth-child(2) {
background-color: black;
color: white;
}

@media screen and (width <= 1024px) {
.name,
.email,
.gender,
.birthday,
.phone,
.store,
.introducer,
.password,
.third-party-registration {
  grid-template-columns: 100%;
}
.gender select,
.store select {
  height: 44px;
}
.cellphone {
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.cellphone label{
  grid-column-start:1 ;
  grid-column-end:7 ;
}

.cellphone select {
  grid-row-start: 2;
}
.cellphone input {
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end: 7;
}
.btn-area {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.subscribe-area{
  margin-top: 20px;
  
}
.publicity {
  border-right: 0;
  border-bottom: 1px solid #EEEEEE;
  padding-right: 0;
}
.address {
  grid-template-columns: 1fr;
  padding-bottom: 0;
}
.address-right-area{
  padding: 20px;
  padding-top: 0;
}
.credit-card{
  grid-template-columns: 1fr;
  padding-top: 0;
  line-height: 44px;
}
.credit-card-right-area{
  padding: 20px;
  padding-top: 0;
}
}

</style>