<!-- 購物車頁面 -->
<template>
  <section class="bg-gray-100 pb-[150px]">
    <section class="px-2 max-w-[1340px] mx-auto py-5 md:px-10">
  <section class="bg-gray-100" v-if="isSharedCart">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">共享購物車</h1>
      <div>
        <AddMember :groupId="route.params.groupId" :members="sharedCartMembers" @memberAdded="refreshSharedCart" />
        <Warning content="您確定要刪除共享購物車嗎？" @confirm="deleteSharedCart" />
      </div>
    </div>
    <div class="p-3 my-5 bg-gray-100 border-2 border-solid rounded">
      <h2 class="mb-2 text-xl font-bold text-cyan-900">{{ sharedCartName }}</h2>
      <p class="font-bold">購朋友：</p>
      <p>{{ sharedCartMembers.join("、") }}</p>
    </div>
  </section>
  <section v-else>
        <h1 class="my-5 text-2xl font-bold">購物車</h1>
      </section>

      <!-- 步驟 -->
      <section class="flex justify-center">
        <el-steps style="min-width: 300px" :active="1" align-center class="md:w-[600px]">
          <el-step title="購物" description="送貨與付款方式" />
          <el-step title="結帳" description="付款與送貨地址" />
        </el-steps>
      </section>
       <!-- 主要內容區 -->
       <section class="flex flex-col mt-10 md:flex-row md:gap-5">
        <section class="md:w-2/3">
          <!-- 商品列表 -->
          <section class="bg-white rounded-xl">
            <CartProduct
              v-for="item in products"
              :key="item.id"
              :id="item.product_id"
              :name="item.product_name"
              :originalPrice="item.original_price"
              :salePrice="item.sale_price"
              :imgPath="item.image_path"
              :quantity="item.quantity"
              @updateQuantity="updateQuantity"
              @deleteProduct="deleteProduct"
            />
          </section>
          <!-- 送貨及付款方式 -->
          <section class="px-5 py-5 mt-5 bg-white rounded-xl">
            <div class="flex items-center justify-between my-4">
              <label class="mr-2 shrink-0">送貨地點</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedCountry"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="item in countryList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
            <!-- <div class="flex items-center justify-between my-4">
              <label class="mr-2 shrink-0">送貨方式</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedDelivery"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="option in deliveryOptions" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
              </el-select>
            </div> -->
            <div class="flex items-center justify-between my-4">
            <label class="mr-2 shrink-0">送貨方式</label>
            <el-select
              placement="bottom"
              :fallback-placements="['bottom-start']"
              v-model="selectedDelivery"
              placeholder="送貨地點"
              size="default"
              class="w-30"
            >
              <el-option
                v-for="option in deliveryOptions"
                :key="option"
                :label="option"
                :value="option"
                :disabled="false"
              />
            </el-select>
            </div>
            <!-- <div class="flex items-center justify-between my-4">
              <label class="mr-2 shrink-0">付款方式</label>
              <el-select
                placement="bottom"
                :fallback-placements="['bottom-start']"
                v-model="selectedPayment"
                placeholder="送貨地點"
                size="default"
                class="w-30"
              >
                <el-option v-for="option in paymentOptions" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
              </el-select>
            </div> -->
            <div class="flex items-center justify-between my-4">
            <label class="mr-2 shrink-0">付款方式</label>
            <el-select
              placement="bottom"
              :fallback-placements="['bottom-start']"
              v-model="selectedPayment"
              placeholder="選擇付款方式"
              size="default"
              class="w-30"
            >
              <el-option
                v-for="option in paymentOptions"
                :key="option"
                :label="option"
                :value="option"
              />
            </el-select>
            </div>
            <div class="text-gray-500">
              <p>取貨通知：</p>
              <p>
                - 訂單到達超商七日內，每日皆會傳送取貨簡訊，並於第五日時撥打語音電話通知取貨哦！<br />
                - 現貨訂單狀態更改「已確認」後，2-3天寄出。 (不包含假日及國定假日)<br />
                <br />- 本公司產品享7天鑑賞期，30天保固維修<br />
                - 免付費電話：0800 000 004<br />- 預購與現貨一併出貨
              </p>
            </div>
          </section>
        </section>
        <!-- 優惠和小計區塊 -->
        <aside class="flex flex-col gap-5 mt-5 md:w-1/3 md:mt-0">
          <!-- 優惠區塊 -->
          <div class="sticky top-0">
            <div class="p-5 bg-white rounded-xl">
              <h2 class="text-xl font-bold">已享用之優惠</h2>
              <!-- 之後串 API 了用這個 div 跑 v-for -->
              <div class="flex flex-col items-start">
                <p class="px-5 my-4 text-sm text-center bg-green-100 md:text-base">優惠促銷</p>
                <p class="text-sm md:text-base">雙11優惠！全館 兩件85折/三件8折/四件75折！ - 全單 滿 2 件 即享 85 折 再買 1 件 省更多</p>
                <div class="flex justify-end w-full">
                  <p class="text-sm font-bold text-green-600 md:text-base">-NT$94</p>
                </div>
              </div>
            </div>

            <!-- 小計 -->
            <div class="p-5 mt-5 bg-white rounded-xl">
              <h2 class="mb-2 text-xl font-bold">訂單資訊</h2>
              <h3 class="mb-4">商品項目：{{ itemCount }} 件</h3>
              <div class="flex flex-col gap-3">
                <div class="flex justify-between">
                  <p>小計</p>
                  <p>NT${{ itemPrice }}</p>
                </div>
                <div class="flex justify-between">
                  <p>折扣</p>
                  <p>-NT$94</p>
                </div>
                <div class="flex justify-between">
                  <p>運費</p>
                  <p>NT$60</p>
                </div>
                <hr />
                <div class="flex justify-between">
                  <p>合計</p>
                  <p class="font-bold text-orange-500">NT${{ itemPrice + 60 }}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </section>
    <!-- 前往結帳 -->
    <section class="fixed bottom-0 w-full bg-white shadow-2xl">
      <div class="flex gap-5 justify-end items-center m-5 max-w-[1365px]">
        <p class="font-bold text-orange-500">小計：NT${{ itemPrice }}</p>
        <button class="px-2 py-1 text-white bg-black rounded md:px-10" @click="goToNext">前往結帳</button>
        <!-- <RouterLink
         :to="{
           name: 'Debit',
           query: {
             location: selectedLocation,
             shipping: selectedShippingMethod,
             payment: selectedPaymentMethod,
           },
         }"
          
          class="px-2 py-1 text-white bg-black rounded md:px-10" :disabled="products.length === 0"
