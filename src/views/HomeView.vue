<script setup>
import Carousel2 from '@/components/Carousel2.vue';
import ProductItem from '@/components/ProductItem.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '@/stores/products'
import { ref } from "vue";
const ProductStore = useProductStore()
const { coBrandingProductList, paginatedCoBrandingProducts, coBrandingCurrentPage, coBrandingItemsPerPage, paginationOnClickHandler } = storeToRefs(ProductStore)

</script>

<template>
  <main>
    <Carousel2 />
    <!-- 影片 -->
    <section class="px-4 w-full	my-0 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
      <div class="w-full p-4">
        <iframe class="w-full aspect-video "
          src="https://www.youtube-nocookie.com/embed/APEujcFMCxs?loop=1&playlist=APEujcFMCxs&rel=1"
          data-cookieconsent="marketing"
          data-cookie-category="marketing"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
      </div>
    </section>
    <!-- 聯名產品 -->
    <section class=" px-4 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
      <div class="p-4 ">
        <h2 class="relative pt-3 pb-6 text-2xl tracking-wide text-center coBrandingTitle mb-7">KOL / Ivy 郁欣聯名</h2>
      </div>
      <div class="flex flex-wrap">
        <ProductItem v-for="(item, index) in paginatedCoBrandingProducts" :key="item.id" :id="item.id" :title="item.title" :price="item.price"
        :originalPrice="item.originalPrice" :frontImg="item.frontImg" :backImg="item.backImg" class="md:col-6 lg:col-3"/>
      </div>
      <!-- 分頁 -->
      <div class="flex justify-center pb-4 mb-7">
      <vue-awesome-paginate class="text-sm text-gray-500 " :total-items="coBrandingProductList.length"
        :items-per-page="coBrandingItemsPerPage" :max-pages-shown="3" v-model="coBrandingCurrentPage" @click="paginationOnClickHandler"
        :hide-prev-next-when-ends="true" link-url="/products?page=[page]" />
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

</style>