<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"
import { useExchangeRateStore } from "@/stores/exchangeRates"
import { RouterLink } from "vue-router"
import { useRouter } from "vue-router"
import debounce from "lodash/debounce"
import { storeToRefs } from "pinia"

const exchangeRateStore = useExchangeRateStore()
const { rates, selectedCurrency } = storeToRefs(exchangeRateStore)
const searchKeyword = ref("")
const isVisible = ref(false)
const changeLanguageOpen = ref(false)
const moneyOpen = ref(false)
const router = useRouter()

const isLoggedIn = ref(!!localStorage.getItem("UID"))
const categories = ref([])
const languages = ref(["繁體中文", "English"])
const selectedLanguage = ref("繁體中文")
const showSidebar = ref(false)

// 搜尋
const fetchSearchResults = async () => {
  if (searchKeyword.value.trim() !== "") {
    // 使用 router 導航並將關鍵字作為查詢參數
    // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(searchKeyword.value)}`)
    router.push({
      path: "/search",
      query: { q: searchKeyword.value.trim() },
    })
    searchKeyword.value = ""
  }
}
// 將 fetchSearchResults 包裝成 debounce 函數
const goToSearch = debounce(fetchSearchResults, 800)
const inputShow = () => {
  isVisible.value = !isVisible.value
}

