<script setup>
import Carousel from '@/components/Carousel.vue';
import ProductItem from '@/components/ProductItem.vue';
import { storeToRefs } from "pinia";
import { useProductStore } from '@/stores/products'
import { onMounted } from 'vue';
const ProductStore = useProductStore()
const { coBrandingTitle ,coBrandingProductList, coBrandingCurrentPage, coBrandingPageSize, totalProductCount } = storeToRefs(ProductStore)

onMounted( async () => {
  await ProductStore.fetchCoBrandingProductList(coBrandingPageSize.value, coBrandingCurrentPage.value)
})

</script>

<template>
  <main>
    <Carousel />
    <!-- 影片 -->
    <section class="px-4 w-full	my-0 mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px]">
      <div class="p-4 w-full">
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
      <div class=" p-4">
        <h2 class="coBrandingTitle mb-7 pt-3 pb-6 text-2xl text-center tracking-wide relative">{{ coBrandingTitle }}</h2>
      </div>
      <div class="flex flex-wrap">
        <ProductItem v-for="(item, index) in coBrandingProductList" :key="item.id" :title="item.title" :price="item.price"
        :orginalPrice="item.orginalPrice" :frontImg="item.frontImg" :backImg="item.backImg" class="md:col-6 lg:col-3"/>
      </div>
      <!-- 分頁 -->
      <div class="flex justify-center pb-4 mb-7">
      <vue-awesome-paginate class=" text-gray-500 text-sm" :total-items="totalProductCount"
        :items-per-page="coBrandingPageSize" :max-pages-shown="3" v-model="coBrandingCurrentPage" @click="ProductStore.paginationOnClickHandler(3, coBrandingCurrentPage)"
        :hide-prev-next-when-ends="true"  />
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