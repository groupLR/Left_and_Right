<script setup>
import { ref } from "vue"
import { cities, cityStores, scrollToCity } from "./StoreData.vue"

// const cities = cityStores.map((group) => group.city);
</script>
<template>
  <div class="topPic">
    <picture>
      <!-- 手機圖片 -->
      <source srcset="https://shoplineimg.com/53eb2bccb32b41ef6e000007/60e52aa7b5986e0035d327bf/1512x.webp?source_format=jpg" media="(max-width: 768px)" />
      <!-- 平板與桌面圖片 -->
      <source srcset="https://shoplineimg.com/53eb2bccb32b41ef6e000007/60e5236d736e14001ae19413/2160x.webp?source_format=jpg" media="(min-width: 769px)" />
      <!-- 默認圖片（瀏覽器不支持 <source> 時） -->
      <img
        src="https://shoplineimg.com/53eb2bccb32b41ef6e000007/60e5236d736e14001ae19413/2160x.webp?source_format=jpg"
        alt="Pic-above-nav"
        class="w-full h-auto max-h-[600px] object-cover"
      />
    </picture>
  </div>

  <br /><br /><br />

  <!-- nav-bar -->
  <div class="navBar">
    <div class="navItem hover:cursor-pointer hover:bg-gray-100 hover:text-blue-500" v-for="city in cities" :key="city" @click="scrollToCity(city)">
      {{ city }}
    </div>
    <hr class="divider" />
  </div>
  <br /><br />

  <!-- 整個城市區塊 -->
  <div v-for="group in cityStores" :key="group.city" :id="group.city" class="mb-8 citySection">
    <!-- 城市名稱圖片 -->
    <div class="flex justify-center mb-4">
      <img :src="group.cityImage" :alt="`${group.city} logo`" class="max-w-full max-h-[350px] object-contain" />
    </div>

    <!-- 台北區的街景圖 -->
    <div v-if="group.city === '台北'" class="flex justify-center mb-6">
      <img :src="group.streetImage" alt="Taipei Street View" class="h-auto max-w-full max-h-[500px] object-cover" />
    </div>
    <br />

    <!-- 台中區的街景圖 -->
    <div v-if="group.city === '台中'" class="flex justify-center mb-6">
      <img :src="group.streetImage" alt="Taichung Street View" class="h-auto max-w-full max-h-[400px] object-cover" />
    </div>
    <br />

    <!-- 高雄區的街景圖 -->
    <div v-if="group.city === '高雄'" class="flex justify-center mb-6">
      <img :src="group.streetImage" alt="Kaohsiung Street View" class="h-auto max-w-full max-h-[400px] object-cover" />
    </div>
    <br />

    <!-- 分店列表 -->
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3 max-w-[1170px] mx-auto px-[15px]">
      <div v-for="store in group.stores" :key="store.id" class="p-6 bg-white rounded-md">
        <h3 class="mb-2 text-xl font-bold text-black-800">📍 {{ store.name }}</h3>

        <div v-if="store.Notes && store.Notes2" class="grid text-gray-400">
          <span class="block mb-2 text-sm">{{ store.Notes }}</span>
          <span class="block text-sm">{{ store.Notes2 }}</span>
        </div>

        <div class="flex items-start mt-2 text-sm text-black-600">
          <span class="font-semibold whitespace-nowrap">OPEN/</span>
          <div class="flex flex-col gap-2 ml-2">
            <div class="flex items-center">
              <span>{{ store.openDays1 }}</span> | <span>{{ store.openHours1 }}</span>
            </div>
            <div v-if="store.openDays2 && store.openHours2" class="flex items-center">
              <span>{{ store.openDays2 }}</span> |<span>{{ store.openHours2 }}</span>
            </div>
            <!-- 第三組日期與時間 -->
            <div v-if="store.openDays3 && store.openHours3" class="flex items-center">
              <span>{{ store.openDays3 }}</span
              >|
              <span>{{ store.openHours3 }}</span>
            </div>
            <!-- 第四組日期與時間 -->
            <div v-if="store.openDays4 && store.openHours4" class="flex items-center">
              <span>{{ store.openDays4 }}</span
              >|
              <span>{{ store.openHours4 }}</span>
            </div>
          </div>
        </div>
        <div class="mt-2 text-sm text-black-600">
          <span class="font-semibold">ADD</span> / {{ store.address }}
          <a :href="store.mapUrl" class="ml-1 text-blue-500 underline hover:text-blue-700" target="_blank" rel="noopener noreferrer"> MAP </a>
          <div v-if="store.addressNotes" class="flex mt-1 text-black-500">
            <span class="addressNotes">{{ store.addressNotes }}</span>
          </div>
        </div>
        <div class="mt-2 text-sm text-black-600">Credit card service / 提供刷卡服務</div>
        <div class="mt-4" v-if="store.logo">
          <img :src="store.logo" alt="Store logo" class="object-contain max-w-[100px] h-auto storeLogo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.storeCard {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Entire nav bar container */
.navBar {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 10px 0;
}

/* Single nav item */
.navItem {
  background-color: #eeeeee;
  padding: 0px 30px;
  color: black;
  height: 25px;
  display: inline-block;
  text-decoration: none;
  position: relative;
  line-height: 25px;
  margin-bottom: 5px;
}

/* Divider */
.divider {
  margin-top: 8px;
  border: none;
  border-top: 1px solid darkgray;
  width: 100%;
}

.storeLogo {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 280px;
  max-height: 200px;
}

.citySection img {
  width: 100%;
  height: auto;
  display: block;
  max-width: 1110px;
  max-height: 584.13px;
}

.citySection .storeCard {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.addressNotes {
  margin-left: 50px;
  margin-top: 5px;
}

.notes {
  margin-top: 10px;
  font-size: 14px;
}

.notes2 {
  margin-bottom: 30px;
  font-size: 14px;
}

.topPic img {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .storeCard {
    padding: 12px;
  }

  .topPic img {
    width: 100%;
    height: 300px;
    max-height: 600px;
    object-fit: cover;
  }

  .citySection img {
    width: 90%;
    height: auto;
    display: block;
    max-width: 1110px;
    max-height: 584.13px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .navBar {
    justify-content: center;
  }

  .storeCard {
    padding: 18px;
  }

  .topPic img {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: cover;
  }

  .citySection img {
    width: 90%;
    height: auto;
    display: block;
    max-width: 1110px;
    max-height: 584.13px;
  }
}
@media (min-width: 1025px) {
  .storeCard {
    padding: 20px;
  }
  .topPic img {
    width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: cover;
  }
}
</style>
