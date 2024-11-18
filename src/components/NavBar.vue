<script setup></script>

<template>
  <div class="navbar">
    <div class="navbarMenu">
      <div class="logo">
        <a href="#"><img src="/src/assets/ourLogo.jpeg" alt="logo" /></a>
      </div>
      <select>
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
      <input type="text" />
      <select>
        <option>English</option>
        <option selected>繁體中文</option>
      </select>
      <ul class="navbarServices">
        <li>
          <ul class="globe">
            <font-awesome-icon :icon="['fas', 'globe']" />
          </ul>
        </li>
        <li>
          <ul>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </ul>
        </li>
        <li>
          <ul class="comment">
            <font-awesome-icon :icon="['fas', 'comment']" />
          </ul>
        </li>
        <li>
          <ul>
            <font-awesome-icon :icon="['fas', 'user']" />
          </ul>
        </li>
        <li>
          <ul>
            <font-awesome-icon :icon="['fas', 'bag-shopping']" />
          </ul>
        </li>
        <li>
          <ul>
            <font-awesome-icon :icon="['fas', 'bars']" />
          </ul>
        </li>
      </ul>
    </div>
    <div class="items">
      <a href="#">1111 新品 / NEW ARRIVAL </a>
      <a href="#">耳環/Earrings</a>
      <a href="#">耳夾/Earclip</a>
      <a href="#">戒指/Rings</a>
      <a href="#">手鍊/Bracelets</a>
      <a href="#">項鍊/Necklaces</a>
      <a href="#">聯名系列</a>
      <a href="#">門市資訊</a>
    </div>
  </div>
</template>

<style scoped>
/* 手機畫面 */
.navbar {
  height: 60px;
}
.navbarMenu {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.logo {
  padding: 15px 8px;
}
img {
  object-fit: contain;
  max-width: 150px;
  max-height: 44px;
}
.navbarServices {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  padding: 15px 8px;
}

select {
  /* display: none; */
}
.items {
  /* display: none; */
}
.globe {
  display: none;
}
.comment {
  display: none;
}
@media screen and (max-width >= 1200px) {
    
}
</style>
