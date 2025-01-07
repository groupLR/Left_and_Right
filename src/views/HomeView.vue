<script setup>
import Carousel from "@/components/Carousel.vue"
import ProductItem from "@/components/ProductItem.vue"
import { storeToRefs } from "pinia"
import { useProductStore } from "@/stores/products"
import { onMounted } from "vue"
const ProductStore = useProductStore()
const { coBrandingTitle, productList, coBrandingCurrentPage, coBrandingPageSize, totalProductCount } = storeToRefs(ProductStore)

onMounted(async () => {
  await ProductStore.fetchProductList(26, null, coBrandingPageSize.value, coBrandingCurrentPage.value)
})
</script>

<template>
  <main>
    <Carousel />
    <!-- 影片 -->
    <section class="px-4 w-full my-0 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
      <div class="p-4 w-full">
        <iframe
          class="w-full aspect-video"
          src="https://www.youtube.com/embed/2yCrBzhKUUc?si=5x8VaWyxh2DCgtgx&autoplay=1&mute=0"
          data-cookieconsent="marketing"
          data-cookie-category="marketing"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay;clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        >
        </iframe>
      </div>
    </section>
    <!-- 聯名產品 -->
    <section class="px-4 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
      <div class="p-4">
        <h2 class="coBrandingTitle mb-7 pt-3 pb-6 text-2xl text-center tracking-wide relative">{{ coBrandingTitle }}</h2>
      </div>
      <div class="flex flex-wrap">
        <ProductItem
          v-for="(item, index) in productList"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :price="item.price"
          :originalPrice="item.originalPrice"
          :frontImg="item.frontImg"
          :backImg="item.backImg"
          class="md:col-6 lg:col-3"
        />
      </div>
      <!-- 分頁 -->
      <div class="flex justify-center pb-4 my-8">
        <vue-awesome-paginate
          class="text-gray-500 text-base"
          :total-items="totalProductCount"
          :items-per-page="coBrandingPageSize"
          :max-pages-shown="3"
          v-model="coBrandingCurrentPage"
          @click="ProductStore.paginationOnClickHandler(26, coBrandingCurrentPage, 'home')"
          :hide-prev-next-when-ends="true"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.coBrandingTitle::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: #000;
  bottom: -3px;
  left: 50%;
}

.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  padding: 6px 12px;
  cursor: pointer;
  color: black;
}

.active-page {
  font-weight: 700;
  border-bottom: 2px solid black;
}
</style>
