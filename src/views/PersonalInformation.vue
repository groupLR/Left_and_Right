<template>
    <div class="container my-10">
        <div class="area">
            <div class="user">
                <i class="fa-solid fa-circle-user"></i>
                <h2>使用者姓名</h2>
                <span>一般會員</span>
            </div>
            <div class="vip-area">
                <div class="vip-left-area">
                    <p><i class="fa-solid fa-star"></i>升級至VIP會員</p>
                    <p>24 個月內累積消費額達 NT$4000即可升級</p>
                    <a href="" class="blue">查看所有會員等級規則</a>
                </div>
                <div class="vip-right-area">
                    <h2><i class="fa-solid fa-flag"></i>24 個月內累積消費額</h2>
                    <p>自動更新時間為訂單完成付款後的隔日凌晨，若因取消訂單或退貨未達成升級條件則不會升級。</p>
                </div>
            </div>
            <div class="recommend">
                <h2><i class="fa-solid fa-circle-user"></i>會員推薦優惠</h2>
                <p>推薦好友一起賺！領免費購物金: 複製並分享連結給朋友，推薦對象和你將獲得購物金。<a class="blue">活動規則說明</a></p>
                <p>https://www.bonnyread.com.tw/?sl-mref=Q6Bto<a class="blue">複製連結</a></p>
            </div>
            <div class="profile-area">
                <div class="left-area">
                    <div class="info">
                        <h2><i class="fa-solid fa-circle-user"></i>會員資料</h2>
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
                <div class="right-area">
                    <div class="subscribe-area">
                        <h2><i class="fa-solid fa-bell"></i>訂閱</h2>
                        <div class="subscribe">
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
                            <div class="notification">
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
                        <h2><i class="fa-solid fa-circle-user"></i>送貨與付款資料</h2>
                        <div class="cellphone">
                            <label for="">聯絡電話(選填)</label>
                            <select ></select>
                            <input type="number" name="" id="">
                        </div>
                        <div class="address">
                            <p>儲存的地址(選填)</p>
                            <div class="address-right-area">
                                <p class="blue">新增送貨地址</p>
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
                                <p class="blue">新增信用卡</p>
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
  padding: 0 40px;
  width: 100%;
  max-width: 1400px;
  justify-content: center;
  margin: 0 auto;
  display: flex;
}
.area {
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  background-color: white;
  padding: 40px;
  border: 1px solid #EEEEEE;
  flex-wrap: wrap;
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
.user span{
  background-color: #E4A44A;
  color: aliceblue;
  padding: 4px 8px;
  border-radius: 10px;
  
}
.vip-area {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin-top: 20px;
  line-height: 30px;
  gap: 20px;
}
.vip-left-area{
  background-color: #EEEEEE;
  padding: 10px;
}

.vip-right-area{
  padding: 10px;
}

.vip-right-area h2{
  font-weight: 800;
}
.vip-right-area p{
  font-size: 10px;
  color: gray;
}
.recommend{
  display: block;
  width: 100%;
  margin: 40px 0;
  line-height: 20px;
}
.recommend h2{
  margin-bottom:16px ;
  font-weight:800 ;
}
.recommend p{
  font-size: 14px;
}
.profile-area {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  justify-content: space-between;
}
.left-area {
  padding: 25px 21px;
  border: 1px solid #EEEEEE;
  width: 100%;
  /* height: 60%; */
  padding-bottom: 20px;
}
.info{
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

.right-area {
  display: flex;
  flex-direction: column;
}

.subscribe-area {
  border: 1px solid #EEEEEE;
  padding: 20px;
}
.subscribe {
  display: grid;
  grid-template-columns: 1fr 1fr;
  
}
.subscribe-area h2 {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: 800;
}
.publicity {
  margin-top: 20px;
  border-right: 1px solid #EEEEEE;
  padding-right: 20px;
}

.notification {
  margin-top: 20px;
  padding-left: 20px;
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

.blue {
  color: blue;
}

.payment {
  margin: 20px 0;
  border: 1px solid #EEEEEE;
  padding: 20px;
}

.payment h2{
  font-weight: 800;
}
.address {
  margin-bottom: 0;
}
.address-right-area input,
select {
  width: 100%;
  height: 44px;
}
.address-right-area li:nth-child(2) div,
.credit-card {
  display: grid;
  grid-template-columns: 33.3% 66.6%;
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
  .container{
    padding: 40px;
  }
  .area{
    width: 90%;
    
  }
  .vip-area{
    grid-template-columns: 100%;
  }
  .recommend{
    padding-left: 5px;
  }
  .profile-area {
    grid-template-columns: 100%;

  }
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
  .subscribe{
    grid-template-columns: 1fr;
    padding: 0;
  }
 
  .publicity {
    border-right: 0;
    border-bottom: 1px solid #EEEEEE;
    padding-right: 0;
  }
  
  .notification{
    padding-left: 0;
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