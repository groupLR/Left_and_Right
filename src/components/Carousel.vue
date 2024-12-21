<script setup>
import { onMounted, ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

// 桌面版圖片
const images = ref([
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/67341d4698e0ca000aabe391/2160x.webp?source_format=jpg", alt: "1", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6722e7ae5184d300109cbda3/2160x.webp?source_format=jpg", alt: "2", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6736a9d94b40cc000f4bd23b/2160x.webp?source_format=jpg", alt: "3", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6729d92332af65000e23a3dd/2160x.webp?source_format=jpg", alt: "4", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671ef9390df46d000c4acbfe/2160x.webp?source_format=jpg", alt: "5", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6720aaeced31c40011b4d890/2160x.webp?source_format=jpg", alt: "6", link: "https://github.com/33test/clone-bonny" },
  { src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e24fe32e9304001c6fc359/2160x.webp?source_format=jpg", alt: "7", link: "https://github.com/33test/clone-bonny" },
]);

// Swiper 初始化
const swiperInstance = ref(null);

onMounted(() => {
  const initializeSwiper = () => {
    swiperInstance.value = new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      loop: true,
      autoplay: {
        delay: 5000, // 自動播放間隔
        disableOnInteraction: false, // 用戶操作後繼續自動播放
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true, // 确保可点击
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  };

  const images = document.querySelectorAll(".swiper-slide img");
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
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(image, index) in images" :key="index">
        <a :href="image.link" target="_blank">
          <img :src="image.src" :alt="image.alt" />
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<style>
.swiper {
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.swiper-pagination {
  position: absolute;
  bottom: 300px;
  right: 20px;
}

.swiper-pagination-bullet {
  background-color: black;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
