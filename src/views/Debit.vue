<!-- 結帳頁面 -->
<template>
  

  <!-- 優惠倒數 -->
  <div class="center mb-2">
    <p class="m-1 mt-10" style="font-size: 24px;">結帳優惠倒數 </p>
      <div class="flex justify-center">
       <div class="time m-1 px-5 py-1"><span class=" font-bold text-base">00</span>min</div>
    <div class="time m-1 px-5 py-1"><span class=" font-bold text-base">00</span>sec</div>
   </div> 
  </div>
  

<!-- 結帳流程 -->
 <!-- 流程image -->
 <div class="flex justify-center mb-2">
  <div class="stepOne flex justify-center items-center text-center">1</div>
  <div class="h-0.5  mt-3 w-60 m-0 flex justify-center items-center text-center " style=" background-color:#ddd5e4;">  </div>
  <div  class="stepTwo flex justify-center items-center text-center">2</div>
 </div>

  <div class="prNav flex justify-center gap-60 mb-2" >
    <span> 購物車</span>
    <span> 填寫資料</span>
  </div>
  <!-- 商品總額及數量 -->
<div class="m-10 cart mb-0">
  <div class=" sideBorder center text-xl " style="width: 1160px;">
    <h3 class="font-bold">
      合計: NT$
      <span>{{itemPrice+60}}</span>
    </h3>
    <span>購物車(<span>{{ itemCount }}</span>件)</span>
    <!-- <i class="fa-solid fa-chevron-down"></i> -->
  </div>
   
<div class="">
  <!-- <thead > -->
    <div class="tittles">
    <div class="tittle">商品資料</div>
    <div class="tittle">優惠</div>
    <div class="tittle">單件價格</div>
    <div class="tittle">數量</div>
    <div class="tittle">小計</div>
  </div>
  <!-- </thead> -->

    <!-- <tbody > -->
  <div class="prInfo flex justify-between	 " style="width: 1160px;" v-for="item in products" :key="item.product_id">
    <div class="prdetail  introduce flex justify-between"	 >
      <img :src="item.image_path">
      <div class="">
        {{ item.product_name }}
      </div>
    </div>
    <div class="prdetail"></div>
    <div class="prdetail"> 
      {{ item.sale_price}}
    </div>
    <div class="prdetail">{{ item.quantity }}</div>
    <div class="prdetail">{{item.sale_price*item.quantity}}</div>
    <i class="fa-solid fa-xmark pr-8" @click="deleteProduct(item.product_id)"></i>
  </div>
</div>
<!-- </tbody> -->

  </div>
<!-- 優惠切版 -->
  <!-- <div  class="cart sideBorder p-5 m-10 pb-0 mt-0 mb-0 pb-10 "  style="width: 1160px;">
    <h5>已享用之優惠</h5>
    <div class="flex justify-between"> 
      <div class="tagGreen">優惠促銷</div>
      <div class="description">	雙11優惠！全館 兩件85折/三件8折/四件75折！ - 全單 滿 2 件 即享 85 折 再買 1 件 省更多</div>
      <div class="cutPrice">-NT$94</div> </div> 
  </div> -->
 
   <div class="cart m-10 mt-0 ">

  <div class=" mt-100 ml-70  w-80 h-90 pl-70" style="transform: translateX(800px);">
      <div>
        <div class="flex justify-between m-2">
        <div>小計:</div>
        <div>NT$
          <span>{{itemPrice}}</span>
        </div>
        </div>
  
      <div class="flex justify-between m-2" >
        <div >折扣:</div>
        <div>-NT$0</div>
      </div>
  
      <div class="flex justify-between m-2" >
        <div >運費:</div>
        <div>NT$60</div>
      </div>
       <div class="flex justify-between font-bold  m-2">
      <div>合計:</div>
      <div>NT$
        <span>{{ itemPrice+60 }}</span>
      </div>
    </div> 
    <hr>

    </div>
  
  
  
    <div class="flex justify-between 	m-4">
      <div>訂單獲得點數:</div>
      <div>+10點</div>
  
      <div class="" style="position: relative;">
        
      <i class="fa-solid fa-circle-question note"></i>
    </div>
  
    </div>

 
</div>
 
</div>
  
<!-- 
 </div>
</div> -->

<!-- 方塊表格 -->
 <div class="cellphone laptop">