>
  前往結帳
</RouterLink> -->
      </div>
    </section>
  </section>
 
</template>
<script setup>
// import axios from 'axios';
// import { ref, computed, watch, onMounted } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
// import { useCheckoutStore } from '../stores/payment';
// import { ElMessage } from "element-plus"
// import { useSharedCartStore } from "@/stores/sharedCart"
// import AddMember from "@/components/AddMember.vue"
// import Warning from "@/components/Warning.vue"

// const checkoutStore = useCheckoutStore();
// const route = useRoute();
// const router = useRouter();
// const SharedCartStore = useSharedCartStore()
// // State management from store
// const selectedLocation = computed(() => checkoutStore.selectedLocation);
// const selectedShippingMethod = computed(() => checkoutStore.selectedShippingMethod);
// const paymentMethods = computed(() => checkoutStore.paymentMethods);
// const deliveryOptions = computed(() => checkoutStore.deliveryOptions);
// const shippingMethods = computed(() => deliveryOptions.value);
// const selectedPaymentMethod = computed({
//   get: () => checkoutStore.selectedPaymentMethod,
//   set: (value) => checkoutStore.setSelectedPaymentMethod(value),
// });

// // Local state (data)
// const products = ref([]);
// const isSharedCart = ref(false) // 是不是共享購物車（用cart/後面有沒有帶groupId 判斷 ) 
// const location = ref(route.query.location || 'TW');
// const sharedCartName = ref("") // 共享購物車名稱
// const sharedCartMembers = ref([]) // 共享購物車成員
// // Update methods
// const updateLocation = (newLocation) => {
//   checkoutStore.setSelectedLocation(newLocation);
//   onLocationChange();
// };

// const updateShippingMethod = (method) => {
//   checkoutStore.setSelectedShippingMethod(method);
// };

// const updatePaymentMethod = (event) => {
//   checkoutStore.setSelectedPaymentMethod(event.target.value);
// };

// // Handle location change
// const onLocationChange = () => {
//   checkoutStore.setSelectedShippingMethod(shippingMethods.value[0] || '');
//   checkoutStore.setSelectedPaymentMethod(paymentMethods.value[0] || '');
//   console.log(`送貨地點變更為: ${selectedLocation.value}`);
// };

