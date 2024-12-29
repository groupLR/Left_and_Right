<script setup>
import { ref } from "vue"
import axios from "axios"

const isLoggedIn = ref(!!localStorage.getItem("UID"))
const categories = ref([])
const showSidebar = ref(false)
// 請求父項目
const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sidebarCategory`)
    categories.value = Object.values(data).map((category) => ({
      ...category,
      showChildren: false,
    }))
    console.log(categories.value)
  } catch (error) {
    console.error("請求類別項目失敗：", error)
  }
}

const toggleChildren = (index) => {
  categories.value[index].showChildren = !categories.value[index].showChildren
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
fetchCategories()
</script>

<template>
  <!-- sidebar 遮罩 -->
  <div v-if="showSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-20" @click="toggleSidebar"></div>

  <!-- navbar -->
  <div class="fixed top-0 w-screen bg-white z-10 shadow-md flex justify-between pb-1 xl:pb-5">
    <!-- logo -->
    <div class="w-36 h-12 mt-2 xl:w-48 xl:h-20">
      <a href="/">
        <img src="/src/assets/LRlogo.jpg" alt="logo" class="object-contain w-full h-full pl-5" />
      </a>
    </div>
    <!-- 文字區 -->
    <div class="grid w-full">
      <!-- 功能navbar -->
      <div class="flex justify-between">
        <ul class="flex items-center justify-end flex-1">
          <!-- 匯率 -->
          <li class="mx-3">
            <select class="hidden text-black outline-none cursor-pointer xl:block hover:text-gray-500">
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
          </li>
          <li class="mx-3">
            <div class="hidden text-black cursor-pointer xl:block hover:text-gray-500">
              <font-awesome-icon class="globe-icon" :icon="['fas', 'globe']" />
              <select class="text-black outline-none cursor-pointer hover:text-gray-500">
                <option>English</option>
                <option selected>繁體中文</option>
              </select>
            </div>
          </li>
          <!-- 搜尋框 -->
          <li class="mx-3 xl:hidden" @click="inputShow">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </li>
          <!-- 搜尋框 -->
          <li class="relative hidden mx-3 text-black xl:block group hover:text-gray-500">
            <input
              type="search"
              v-model="searchKeyword"
              @keyup.enter="goToSearch"
              maxlength="100"
              placeholder="ivy郁欣聯名"
              class="w-0 overflow-hidden transition-all duration-500 ease-in-out border-b border-black outline-none group-hover:w-56 focus:w-56 focus-visible:outline-none"
            />
            <button type="submit" @click="goToSearch">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
          </li>
          <li class="hidden mx-3 text-black cursor-pointer xl:block hover:text-gray-500">
            <font-awesome-icon :icon="['fas', 'comment']" />
          </li>
          <!-- 使用者 -->
          <RouterLink :to="isLoggedIn ? '/users/edit' : '/users/sign-in'">
            <li class="mx-3 text-black cursor-pointer hover:text-gray-500">
              <font-awesome-icon :icon="['fas', 'user']" />
            </li>
          </RouterLink>
          <!-- 購物車 -->
          <RouterLink to="/Cart">
            <li class="mx-3 text-black cursor-pointer hover:text-gray-500">
              <font-awesome-icon :icon="['fas', 'bag-shopping']" />
            </li>
          </RouterLink>
          <!-- 共享購物車 -->
          <RouterLink to="/sharedcartlist">
            <li class="mx-3 text-black cursor-pointer hover:text-gray-500">
              <i class="fa-brands fa-shopify text-lg"></i>
            </li>
          </RouterLink>
          <!-- 漢堡選單 -->
          <li class="relative w-16 h-16 list-none">
            <div @click="toggleSidebar">
              <label for="bars"
                ><font-awesome-icon :icon="['fas', 'bars']" class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2 xl:hidden"
              /></label>
            </div>
          </li>
        </ul>
      </div>
      <!-- 商品類別 -->
      <div class="hidden w-full gap-8 max-w-[1160px] justify-center xl:flex">
        <RouterLink to="/categories/28" class="text-sm font-semibold">1223 新品 / NEW</RouterLink>
        <RouterLink to="/categories/28" class="text-sm font-semibold animate-pulse text-red-600">Kurt Wu 插畫家聯名</RouterLink>
        <RouterLink to="/categories/31" class="text-sm font-semibold">耳環 / Earrings</RouterLink>
        <RouterLink to="/categories/33" class="text-sm font-semibold">戒指 / Rings</RouterLink>
        <RouterLink to="/categories/34" class="text-sm font-semibold">手鍊 / Bracelets</RouterLink>
        <RouterLink to="/categories/35" class="text-sm font-semibold">項鍊 / Necklaces</RouterLink>
        <RouterLink to="/categories/26" class="text-sm tracking-widest font-semibold">聯名系列</RouterLink>
        <RouterLink to="/store-info" class="text-sm tracking-widest font-semibold">門市資訊</RouterLink>
      </div>
    </div>
  </div>

  <!-- 搜尋框 -->
  <!-- <div v-show="isVisible" class="w-full py-4 pl-4 pr-3 z-100 xl:hidden">
    <button type="submit" @click="goToSearch" class="py-px px-1.5">
      <i class="fa fa-search ::before"></i>
    </button>
    <input
      type="search"
      v-model="searchKeyword"
      @keyup.enter="goToSearch"
      maxlength="100"
      placeholder="ivy郁欣聯名"
      class="w-4/5 border-b border-black focus-visible:outline-none"
    />
  </div> -->

  <!-- sidebar -->
  <transition name="slide">
    <aside class="w-[200px] h-screen fixed bg-white z-20 top-0 overflow-auto xl:hidden" v-if="showSidebar">
      <ul class="relative">
        <li class="sticky top-0 p-4 list-none bg-cyan-700 text-white opacity-100 z-30 h-[68px] text-lg">
          <p class="leading-10">類別選擇</p>
        </li>

        <li v-for="(category, index) in categories" :key="category.category_id" class="relative list-none">
          <!-- 大項目 -->
          <div class="flex items-center justify-between hover:cursor-pointer shadow-sm">
            <!-- 類別名稱 -->
            <RouterLink :to="`/categories/${category.category_id}`" class="p-4">{{ category.category_name }}</RouterLink>
            <!-- 收合箭頭 -->
            <i
              v-if="category.children.length > 0"
              class="fas fa-chevron-down w-3 h-3 text-black mr-4 transition-transform duration-300"
              :class="{ 'rotate-180': category.showChildren }"
              @click="toggleChildren(index)"
            ></i>
          </div>

          <!-- 小項目 -->
          <div class="overflow-hidden transition-all duration-500" :class="{ 'h-0': !category.showChildren, 'h-auto': category.showChildren }">
            <ul class="pl-1.5">
              <li v-for="child in category.children" :key="child.categories_id" class="p-4">
                <RouterLink :to="`/categories/${child.categories_id}`" class="text-gray-400 hover:text-black hover:cursor-pointer">{{
                  child.category_name
                }}</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!-- 帳戶這邊登入會員時會消失 -->
      <ul v-if="isLoggedIn === false">
        <h2 class="p-4 text-xl text-gray-300">帳戶</h2>
        <li class="p-4">
          <router-link to="/users/edit">會員登入</router-link>
        </li>
        <li class="p-4"><a href="#">新用戶註冊</a></li>
      </ul>
      <hr />
      <ul>
        <h2 class="p-4 text-xl text-gray-300">其他</h2>
        <li class="p-4"><a href="#">BLOG</a></li>
        <li class="p-4">
          <RouterLink to="/store-info">尋找門市</RouterLink>
        </li>
        <li class="p-4">
          <a href="#">聯絡我們</a>
          <font-awesome-icon :icon="['fas', 'comment']" class="absolute right-1 top-5" />
        </li>

        <li class="p-4 relative" @click="openChangeLanguage">
          <span>繁體中文</span>
          <font-awesome-icon class="absolute right-1 top-5" :icon="['fas', 'globe']" />
        </li>
        <li class="p-4" @click="openMoney">
          <span>TWD</span>
          <font-awesome-icon :icon="['fas', 'dollar-sign']" class="absolute right-1 top-5" />
        </li>
      </ul>
    </aside>
  </transition>
  <div
    class="fixed max-w-72 top-0 z-10 w-3/4 h-screen px-5 pt-4 pb-3 overflow-auto transition-all duration-500 -translate-x-full bg-white"
    :class="changeLanguageOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <ul>
      <li @click="openChangeLanguage">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
        <span class="py-3 ml-2">語言</span>
      </li>
      <li class="justify-center py-3">English</li>
      <li class="justify-center py-3">繁體中文</li>
    </ul>
  </div>

  <div
    class="fixed top-0 max-w-72 z-10 w-3/4 h-screen px-5 pt-4 pb-3 overflow-auto transition-all duration-500 -translate-x-full bg-white"
    :class="moneyOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <ul>
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
      <span class="py-3 ml-2" @click="openMoney">貨幣</span>
      <!-- <li v-for="currency in currencies">{{ currency }}</li> -->
      <li class="justify-center py-3">$ HKD</li>
      <li class="justify-center py-3">P MOP</li>
      <li class="justify-center py-3">¥ CNY</li>
      <li class="justify-center py-3" selected>$ TWD</li>
      <li class="justify-center py-3">$ USD</li>
      <li class="justify-center py-3">$ SGD</li>
      <li class="justify-center py-3">€ EUR</li>
      <li class="justify-center py-3">$ AUD</li>
      <li class="justify-center py-3">£ GBP</li>
      <li class="justify-center py-3">₱ PHP</li>
      <li class="justify-center py-3">RM MYR</li>
      <li class="justify-center py-3">฿ THB</li>
      <li class="justify-center py-3">د.إ AED</li>
      <li class="justify-center py-3">¥ JPY</li>
      <li class="justify-center py-3">$ BND</li>
      <li class="justify-center py-3">₩ KRW</li>
      <li class="justify-center py-3">Rp IDR</li>
      <li class="justify-center py-3">₫ VND</li>
      <li class="justify-center py-3">$ CAD</li>
    </ul>
  </div>
  <div class="w-full h-[68px] xl:h-32"></div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0);
  opacity: 1;
}

.a {
  gap: 20px;
}

.rotate-180 {
  transform: scaleY(-1);
}

.cartSidebarSwitch {
  position: absolute;
  z-index: 1;
  opacity: 0;
  top: 0;
  display: inline-block;
}
</style>
