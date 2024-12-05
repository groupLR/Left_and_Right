<script setup>
import { onMounted, ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

// 桌面版圖片
const desktopImages = [
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/67341d4698e0ca000aabe391/2160x.webp?source_format=jpg", alt: "1", link: "https://www.bonnyread.com.tw/categories/newarrival" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6722e7ae5184d300109cbda3/2160x.webp?source_format=jpg", alt: "2", link: "https://www.bonnyread.com.tw/categories/newarrival" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6736a9d94b40cc000f4bd23b/2160x.webp?source_format=jpg", alt: "3", link: "https://www.bonnyread.com.tw/categories/newarrival" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6729d92332af65000e23a3dd/2160x.webp?source_format=jpg", alt: "4", link: "https://www.bonnyread.com.tw/categories/bylab?srsltid=AfmBOorWoiWjHBXcr-5TirOigjL2R38VXfpPC5FY9ujD3YwRuBcugSY_" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671ef9390df46d000c4acbfe/2160x.webp?source_format=jpg", alt: "5", link: "https://www.bonnyread.com.tw/categories/joelinsta" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6720aaeced31c40011b4d890/2160x.webp?source_format=jpg", alt: "6", link: "https://www.bonnyread.com.tw/categories/large-size" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e24fe32e9304001c6fc359/2160x.webp?source_format=jpg", alt: "7", link: "https://www.bonnyread.com.tw/categories/karat-gold" },
];

// 手機版圖片
const mobileImages = [
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/673aa26777a50d000c2575ce/1296x.webp?source_format=jpg", alt: "mobile-1", link: "https://www.bonnyread.com.tw/categories/newarrival" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6729d9283a3f4d000cc91974/720x.webp?source_format=jpg", alt: "mobile-2", link: "https://www.bonnyread.com.tw/categories/bylab" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671ef943d74a35000cdbb83d/720x.webp?source_format=jpg", alt: "mobile-3", link: "https://www.bonnyread.com.tw/categories/joelinsta" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6720aaf3a07a0a000e9a9f0b/720x.webp?source_format=jpg", alt: "mobile-4", link: "https://www.bonnyread.com.tw/categories/large-size" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e2500ee80cf10022625217/720x.webp?source_format=jpg", alt: "mobile-5", link: "https://www.bonnyread.com.tw/categories/karat-gold" },
];

// 響應式數據
const images = ref(desktopImages);

// 判斷是否為手機裝置
const isMobile = ref(false);
const checkDevice = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 767; // 手機寬度判斷
  images.value = isMobile.value ? mobileImages : desktopImages; // 切換圖片數據
};

// Swiper 初始化
const swiperInstance = ref(null);

onMounted(() => {
  checkDevice();
  window.addEventListener("resize", checkDevice); // 動態監聽螢幕大小變化

  const initializeSwiper = () => {
    swiperInstance.value = new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      direction: "vertical",
      loop: true,
      autoplay: {
        delay: 3000, // 自動播放間隔
        disableOnInteraction: false, // 用戶操作後繼續自動播放
      },
      pagination: {
        el: ".swiperPagination",
        clickable: true, // 确保可点击
      },
      navigation: {
        nextEl: ".swiperButtonNext",
        prevEl: ".swiperButtonPrev",
      },
      scrollbar: {
        el: ".swiperScrollbar",
      },
    });
  };

  const images = document.querySelectorAll(".swiperSlide img");
  let loadedCount = 0;

  images.forEach((img) => {
    img.onload = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        initializeSwiper();
      }
    };
    if (img.complete) img.onload();
  });
});
</script>

<template>
  <div class="swiper">
    <div class="swiperWrapper">
      <div class="swiperSlide" v-for="(image, index) in images" :key="index">
        <a :href="image.link" target="_blank">
          <img :src="image.src" :alt="image.alt" />
        </a>
      </div>
    </div>
    <div class="swiperPagination"></div>
  </div>
</template>

<style>
.swiper {
  width: 1903px;
  height: 731.23px;
}
.swiperSlide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
.swiperSlide img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.swiperPagination {
  position: absolute;
  bottom: 200px;
  right: 10px;
}
.swiperPaginationBullet {
  background-color: black;
  border: 1px solid #ccc;
  cursor: pointer;
}
@media (max-width: 767px) {
  .swiper {
    width: 100%;
    max-width: 375px;
    height: 375px;
  }
  .swiperPagination {
    position: absolute;
    bottom: 300px;
    right: 10px;
  }
  .swiperSlide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .swiper {
    width: 100%;
    height: 308.55px;
    max-width: 803px;
  }
  .swiperPagination {
    position: absolute;
    bottom: 300px;
    right: 10px;
  }
  .swiperSlide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
}
@media (min-width: 1025px) {
  .swiper {
    width: 100%;
    max-width: 1903px;
    height: 731.23px;
  }
  .swiperPagination {
    position: absolute;
    bottom: 300px;
    right: 20px;
  }
  .swiperSlide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
}
</style>
