<script setup>
import { ref } from "vue"
import axios from "axios"

const categories = ref([])
// 請求父項目
const fetchCategories = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sidebarCategory`)
    categories.value = Object.values(data).map((category) => ({
      ...category,
      showChildren: false,
    }))
  } catch (error) {
    console.error("請求類別項目失敗：", error)
  }
}

const toggleChildren = (index) => {
  categories.value[index].showChildren = !categories.value[index].showChildren
}

fetchCategories()
</script>
<template>
  <aside class="shadow-md hidden w-56 mt-5 mr-5 h-screen bg-white overflow-y-auto scrollbar-hide xl:block">
    <ul class="relative">
      <li v-for="(category, index) in categories" :key="category.category_id" class="relative list-none">
        <!-- 大項目 -->
        <div class="flex items-center text-[#314e86] justify-between hover:cursor-pointer shadow-sm hover:font-bold">
          <!-- 類別名稱 -->
          <RouterLink :to="`/categories/${category.category_id}`" class="p-4" :class="{ ' font-bold': category.showChildren }">{{
            category.category_name
          }}</RouterLink>
          <!-- 收合箭頭 -->
          <i
            v-if="category.children.length > 0"
            class="fas fa-chevron-down w-3 h-3 text-[#314e86] mr-4 transition-transform duration-300"
            :class="{ 'rotate-180': category.showChildren }"
            @click="toggleChildren(index)"
          ></i>
        </div>

        <!-- 小項目 -->
        <div class="overflow-hidden duration-700 ease-in-out" :class="{ 'h-0': !category.showChildren, 'h-auto': category.showChildren }">
          <ul class="pl-1.5">
            <li
              v-for="child in category.children"
              :key="child.categories_id"
              class="p-4 hover:font-semibold text-gray-400 hover:text-[#314e86] hover:cursor-pointer"
            >
              <RouterLink :to="`/categories/${child.categories_id}`">{{ child.category_name }}</RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </aside>
</template>
<style scoped>
/* 針對 Webkit 瀏覽器 (Chrome, Safari) */
::-webkit-scrollbar {
  display: none;
}

/* 針對 Firefox */
* {
  scrollbar-width: none;
}

/* 使元素仍可滾動但隱藏滾軸 */
aside {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
