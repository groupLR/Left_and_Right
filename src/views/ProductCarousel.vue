<script setup>
import { onMounted, ref } from "vue";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
const swiperInstance = ref(null);

const images = ref([
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d6ce670bcfc2b00141678ea/800x.webp?source_format=jpg', title: 'Image 1',colorText:"Silver / 銀色",colorSquare:'#EBEBEB' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d6ce670424fd9001a0d185e/800x.webp?source_format=jpg', title: 'Image 2',colorText:"Rose Gold / 玫瑰金",colorSquare:'#FFBEA8' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d6ce670bcfc2b00141678ea/800x.webp?source_format=jpg', title: 'Image 3',colorText:"Gold / 金色",colorSquare:'#FFC500'  },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5ec22beeefc5470036f68c19/800x.webp?source_format=jpg', title: 'Image 4' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d70b15d496aa5001a58c2e5/800x.webp?source_format=jpg', title: 'Image 5' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d70b15da8ed6d0020d3a5c0/800x.webp?source_format=jpg', title: 'Image 6' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d6ce670424fd9001a0d185e/800x.webp?source_format=jpg', title: 'Image 7' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/66dac8ba15b4f70010f254e6/800x.webp?source_format=jpg', title: 'Image 8' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d72304fe8c7d50017d7e721/800x.webp?source_format=jpg', title: 'Image 9' },
  { image: 'https://shoplineimg.com/53eb2bccb32b41ef6e000007/5d72305871b4a0001750aabb/800x.webp?source_format=jpg', title: 'Image 10' }
])

const isCellphone = ref(false)
const checkDevice = () => {
  const width = window.innerWidth;
  if(width <= 767){
    isCellphone.value = true
  }
};

onMounted(() => {
  checkDevice()
  const initializeSwiper = () => {
    swiperInstance.value = new Swiper(".swiper", {
      speed: 400,
      spaceBetween: 100,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true, 
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
        <img :src="image.image" :alt="image.title" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<style>
.swiper {
  /* display: flex; */
  max-width: 768px;
  width: 100%;
  height:  100%;
}
.swiper-slide {
  /* display: flex; */
  justify-content: center;
  align-content: center;
}
.swiper-slide img {
  max-width: 768px;
  max-height: 768px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.swiper-pagination {
  position: absolute;
  top:0;
  right: 10px;
}
.swiper-pagination-bullet {
  background-color: rgb(0, 0, 0);
  border: 1px solid #ccc;
  cursor: pointer; 
}
</style>