<!-- 左邊表格 -->
  <div class="left  ">
    <form action="" id="customer_info">

    <div class="cart mt-100 ml-10 mr-10  wid">
  <h3 class="  h-10 quarter p-2" >顧客資料</h3>
 
  <div class="m-2">
  <label>顧客名稱 </label>
  <br>
    <input type="text" class="sideBorder options message" id="cuName">
   </div>
   <div class="m-2">
  <label for="">電話號碼</label>

  <input type="text" class="sideBorder message"id="cuPhone">
</div>
    <div class="m-2">
    <label for="" class="" >性別(選填)</label>
    <br>
    <select name="" id="gender" class="sideBorder options message">
      <option value="" selected>男</option>
      <option value="" >女</option>
      <option value="" >不透露</option>

    </select>
  
  </div>

    <div class="relative">
    <label for="">生日日期(選填)</label>
    <i class="fa-solid fa-circle-question birthday" style="color: #0e2c44;"></i>
    <div class="flex justfy-start">
   
      <select name="" id="" class="options message w-80" >
      <option value=""></option>
    </select>

    <br>
    <select name="" id="" class="options message w-80" disabled>
      <option value="" selected></option>
    </select>
    <br>
    <select name="" id="" class="options message w-80" disabled>
      <option value="" selected></option>
    </select>
    
  </div>
  </div>
   
  </div>
</form>
<!-- 訂單備註表格 -->
<form action="" id="note">

  <div class="cart mt-100 ml-10 mr-10 wid">
    <h3 class="  h-10 quarter" >訂單備註</h3>
    <textarea name="" id=""  placeholder="有什麼想告訴賣家的嗎?" class="message h-20"></textarea>
  
    </div>
</form>
</div>

<!-- 右邊表格 -->
<div class="right ">
  <form action="" id="deliver_pro_info">
  <div class="cart mt-100 ml-10 mr-10 wid">
    <div class="flex justify-between quarter p-2">
    <h3 class="  h-10 quarter " >送貨資料</h3>
    <p >運費: NT$60</p>
    </div>

    <p class="m-2">已選擇的送貨方式:貨到付款 </p>
      <!-- 海外運送 ( 3-7天到貨，採EMS寄送 )</p> -->

    <div class="flex jusify-start mb-2 m-2"> 
    <input type="checkbox" name="" id="" class="m-1">
    <p >收件人資料與顧客資料相同</p></div>
<div class="m-2">
    <label for="" >收件人名稱</label>
    <br>
    <input type="text" class="sideBorder message">
    <br>
    <span>請填入收件人真實姓名，以確保順利收件</span>
    <br></div>
    <div class="mb-5 m-2">
    <label for="">收件人電話號碼</label>
   <br>
    <input type="text" class="sideBorder message">
   </div>
   <hr class="mb-5">
   <div class="m-2">
  <p>地址</p>
   <p>送貨地點: 台灣</p>
  </div>
  
  <div class="m-2">
    <input type="text" placeholder="地址" class="message">
    <br>
    <input type="text" placeholder="城市/市鎮"  class="message">
    <div class="flex justify-start mb-5">
      <input type="text" placeholder="郵政區號"  class="message w-40 ">
      <input type="text" placeholder="地區/洲/省份"  class="message w-40">
    </div>
  <!-- 儲存、設定預設地址切版 -->
    <!-- <div class="m-2">
    <input type="checkbox">
    <label for="">儲存這個送貨地址
    </label>
  </div>
    <div class="m-2">
    <input type="checkbox">
    <label for="">設定為預設地址</label>
  </div>
   -->
  <br>
   </div>
    </div>