// // Watchers
// watch(selectedShippingMethod, (newMethod) => {
//   if (!paymentMethods.value.includes(checkoutStore.selectedPaymentMethod)) {
//     checkoutStore.setSelectedPaymentMethod(paymentMethods.value[0]);
//   }
// });

// watch(selectedPaymentMethod, (newPaymentMethod) => {
//   router.replace({
//     query: { ...route.query, payment: newPaymentMethod },
//   });
// });

// watch(
//   () => route.query,
//   (newQuery) => {
//     if (newQuery.location) {
//       checkoutStore.setSelectedLocation(newQuery.location);
//     }
//   },
//   { immediate: true }
// );
// watch(
//   () => route.params,
//   async () => {
//     await initializeCartPage()
//   }
// )

// // API Methods
// const fetchCartItems = async () => {
//   try {
//     const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/cartQuery`);
//     products.value = response.data;
//     console.log('資料獲取成功:', products.value);
//   } catch (error) {
//     console.error('獲取資料失敗:', error);
//   }
// };

// // const fetchSharedCartItems = async (groupId) => {
// //   try {
// //     const response = await axios.get(`http://localhost:3300/sharedCartItem/${groupId}`);
// //     products.value = response.data;
// //     console.log('獲得共享購物車資料');
// //   } catch (error) {
// //     console.error('Error fetching shared cart items:', error);
// //   }
// // };

// const addProduct = async (newProduct) => {
//   axios
//     .post(`${import.meta.env.VITE_API_URL}/cart/cartInsert`, newProduct)
//     .then((response) => {
//       products.value.push(response.data);
//     })
//     .catch((error) => {
//       console.error('新增商品失敗:', error);
//     });
// };

// const deleteProduct = async(id) => {
//   axios
//     .delete(`${import.meta.env.VITE_API_URL}/cart/cartDelete/${id}`)
//     .then(() => {
//       products.value = products.value.filter((product) => product.id !== id);
//     })
//     .catch((error) => {
//       console.error('刪除商品失敗:', error);
//     });
// };

// const updateQuantity = async (item) => {
//   if (item.quantity < 1) {
//     alert('數量不能小於 1');
//     item.quantity = 1;
//     return;
//   }
//   try {
//     const response = await axios.put(`${import.meta.env.VITE_API_URL}/cart/update-quantity`, {
//       product_id: item.product_id,
//       quantity: item.quantity,
//     })
// ;
//     if (response.data.success) {
//       console.log('數量更新成功');
//     } else {
//       alert(`更新失敗: ${response.data.message}`);
//     }
//   } catch (error) {
//     console.error('更新數量時出錯', error);
//     alert('更新數量時出錯，請稍後再試');
//   }
// };

// const goToNext = () => {
//   try {
//     router.push('/Debit').catch((err) => {
//       console.error('導航失敗:', err);
//     });
//   } catch (error) {
//     console.error('錯誤發生:', error);
//   }
// };
// // 刪除共享購物車
// const deleteSharedCart = async () => {
//   try {
//     await SharedCartStore.deleteSharedCart(route.params.groupId)
//     await SharedCartStore.fetchSharedCartList()
//     const message = sharedCartName.value ? `刪除 ${sharedCartName.value} 成功` : "刪除共享購物車成功"
//     ElMessage.success(message)
//     // 導航到共享購物車列表
//     router.push("/sharedcartlist")
//   } catch (error) {
//     console.error("刪除購物車失敗:", error)
//     ElMessage.error("刪除購物車失敗，請稍後再試")
//   }
// }
// // 新增好友後重新渲染共享購物車
// const refreshSharedCart = async () => {
//   const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
//   products.value = data.productDataList
//   sharedCartMembers.value = data.info.memberName
// }


// const initializeCartPage = async () => {
//   // 檢查路由是否包含 groupId 參數，有就抓共享購物車，沒有就抓自己的購物車
//   if ("groupId" in route.params) {
//     isSharedCart.value = true
//     const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
//     products.value = data.productDataList || []
//     sharedCartName.value = data.info.cartName || ""
//     sharedCartMembers.value = data.info.memberName || []
//   } else {
//     isSharedCart.value = false
//     await fetchCartItems()
//   }
// }

// // Computed properties
// const itemCount = computed(() => {
//   return products.value.filter((item) => item.quantity > 0).length
// })


// const itemPrice = computed(() => {
//   return products.value.reduce((total, item) => total + item.original_price * item.quantity, 0)
// })


