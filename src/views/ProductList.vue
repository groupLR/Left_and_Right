<script setup>
import ProductItem from '@/components/ProductItem.vue';
import { ref } from "vue"

const productList = ref([
  { id: 1, title: "[官網限定] 貓咪愛吃魚戒指 / Cat And Fish Ring", price: 170, orginalPrice: 180, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 2, title: "[限量發售] 龍貓耳環 / Totoro Earrings", price: 200, orginalPrice: 220, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 3, title: "[限量] 玫瑰金手鍊 / Rose Gold Bracelet", price: 350, orginalPrice: 380, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 4, title: "[限時特惠] 星星戒指 / Star Ring", price: 120, orginalPrice: 150, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 5, title: "[手作設計] 彩虹項鍊 / Rainbow Necklace", price: 290, orginalPrice: 310, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 6, title: "[經典款] 純銀耳環 / Silver Earrings", price: 220, orginalPrice: 250, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 7, title: "[新款] 精緻指環 / Delicate Ring", price: 150, orginalPrice: 180, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 8, title: "[限定款] 簡約手環 / Minimalist Bracelet", price: 180, orginalPrice: 200, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 9, title: "[限量發售] 摩登耳環 / Modern Earrings", price: 250, orginalPrice: 270, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 10, title: "[復古風] 蝴蝶結戒指 / Bow Ring", price: 130, orginalPrice: 150, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 11, title: "[精品款] 鑽石耳環 / Diamond Earrings", price: 500, orginalPrice: 550, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" },
  { id: 12, title: "[經典款] 鋯石戒指 / Zircon Ring", price: 300, orginalPrice: 320, frontImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66ea6fc7a8e6160013ac0cee/375x.webp?source_format=jpg", backImg: "https://shoplineimg.com/53eb2bccb32b41ef6e000007/66e7e1a7a3aa4700194d280a/800x.webp?source_format=jpg" }
])


</script>


<template>
  <div class=" px-1 mb-2">
    <h1 class=" py-5 text-xl">戒指 / Rings</h1>
  </div>
  <div class="flex flex-wrap">
    <ProductItem v-for="(item, index) in productList" :key="item.id" :title="item.title" :price="item.price" :orginalPrice="item.orginalPrice" :frontImg="item.frontImg" :backImg="item.backImg" >
    </ProductItem>
  </div>
</template>