</form>

    <div class="cart mt-100 ml-10 mr-10 wid ">
      <div class="flex justify-between quarter" >   
        <h3 class="  h-10 quarter" >付款資料</h3>
        <p>合計: NT$
          <span>{{ itemPrice+60 }}</span>
        </p>
    </div>
    <p class="m-2">已選擇的付款方式: 貨到付款</p>
      <!-- 信用卡 ( Visa / MasterCard / JCB / 銀聯卡 )</p> -->
   <!-- 信用卡結帳時跳出 -->
    <!-- <div class="m-2 relative">
    <input type="text" placeholder="卡號" class=" message">
    <i class="fa-solid fa-unlock-keyhole lock"></i>
    </div>
    <div class="m-2 relative">
    <input type="text" placeholder="持卡人姓名" class=" message">
    <i class="fa-regular fa-circle-question name-quote"></i>
    </div>
    <div class="flex m-2">
    <input type="text" placeholder="有效期(MM/YY)" class="message w-40 ">
    
    <input type="text" placeholder="安全碼" class="message w-40  ">
    <div class="relative p-4 pl-2">
    <i class="fa-regular fa-circle-question security "></i>
   </div>
    <br></div> 
    <div class="p-4 ">    
      <input type="checkbox" name="" id="">
    <span style="font-size: small; color: #c1c1c1;">我同意紀錄本次付款資訊，作為本帳戶未來交易資訊之用</span>
   </div> 
   <hr>
    <div class="p-4">
    <span style="font-size: small; color: #c1c1c1;">本金流服務由 SHOPLINE Payments 提供，通過 PCI-DSS 國際信用卡組織最高等級認證，提供安全的交易服務，支援國內外信用卡刷卡。</span>
     </div> -->
     </div>

    
    <div class="cart mt-100 ml-10 mr-10 wid">
      <h3 class="  h-10 quarter" >索取發票</h3>
      <div class="flex">
      <div class="m-2">
      <label for="" >發票類型</label>
      <br>
    <select name="" id="" class="sideBorder w-60">
      <option value="">雲端發票</option>
      <option value="">捐贈發票</option>
      <option value="">公司戶發票</option>
    </select>
  </div> 
  <div class="m-2">
    <label for="" >載具類型</label>
    <br>
    <select name="" id="" class="sideBorder ">
      <option value="">會員載具(發票資訊會寄到您的電郵)</option>
      <option value="">手機條碼</option>
      <option value="">自然人條碼</option>
    </select>
      </div>
    </div>
</div>
  </div>
  </div>
<br>
  <!-- 完成訂單按鈕 -->
<div  class="sideBorder cart" style="display: block;">
  <div class="p-2" style="transform: translateX(700px);">
  <input type="checkbox" name="" id="">我同意網站
  <a href="" style="color:#337AB7 ;" >服務條款</a>及
  <a href="" style="color:#337AB7 ;" >隱私權政策</a>
</div>
<div class="flex align-end justify-end sideBorder cart p-2">
 <button class="buttonBg flex justify-center w-80 " @click="submitOrder">提交訂單</button>
  </div>
</div>

 



     </template>
     
     <script>
       import axios from 'axios';

export default {
  data() {
    return {
      products: [] ,// 儲存後端返回的商品資料
      newProduct: { name: "", price: null, description: "" }, // 新增商品資料

    };
  },computed: {
  itemCount() {
    return this.products.filter(item => item.quantity > 0).length;
  },
  itemPrice(){
    return this.products.reduce((total, item) => total + (item.original_price * item.quantity), 0);
  }
}
,
  mounted() {
    this.fetchCartItems(); // 組件加載時獲取資料
  },
  methods: {
    async fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:3300/cart/cartQuery');
        this.products = response.data; // 將 API 返回的資料存入 products
        console.log('資料獲取成功:', this.products);
      } catch (error) {
        console.error('獲取資料失敗:', error);
      }
    } ,
     // 刪除商品
     deleteProduct(id) {
      axios
        .delete(`http://localhost:3300/cart/cartDelete/${id}`)
        .then(() => {
          this.products = this.products.filter((product) => product.id !== id); // 從列表中移除
        })
        .catch((error) => {
          console.error("刪除商品失敗:", error);
        });
    } ,
  submitOrder() {
    console.log("開始提交...");

    const customerInfo = {
      name: document.getElementById("cuName").value,
      phone: document.getElementById("cuPhone").value,
      gender: document.getElementById("gender").value,
    };

    const orderNote =document.querySelector("#note textarea").value;

    const deliveryInfo = {
      recipientName: document.querySelector('#deliver_pro_info input[type="text"]').value,
      recipientPhone: document.querySelectorAll('#deliver_pro_info input[type="text"]')[1].value,
      address: document.querySelectorAll('#deliver_pro_info input[type="text"]')[2].value,
      city: document.querySelectorAll('#deliver_pro_info input[type="text"]')[3].value,
      postalCode: document.querySelectorAll('#deliver_pro_info input[type="text"]')[4].value,
      region: document.querySelectorAll('#deliver_pro_info input[type="text"]')[5].value,
    };

    console.log("顧客資料:", customerInfo);
    console.log("訂單備註:", orderNote);
    console.log("送貨資料:", deliveryInfo);

    axios
  .post('http://localhost:3300/debit/orderInsert', {
    customerInfo,
    orderNote,
    deliveryInfo
  })
  .then((response) => {
    console.log("訂單成功提交:", response);  
      alert("訂單新增成功");
    
      if (response.status === 200) {
          const paymentFormHtml = response.data;
          document.open();
          document.write(paymentFormHtml);
          document.close();
          document.forms[0].submit();
        } else {
          console.error('提交訂單失敗');
  }}
  )
  .catch((error) => {
    console.error("建立訂單失敗:", error);
  });

    } ,
  },

  

};
     </script>
     
     <style scoped>
   .cart{
    width: 1160px;
    height: auto;
    border: 1px solid#f6f6f6;
    margin-bottom: 50px;
}