// // Lifecycle hooks
// onMounted(async () => {
//   // 初始化頁面
//   await initializeCartPage();

//   // 檢查路由參數並執行相應的操作
//   if ('groupId' in route.params) {
//     isSharedCart.value = true;
//     await fetchSharedCartItems(route.params.groupId);
//   } else {
//     await fetchCartItems();
//   }
// });


// // Initialize options
// checkoutStore.setSelectedShippingMethod('貨到付款-黑貓宅配/滿499免運');
// onLocationChange();
import axios from "axios"
import { useRoute, onBeforeRouteUpdate,useRouter } from "vue-router"
import { onMounted, ref, computed, watch } from "vue"
import { ElMessage } from "element-plus"
import { useSharedCartStore } from "@/stores/sharedCart"
import AddMember from "@/components/AddMember.vue"
import Warning from "@/components/Warning.vue"
import CartProduct from "@/components/CartProduct.vue"
import { useCheckoutStore } from '../stores/payment';
const route = useRoute()
const router = useRouter()
const checkoutStore = useCheckoutStore();
const SharedCartStore = useSharedCartStore()
const selectedLocation = computed(() => checkoutStore.selectedLocation);
const selectedShippingMethod = computed(() => checkoutStore.selectedShippingMethod);
const paymentMethods = computed(() => checkoutStore.paymentMethods);
// const deliveryOptions = computed(() => checkoutStore.deliveryOptions);
const deliveryOptions = computed(() => checkoutStore.deliveryOptions); // 根據選定位置計算可用送貨方式
const shippingMethods = computed(() => deliveryOptions.value);
const updateLocation = (newLocation) => {
  checkoutStore.setSelectedLocation(newLocation); // 更新到 store
  onLocationChange(); // 確保觸發相關更新邏輯
};
// 新增一個方法來更新 shipping method
const updateShippingMethod = (method) => {
  checkoutStore.setSelectedShippingMethod(method);
};

// Initialize selected shipping method if needed
checkoutStore.setSelectedShippingMethod('貨到付款-黑貓宅配/滿499免運'); // Example, adjust based on your logic

const location = (route.query.location || 'TW'); // 初始化时同步
// const paymentOptions = {
//   TW: ['信用卡 (Visa / MasterCard / JCB / 銀聯卡)', '現金付款'],
//   default: ['信用卡 (Visa / MasterCard / JCB / 銀聯卡)'],
// };
const paymentOptions = computed(() => checkoutStore.paymentMethods); // 根據配送方式計算可用付款方式
// const paymentOptions = computed(() => {
//   const options = checkoutStore.paymentMethods; // 從 Pinia 獲取計算屬性
//   return options.includes(selectedPayment.value) ? options : [options[0]];
// });
const selectedPaymentMethod = computed({
  get: () => checkoutStore.selectedPaymentMethod,
  set: (value) => checkoutStore.setSelectedPaymentMethod(value)
});
;const updatePaymentMethod = (event) => {
  checkoutStore.setSelectedPaymentMethod(event.target.value);
};
// 當送貨地點改變時，更新送貨方式與付款方式
const onLocationChange = () => {
  // 使用 store 的 action 來設置 shipping method
  checkoutStore.setSelectedShippingMethod(shippingMethods.value[0] || '');
  
  // 使用 store 的 action 來設置 payment method
  checkoutStore.setSelectedPaymentMethod(paymentMethods.value[0] || '');
  
  // console.log(送貨地點變更為: ${selectedLocation.value});
};
// 監控 selectedShippingMethod 的變化動態更新 selectedPaymentMethod
// watch(selectedShippingMethod, (newMethod) => {
//   // selectedPaymentMethod.value = paymentMethods.value[0] || '';
//   if (!paymentMethods.value.includes(checkoutStore.selectedPaymentMethod)) {
//     checkoutStore.setSelectedPaymentMethod(paymentMethods.value[0]);}
// });

// 初始化選項
onLocationChange();

// 防護 route.query 為 undefined 的情況
if (route.query && route.query.location) {
  location.value = route.query.location;
}

watch(selectedPaymentMethod, (newPaymentMethod) => {
  router.replace({
    query: { ...route.query, payment: newPaymentMethod },
  });
});

// 監聽路由查詢參數的變化
watch(() => route.query, (newQuery) => {
  if (newQuery.location) {
    checkoutStore.setSelectedLocation(newQuery.location)
  }
}, { immediate: true })

