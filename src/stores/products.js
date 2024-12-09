import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from 'axios';

export const useProductStore = defineStore('products', () => {
  const API_URL = 'http://localhost:3300'

  // 用來做預設商品葉面的標題
  const categoryTitle = ref("所有商品") 

  // 預設商品列表
  const productList = ref([])
  // 商品列表標題處理
  const fetchProductList = async (categoryId = 1, sortBy, currentPage, itemsPerPage) => {
    try {
      const response = await axios.get(`${API_URL}/categories${categoryId ? `/${categoryId}` : ''}`,{
        params: {
          sortBy,
          itemsPerPage,
        }
      })
      productList.value = response.data.products  || []
      categoryTitle.value = response.data.categoryName

    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const coBrandingProductList = ref([])

  const fetchCoBrandingProductList = async () =>{
    try {
      const response = await axios.get(`${API_URL}/categories/3`)
      coBrandingProductList.value = response.data.products
    } catch (error) {
      console.error('Error fetching co-branding products');
      
    }
  }
  
// 购物车商品
const cartItems = ref([]); // 购物车商品的数组
const isCartVisible = ref(false);
// 添加商品到购物车
const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1; // 如果商品已在购物车中，数量加1
  } else {
    cartItems.value.push({ ...product, quantity: 1 }); // 否则新增商品
  }
  isCartVisible.value = true; // 每次添加商品後顯示購物車
};
const toggleCartVisibility = (visible) => {
  if (visible !== undefined) {
    isCartVisible.value = visible; // 明确控制显示/隐藏
  } else {
    isCartVisible.value = !isCartVisible.value; // 切换状态
  }
   // 控制背景滚动条
   if (isCartVisible.value) {
    document.body.style.overflow = 'hidden'; // 禁止背景滚动
  } else {
    document.body.style.overflow = 'auto'; // 恢复背景滚动
  }
};

// 从购物车删除商品
const removeFromCart = (itemId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId);
};

// 更新购物车商品数量
const updateQuantity = (itemId, newQuantity) => {
  const item = cartItems.value.find(item => item.id === itemId);
  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      // 可選：自動從購物車中移除數量為 0 的商品
      removeFromCart(itemId);
    }
  }
};


// 计算购物车内商品的总数量
const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0);
});

  // 下拉
  const pageValue = ref('')
  const sortValue = ref('')

  const handleSortChange = (currentCategoryId, value) => {
    sortValue.value = value
    fetchProductList(currentCategoryId, value, itemsPerPage.value)
  }

  const sortOptions = ref([
    {
      label: '上架時間：由新到舊',
      value: 'latest',
    },
    {
      label: '上架時間：由舊到新',
      value: 'oldest',
    },
    {
      label: '價格：由高至低',
      value: 'expensive',
    },
    {
      label: '價格：由低至高',
      value: 'cheap',
    },
    {
      label: '銷量：由高至低',
      value: 'popular',
    },
  ]);

  const pageOptions = ref([
    {
      label: '每頁顯示 12 個',
      value: 'pageItem12',
    },
    {
      label: '每頁顯示 24 個',
      value: 'pageItem24',
    },
    {
      label: '每頁顯示 36 個',
      value: 'pageItem36',
    },
  ]);

  // 處理每頁幾筆資料的邏輯

  // 分頁
  const currentPage = ref(1); // 當前頁碼
  const itemsPerPage = ref(12); // 每頁顯示的項目數
  const coBrandingCurrentPage = ref(1)
  const coBrandingItemsPerPage = ref(4)

  const handleItemNumChange = (currentCategoryId, value) => {
    itemsPerPage.value = Number(value.substring(8))
    fetchProductList(currentCategoryId, sortValue.value, value)
  }

  // 分頁後的數據
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return productList.value.slice(start, end);
  });

  // 分頁後的 co-branding 數據
  const paginatedCoBrandingProducts = computed(() => {
    const start = (coBrandingCurrentPage.value - 1) * coBrandingItemsPerPage.value;
    const end = start + coBrandingItemsPerPage.value;
    return coBrandingProductList.value.slice(start, end);
  });

  // 分頁點擊處理函數
  const paginationOnClickHandler = (page) => {
    currentPage.value = page; // 更新當前頁碼
    console.log("Current Page:", page);
  };

  return {
    categoryTitle,
    productList,
    fetchProductList,
    coBrandingProductList,
    fetchCoBrandingProductList,
    pageValue,
    sortValue,
    sortOptions,
    handleSortChange,
    pageOptions,
    currentPage,
    itemsPerPage,
    paginatedProducts,
    handleItemNumChange,
    coBrandingCurrentPage,
    coBrandingItemsPerPage,
    paginatedCoBrandingProducts,
    paginationOnClickHandler,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartItemCount,
    isCartVisible,
    toggleCartVisibility,
  }
})