.quarter{
    background-color: #f6f6f6;
    display: flex;
    align-items:center;
    justify-content: space-between;
}

.tittles{
    width: 1160px;
    height:50px;
    display: flex;
    gap:20px;
    align-items:center;
    justify-content: space-between;
    border:1px solid #f6f6f6;
}

.tittle{
    width: 150px;
    height: 20px;
    color: #333333;
    display: flex;
    margin: 5px;
    padding: 5px;
}

.prInfo{
    gap: 20px;
}

.prdetail{
    width: 150px;
    height: 180px;
    /* margin: 5px; */
    padding: 5px;
    justify-content: center;
}

.introduce{
    width: 300px;
}

.tagGreen{
    background-color: #E8F8E8;
    width: 150px;
    height: 21px;
    display: flex;
    justify-content: center;
}

.tagGrey{
    background-color: #f6f6f6;
    width: 150px;
    height: 21px;
    display: flex;
    justify-content: center;
}
.options{
    width: 450px;
     border-color:1px solid #9c9c9cd8 ; 
    border-radius: 2%;
}
.sideBorder{
    border:1px solid #f6f6f6;

}

.cards{
    height:380px;
}

.link:hover::after{
    content: "複製購物車商品給朋友";
    color: white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置 */
    top:-20px;
    
    
    height: 30px;
    display:flex;
    justify-content: start;
    
    padding: 5px;
    padding-bottom: 10px;
} 
.buttonBg{
    background-color: black;
    color: #f8f6f6;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 50px;
    display:flex;
    margin-left: 10px;
}

.wid{
    width: 565px;
}
.center{
    text-align: center;
}

.time{
    background-color:#E5DFCD;
    border-radius: 5px;
}


.stepOne{
    color: #ffffff;
    background-color:#c1c1c1;
    border-radius: 50%;
    width:24px;
    height:24px;   
}
.stepTwo{
    color: #ffffff;
    background-color:#ddd5e4;
    border-radius: 50%;
    width:24px;
    height:24px;   
}

.message{
    width: 500px;
    margin: 10px;
    padding: 5px;
    border:1px solid #555353;
    border-radius: 5px ;
}

.note:hover::after{
    content: "若該訂單有退貨單, 將會排除退貨商品與金額計算可獲得的點數。";
    color: white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置*/
    bottom:-60px;
    right: 0px;
    /* right: 20px; */
    width: 200px;
    height: 60px;
    display:flex;
    flex-wrap: wrap;
    padding: 5px;
    padding-bottom: 10px;
} 

.birthday:hover::after{
    content: "你須達一定年齡才能於網站購物";
    color:black;
    background-color: whitesmoke;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置*/
    top:-20px;
    right: 200px;
    /* right: 20px; */
    width: 200px;
    height: 40px;
    display:flex;
    flex-wrap: wrap;
    padding: 5px;
    /* padding-bottom: 10px; */
}


.lock:hover::after{
    content: "所有交易均安全,並已加密";
    color:white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置*/
    top:-20px;
    right:50px;
    /* right: 20px; */
    width: 200px;
    height: 30px;
    display:flex;
    flex-wrap: wrap;
    padding: 5px;
    /* padding-bottom: 10px; */
}

.name-quote:hover::after{
    content: "姓和名請用一個分號分隔開";
    color:white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置*/
    top:-20px;
    right:50px;
    /* right: 20px; */
    width: 200px;
    height: 40px;
    display:flex;
    flex-wrap: nowrap;
    padding: 5px;
    /* padding-bottom: 10px; */
}

.security:hover::after{
    content: "您卡片顯示的末三碼";
    color:white;
    background-color: black;
    padding: 5px;
    border-radius: 3px;
    position: absolute;
    /* 調整位置*/
    top:-20px;
    right:50px;
    /* right: 20px; */
    width: 200px;
    height: 30px;
    display:flex;
    flex-wrap: nowrap;
    padding: 5px;
    /* padding-bottom: 10px; */
}

@media  screen and (max-width:767px) {
/* 手機板切換成直向模式 */
    .cellphone{

    display: block;
}
}

@media  screen and (min-width:768px) {
    /* 網頁板切換成橫向模式 */
        .laptop{
        display: flex;
        justify-content: center;
        
    }
    }
    
     </style>
     