watch(selectedShippingMethod, (newValue) => {
  console.log('Shipping Method Changed:', newValue);
});


// data
const products = ref([]) // 儲存後端返回的商品資料
const isSharedCart = ref(false) // 是不是共享購物車（用cart/後面有沒有帶 groupId 判斷 )
const sharedCartName = ref("") // 共享購物車名稱
const sharedCartMembers = ref([]) // 共享購物車成員
const userId = localStorage.getItem("UID")
// 送貨表單
const selectedCountry = ref("TW")
const countryList = [
  { value: "AU", label: "澳大利亞" },
  { value: "BE", label: "比利時" },
  { value: "CA", label: "加拿大" },
  { value: "CN", label: "中國" },
  { value: "FR", label: "法國" },
  { value: "DE", label: "德國" },
  { value: "HK", label: "香港" },
  { value: "ID", label: "印度尼西亞" },
  { value: "IT", label: "意大利" },
  { value: "JP", label: "日本" },
  { value: "KR", label: "韓國" },
  { value: "MO", label: "澳門" },
  { value: "MY", label: "馬來西亞" },
  { value: "NL", label: "荷蘭" },
  { value: "NZ", label: "新西蘭" },
  { value: "PW", label: "帕勞" },
  { value: "PE", label: "秘魯" },
  { value: "PH", label: "菲律賓" },
  { value: "SG", label: "新加坡" },
  { value: "TW", label: "台灣" },
  { value: "TH", label: "泰國" },
  { value: "GB", label: "英國" },
  { value: "US", label: "美國" },
  { value: "VN", label: "越南" },
]
const selectedDelivery = ref(checkoutStore.selectedShippingMethod); // 使用 Pinia 管理的 selectedShippingMethod
//const selectedDelivery = ref("home-delivery")
// const deliveryOptions = [
//   {
//     value: "overseas-ems",
//     label: "海外運送 (3-7天到貨，採EMS寄送)",
//     disabled: false,
//   },
//   {
//     value: "overseas-dhl",
//     label: "海外運送 (3-7天到貨，DHL運送)",
//     disabled: false,
//   },
//   {
//     value: "7-11",
//     label: "7-11",
//   },
//   {
//     value: "home-delivery",
//     label: "宅配到府",
//   },
// ]
const selectedPayment = ref(checkoutStore.selectedPaymentMethod); // 使用 Pinia 的 selectedPaymentMethod
// const selectedPayment = ref("credit-card")
// const paymentOptions = [
//   {
//     value: "cash-on-delivery",
//     label: "貨到付款",
//   },
//   {
//     value: "credit-card",
//     label: "信用卡 (Visa / MasterCard / JCB / 銀聯卡)",
//   },
//   {
//     value: "dbs-card",
//     label: "↳ 刷星展卡滿 3,000 送 100 刷卡金",
//     disabled: true,
//   },
// ]

// computed
const itemCount = computed(() => {
  return products.value.filter((item) => item.quantity > 0).length
})

const itemPrice = computed(() => {
  return products.value.reduce((total, item) => total + item.original_price * item.quantity, 0)
})

// method
// 獲取購物車商品
const fetchCartItems = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/cartQuery`, {
      headers: {
        userId,
      },
    })
    products.value = response.data // 將 API 返回的資料存入 products
  } catch (error) {
    console.error("獲取資料失敗:", error)
  }
}

// 新增購物車商品
const addProduct = async (newProduct) => {
  axios
    .post(`${import.meta.env.VITE_API_URL}/cart/cartInsert`, newProduct)
    .then((response) => {
      products.value.push(response.data) // 新增成功後直接更新列表
    })
    .catch((error) => {
      console.error("新增商品失敗:", error)
    })
}

// 刪除商品
const deleteProduct = async (id) => {
  axios
    .delete(`${import.meta.env.VITE_API_URL}/cart/cartDelete/${id}`, {
      headers: {
        userId,
      },
    })
    .then(() => {
      products.value = products.value.filter((product) => product.id !== id) // 從列表中移除
    })
    .catch((error) => {
      console.error("刪除商品失敗:", error)
    })

  await initializeCartPage()
}

// 更新商品
const updateQuantity = async ({ id, quantity }) => {
  if (quantity < 1) {
    alert("數量不能小於 1")
    return
  }

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/cart/update-quantity`,
      {
        product_id: id,
        quantity,
      },
      {
        headers: { userId },
      }
    )

    if (response.data.success) {
      console.log("數量更新成功")
      await initializeCartPage() // 重新獲取購物車列表
    } else {
      alert("更新失敗：" + response.data.message)
    }
  } catch (error) {
    console.error("更新數量時出錯", error)
    alert("更新數量時出錯，請稍後再試")
  }
}

