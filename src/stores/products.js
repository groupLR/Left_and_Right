import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

export const useProductStore = defineStore("products", () => {
  // 用來做預設商品頁面的標題
  const categoryTitle = ref("所有商品")

  // 預設商品列表
  const productList = ref([])
  // 商品列表標題處理
  const fetchProductList = async (
    categoryId = 1,
    sortBy,
    pageSize = 12,
    pageNum = 1
  ) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories${
          categoryId ? `/${categoryId}` : ""
        }`,
        {
          params: {
            sortBy,
            pageSize,
            pageNum,
          },
        }
      )
      productList.value = data.products || []
      categoryTitle.value = data.categoryName
      totalProductCount.value = data.totalProduct
      // 處理聯名
      coBrandingTitle.value = data.categoryName
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // 下拉
  const pageValue = ref("")
  const sortValue = ref("")

  const sortOptions = ref([
    {
      label: "上架時間：由新到舊",
      value: "latest",
    },
    {
      label: "上架時間：由舊到新",
      value: "oldest",
    },
    {
      label: "價格：由高至低",
      value: "expensive",
    },
    {
      label: "價格：由低至高",
      value: "cheap",
    },
    {
      label: "銷量：由高至低",
      value: "popular",
    },
  ])

  const pageOptions = ref([
    {
      label: "每頁顯示 12 個",
      value: "pageItem12",
    },
    {
      label: "每頁顯示 24 個",
      value: "pageItem24",
    },
    {
      label: "每頁顯示 36 個",
      value: "pageItem36",
    },
  ])

  // 分頁
  const currentPage = ref(1) // 當前頁碼
  const pageSize = ref(12) // 每頁顯示的項目數
  const coBrandingCurrentPage = ref(1)
  const coBrandingPageSize = ref(4)
  const totalProductCount = ref(20)
  const coBrandingTitle = ref("KOL / Ivy 郁欣聯名")

  // 排序邏輯實作
  const handleSortChange = (currentCategoryId, value) => {
    sortValue.value = value
    currentPage.value = 1
    fetchProductList(currentCategoryId, value, pageSize.value, 1)
  }

  // pageSize 單頁筆數切換
  const handlePageSizeChange = (currentCategoryId, value) => {
    pageSize.value = Number(value.substring(8))
    fetchProductList(
      currentCategoryId,
      sortValue.value,
      pageSize.value,
      currentPage.value
    )
  }

  // 分頁點擊處理函數
  const paginationOnClickHandler = (currentCategoryId, page, from) => {
    if (from === "home") {
      coBrandingCurrentPage.value = page
      fetchProductList(
        currentCategoryId,
        sortValue.value,
        coBrandingPageSize.value,
        coBrandingCurrentPage.value
      )
    } else if (from === "list") {
      currentPage.value = page // 更新當前頁碼
      fetchProductList(
        currentCategoryId,
        sortValue.value,
        pageSize.value,
        currentPage.value
      )
      scrollToTop()
    }
  }

  return {
    categoryTitle,
    productList,
    fetchProductList,
    pageValue,
    sortValue,
    sortOptions,
    handleSortChange,
    pageOptions,
    currentPage,
    pageSize,
    totalProductCount,
    handlePageSizeChange,
    coBrandingCurrentPage,
    coBrandingPageSize,
    coBrandingTitle,
    paginationOnClickHandler,
  }
})
