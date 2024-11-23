import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductList from '@/views/ProductList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  // 
  routes: [
    {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path:'/franchising',
    name:'franchising',
    component:() => import('../views/Franchising.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('../components/Reviews.vue'),
  },
  {
    path: '/store-info',
    name: 'storeInfo',
    component: () => import('../views/StoreInfo.vue'),
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('../views/Vip.vue'),
  },
  {
    path:'/cooperation',
    name:'cooperation',
    component:() =>import('../views/Cooperation.vue')
  },
  {
    path:'/franchising',
    name:'franchising',
    component:() => import('../views/Franchising.vue')
  },
  {
    path:'/how-to-buy',
    name:'how-to-buy',
    component:() => import('../views/Howtobuy.vue')
  },
  {
    path:'/packaging',
    name:'packaging',
    component:() => import('../views/Packaging.vue')
  },
  {
    path:"/after-sales",
    name:"after-sales",
    component:() => import("../views/Aftersales.vue")
  },
  {
    path:"/overseas-delivery",
    name:"overseas-delivery",
    component:() => import("../views/Overseasdelivery.vue")
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList,
  },
  
],
})

export default router


