<script setup>
import axios from "axios"
import debounce from "lodash/debounce"
import { ref, onMounted, watch } from "vue"
import { useExchangeRateStore } from "@/stores/exchangeRates"
import { RouterLink } from "vue-router"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { ElMessage } from "element-plus"

const router = useRouter()
const exchangeRateStore = useExchangeRateStore()
const { rates, selectedCurrency } = storeToRefs(exchangeRateStore)
const searchKeyword = ref("")
const isVisible = ref(false)
const moneyOpen = ref(false)
const isLoggedIn = ref(!!localStorage.getItem("UID"))
const categories = ref([])
const showSidebar = ref(false)
const month = ref(String(new Date().getMonth() + 1).padStart(2, "0"))
const day = ref(String(new Date().getDay()).padStart(2, "0"))
const isInitialized = ref(false)
// 搜尋
const fetchSearchResults = async () => {
  if (searchKeyword.value.trim() !== "") {
    // 使用 router 導航並將關鍵字作為查詢參數
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
  window.scrollTo(0, 0)
  isVisible.value = !isVisible.value
}

// 開啟sidebar幣種
const openMoney = () => {
  moneyOpen.value = !moneyOpen.value
}
const setCurrency = (currency) => {
  selectedCurrency.value = currency
  moneyOpen.value = !moneyOpen.value
  showSidebar.value = !showSidebar.value
  window.scrollTo(0, 0)
}
// 請求大類別
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
  moneyOpen.value = false
  categories.value.forEach((category) => {
    category.showChildren = false
  })
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

watch(selectedCurrency, () => {
  if (isInitialized.value) {
    ElMessage.success("幣種成功切換")
  } else {
    isInitialized.value = true
  }
})
</script>

<template>
  <!-- sidebar 遮罩 -->
  <div v-if="showSidebar" class="fixed inset-0 bg-black bg-opacity-50 z-20 xl:hidden" @click="toggleSidebar"></div>

  <!-- navbar -->
  <div class="fixed top-0 w-screen bg-[#314e86] xl:bg-white z-10 shadow-md flex justify-between xl:pb-2">
    <!-- logo -->
    <div class="w-16 h-12 mt-2 ml-2 xl:mx-10 xl:w-24 xl:h-20 rounded-lg overflow-hidden">
      <a href="/">
        <img src="/src/assets/LRlogo.jpg" alt="logo" class="object-cover w-full h-full" />
      </a>
    </div>
    <!-- 文字區 -->
    <div class="grid w-full">
      <!-- 功能navbar -->
      <div class="flex justify-between">
        <ul class="flex items-center justify-end flex-1">
          <!-- 匯率 -->
          <li class="mx-3">
            <select
              class="hidden border border-solid border-[#314e86] text-[#314e86] rounded-sm font-semibold outline-none cursor-pointer xl:block"
              v-model="selectedCurrency"
            >
              <option :value="rate.currency" v-for="rate in rates" :key="rate.currency" class="font-medium">{{ rate.symbol }} {{ rate.currency }}</option>
            </select>
          </li>
          <!-- 搜尋框 -->
          <li class="mx-3 xl:hidden" @click="inputShow">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-white xl:text-[#314e86]" />
          </li>
          <!-- 搜尋框 -->
          <li class="relative hidden px-2 text-[#314e86] xl:block group hover:text-[#7994a0]">
            <input
              type="search"
              v-model="searchKeyword"
              @keyup.enter="goToSearch"
              maxlength="100"
              placeholder="ivy郁欣聯名"
              class="w-0 overflow-hidden transition-all duration-500 ease-in-out border-b border-black outline-none group-hover:w-56 group-hover:p-1 focus:w-56 focus:p-1 focus-visible:outline-none"
            />
            <button type="submit" @click="goToSearch" class="pt-1">
              <!-- 放大鏡 -->
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="ml-1 p-2 rounded-full text-[#314e86] hover:text-[#7994a0] hover:bg-white" />
            </button>
          </li>

          <!-- 使用者 -->
          <RouterLink :to="isLoggedIn ? '/users/edit' : '/users/sign-in'">
            <li class="mx-1 px-2 text-white xl:text-[#314e86] cursor-pointer rounded-full hover:bg-[#314e86] hover:text-white">
              <font-awesome-icon :icon="['fas', 'user']" />
            </li>
          </RouterLink>
          <!-- 購物車 -->
          <RouterLink to="/Cart">
            <li class="mx-1 px-2 text-white xl:text-[#314e86] cursor-pointer rounded-full hover:bg-[#314e86] hover:text-white">
              <font-awesome-icon :icon="['fas', 'bag-shopping']" />
            </li>
          </RouterLink>
          <!-- 共享購物車 -->
          <RouterLink to="/sharedcartlist">
            <li class="mx-1 px-2 text-white xl:text-[#314e86] cursor-pointer rounded-full hover:bg-[#314e86] hover:text-white">
              <i class="fa-brands fa-shopify text-lg"></i>
            </li>
          </RouterLink>
          <!-- 漢堡選單 -->
          <li class="relative w-16 h-16 list-none text-white">
            <div @click="toggleSidebar">
              <label for="bars"
                ><font-awesome-icon :icon="['fas', 'bars']" class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer top-1/2 left-1/2 xl:hidden"
              /></label>
            </div>
          </li>
        </ul>
      </div>
      <!-- 商品類別 -->
      <div class="hidden w-full max-w-[1060px] justify-between xl:flex xl:flex-1 xl:ml-10">
        <RouterLink to="/categories/28" class="text-base p-1 rounded-lg font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >{{ month }}{{ day }} 新品 / NEW</RouterLink
        >
        <RouterLink to="/categories/26" class="text-base p-1 rounded-lg font-semibold text-red-600 hover:bg-red-400 hover:text-white"
          ><p class="animate-pulse hover:animate-none">Kurt Wu 插畫家聯名</p>
        </RouterLink>
        <RouterLink to="/categories/31" class="text-base p-1 rounded-lg font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >耳環 / Earrings</RouterLink
        >
        <RouterLink to="/categories/33" class="text-base p-1 rounded-lg font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >戒指 / Rings</RouterLink
        >
        <RouterLink to="/categories/34" class="text-base p-1 rounded-lg font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >手鍊 / Bracelets</RouterLink
        >
        <RouterLink to="/categories/35" class="text-base p-1 rounded-lg font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >項鍊 / Necklaces</RouterLink
        >
        <RouterLink to="/about" class="text-base p-1 rounded-lg tracking-widest font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >關於我們</RouterLink
        >
        <RouterLink to="/store-info" class="text-base p-1 rounded-lg tracking-widest font-semibold text-[#314e86] hover:bg-[#314e86] hover:text-white"
          >門市資訊</RouterLink
        >
      </div>
    </div>
  </div>

  <!-- 手機版搜尋輸入框 -->
  <div v-show="isVisible" class="moveDown w-full mt-20 mb-3 flex justify-center mx-auto z-100 animate-pulse duration-700 xl:hidden">
    <input
      type="search"
      v-model="searchKeyword"
      @keyup.enter="goToSearch"
      maxlength="100"
      placeholder="ivy郁欣聯名"
      class="w-4/5 border-b border-[#314e86] text-[#314e86] focus-visible:outline-none"
    />
    <button type="submit" @click="goToSearch" class="py-px px-1.5 ml-1 text-[#314e86]">
      <i class="fa fa-search ::before"></i>
    </button>
  </div>

  <!-- sidebar -->
  <transition name="slide">
    <aside class="w-[210px] h-screen fixed bg-white z-20 top-0 overflow-auto xl:hidden" v-if="showSidebar">
      <div>
        <ul class="relative">
          <li class="sticky top-0 p-4 list-none bg-[#314e86] text-white opacity-100 z-30 h-16 text-lg">
            <p class="leading-8">類別選擇</p>
          </li>

          <li v-for="(category, index) in categories" :key="category.category_id" class="relative list-none text-[#314e86]">
            <!-- 大項目 -->
            <div class="flex items-center justify-between hover:cursor-pointer shadow-sm hover:font-bold">
              <!-- 類別名稱 -->
              <RouterLink :to="`/categories/${category.category_id}`" class="p-4" :class="{ ' font-bold': category.showChildren }">
                <div @click="toggleSidebar">{{ category.category_name }}</div>
              </RouterLink>
              <!-- 收合箭頭 -->
              <i
                v-if="category.children.length > 0"
                class="fas fa-chevron-down w-3 h-3 text-[#314e86] mr-4 transition-transform duration-300"
                :class="{ 'rotate-180': category.showChildren }"
                @click="toggleChildren(index)"
              ></i>
            </div>

            <!-- 小項目 -->
            <div class="overflow-hidden transition-all duration-500 z-20" :class="{ 'h-0': !category.showChildren, 'h-auto': category.showChildren }">
              <ul class="pl-1.5">
                <li v-for="child in category.children" :key="child.categories_id" class="p-4">
                  <RouterLink :to="`/categories/${child.categories_id}`" class="text-gray-400 hover:text-[#314e86] hover:cursor-pointer hover:font-semibold">
                    <div @click="toggleSidebar">{{ child.category_name }}</div>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <!-- 帳戶這邊登入會員時會消失 -->
        <ul v-if="isLoggedIn === false">
          <h2 class="p-4 text-xl text-gray-300">帳戶</h2>
          <li class="p-4 text-[#314e86] hover:cursor-pointer hover:font-bold" @click="toggleSidebar">
            <router-link to="/users/edit">會員登入</router-link>
          </li>
          <li class="p-4 text-[#314e86] hover:cursor-pointer hover:font-bold" @click="toggleSidebar">
            <router-link to="/users/edit">新用戶註冊</router-link>
          </li>
        </ul>
        <hr />
        <ul>
          <h2 class="p-4 text-xl text-gray-300">其他</h2>
          <li class="p-4 hover:cursor-pointer text-[#314e86] hover:font-bold" @click="openMoney">
            <p>{{ selectedCurrency }}</p>
            <font-awesome-icon :icon="['fas', 'dollar-sign']" class="absolute right-1 top-5" />
          </li>
          <li class="p-4 hover:cursor-pointer text-[#314e86] hover:font-bold" @click="toggleSidebar">
            <RouterLink to="/store-info">尋找門市</RouterLink>
          </li>
          <li class="p-4 hover:cursor-pointer text-[#314e86] hover:font-bold" @click="toggleSidebar">
            <RouterLink to="/about">關於我們</RouterLink>
            <font-awesome-icon :icon="['fas', 'comment']" class="absolute right-1 top-5" />
          </li>
        </ul>
      </div>

      <div
        class="fixed top-0 z-30 w-[210px] h-screen pl-4 overflow-auto transition-all duration-500 ease-in-out -translate-x-full bg-white"
        :class="moneyOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <ul>
          <li @click="openMoney" class="py-3 text-[#314e86] hover:cursor-pointer">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            <span class="ml-2">貨幣</span>
          </li>
          <li
            v-for="rate in rates"
            :value="rate.currency"
            :key="rate.currency"
            @click="setCurrency(rate.currency)"
            class="py-3 hover:cursor-pointer text-[#314e86] hover:font-bold"
          >
            {{ rate.symbol }} {{ rate.currency }}
          </li>
        </ul>
      </div>
    </aside>
  </transition>

  <!-- 預留空間 -->
  <div class="w-full h-12 xl:h-24" v-show="isVisible === false"></div>
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
