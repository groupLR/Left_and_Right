<script setup>
import { onMounted, onUnmounted, ref,watch,computed } from 'vue'
import axios from 'axios'
import { useRouter,useRoute } from 'vue-router';

import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import { Pagination, Navigation, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

Swiper.use([Pagination, Navigation, Scrollbar])
const swiperInstance = ref(null);

const router = useRouter()
const route = useRoute()

//輪播圖
const device = ref('isComputer')
const checkDevice = () => {
  const width = window.innerWidth;
  device.value = width <= 767 ? 'isMobile' : 'isComputer'
};
checkDevice()
window.addEventListener('resize', checkDevice)

onMounted(() => {
  checkDevice()
  window.addEventListener('resize', checkDevice)

  const initializeSwiper = () => {
    swiperInstance.value = new Swiper(".swiper", {
      modules: [Pagination, Navigation, Scrollbar],
      speed: 400,
      spaceBetween: 10,
      slidesPerView: 1,
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
    })
  }

  const images = document.querySelectorAll(".swiper-slide img");
  let loadedCount = 0;

  images.forEach((img) => {
    img.onload = () => {
      loadedCount++
      if (loadedCount === images.length) {
        initializeSwiper();
      }
    }
    if (img.complete) img.onload();
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', checkDevice)
  if (swiperInstance.value) {
    swiperInstance.value.destroy()
  }
})

//獲取產品資料
const API_URL = 'http://localhost:3300'
const profile = ref('')
const mainImgs = ref([])
const desImgs = ref([])
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== 'string') return ''
  const cleanedPath = imagePath.startsWith('./') ? imagePath.slice(1) : imagePath;
  return `${API_URL}${cleanedPath}`
}

const isLoading = ref(true)

const fetchProductDetail = async(product_id = 35) =>{
  isLoading.value = true
  try{
    await new Promise((resolve) => setTimeout(resolve,100))

    const response = await axios.get(`${API_URL}/products/${product_id}`)
    profile.value = response.data.profile
    mainImgs.value = response.data.mainImgs.map((img, index) => ({
      imgPath: getImageUrl(img.image_path),
      imgText:img.alt_text,
      colorText: response.data.specs[index]?.color_text || null,
      colorSquare: response.data.specs[index]?.color_square || null
    }))
    desImgs.value = response.data.desImgs.map(img => img.image_path)
    console.log(profile.value);
  }catch(err){
    console.error('獲取商品詳情失敗:', err)
  }finally{
    isLoading.value = false
  }
}

// 監聽路由參數變化
watch(
  () => route.params.productId,
   async (NewProductId) => {
    try{
      // 如果沒有 productId 參數，使用空字串呼叫 API
      await fetchProductDetail(NewProductId);
    } catch(err){
      // 處理錯誤
      console.error('載入產品詳情失敗', err)
    }
  },{ immediate: true }
)


// const imgPath = computed(() => { 
//   return mainImgs.value.imgPath || '無法顯示商品名稱'
// })
//轉換資料型別
const title = computed(() => { 
  return profile.value.product_name || '無法顯示商品名稱'
})
const originalPrice = computed(() => { 
  return profile.value.original_price || '無法顯示商品價格'
})
const salePrice = computed(() => { 
  return profile.value.sale_price || '無法顯示商品價格'
})


//假資料
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
      



const scrollPosition = ref(0)


//切換照片index
const selectedIndex = ref(0) 
const selectedImage = computed(() => mainImgs.value[selectedIndex.value])


// 過濾產品顏色
const filterColor = computed(() => 
  mainImgs.value.filter(color => color.colorSquare)
)

//輪播圖區塊
const selectImage = (index) => {
      selectedIndex.value = index
}
    // scrollUp() {
    //   this.scrollPosition = Math.max(this.scrollPosition - 100, 0);
    // },
    // scrollDown() {
    //   this.scrollPosition = Math.min(this.scrollPosition + 100, this.mainImgs.length * 100 - 400);
    // },

//編輯購買數量
const counter = ref(1)
const increase = () => {
  counter.value++
}
const decrease = () => {
  if (counter.value > 1) {
        counter.value--
  }
}

//選擇顏色
const selectColor = (index) => {
  selectedIndex.value = index
}
//追蹤清單轉換
const isSubscribe = ref(false)
const heartColor = computed(() => ({
  color: isSubscribe.value ? 'red' : 'black'
}))
const toggleHeart = () => {
  isSubscribe.value = !isSubscribe.value
}


</script>
<template>
  <div class="loading bg-lightBlue-300 my-8 max-w-full animate-pulse">
    <div class="profile">
      <!-- 輪播圖 -->
      <div class="swiper" >
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(image, index) in mainImgs" :key="index">
            <img :src="image.imgPath" :alt="image.imgText" />
          </div>
        </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="carousel" >
        <div class="thumbnails">
          <!-- <div class="nav-button up" @click="scrollUp">&uarr;</div> --> 
          <div class="thumbnailItem" v-for="(image, index) in mainImgs" :key="index" @click="selectImage(index)">
            <img :src="image.imgPath" :alt="image.imgText" />
          </div>
          <!-- <div class="nav-button down" @click="scrollDown" >&darr;</div> -->
        </div>
        <div class="mainImage">
          <img :src="selectedImage.imgPath" :alt="selectedImage.title" />
        </div>
      </div>
      <!-- 商品概訊 -->
      <div class="m-4 mt-5"> 
        <h1 class="text-[28px]">{{ title }}</h1>
        <div class="flex">
          <h2 class="my-5 text-[20px] font-extrabold">NT${{ salePrice }}</h2>
          <h2 class="ml-5 mt-6 text-s font-bold text-gray-400 line-through" >NT${{ originalPrice }}</h2>
        </div>
        <div class="font-extralight text-[16px]">
          <p>全館任選兩件88折，優惠後特價 NT${{ Math.ceil(salePrice*0.88) }}</p>
          <p>全館任選三件85折，優惠後特價 NT${{ Math.ceil(salePrice*0.85) }}</p>
          <p>全館任選四件82折，優惠後特價 NT${{ Math.ceil(salePrice*0.82) }}</p>
        </div>
        <div class="my-[5px] mb-5 flex text-center">
          <p class="text-[14px] text-[#FFC500] pt-[1px]"><font-awesome-icon :icon="['fas', 'star']" class="mr-1" /><font-awesome-icon :icon="['fas', 'star']" class="mr-1"/><font-awesome-icon :icon="['fas', 'star']"class="mr-1" /><font-awesome-icon :icon="['fas', 'star']"class="mr-1" /><font-awesome-icon :icon="['fas', 'star']" class="mr-1"/></p>
          <p class="ml-5 text-gray-500">5 分</p>
          <p class="mx-2 text-[14px] pt-[0.8px]">|</p>
          <p class="rates">460個評價</p>
        </div>
        <div class="colorChoose">
          <p class="text-[14px] font-extralight">顏色 :{{ selectedImage.colorText }} </p>
          <div class="flex">
            <div v-for="(color,index) in filterColor" :key="color.title" >
              <input 
                type="radio" 
                name="colorChoose" 
                class="colorCheckbox" 
                :id="`color-${index}`"
                :checked="index === 0"
              >
              <div class="colorBox" @click="selectColor(index)">
                <label 
                  :for="`color-${index}`" class="colorInsideBox" 
                  :style="{ backgroundColor:color.colorSquare }"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5">
          <p class="text-[14px] font-extralight">數量</p>
          <div class="max-w-full w-full flex h-[40px] my-2.5">
            <button class="rounded-lg border border-gray-300 bg-gray-50 w-[45px] h-[40px] text-[20px]" @click="decrease">-</button>
            <input type="number" min="1" value="1" class="border border-x-0 border-gray-300 w-full text-center" v-model="counter">
            <button class="rounded-lg border border-gray-300 bg-gray-50 w-[45px] h-[40px] text-[20px]" @click="increase">+</button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 my-5">
          <button class="bg-black text-gray-50 border border-black rounded-lg text-lg p-1">加入購物車</button>
          <button class="bg-black text-gray-50 border border-black rounded-lg text-lg p-1"><i class="fa-solid fa-bag-shopping text-[14px] mr-1"></i>立即購買</button>
        </div>
        <div class="mx-auto flex justify-center text-sm hover:cursor-pointer" >
          <p :class="{'active': isSubscribe}" @click="toggleHeart" :style="heartColor" >
            <i class="fa-regular fa-heart mr-1" ></i>加入追蹤清單
          </p>
        </div>
        <div class="promotionalContainer">
          <p class="promotionalContent">
            <span class="text-[#B69490]">期間限定</span>
            <span>全館$350免運！</span>
          </p>
          <p class="promotionalContent">
            <span class="text-[#B69490]">限時優惠</span>
            <span>全館兩件88折,三件85折,四件82折(buy2 for 12% off,3 for 15% off,4 for 18% off)</span>
          </p>
          <p class="promotionalContent">
            <span class="text-[#B69490]">KURT聯名</span>
            <span>系列新品8折</span>
          </p>
          <p class="promotionalContent">
            <span class="text-[#B69490]">KURT限量滿額贈</span>
            <span>滿$990贈 花happen刺繡布貼；滿2000贈 黑心帆布袋</span>
          </p>
          <p class="promotionalContent">
            <span class="text-[#B69490]">by.Lab支線</span>
            <span>設計師大賽實體化 新品限時9折</span>
          </p>
        </div>
        <!-- <div class="flex justify-center my-5">
          <button class="border-none text-gray-500">收起內容<i class="fa-solid fa-angle-up"></i></button>
        </div> -->
      </div>
    </div>
    <!-- 商品描述 -->
    <div class="descriptionProfile">
      <div class="p-5">
        <div class="navbar">
          <div id="navbarProductDescription">商品描述</div>
          <div id="navbarRate" >顧客評價</div>
        </div>
        <div >
          <div class="descriptionTitle">
            <h3>商品描述</h3>
          </div>
          <div class="productDescription">
            <p>● 提供30日退換貨服務，請詳閱「售後服務」</p>
            <p>● 商品材質：S925純銀</p>
            <p>● 耳針材質：S925低敏銀針</p>
            <p>● 耳環SIZE直徑約：1.3 cm</p>
            <p>● 一對販售</p>
          </div>
          <div class="descriptionTitle">
            <h3>了解更多</h3>
          </div>
          <div class="descriptionImg">
            <img v-for="image in mainImgs" :key="image.index" :src="image.image" :alt="image.title" srcset="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.loading{
  animation-duration: 1s;
  animation-iteration-count:1;
  animation-name: appearing;
}
@keyframes appearing{
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
}


