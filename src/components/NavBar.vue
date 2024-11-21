<script setup></script>

<template>
  <div class="navbar">
    <!-- 導覽列 -->
    <div class="navbarMenu">
      <!-- Logo -->
      <div class="logo">
        <a href="#"><img src="/src/assets/ourLogo.jpeg" alt="logo" /></a>
      </div>

      <!-- 貨幣選單 -->
      <select class="money">
        <option>$ HKD</option>
        <option>P MOP</option>
        <option>¥ CNY</option>
        <option selected>$ TWD</option>
        <option>$ USD</option>
        <option>$ SGD</option>
        <option>€ EUR</option>
        <option>$ AUD</option>
        <option>£ GBP</option>
        <option>₱ PHP</option>
        <option>RM MYR</option>
        <option>฿ THB</option>
        <option>د.إ AED</option>
        <option>¥ JPY</option>
        <option>$ BND</option>
        <option>₩ KRW</option>
        <option>Rp IDR</option>
        <option>₫ VND</option>
        <option>$ CAD</option>
      </select>

      <!-- 地球圖示和語言選擇 -->
      <div class="language-container">
        <font-awesome-icon class="globe-icon" :icon="['fas', 'globe']" />
        <select class="language">
          <option>English</option>
          <option selected>繁體中文</option>
        </select>
      </div>

      <!-- 服務圖示 -->
      <ul class="navbarServices">
        <!-- 搜尋框 -->
        <li class="comment">
          <input
            type="text"
            class="search"
            placeholder="ivy郁欣聯名"
            maxlength="100"
          />
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </li>
        <li><font-awesome-icon :icon="['fas', 'comment']" class="msg" /></li>
        <li><font-awesome-icon :icon="['fas', 'user']" /></li>
        <li><label for="cartSidebarSwitch"><font-awesome-icon :icon="['fas', 'bag-shopping']" /></label></li>

        <!-- 三條橫線 (Hamburger menu) -->
        <li><font-awesome-icon :icon="['fas', 'bars']" class="bars" /></li>
      </ul>
    </div>
    <div class="bigLogo">
      <a href="#"><img src="/src/assets/ourLogo.jpeg" alt="logo" /></a>
    </div>
    <!-- 項目導航列 -->
    <div class="items">
      <a href="#">1111 新品 / NEW ARRIVAL</a>
      <a href="#">耳環 / Earrings</a>
      <a href="#">耳夾 / Earclip</a>
      <a href="#">戒指 / Rings</a>
      <a href="#">手鍊 / Bracelets</a>
      <a href="#">項鍊 / Necklaces</a>
      <a href="#">聯名系列</a>
      <a href="#">門市資訊</a>
    </div>
  </div>
  <input
    type="checkbox"
    name="cartSidebarSwitch"
    id="cartSidebarSwitch"
    class="cartSidebarSwitch"
  />
  <article class="cartSidebar">
    <span>您的購物車是空的</span>
  </article>
</template>

<style scoped>
.navbar {
  padding: 10px 20px 0;
  width: 1400px;
  max-width: 100%;
  min-height: 103px;
  margin: 0 auto;
  font-size: 22px;
}
select {
  cursor: pointer; /* 手形指標樣式 */
  border: none;
  outline: none;
  background: transparent;
}
.navbarMenu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.logo {
  padding: 8px;
}

.logo img {
  object-fit: contain;
  width: 88px;
  height: 44px;
}
.bigLogo,
.msg {
  display: none;
}

/* 貨幣選單 */
.money {
  margin-left: auto;
  margin-right: 10px;
  display: none; /* 預設隱藏 */
}

/* 地球圖示與語言選擇 */
.language-container {
  display: flex;
  align-items: center;
  gap: 8px; /* 地球與選單間的間距 */
  margin-right: 10px;
  display: none; /* 預設隱藏 */
}

.globe-icon {
  font-size: 18px; /* 調整地球圖示大小 */
  color: #333;
  cursor: pointer; /* 手形指標樣式 */
}

/* 語言選擇 */
.language {
  border: none;
  outline: none;
  background: transparent;
}

/* 搜尋框 */
.comment {
  position: relative; /* 讓搜尋框相對於這裡定位*/
  overflow: hidden;
  display: flex;
  align-items: center;
}

.search {
  position: relative;
  width: 0;
  border: 0;
  margin: 0;
  opacity: 1;
  transition: all 1s;
  z-index: 1;
  outline: 0;
  border-bottom: 1px solid black;
}
.comment:hover .search {
  width: 150px;
  opacity: 1;
}

/* 服務按鈕 */
.navbarServices {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none; /* 移除點點 */
  padding: 0;
  margin: 0 10px;
  font-size: 22px;
}

.navbarServices li {
  display: flex; /* 讓圖示與文字對齊 */
  align-items: center;
  cursor: pointer; /* 手型滑鼠效果 */
  gap: 5px; /* 圖示與文字間距 */
  margin: 0 20px 0 0;
}
/* 項目導航列 */
.items {
  display: none;
}
.cartSidebar {
  background-color: #afa;
  width: 70vw;
  height: 100vh;
  position: fixed;
  transform: translateX(-100%);
  transition: all 0.5s;
  z-index: 1000;
  top: 0;
}
.cartSidebarSwitch{
    position: absolute;
    z-index: 1;
    opacity: 0;
    top: 0;
}
.cartSidebarSwitch:checked + .cartSidebar{
    transform: translateX(0);
    transition: all 0.5s;
}

/* 桌機畫面 (1200px 以上) */
@media screen and (min-width: 1200px) {
  .money,
  .language-container {
    display: flex;
  }

  .bars,
  .logo {
    display: none;
  }

  .items {
    padding: 20px;
    display: flex;
    gap: 20px;
    justify-content: center; /* 水平置中 */
    flex: 1; /* 確保占滿整個容器 */
  }
  .bigLogo {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  .bigLogo img {
    width: 150px;
    height: 100px;
  }
  .msg {
    display: block;
  }
}

/* --- 通用 Hover 樣式 --- */
/* 對 .items 中的連結應用深色字體 */
.items a:hover {
  color: #666;
  transition: color 0.3s ease;
}

/* 對其他元素應用淺色字體 */
.navbarMenu a:hover,
.navbarServices li:hover,
.language-container:hover,
.money:hover,
.language:hover {
  color: #666; /* 淺灰色，可根據需求調整 */
  transition: color 0.3s ease;
}
</style>