// 開啟sidebar語言、幣種
const openChangeLanguage = () => {
  changeLanguageOpen.value = !changeLanguageOpen.value
}
const openMoney = () => {
  moneyOpen.value = !moneyOpen.value
}
// 請求父項目
const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sidebarCategory`)
    categories.value = Object.values(data).map((category) => ({
      ...category,
      showChildren: false,
    }))
  } catch (error) {
    console.error("請求類別項目失敗：", error)
  }
}

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
  changeLanguageOpen.value = false
  moneyOpen.value = false
}
const toggleChildren = (index) => {
  categories.value[index].showChildren = !categories.value[index].showChildren
}

onMounted(() => {
  // 拿到類別
  fetchCategories()
  // 匯率設置
  exchangeRateStore.initCurrency()
  exchangeRateStore.getAllCurrency()
})
</script>

<template>
  <!-- sidebar 遮罩 -->
  <div v-if="showSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden" @click="toggleSidebar"></div>

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
            <select class="hidden text-black outline-none cursor-pointer xl:block hover:text-gray-500" v-model="selectedCurrency">
              <option :value="rate.currency" v-for="rate in rates" :key="rate.currency">{{ rate.symbol }} {{ rate.currency }}</option>
            </select>
          </li>
          <li class="mx-3">
            <div class="hidden text-black cursor-pointer xl:block hover:text-gray-500">
              <font-awesome-icon class="globe-icon" :icon="['fas', 'globe']" />
              <select class="text-black outline-none cursor-pointer hover:text-gray-500" v-model="selectedLanguage">
                <option v-for="language in languages" :value="language" :key="language" @click="selectedLanguage == language">{{ language }}</option>
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
              <!-- 放大鏡 -->
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
          </li>
          <!-- 客服 -->
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
        <RouterLink to="/categories/28" class="text-sm font-semibold hover:text-gray-500">1223 新品 / NEW</RouterLink>
        <RouterLink to="/categories/26" class="text-sm font-semibold animate-pulse text-red-600 hover:text-red-300">Kurt Wu 插畫家聯名</RouterLink>
        <RouterLink to="/categories/31" class="text-sm font-semibold hover:text-gray-500">耳環 / Earrings</RouterLink>
        <RouterLink to="/categories/33" class="text-sm font-semibold hover:text-gray-500">戒指 / Rings</RouterLink>
        <RouterLink to="/categories/34" class="text-sm font-semibold hover:text-gray-500">手鍊 / Bracelets</RouterLink>
        <RouterLink to="/categories/35" class="text-sm font-semibold hover:text-gray-500">項鍊 / Necklaces</RouterLink>
        <RouterLink to="/categories/26" class="text-sm tracking-widest font-semibold hover:text-gray-500">聯名系列</RouterLink>
        <RouterLink to="/store-info" class="text-sm tracking-widest font-semibold hover:text-gray-500">門市資訊</RouterLink>
      </div>
    </div>
  </div>

  <!-- 手機版搜尋輸入框 -->
  <div v-show="isVisible" class="moveDown w-full mt-24 flex justify-center mx-auto z-100 animate-pulse duration-700 xl:hidden">
    <input
      type="search"
      v-model="searchKeyword"
      @keyup.enter="goToSearch"
      maxlength="100"
      placeholder="ivy郁欣聯名"
      class="w-4/5 border-b border-black focus-visible:outline-none"
    />
    <button type="submit" @click="goToSearch" class="py-px px-1.5 ml-1">
      <i class="fa fa-search ::before"></i>
    </button>
  </div>

  <!-- sidebar -->
  <transition name="slide">
    <aside class="w-[210px] h-screen fixed bg-white z-20 top-0 overflow-auto xl:hidden" v-if="showSidebar">
      <div>
        <ul class="relative">
          <li class="sticky top-0 p-4 list-none bg-cyan-700 text-white opacity-100 z-30 h-[68px] text-lg">
            <p class="leading-10">類別選擇</p>
          </li>

          <li v-for="(category, index) in categories" :key="category.category_id" class="relative list-none">
            <!-- 大項目 -->
            <div class="flex items-center justify-between hover:cursor-pointer shadow-sm hover:font-bold">
              <!-- 類別名稱 -->
              <RouterLink :to="`/categories/${category.category_id}`" class="p-4" :class="{ ' font-bold': category.showChildren }">{{
                category.category_name
              }}</RouterLink>
              <!-- 收合箭頭 -->
              <i
                v-if="category.children.length > 0"
                class="fas fa-chevron-down w-3 h-3 text-black mr-4 transition-transform duration-300"
                :class="{ 'rotate-180': category.showChildren }"
                @click="toggleChildren(index)"
              ></i>
            </div>

            <!-- 小項目 -->
            <div class="overflow-hidden transition-all duration-500 z-20" :class="{ 'h-0': !category.showChildren, 'h-auto': category.showChildren }">
              <ul class="pl-1.5">
                <li v-for="child in category.children" :key="child.categories_id" class="p-4">
                  <RouterLink :to="`/categories/${child.categories_id}`" class="text-gray-400 hover:text-black hover:cursor-pointer hover:font-bold">
                    <div>{{ child.category_name }}</div></RouterLink
                  >
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

          <li class="p-4 relative cursor-pointer" @click="openChangeLanguage">
            <p>{{ selectedLanguage }}</p>
            <font-awesome-icon class="absolute right-1 top-5" :icon="['fas', 'globe']" />
          </li>
          <li class="p-4 cursor-pointer" @click="openMoney">
            <p>{{ selectedCurrency }}</p>
            <font-awesome-icon :icon="['fas', 'dollar-sign']" class="absolute right-1 top-5" />
          </li>
        </ul>
      </div>
      <div
        class="fixed w-[200px] top-0 z-30 h-screen px-4 overflow-auto transition-all duration-500 -translate-x-full bg-white"
        :class="changeLanguageOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <ul>
          <li @click="openChangeLanguage" class="py-3">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            <span class="ml-2">語言</span>
          </li>
          <li v-for="language in languages" :key="language" :value="language" @click="selectedLanguage == language" class="py-3">{{ language }}</li>
        </ul>
      </div>

      <div
        class="fixed top-0 z-30 w-[200px] h-screen px-4 overflow-auto transition-all duration-500 -translate-x-full bg-white"
        :class="moneyOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <ul>
          <li @click="openMoney" class="py-3">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            <span class="ml-2">貨幣</span>
          </li>
          <li v-for="rate in rates" :value="rate.currency" :key="rate.currency" @click="selectedCurrency = rate.currency" class="py-3">
            {{ rate.symbol }} {{ rate.currency }}
          </li>
        </ul>
      </div>
    </aside>
  </transition>

  <!-- 預留空間 -->
  <div class="w-full h-[72px] xl:h-28" v-show="isVisible === false"></div>
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
@keyframes down {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.moveDown {
  animation-name: down;
  animation-duration: 700ms;
  animation-iteration-count: 1;
}
</style>