// 前往結帳
const goToNext = async () => {
  try {
    await router.push("/Debit")
  } catch (err) {
    console.error("導航失敗:", err)
  }
}

// 刪除共享購物車
const deleteSharedCart = async () => {
  try {
    await SharedCartStore.deleteSharedCart(route.params.groupId)
    await SharedCartStore.fetchSharedCartList()
    const message = sharedCartName.value ? `刪除 ${sharedCartName.value} 成功` : "刪除共享購物車成功"
    ElMessage.success(message)
    // 導航到共享購物車列表
    router.push("/sharedcartlist")
  } catch (error) {
    console.error("刪除購物車失敗:", error)
    ElMessage.error("刪除購物車失敗，請稍後再試")
  }
}
// 新增好友後重新渲染共享購物車
const refreshSharedCart = async () => {
  const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
  products.value = data.productDataList
  sharedCartMembers.value = data.info.memberName
}

const initializeCartPage = async () => {
  // 檢查路由是否包含 groupId 參數，有就抓共享購物車，沒有就抓自己的購物車
  if ("groupId" in route.params) {
    isSharedCart.value = true
    const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId)
    products.value = data.productDataList || []
    sharedCartName.value = data.info.cartName || ""
    sharedCartMembers.value = data.info.memberName || []
  } else {
    isSharedCart.value = false
    await fetchCartItems()
  }
}
// 初始化購物車頁面
// const initializeCartPage = async () => {
//   if (isSharedCart.value) {
//     const data = await SharedCartStore.fetchSharedCartItems(route.params.groupId);
//     products.value = data.productDataList || [];
//   } else {
//     await fetchCartItems(); // 僅在購物車需要更新時重新抓取數據
//   }
// };
// onMounted
onMounted(async () => {
  await initializeCartPage()
})

// 避免不必要的數據重置
// onMounted(async () => {
//   if (!products.value.length) {
//     await initializeCartPage(); // 僅在數據為空時初始化
//   }
// });

// 初始設定
onMounted(() => {
  checkoutStore.initializeShippingMethod(); // 確保有默認的送貨方式
});
// 初始化付款方式
onMounted(() => {
  if (!paymentOptions.value.includes(selectedPayment.value)) {
    selectedPayment.value = paymentOptions.value[0];
  }
});
// watch
watch(
  () => route.params,
  async () => {
    await initializeCartPage()
  }
)
// 同步 selectedDelivery 與 Pinia 狀態
watch(selectedDelivery, (newMethod) => {
  checkoutStore.setSelectedShippingMethod(newMethod);
});

// 當送貨方式變更時，自動更新付款方式
watch(() => checkoutStore.selectedShippingMethod, () => {
  // 更新默認付款方式為當前配送方式可用的第一個選項
  if (!paymentOptions.value.includes(selectedPayment.value)) {
    selectedPayment.value = paymentOptions.value[0];
  }
});
</script>

<style scoped>
.cart {
  max-width: 1160px;
  height: auto;
  border: 1px solid#f6f6f6;
  margin-bottom: 50px;
}

.quarter {
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tittles {
  width: 1160px;
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f6f6f6;
}

.tittle {
  width: 150px;
  height: 20px;
  color: #333333;
  display: flex;
  margin: 5px;
  padding: 5px;
}

.prInfo {
  gap: 20px;
}

.prdetail {
  width: 150px;
  height: 180px;
  /* margin: 5px; */
  padding: 5px;
  justify-content: center;
}

.introduce {
  width: 300px;
}

.tagGreen {
  background-color: #e8f8e8;
  width: 150px;
  height: 21px;
  display: flex;
  justify-content: center;
}

.tagGrey {
  background-color: #f6f6f6;
  width: 150px;
  height: 21px;
  display: flex;
  justify-content: center;
}

.options {
  width: 450px;
  border-color: 1px solid #9c9c9cd8;
  border-radius: 2%;
}

:deep(.el-step__description.is-finish) {
  @apply text-orange-500;
}

:deep(.el-step__head.is-finish) {
  @apply text-orange-500 border-orange-500;
}
</style>