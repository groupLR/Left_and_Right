import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '@/views/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 
  routes: [

    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/store-info',
    name: 'storeInfo',
    component: () => import('../views/StoreInfo.vue'),
  },
                                {
      path: '/products',
      name: 'products',
      component: ProductList,
    },]
})

export default router


