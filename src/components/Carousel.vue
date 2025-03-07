<script setup>
import { onMounted, ref } from "vue"
import Swiper from "swiper/bundle"
import "swiper/css/bundle"
// 桌面版圖片
const desktopImages = [
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e24fe32e9304001c6fc359/2160x.webp?source_format=jpg",
    alt: "1",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/674d128e4f2b3c000bdca832/1296x.webp?source_format=jpg",
    alt: "2",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/673f048e44c47b000f63e93a/1296x.webp?source_format=jpg",
    alt: "3",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/673f04b505469b0010df659c/1296x.webp?source_format=jpg",
    alt: "4",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671ef9390df46d000c4acbfe/2160x.webp?source_format=jpg",
    alt: "5",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6720aaeced31c40011b4d890/2160x.webp?source_format=jpg",
    alt: "6",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e24fe32e9304001c6fc359/2160x.webp?source_format=jpg",
    alt: "7",
    link: "#",
  },
]

// 手機版圖片
const mobileImages = [
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/674d12933d25930010e1a834/900x.webp?source_format=jpg",
    alt: "mobile-1",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6729d9283a3f4d000cc91974/720x.webp?source_format=jpg",
    alt: "mobile-2",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/671ef943d74a35000cdbb83d/720x.webp?source_format=jpg",
    alt: "mobile-3",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/6720aaf3a07a0a000e9a9f0b/720x.webp?source_format=jpg",
    alt: "mobile-4",
    link: "#",
  },
  {
    src: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e2500ee80cf10022625217/720x.webp?source_format=jpg",
    alt: "mobile-5",
    link: "#",
  },
]

// 響應式數據
const images = ref(desktopImages)

// 判斷是否為手機裝置
const isMobile = ref(false)
const checkDevice = () => {
  const width = window.innerWidth
  isMobile.value = width <= 767 // 手機寬度判斷
  images.value = isMobile.value ? mobileImages : desktopImages // 切換圖片數據
}

// Swiper 初始化
const swiperInstance = ref(null)

onMounted(() => {
  checkDevice()
  window.addEventListener("resize", checkDevice) // 動態監聽螢幕大小變化

  const initializeSwiper = () => {
    swiperInstance.value = new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      loop: true,
      autoplay: {
        delay: 3000, // 自動播放間隔
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
    })
  }

  const images = document.querySelectorAll(".swiper-slide img")
  let loadedCount = 0

  images.forEach((img) => {
    img.onload = () => {
      loadedCount++
      if (loadedCount === images.length) {
        initializeSwiper()
      }
    }
    if (img.complete) img.onload()
  })
})
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
  bottom: 200px;
  right: 10px;
}
.swiper-pagination-bullet {
  background-color: black;
  border: 1px solid #ccc;
  cursor: pointer;
}
@media (max-width: 767px) {
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    position: absolute;
    bottom: 300px;
    right: 10px;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .swiper {
    width: 100%;
    height: 100%;
    max-width: 100%;
  }
  .swiper-pagination {
    position: absolute;
    bottom: 300px;
    right: 10px;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

@media (min-width: 1025px) {
  .swiper {
    width: 100%;
    max-width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    position: absolute;
    bottom: 300px;
    right: 20px;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