.colorBox{
  margin: 20px;
  margin-left: 0;
  border: 1px solid #EAEAEA; 
  background-color: #FCFCFC;
  width: 48px;
  height: 48px;
  display: flex;
  cursor: pointer;
  transition: border-color 0.3s ease;
}
.colorInsideBox{
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  margin: auto;
  cursor: pointer;
}
.colorCheckbox{
  display: none;
}

.colorCheckbox:checked + .colorBox   {
  border: 2px solid black;
}
/* 手機輪播圖區塊 */
.swiper {
  display: flex;
  max-width: 768px;
  max-height: 500px;
  width: 100%;
  height:  100%;
  position: relative
}
.swiper-slide {
  /* display: flex; */
  justify-content: center;
  align-content: center;
}
.swiper-slide img {
  max-width: 768px;
  max-height: 500px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.swiper-pagination {
  width: 100%;
  position: absolute;
  bottom: 20px;
  right: 10px;
}
:deep(.swiper-pagination-bullet) {
  background-color: rgb(0, 0, 0);
  border: 1px solid #ccc;
  cursor: pointer; 
  bottom: 0;
}
/* 電腦輪播圖區塊 */
.carousel {
  display: none;
}

.thumbnails {
  min-width: 120px;
  height: 400px;
  /* overflow-y: auto; */
  margin-right: 20px;
  padding-left: 20px;
}

.thumbnailItem {
  cursor: pointer;
  margin-bottom: 10px;
  max-width: 72px;
  max-height: 72px;
}

.thumbnailItem img {
  width: 72px;
  height: 72px;
  object-fit: cover;
}
.mainImg{
  width: 415px;
  height: 415px;
  display: block;
}

.mainImage img {
  width: 415px;
  height: 415px;
  object-fit: cover;
}

.nav-button {
  cursor: pointer;
  font-size: 24px;
  margin-top: 10px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
  -webkit-appearance:none !important;
}
/* input[type="number"]{
  -moz-appearance:textfield;
} */
.navbar{
  display: grid;
  font-size:20px ;
  /* max-width: 985px; */
  border-bottom: 3px solid #F3F3F3;
  grid-template-columns: repeat(2,1fr);
  max-width: 1310px;
  width: 100%;
  padding: 20px 0;
  font-weight: 200;
  color: #DADBDB;
  align-content: center;
  margin: 0 auto;
  justify-content: center;
}
.navbar div{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  max-width: 655px;
  width: 100%;
}
.navbar div:hover{
  color:black;
  cursor: pointer;
}
.promotionalContainer{
  position: relative;
  margin: 20px 0;
}
.promotionalContent{
  margin: 7px 0;
  font-size: 14px;
  line-height: 16px;
  padding-left: 10px;
}
.promotionalContainer::before{
  content: " ";
  background-color: black;
  height: 100%;
  width: 3px;
  display: block;
  position: absolute;
  left: 0;
}

.descriptionTitle{
  margin: 40px auto;
  display: flex;
  justify-content: center;
  position: relative;
  
}
.descriptionTitle::after{
  content: "    ";
  background-color: black;
  position: absolute;
  width: 40px;
  height: 3px;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
}
.descriptionTitle h3{
  font-size: 24px;
  letter-spacing:2px;
}
.productDescription{
  display: flex;
  margin: auto ;
  justify-content: center;
}
.productDescription p{
  padding: 5px 0;
  font-size: 14px;
}

.descriptionImg img{
  object-fit: contain;
  width: 100%;
  margin:40px 0;
}

@media screen and (1024px <= width) {
  .swiper{
    display: none;
  }
  .profile{
    display: flex;
    max-width: 985px;
    justify-content: center;
    margin: 0 auto;
  }
  .carousel{
    display: flex;
    max-width: 550px;
    width: 100%;
    justify-content: center;
    padding-right: 20px;
    width: 100%;
  }
  .descriptionProfile{
    max-width: 1340px;
    width: 100%;
    /* display: flex; */
    justify-content: center;
    margin: 0 auto;
  }
  .descriptionImg{
    max-width: 655px;
    width: 100%;
  }
}
</style>